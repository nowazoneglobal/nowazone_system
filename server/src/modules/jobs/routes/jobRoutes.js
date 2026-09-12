const express = require('express');
const multer = require('multer');
const jobCtrl = require('../controllers/jobController');
const appCtrl = require('../controllers/applicationController');
const { protect, restrictTo } = require('../../../shared/middleware/auth');
const { AppError } = require('../../../shared/middleware/errorHandler');
const { createRateLimiter } = require('../../../shared/middleware/rateLimiter');

const router = express.Router();

const HR_ROLES = ['admin', 'super_admin', 'hr'];

// Public: view active jobs + get single job for apply page
router.get('/public', jobCtrl.listPublicJobs);
router.get('/public/:id', jobCtrl.getPublicJob);

// Public: upload resume for job application or candidate profile (PDF, max 10MB)
const publicLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 10 });
const resumeUpload = multer({
  storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(file.mimetype === 'application/pdf' && /\.pdf$/i.test(file.originalname) ? null : new AppError('Please upload a PDF resume', 400), true),
});
router.post('/upload-resume', publicLimiter, (req, res, next) => {
  resumeUpload.single('resume')(req, res, error => next(error ? new AppError(error.code === 'LIMIT_FILE_SIZE' ? 'Resume must be no larger than 10 MB' : error.message, 400) : undefined));
}, appCtrl.uploadResume);

// Public: submit job application (no login required)
router.post('/:jobId/apply', publicLimiter, appCtrl.submitApplication);

// Public: submit general candidate profile
router.post('/public/submit-profile', jobCtrl.submitProfile);

// Protected
router.use(protect);

// Client: my job applications
router.get('/applications/mine', appCtrl.listMyApplications);

router.post('/ai-refine', restrictTo(...HR_ROLES), jobCtrl.aiRefineDescription);

router.get('/stats', restrictTo(...HR_ROLES), jobCtrl.getJobStats);
router.get('/', restrictTo(...HR_ROLES), jobCtrl.listJobs);
router.post('/', restrictTo(...HR_ROLES), jobCtrl.createJob);
router.get('/:id', restrictTo(...HR_ROLES), jobCtrl.getJob);
router.patch('/:id', restrictTo(...HR_ROLES), jobCtrl.updateJob);
router.delete('/:id', restrictTo(...HR_ROLES), jobCtrl.deleteJob);

// Applications under jobs
router.get('/:jobId/applications', restrictTo(...HR_ROLES), appCtrl.listApplications);

module.exports = router;
