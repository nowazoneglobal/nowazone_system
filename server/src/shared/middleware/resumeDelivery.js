/**
 * Streams a stored resume PDF inline to an authorised caller.
 * Kept separate from resumeStorage so the storage layer stays free of HTTP.
 */

const { AppError } = require('./errorHandler');
const resumeStorage = require('../services/resumeStorage');

const sendStoredResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!resumeStorage.isValidId(id)) return next(new AppError('Resume not found', 404));

    const file = await resumeStorage.statResume(id).catch(() => null);
    if (!file) return next(new AppError('Resume not found', 404));

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': String(file.length),
      'Content-Disposition': 'inline; filename="resume.pdf"',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    });

    const stream = resumeStorage.openResume(id);
    stream.on('error', (error) => {
      console.error('[Resume] stream failure:', error.message);
      if (res.headersSent) res.destroy();
      else next(error);
    });
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendStoredResume };
