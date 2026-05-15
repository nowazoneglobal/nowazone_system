const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../../../shared/config/cloudinary');
const jobCtrl = require('../controllers/jobController');
const appCtrl = require('../controllers/applicationController');
const { protect, restrictTo } = require('../../../shared/middleware/auth');

const router = express.Router();

const HR_ROLES = ['admin', 'super_admin', 'hr'];

// Public: view active jobs + get single job for apply page
router.get('/public', jobCtrl.listJobs);
router.get('/public/:id', jobCtrl.getPublicJob);

// Public: upload resume for job application or candidate profile (PDF, max 10MB)
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'jobs/resumes',
    resource_type: 'raw',
    allowed_formats: ['pdf'],
  }),
});
const resumeUpload = multer({ storage: resumeStorage, limits: { fileSize: 10 * 1024 * 1024 } });
router.post('/upload-resume', resumeUpload.single('resume'), appCtrl.uploadResume);

// Public: submit job application (no login required)
router.post('/:jobId/apply', appCtrl.submitApplication);

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
