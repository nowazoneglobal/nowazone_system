const Application = require('../models/Application');
const Job = require('../models/Job');
const { AppError } = require('../../../shared/middleware/errorHandler');
const { onHired } = require('../../../shared/services/jobHiringService');
const { cloudinary } = require('../../../shared/config/cloudinary');
const { randomUUID } = require('crypto');
const { application: applicationSchema } = require('../../../shared/schemas/publicSubmissionSchemas');
const { fingerprint, checkReplay, notifyStaff, emitNotifications, sendReceipt } = require('../../../shared/services/publicSubmissionService');

exports.listApplications = async (req, res, next) => {
  try {
    const page   = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit  = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const filter = {};
    if (req.query.job)    filter.job    = req.query.job;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) filter.$or = [
      { applicantName:  { $regex: req.query.search, $options: 'i' } },
      { applicantEmail: { $regex: req.query.search, $options: 'i' } },
    ];

    const [applications, total] = await Promise.all([
      Application.find(filter).populate('job', 'title department').populate('reviewedBy', 'name').sort('-createdAt').skip((page - 1) * limit).limit(limit),
      Application.countDocuments(filter),
    ]);

    res.json({ status: 'success', data: { applications, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } });
  } catch (err) { next(err); }
};

exports.getApplication = async (req, res, next) => {
  try {
    const app = await Application.findById(req.params.id).populate('job', 'title department location').populate('reviewedBy', 'name');
    if (!app) return next(new AppError('Application not found', 404));
    res.json({ status: 'success', data: { application: app } });
  } catch (err) { next(err); }
};

exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file?.buffer || req.file.buffer.subarray(0, 5).toString() !== '%PDF-') {
      return next(new AppError('Please upload a valid PDF resume', 400));
    }
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return next(new AppError('Resume uploads are temporarily unavailable. Please try again later.', 503));
    }
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'jobs/resumes', resource_type: 'raw', public_id: `${randomUUID()}.pdf` }, (error, result) => error ? reject(error) : resolve(result));
      stream.end(req.file.buffer);
    });
    res.status(200).json({ status: 'success', data: { url: uploaded.secure_url } });
  } catch (err) { next(err); }
};

/** GET /jobs/applications/mine — list applications for the authenticated user. */
exports.listMyApplications = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) return next(new AppError('Not authenticated', 401));

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const filter = { applicant: userId };
    if (req.query.status) filter.status = req.query.status;

    const [applications, total] = await Promise.all([
      Application.find(filter).populate('job', 'title department location').sort('-createdAt').skip((page - 1) * limit).limit(limit),
      Application.countDocuments(filter),
    ]);

    res.json({ status: 'success', data: { applications, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } });
  } catch (err) { next(err); }
};

exports.submitApplication = async (req, res, next) => {
  let application, job, notifications = [], replay = false;
  try {
    if (!/^[a-f0-9]{24}$/i.test(req.params.jobId)) throw new AppError('Invalid job ID', 400);
    const parsed = applicationSchema.safeParse(req.body);
    if (!parsed.success) throw new AppError(parsed.error.errors.map(error => `${error.path.join('.')}: ${error.message}`).join(', '), 400);
    const { _requestId, ...payload } = parsed.data;
    const hash = fingerprint({ jobId: req.params.jobId, ...parsed.data });
    await Application.init();
    try {
      await Application.db.transaction(async session => {
        notifications = [];
        if (_requestId) {
          application = checkReplay(await Application.findOne({ requestId: _requestId }).session(session), hash);
          if (application) { replay = true; return; }
        }
        job = await Job.findById(req.params.jobId).session(session);
        if (!job || job.status !== 'active' || (job.applicationDeadline && job.applicationDeadline < new Date())) {
          throw new AppError('Job not found or not accepting applications', 404);
        }
        if (await Application.findOne({ job: job._id, applicantEmail: payload.applicantEmail }).session(session)) {
          throw new AppError('You have already applied for this position with this email address.', 409);
        }
        [application] = await Application.create([{
          ...payload, status: 'new', job: job._id, ipAddress: req.ip,
          requestId: _requestId, requestHash: hash,
        }], { session });
        // Updating the job in the same transaction serializes competing applications.
        await Job.findByIdAndUpdate(job._id, { $inc: { applicationCount: 1 } }, { session });
        notifications = await notifyStaff(['super_admin', 'admin', 'hr'], {
          title: 'New job application', message: `${payload.applicantName} applied for ${job.title}`,
          type: 'job', link: '/dashboard/hr/recruitment/applications',
          metadata: { applicationId: application._id, jobId: job._id },
        }, session);
      });
    } catch (error) {
      if (error.code !== 11000 || !_requestId) throw error;
      application = checkReplay(await Application.findOne({ requestId: _requestId }), hash);
      if (!application) throw error;
      replay = true;
    }
    let emailDelivery = 'not_repeated';
    if (!replay) {
      try { emitNotifications(req, notifications); } catch {}
      emailDelivery = await sendReceipt(payload.applicantEmail, 'Your Nowazone application was received',
        `Hi ${payload.applicantName},\n\nWe received your application for ${job.title}. Reference: ${application._id}. Our team will review it.\n\nNowazone`);
    }
    res.status(replay ? 200 : 201).json({ status: 'success', data: { id: application._id, emailDelivery, application: { _id: application._id, applicantName: application.applicantName, applicantEmail: application.applicantEmail, status: application.status } } });
  } catch (err) { next(err); }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const existing = await Application.findById(req.params.id);
    if (!existing) return next(new AppError('Application not found', 404));
    if (existing.status === 'hired') {
      return next(new AppError('Hired applications cannot be modified', 400));
    }

    const { status, notes, rating, interviewDate, reviewedBy } = req.body;
    const newStatus = status || existing.status;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: newStatus, notes, rating, interviewDate, reviewedBy: req.user._id },
      { new: true, runValidators: true }
    ).populate('job', 'title department location');
    if (!application) return next(new AppError('Application not found', 404));

    // When moved to hired: send welcome email, reject others & close job (only when all positions filled)
    let hiring = null;
    if (newStatus === 'hired' && existing.status !== 'hired') {
      try {
        hiring = await onHired(application._id);
      } catch (err) {
        console.error('[Application] onHired:', err.message);
      }
    }

    res.json({ status: 'success', data: { application, hiring } });
  } catch (err) { next(err); }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return next(new AppError('Application not found', 404));
    if (app.status === 'hired') {
      return next(new AppError('Hired applications cannot be deleted', 400));
    }
    await app.deleteOne();
    res.json({ status: 'success', message: 'Application deleted' });
  } catch (err) { next(err); }
};
