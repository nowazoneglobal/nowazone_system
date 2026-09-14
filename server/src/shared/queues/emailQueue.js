const { Queue } = require('bullmq');
const { createBullConnection, isRedisEnabled } = require('./connection');
const { processEmailJob } = require('./workers/emailWorker');

const EMAIL_QUEUE_NAME = 'email';

let emailQueue = null;

if (isRedisEnabled()) {
  try {
    const connection = createBullConnection();
    if (connection) {
      emailQueue = new Queue(EMAIL_QUEUE_NAME, {
        connection,
        defaultJobOptions: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
          removeOnComplete: { count: 500 },
        },
      });
    }
  } catch (err) {
    console.warn('[EmailQueue] Failed to initialize BullMQ queue, falling back to direct mode:', err.message);
    emailQueue = null;
  }
}

/**
 * Add an email job to the queue, or send directly in-process if Redis is disabled.
 * @param {string} type - '2fa' | 'password_reset' | 'application_status' | 'welcome' | 'newsletter'
 * @param {object} payload - Data for the email template
 */
async function addEmailJob(type, payload) {
  if (emailQueue) {
    await emailQueue.add(type, { type, ...payload }, { jobId: undefined });
  } else {
    // Redis is disabled: dispatch directly in background without blocking the request
    setImmediate(async () => {
      try {
        await processEmailJob({ data: { type, ...payload } });
      } catch (err) {
        console.error(`[EmailQueue Fallback] Failed to deliver ${type} email:`, err.message);
      }
    });
  }
}

module.exports = { emailQueue, addEmailJob };
