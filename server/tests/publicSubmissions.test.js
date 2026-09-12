// HTTP/contract regression checks. Storage is isolated in memory; no real DB/mail.
const request = require('supertest');
const express = require('express');
const { randomUUID } = require('crypto');

let mockState;
let mockFailLead = false;
const mockJobId = '123456789012345678901234';
function mockMatches(record, filter) {
  return Object.entries(filter).every(([key, value]) => record[key]?.toString() === value?.toString());
}
function mockQuery(value) {
  return { session() { return this; }, select() { return this; }, populate() { return this; }, sort() { return this; }, skip() { return this; }, limit() { return this; }, then(resolve, reject) { return Promise.resolve(value).then(resolve, reject); } };
}
function mockCreate(collection, modelPath, values) {
  return values.map(value => {
    const Model = jest.requireActual(modelPath);
    const document = new Model(value);
    const error = document.validateSync();
    if (error) throw error;
    const data = document.toObject();
    const result = { ...data, _id: String(data._id), save: async () => result, populate: async () => result, toObject: () => data };
    mockState[collection].push(result);
    return result;
  });
}
async function mockTransaction(callback) {
  const before = JSON.parse(JSON.stringify(mockState));
  try { return await callback({ testSession: true }); }
  catch (error) { mockState = before; throw error; }
}

jest.mock('../src/modules/forms/models/FormSubmission', () => ({
  init: async () => {},
  db: { transaction: mockTransaction },
  create: async values => mockCreate('forms', '../src/modules/forms/models/FormSubmission', values),
  findOne: filter => mockQuery(mockState.forms.find(record => mockMatches(record, filter)) || null),
  find: filter => mockQuery(mockState.forms.filter(record => mockMatches(record, filter))),
  countDocuments: async filter => mockState.forms.filter(record => mockMatches(record, filter)).length,
}));
jest.mock('../src/modules/crm/models/Lead', () => ({
  findOne: filter => mockQuery(mockState.leads.find(record => mockMatches(record, filter)) || null),
  create: async values => { if (mockFailLead) throw new Error('Injected storage failure'); return mockCreate('leads', '../src/modules/crm/models/Lead', values); },
}));
jest.mock('../src/modules/auth/models/User', () => ({ find: () => mockQuery([{ _id: '123456789012345678901235' }]) }));
jest.mock('../src/modules/subscribers/models/Subscriber', () => ({
  findOne: filter => mockQuery(mockState.subscribers.find(record => mockMatches(record, filter)) || null),
  create: async value => mockCreate('subscribers', '../src/modules/subscribers/models/Subscriber', [value])[0],
  find: filter => mockQuery(mockState.subscribers.filter(record => mockMatches(record, filter))),
  countDocuments: async filter => mockState.subscribers.filter(record => mockMatches(record, filter)).length,
}));
jest.mock('../src/modules/notifications/models/Notification', () => ({
  insertMany: async values => mockCreate('notifications', '../src/modules/notifications/models/Notification', values),
}));
jest.mock('../src/modules/jobs/models/Application', () => ({
  init: async () => {},
  db: { transaction: mockTransaction },
  findOne: filter => mockQuery(mockState.applications.find(record => mockMatches(record, filter)) || null),
  create: async values => mockCreate('applications', '../src/modules/jobs/models/Application', values),
  find: filter => mockQuery(mockState.applications.filter(record => mockMatches(record, filter))),
  countDocuments: async filter => mockState.applications.filter(record => mockMatches(record, filter)).length,
}));
jest.mock('../src/modules/jobs/models/Job', () => ({
  findById: id => mockQuery(id === mockJobId ? mockState.job : null),
  findByIdAndUpdate: async () => { mockState.job.applicationCount++; },
}));
jest.mock('../src/shared/services/emailService', () => ({ sendMail: jest.fn(async () => ({ sent: false })) }));
jest.mock('../src/shared/config/cloudinary', () => ({ cloudinary: { uploader: { upload_stream: (_options, callback) => ({ end: () => callback(null, { secure_url: 'https://example.test/fixture.pdf' }) }) } } }));
jest.mock('../src/shared/services/dashboardCache', () => ({ invalidateDashboardCache: async () => {} }));
jest.mock('../src/modules/crm/services/externalCrmService', () => ({ syncLead: async () => null }));
jest.mock('../src/shared/services/jobHiringService', () => ({ onHired: jest.fn() }));
jest.mock('../src/shared/middleware/auth', () => ({ protect: (_req, _res, next) => next(), authorize: () => (_req, _res, next) => next() }));

const forms = require('../src/modules/forms/controllers/formController');
const applications = require('../src/modules/jobs/controllers/applicationController');
const emailService = require('../src/shared/services/emailService');
const schemas = require('../src/shared/schemas/publicSubmissionSchemas');
const subscribers = require('../src/modules/subscribers/controllers/subscriberController');
const { validate } = require('../src/shared/middleware/validation');
const { errorHandler } = require('../src/shared/middleware/errorHandler');
const app = express();
app.use(express.json());
// Exclude rate limiters from repeated contract fixtures; production routes retain them.
for (const type of ['Contact', 'Assessment', 'Appointment', 'Download']) app.post(`/api/forms/${type.toLowerCase()}`, forms[`submit${type}`].slice(1));
app.get('/api/forms/submissions', forms.getSubmissions);
app.post('/api/jobs/:jobId/apply', applications.submitApplication);
app.post('/api/jobs/upload-resume', require('multer')({ storage: require('multer').memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }).single('resume'), applications.uploadResume);
app.get('/api/applications', applications.listApplications);
app.post('/api/subscribers/subscribe', validate(schemas.subscriber), subscribers.subscribe);
app.get('/api/subscribers', subscribers.listSubscribers);
app.use(errorHandler);

const contact = () => ({ name: 'Fixture Person', email: 'FIXTURE@example.test', company: 'Fixture Company', subject: 'Partner Program', partnerType: 'Referral Partner', message: 'Fixture message', page: '/partners', _requestId: randomUUID() });
const application = () => ({ applicantName: 'Fixture Person', applicantEmail: 'fixture@example.test', applicantPhone: '+252 1234567', coverLetter: 'Portfolio: https://example.test/portfolio', resumeUrl: 'https://example.test/resume.pdf', _requestId: randomUUID() });

beforeEach(() => {
  mockState = { forms: [], leads: [], applications: [], notifications: [], subscribers: [], job: { _id: mockJobId, title: 'Fixture Engineer', status: 'active', applicationCount: 0 } };
  mockFailLead = false;
  delete process.env.APPOINTMENT_OWNER_USER_ID;
  emailService.sendMail.mockClear();
});

test('contact/partner is saved with subject and details, linked lead, durable notification and read-back', async () => {
  const response = await request(app).post('/api/forms/contact').send(contact()).expect(201);
  expect(response.body.data.id).toBeTruthy();
  expect(mockState.forms[0]).toMatchObject({ subject: 'Partner Program', email: 'fixture@example.test', formData: { partnerType: 'Referral Partner' } });
  expect(String(mockState.forms[0].leadId)).toBe(mockState.leads[0]._id);
  expect(mockState.leads[0].phone).toBeUndefined();
  expect(mockState.notifications).toHaveLength(1);
  const read = await request(app).get('/api/forms/submissions').expect(200);
  expect(read.body.data.submissions[0].subject).toBe('Partner Program');
});

test('assessment preserves phone, source, message and nested estimator resources', async () => {
  await request(app).post('/api/forms/assessment').send({ ...contact(), phone: '+252 1234567', page: '/estimator', model: 'Fixed Assessment', listEstimate: '100.20', optimizedEstimate: '76.15', resources: { vms: 2, databases: 1, storage: 1, network: 1, monitoring: 1 } }).expect(201);
  expect(mockState.forms[0].phone).toBe('+252 1234567');
  expect(mockState.leads[0].phone).toBe('+252 1234567');
  expect(mockState.forms[0].formData.resources.vms).toBe(2);
  expect(emailService.sendMail.mock.calls[0][0].text).toContain('100.2');
});

test.each([{ email: 'invalid' }, { phone: 'not-a-number' }, { name: ' ' }])('invalid contact is rejected before persistence: %j', async bad => {
  await request(app).post('/api/forms/contact').send({ ...contact(), ...bad }).expect(400);
  expect(mockState.forms).toHaveLength(0);
  expect(mockState.leads).toHaveLength(0);
});

test('same retry ID saves once; changed payload with same ID is rejected', async () => {
  const data = contact();
  const first = await request(app).post('/api/forms/contact').send(data).expect(201);
  const retry = await request(app).post('/api/forms/contact').send(data).expect(200);
  expect(retry.body.data.id).toBe(first.body.data.id);
  expect(mockState.forms).toHaveLength(1);
  expect(mockState.notifications).toHaveLength(1);
  expect(emailService.sendMail).toHaveBeenCalledTimes(1);
  await request(app).post('/api/forms/contact').send({ ...data, message: 'Changed' }).expect(409);
});

test('lead failure rolls the form back; retry succeeds with the same ID', async () => {
  const data = contact();
  mockFailLead = true;
  const log = jest.spyOn(console, 'error').mockImplementation(() => {});
  await request(app).post('/api/forms/contact').send(data).expect(500);
  log.mockRestore();
  expect(mockState.forms).toHaveLength(0);
  mockFailLead = false;
  await request(app).post('/api/forms/contact').send(data).expect(201);
  expect(mockState.forms).toHaveLength(1);
});

test('a later request from the same email links the existing lead', async () => {
  await request(app).post('/api/forms/contact').send(contact()).expect(201);
  await request(app).post('/api/forms/contact').send(contact()).expect(201);
  expect(mockState.forms).toHaveLength(2);
  expect(mockState.leads).toHaveLength(1);
});

test.each([{ status: 'hired' }, { rating: 5 }, { notes: 'Forged review' }, { reviewedBy: mockJobId }])('public HR fields are rejected: %j', async forged => {
  await request(app).post(`/api/jobs/${mockJobId}/apply`).send({ ...application(), ...forged }).expect(400);
  expect(mockState.applications).toHaveLength(0);
});

test('job application saves complete details once and appears in the staff endpoint', async () => {
  const data = application();
  await request(app).post(`/api/jobs/${mockJobId}/apply`).send(data).expect(201);
  await request(app).post(`/api/jobs/${mockJobId}/apply`).send(data).expect(200);
  expect(mockState.applications).toHaveLength(1);
  expect(mockState.job.applicationCount).toBe(1);
  expect(mockState.applications[0].status).toBe('new');
  const read = await request(app).get('/api/applications').expect(200);
  expect(read.body.data.applications[0].coverLetter).toContain('Portfolio');
  expect(read.body.data.applications[0].resumeUrl).toBe(data.resumeUrl);
  await request(app).post(`/api/jobs/${mockJobId}/apply`).send(application()).expect(409);
});

test('closed jobs cannot accept applications', async () => {
  mockState.job.status = 'closed';
  await request(app).post(`/api/jobs/${mockJobId}/apply`).send(application()).expect(404);
});

test('resume upload rejects a renamed non-PDF and returns the uploaded URL for a PDF', async () => {
  await request(app).post('/api/jobs/upload-resume').attach('resume', Buffer.from('not a PDF'), 'fake.pdf').expect(400);
  const keys = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
  const previous = keys.map(key => process.env[key]);
  keys.forEach(key => { process.env[key] = 'fixture-only'; });
  try {
    const response = await request(app).post('/api/jobs/upload-resume').attach('resume', Buffer.from('%PDF-1.4\nFixture only'), 'fixture.pdf').expect(200);
    expect(response.body.data.url).toBe('https://example.test/fixture.pdf');
  } finally { keys.forEach((key, index) => { if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index]; }); }
});

test('appointment/download validation and newsletter normalization', () => {
  expect(schemas.appointment.safeParse({ ...contact(), preferredDate: '2026-09-15', preferredTime: '14:30' }).success).toBe(true);
  expect(schemas.appointment.safeParse({ ...contact(), preferredDate: '2026-02-30', preferredTime: '14:30' }).success).toBe(false);
  expect(schemas.appointment.safeParse({ ...contact(), preferredTime: '99:99' }).success).toBe(false);
  expect(schemas.download.safeParse({ ...contact(), resourceName: '' }).success).toBe(false);
  expect(schemas.subscriber.parse({ email: ' FIXTURE@EXAMPLE.TEST ' }).email).toBe('fixture@example.test');
});

test('newsletter persists a normalized subscriber and repeated submission does not duplicate it', async () => {
  await request(app).post('/api/subscribers/subscribe').send({ email: 'invalid' }).expect(400);
  await request(app).post('/api/subscribers/subscribe').send({ email: ' FIXTURE@EXAMPLE.TEST ' }).expect(201);
  await request(app).post('/api/subscribers/subscribe').send({ email: 'fixture@example.test' }).expect(200);
  const read = await request(app).get('/api/subscribers').expect(200);
  expect(read.body.data.subscribers).toHaveLength(1);
  expect(read.body.data.subscribers[0]).toMatchObject({ email: 'fixture@example.test', status: 'active' });
});

test.each([
  ['appointment', { preferredDate: '2026-09-15', preferredTime: '14:30', serviceType: 'Assessment' }],
  ['download', { resourceName: 'Fixture paper' }],
])('%s endpoint preserves its details and linked lead', async (type, details) => {
  await request(app).post(`/api/forms/${type}`).send({ ...contact(), ...details }).expect(201);
  expect(mockState.forms[0]).toMatchObject({ type, formData: details });
  expect(String(mockState.forms[0].leadId)).toBe(mockState.leads[0]._id);
});

test('mail failure does not turn a committed request into a save failure', async () => {
  emailService.sendMail.mockRejectedValueOnce(new Error('Fixture SMTP failure'));
  const log = jest.spyOn(console, 'warn').mockImplementation(() => {});
  try {
    const response = await request(app).post('/api/forms/contact').send(contact()).expect(201);
    expect(response.body.data.emailDelivery).toBe('failed');
    expect(mockState.forms).toHaveLength(1);
    expect(mockState.leads).toHaveLength(1);
  } finally { log.mockRestore(); }
});
