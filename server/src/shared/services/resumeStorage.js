/**
 * Resume storage (MongoDB GridFS)
 *
 * Resume PDFs are stored in our own database instead of a third-party CDN.
 * Cloudinary blocks PDF delivery for the whole product environment unless
 * "Allow delivery of PDF and ZIP files" is enabled, which made every stored
 * resume URL return `401 deny or ACL failure`. Keeping the bytes here means
 * delivery is entirely under our control, and files are no longer readable by
 * anyone who happens to have the URL.
 */

const mongoose = require('mongoose');

const BUCKET_NAME = 'resumes';
const OBJECT_ID = /^[a-f0-9]{24}$/i;

let cachedBucket = null;
let cachedDb = null;

function getBucket() {
  const db = mongoose.connection?.db;
  if (!db) {
    throw new Error('Resume storage is unavailable: the database is not connected');
  }
  if (!cachedBucket || cachedDb !== db) {
    cachedBucket = new mongoose.mongo.GridFSBucket(db, { bucketName: BUCKET_NAME });
    cachedDb = db;
  }
  return cachedBucket;
}

/** True when the value looks like a GridFS file id (not a Cloudinary public id). */
const isValidId = (id) => typeof id === 'string' && OBJECT_ID.test(id);

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

/** Store a PDF buffer and return its GridFS id. */
const saveResume = (buffer, metadata = {}) =>
  new Promise((resolve, reject) => {
    const stream = getBucket().openUploadStream(`${new mongoose.Types.ObjectId()}.pdf`, {
      contentType: 'application/pdf',
      metadata,
    });
    stream.on('error', reject);
    stream.on('finish', () => resolve({ id: String(stream.id), size: buffer.length }));
    stream.end(buffer);
  });

/** GridFS file document (null when it does not exist). */
const statResume = async (id) => {
  if (!isValidId(id)) return null;
  const [file] = await getBucket().find({ _id: toObjectId(id) }).limit(1).toArray();
  return file || null;
};

/** Readable stream of the stored PDF. Call statResume first to answer 404s. */
const openResume = (id) => getBucket().openDownloadStream(toObjectId(id));

/** Whole PDF as a buffer (used by the AI parser). */
const readResume = (id) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    const stream = openResume(id);
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });

const deleteResume = async (id) => {
  if (!isValidId(id)) return;
  await getBucket().delete(toObjectId(id)).catch(() => {});
};

/**
 * Extract a stored-file id from a resume URL, so records created before the
 * migration (or submitted as a plain URL) can still be streamed and parsed.
 */
const idFromUrl = (url) => {
  if (typeof url !== 'string') return null;
  const match = url.match(/\/api\/(?:jobs\/resumes|hr\/resumes\/file)\/([a-f0-9]{24})(?:[/?#]|$)/i);
  return match ? match[1] : null;
};

module.exports = {
  BUCKET_NAME,
  isValidId,
  idFromUrl,
  saveResume,
  statResume,
  openResume,
  readResume,
  deleteResume,
};
