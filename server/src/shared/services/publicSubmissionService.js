const { createHash } = require('crypto');
const User = require('../../modules/auth/models/User');
const Notification = require('../../modules/notifications/models/Notification');
const emailService = require('./emailService');
const { AppError } = require('../middleware/errorHandler');

// Hash normalized data, not the client retry key. No contact data goes into logs.
function fingerprint(data) {
  const { _requestId, ...payload } = data;
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

function checkReplay(record, hash) {
  if (record && record.requestHash !== hash) throw new AppError('This request ID was already used for different data', 409);
  return record;
}

async function notifyStaff(roles, details, session) {
  const users = await User.find({ isActive: true, $or: [{ role: { $in: roles } }, { roles: { $in: roles } }] }).select('_id').session(session);
  if (!users.length) return [];
  return Notification.insertMany(users.map(user => ({ ...details, userId: user._id })), { session });
}

function emitNotifications(req, notifications) {
  const io = req.app.get('io');
  for (const notification of notifications) io?.to(`user:${notification.userId}`).emit('notification:new', notification);
}

async function sendReceipt(to, subject, text) {
  try {
    const result = await emailService.sendMail({ to, subject, text });
    return result.sent ? 'sent' : 'unavailable';
  } catch {
    console.warn('[PublicSubmission] Receipt email failed; the saved request remains available in the system.');
    return 'failed';
  }
}

module.exports = { fingerprint, checkReplay, notifyStaff, emitNotifications, sendReceipt };
