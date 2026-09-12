const { z } = require('zod');

const text = (max = 200) => z.string().trim().max(max);
const email = text(254).email().toLowerCase();
const phone = text(40).regex(/^[\d\s+()-]*$/, 'Please enter a valid phone number').refine(value => !value || (value.replace(/\D/g, '').length >= 7 && value.replace(/\D/g, '').length <= 15), 'Phone must contain 7–15 digits').optional();
const requestId = z.string().uuid().optional();
const common = z.object({
  name: text().min(2), email, phone, company: text().optional(),
  message: text(5000).optional(), subject: text().optional(),
  page: text(400).startsWith('/').optional(), _requestId: requestId,
});

const contact = common.extend({ partnerType: text().optional(), partnerFocus: text().optional() });
const assessment = common.extend({
  model: text().optional(), spend: text().optional(), platform: text().optional(),
  jobTitle: text().optional(), businessSize: text().optional(), industry: text().optional(),
  aiGoals: z.union([text(5000), z.array(text()).max(30)]).optional(),
  listEstimate: z.coerce.number().finite().min(0).max(1e10).optional(),
  optimizedEstimate: z.coerce.number().finite().min(0).max(1e10).optional(),
  resources: z.object({ vms: z.number().int().min(0).max(1000), databases: z.number().int().min(0).max(1000), storage: z.number().int().min(0).max(1000), network: z.number().int().min(0).max(1000), monitoring: z.number().int().min(0).max(1000) }).optional(),
});
const appointment = common.extend({
  preferredDate: text(10).regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, 'Please enter a valid calendar date'),
  preferredTime: text(5).regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  serviceType: text().optional(),
});
const download = common.extend({ resourceName: text().min(1) });
const application = z.object({
  applicantName: text().min(2), applicantEmail: email, applicantPhone: phone,
  resumeUrl: z.string().url().max(2000).refine(value => value.startsWith('https://'), 'Resume URL must use HTTPS').optional(),
  coverLetter: text(10000).optional(), skills: z.array(text()).max(50).optional(),
  experience: text(5000).optional(), currentCompany: text().optional(),
  expectedSalary: z.number().finite().min(0).optional(),
  source: z.enum(['direct', 'linkedin', 'indeed', 'naukri', 'referral', 'other']).optional(),
  _requestId: requestId,
}).strict(); // HR-owned fields must never be accepted from a public applicant.
const subscriber = z.object({ email, name: text().optional(), country: text().optional(), tags: z.array(text(50)).max(20).optional() });

module.exports = { contact, assessment, appointment, download, application, subscriber };
