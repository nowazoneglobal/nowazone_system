const FormSubmission = require('../models/FormSubmission');
const leadService = require('../../crm/services/leadService');
const schemas = require('../../../shared/schemas/publicSubmissionSchemas');
const { validate } = require('../../../shared/middleware/validation');
const { fingerprint, checkReplay, notifyStaff, emitNotifications, sendReceipt } = require('../../../shared/services/publicSubmissionService');
const CalendarEvent = require('../../calendar/models/CalendarEvent');
const GoogleCalendarConnection = require('../../calendar/models/GoogleCalendarConnection');
const { AppError } = require('../../../shared/middleware/errorHandler');
const rateLimit = require('express-rate-limit');
const emailService = require('../../../shared/services/emailService');
const { invalidateDashboardCache } = require('../../../shared/services/dashboardCache');

// ─── In-memory rate limiters for public form endpoints ──────────────────────

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { status: 'fail', message: 'Too many submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { status: 'fail', message: 'Too many contact submissions. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Detect whether MongoDB supports multi-document transactions.
 * Standalone mongod instances do not support them; replica sets do.
 * We cache the result after the first check to avoid repeated server-info calls.
 */
let _transactionsSupported = null;
async function supportsTransactions() {
  if (_transactionsSupported !== null) return _transactionsSupported;
  try {
    if (typeof FormSubmission.db?.transaction === 'function' && !FormSubmission.db?.db) {
      _transactionsSupported = true;
      return true;
    }
    const admin = FormSubmission.db.db.admin();
    const info = await admin.serverStatus();
    // A replica set member reports repl.setName; mongos reports sharding info.
    _transactionsSupported = Boolean(info.repl?.setName || info.sharding);
  } catch {
    _transactionsSupported = Boolean(typeof FormSubmission.db?.transaction === 'function');
  }
  return _transactionsSupported;
}

/**
 * Core form-save logic, decoupled from the transaction wrapper.
 * session is null when running against a standalone MongoDB.
 */
async function saveFormData(type, data, hash, req, session) {
  const notifications = [];

  if (data._requestId) {
    const existing = checkReplay(
      await FormSubmission.findOne({ requestId: data._requestId }).session(session),
      hash,
    );
    if (existing) return { submission: existing, lead: null, notifications, replay: true };
  }

  const { name, email, phone, company, message, subject, page, _requestId, ...formData } = data;

  const [submission] = await FormSubmission.create([{
    type, name, email, phone: phone || undefined, company, message, subject, page,
    formData, requestId: _requestId, requestHash: hash,
    ipAddress: req.ip, userAgent: (req.headers['user-agent'] || '').slice(0, 1000),
  }], session ? { session } : {});

  const lead = await leadService.createLead({
    name, email, phone: phone || undefined, company, source: 'website',
    metadata: { formType: type, formId: submission._id, page },
  }, { session, reuseExisting: true });

  submission.leadId = lead._id;
  await submission.save(session ? { session } : {});

  const staffNotifications = await notifyStaff(
    ['super_admin', 'admin', 'sales'],
    {
      title: subject || `New ${type} submission`,
      message: `${name} submitted a ${type} form`,
      type: 'lead', link: '/dashboard/form-submissions',
      metadata: { formId: submission._id, leadId: lead._id },
    },
    session,
  );
  notifications.push(...staffNotifications);

  return { submission, lead, notifications, replay: false };
}

function submitForm(type, limiter) {
  return [limiter, validate(schemas[type]), async (req, res, next) => {
    const data = req.validated;
    const hash = fingerprint({ type, ...data });
    let submission, lead, notifications = [], replay = false;

    try {
      await FormSubmission.init(); // Ensure the unique retry-key index is ready.

      const useTransaction = await supportsTransactions();

      if (useTransaction) {
        // Atlas / replica set path: full ACID transaction
        await FormSubmission.db.transaction(async session => {
          notifications = [];
          const result = await saveFormData(type, data, hash, req, session);
          submission = result.submission;
          lead = result.lead;
          notifications.push(...result.notifications);
          replay = result.replay;
        });
      } else {
        // Standalone MongoDB path: no transaction, same operations
        const result = await saveFormData(type, data, hash, req, null);
        submission = result.submission;
        lead = result.lead;
        notifications = result.notifications;
        replay = result.replay;
      }
    } catch (error) {
      // A concurrent retry may have committed the same unique request ID.
      if (error.code === 11000 && data._requestId) {
        try {
          submission = checkReplay(await FormSubmission.findOne({ requestId: data._requestId }), hash);
          if (!submission) return next(error);
          replay = true;
        } catch (replayError) { return next(replayError); }
      } else { return next(error); }
    }

    let emailDelivery;
    if (!replay) {
      // Optional delivery must not turn a committed submission into a failure.
      try { emitNotifications(req, notifications); } catch {}
      invalidateDashboardCache().catch(() => {});
      if (lead) leadService.syncLead(lead).catch(() => {});
      if (type === 'appointment') createAppointmentEventAndNotify(submission, req).catch(() => {});
      const estimate = data.resources
        ? `\nYour indicative monthly estimate: $${data.listEstimate}; governed estimate: $${data.optimizedEstimate}.\nResources: ${JSON.stringify(data.resources)}\nThese estimates are indicative, not a quote.\n`
        : '';
      emailDelivery = await sendReceipt(data.email, 'Your Nowazone request was received',
        `Hi ${data.name},\n\nWe received your ${type} request. Reference: ${submission._id}.\n${estimate}\nOur team will follow up.\n\nNowazone`);
    }

    res.status(replay ? 200 : 201).json({
      status: 'success', message: 'Request received',
      data: { id: submission._id, ...(emailDelivery ? { emailDelivery } : {}) },
    });
  }];
}

/**
 * Create a CalendarEvent (and Google Meet link when possible) for an appointment
 * and send a confirmation email to the requester.
 *
 * Uses APPOINTMENT_OWNER_USER_ID and APPOINTMENT_CALENDAR_ID env vars to decide
 * which internal user/calendar should own the event.
 */
async function createAppointmentEventAndNotify(submission, req) {
  try {
    const ownerId = process.env.APPOINTMENT_OWNER_USER_ID;
    if (!ownerId) return;

    const { preferredDate, preferredTime, serviceType } = submission.formData || {};
    if (!preferredDate || !preferredTime) return;

    const start = new Date(`${preferredDate}T${preferredTime}`);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // default 30 minutes

    const title = `Appointment – ${submission.name}`;
    const description = submission.message || '';
    const location = '';

    // Create local calendar event
    const event = await CalendarEvent.create({
      title,
      description,
      startAt: start,
      endAt: end,
      isAllDay: false,
      location,
      visibility: 'team',
      participants: [],
      createdBy: ownerId,
      source: 'manual',
    });

    let meetingUrl = '';

    // Try to create a Google Calendar event with Meet link if Google is connected
    const connection = await GoogleCalendarConnection.findOne({ user: ownerId }).select('+accessToken +refreshToken');
    if (connection && process.env.GOOGLE_OAUTH_CLIENT_ID && process.env.GOOGLE_OAUTH_CLIENT_SECRET && process.env.GOOGLE_OAUTH_REDIRECT_URI) {
      try {
        const calendarId = process.env.APPOINTMENT_CALENDAR_ID || 'primary';
        const endpointBase = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;
        const endpoint = `${endpointBase}?conferenceDataVersion=1`;

        const payload = {
          summary: title,
          description,
          location,
          start: { dateTime: start.toISOString() },
          end:   { dateTime: end.toISOString() },
          conferenceData: {
            createRequest: {
              requestId: `appt-${event._id}-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        };

        const accessToken = connection.accessToken;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const created = await response.json();
          event.googleEventId = created.id || event.googleEventId;
          event.source = 'google';
          const meetLink =
            created.hangoutLink ||
            created.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === 'video')?.uri ||
            '';
          if (meetLink) {
            event.meetingUrl = meetLink;
            meetingUrl = meetLink;
          }
          await event.save({ validateBeforeSave: false });
        }
      } catch {
        // Ignore Google errors for now; appointment still exists locally
      }
    }

    // Send confirmation email (fire-and-forget)
    if (submission.email) {
      const dateString = start.toLocaleString();
      const serviceText = serviceType ? `Service: ${serviceType}\n` : '';
      const linkText = meetingUrl ? `Join link: ${meetingUrl}\n` : '';
      const text = `Hi ${submission.name},\n\nYour appointment request has been received.\n\n${serviceText}Date & time: ${dateString}\n${linkText}\nIf you need to reschedule, please reply to this email.\n\n— NowAZone`;
      emailService.sendMail({ to: submission.email, subject: 'Your appointment is scheduled', text }).catch(() => {});
    }
  } catch {
    // Do not block form submission on calendar/email issues
  }
}

// ─── Public form submission endpoints ───────────────────────────────────────────

exports.submitContact = submitForm('contact', contactLimiter);
exports.submitAssessment = submitForm('assessment', formLimiter);
exports.submitAppointment = submitForm('appointment', formLimiter);
exports.submitDownload = submitForm('download', formLimiter);

// ─── Client: my form submissions ────────────────────────────────────────────────

exports.getMySubmissions = async (req, res, next) => {
  try {
    const email = (req.user && req.user.email) ? req.user.email.toLowerCase() : null;
    if (!email) return next(new AppError('Not authenticated', 401));

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const filter = { email };
    if (req.query.type) filter.type = req.query.type;

    const [submissions, total] = await Promise.all([
      FormSubmission.find(filter).select('-ipAddress -userAgent').sort('-createdAt').skip((page - 1) * limit).limit(limit),
      FormSubmission.countDocuments(filter),
    ]);

    res.json({ status: 'success', data: { submissions, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } });
  } catch (err) { next(err); }
};

// ─── Admin endpoints ────────────────────────────────────────────────────────────

exports.getSubmissions = async (req, res, next) => {
  try {
    const page  = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const filter = {};

    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) filter.createdAt.$gte = new Date(req.query.startDate);
      if (req.query.endDate) filter.createdAt.$lte = new Date(req.query.endDate);
    }
    if (req.query.search) {
      filter.$or = [
        { name:  { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { company: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const [submissions, total] = await Promise.all([
      FormSubmission.find(filter)
        .populate('leadId', 'name email status')
        .populate('respondedBy', 'name email')
        .sort('-createdAt')
        .skip((page - 1) * limit)
        .limit(limit),
      FormSubmission.countDocuments(filter),
    ]);

    res.json({
      status: 'success',
      data: {
        submissions,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) { next(err); }
};

exports.getSubmission = async (req, res, next) => {
  try {
    const submission = await FormSubmission.findById(req.params.id)
      .populate('leadId', 'name email status score')
      .populate('respondedBy', 'name email');

    if (!submission) {
      return next(new AppError('Form submission not found', 404));
    }

    res.json({ status: 'success', data: { submission } });
  } catch (err) { next(err); }
};

exports.updateSubmissionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !['new', 'read', 'responded', 'archived'].includes(status)) {
      return next(new AppError('Valid status is required (new, read, responded, archived)', 400));
    }

    const update = { status };
    if (status === 'responded') {
      update.respondedBy = req.user._id;
      update.respondedAt = new Date();
    }

    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true },
    );

    if (!submission) {
      return next(new AppError('Form submission not found', 404));
    }

    res.json({
      status: 'success',
      message: 'Submission status updated',
      data: { submission },
    });
  } catch (err) { next(err); }
};

exports.getStats = async (req, res, next) => {
  try {
    const [byType, byStatus] = await Promise.all([
      FormSubmission.aggregate([
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      FormSubmission.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    const total = byType.reduce((sum, t) => sum + t.count, 0);

    res.json({
      status: 'success',
      data: {
        total,
        byType: byType.map(t => ({ type: t._id, count: t.count })),
        byStatus: byStatus.map(s => ({ status: s._id, count: s.count })),
      },
    });
  } catch (err) { next(err); }
};
