import {
  submitAssessment,
  submitContact,
  submitAppointment,
  subscribeNewsletter,
  submitDownload,
  submitJobApplication,
  submitGeneralProfile,
} from '../src/api/forms';

// Test suite executing simulated submissions
async function runTestSuite() {
  console.log('=== Starting Landing Pages Form Submission Test Suite ===\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
      failed++;
    }
  }

  // 1. Mock fetch setup
  let lastRequest: { url: string; method: string; body: any } | null = null;
  let mockStatusCode = 201;
  let mockResponseBody: any = { status: 'success', message: 'Request received', data: { id: 'test-123' } };

  (global as any).fetch = async (url: string, options: any) => {
    lastRequest = {
      url,
      method: options.method || 'GET',
      body: options.body ? JSON.parse(options.body) : null,
    };

    return {
      ok: mockStatusCode >= 200 && mockStatusCode < 300,
      status: mockStatusCode,
      headers: {
        get: (h: string) => (h.toLowerCase() === 'content-type' ? 'application/json' : null),
      },
      json: async () => mockResponseBody,
      text: async () => JSON.stringify(mockResponseBody),
    };
  };

  // ── TEST 1: Assessment Modal / Free Cost X-Ray Payload Normalization ───────────
  mockStatusCode = 201;
  mockResponseBody = { status: 'success', message: 'Request received', data: { id: 'ass-001' } };

  const assRes = await submitAssessment({
    fullName: '  Jane Doe  ',
    workEmail: 'JANE@COMPANY.COM  ',
    company: 'Acme Corp',
    phone: '+1 555-123-4567',
    platform: 'Azure',
    spend: '$50K–$250K',
    model: 'Free Cost X-Ray Assessment',
    page: '/solutions/cloud-architecture',
  });

  assert(assRes.status === 'success', 'submitAssessment returns success on 201 response');
  assert(lastRequest?.body.name === 'Jane Doe', 'submitAssessment normalizes fullName to name');
  assert(lastRequest?.body.email === 'jane@company.com', 'submitAssessment normalizes and lowercases email');
  assert(lastRequest?.body.page === '/solutions/cloud-architecture', 'submitAssessment preserves page route');

  // ── TEST 2: Contact Us / Pricing Form Payload Normalization ────────────────────
  mockStatusCode = 201;
  mockResponseBody = { status: 'success', message: 'Request received', data: { id: 'cnt-001' } };

  const cntRes = await submitContact({
    fullName: '  John Smith  ',
    workEmail: 'JOHN@EXAMPLE.COM ',
    company: 'FinOps Co',
    serviceInterest: 'Pricing Inquiry: Fixed Assessment ($50K–$250K)',
    message: 'Need cloud architecture and FinOps review',
    page: '/pricing-models',
  });

  assert(cntRes.status === 'success', 'submitContact returns success on 201 response');
  assert(lastRequest?.body.name === 'John Smith', 'submitContact normalizes fullName to name');
  assert(lastRequest?.body.email === 'john@example.com', 'submitContact normalizes email');
  assert(lastRequest?.body.subject === 'Pricing Inquiry: Fixed Assessment ($50K–$250K)', 'submitContact maps serviceInterest to subject');

  // ── TEST 3: Partner Program Payload Normalization ──────────────────────────────
  const ptnRes = await submitContact({
    fullName: 'Alice Partner',
    workEmail: 'alice@csp.com',
    company: 'Cloud CSP Inc',
    partnerType: 'Cloud Solution Provider (CSP)',
    partnerFocus: 'White-Label Partner - Multi-Cloud',
    subject: 'Partner Application: Cloud Solution Provider (CSP)',
    message: 'Looking for white-label FinOps capacity',
    page: '/partner-program',
  });

  assert(ptnRes.status === 'success', 'Partner application via submitContact succeeds');
  assert(lastRequest?.body.name === 'Alice Partner', 'Partner application sends normalized name');
  assert(lastRequest?.body.partnerType === 'Cloud Solution Provider (CSP)', 'Partner application sends partnerType');

  // ── TEST 4: Managed Service Appointment 24-Hour Time Normalization ─────────────
  const apptRes = await submitAppointment({
    fullName: 'Bob Manager',
    workEmail: 'bob@enterprise.com',
    company: 'Big Enterprise',
    phone: '+1 800-555-0199',
    preferredDate: '2026-10-15',
    preferredTime: '10:00 AM', // 12-hour format string from UI
    topic: 'Managed Service: L1/L2 Support (Under 25 servers/VMs)',
    page: '/solutions/managed-service',
  });

  assert(apptRes.status === 'success', 'submitAppointment returns success on 201');
  assert(lastRequest?.body.name === 'Bob Manager', 'submitAppointment maps fullName to name');
  assert(lastRequest?.body.email === 'bob@enterprise.com', 'submitAppointment maps workEmail to email');
  assert(lastRequest?.body.preferredTime === '10:00', 'submitAppointment normalizes 12h time to 24h HH:MM format');
  assert(lastRequest?.body.preferredDate === '2026-10-15', 'submitAppointment preserves preferredDate');

  // ── TEST 5: Newsletter Subscription Normalization ──────────────────────────────
  const subRes = await subscribeNewsletter({
    email: ' SUBSCRIBER@DOMAIN.COM ',
    tags: ['finops', 'cloud-cost'],
  });

  assert(subRes.status === 'success', 'subscribeNewsletter returns success');
  assert(lastRequest?.body.email === 'subscriber@domain.com', 'subscribeNewsletter lowercases and trims email');

  // ── TEST 5b: Gated Resource Download Normalization ─────────────────────────────
  mockStatusCode = 201;
  mockResponseBody = { status: 'success', message: 'Request received', data: { id: 'dwn-001' } };

  const dwnRes = await submitDownload({
    fullName: 'Alex Reader',
    workEmail: 'alex@read.com',
    company: 'FinOps Reader Inc',
    resourceName: '2026-FinOps-Guide.pdf',
    page: '/finops',
  });

  assert(dwnRes.status === 'success', 'submitDownload returns success on 201');
  assert(lastRequest?.body.name === 'Alex Reader', 'submitDownload normalizes fullName to name');
  assert(lastRequest?.body.email === 'alex@read.com', 'submitDownload normalizes workEmail to email');
  assert(lastRequest?.body.resourceName === '2026-FinOps-Guide.pdf', 'submitDownload preserves resourceName');

  // ── TEST 6: Simulated Failure - Backend 400 Bad Request (Validation Error) ─────
  mockStatusCode = 400;
  mockResponseBody = {
    status: 'fail',
    message: 'Validation failed: Name is required, Email must be a valid email',
    errors: [{ field: 'name', message: 'Required' }],
  };

  const failRes400 = await submitContact({
    fullName: '',
    workEmail: 'not-an-email',
  });

  assert(failRes400.status === 'error', 'submitContact returns error on 400 Bad Request');
  assert(
    failRes400.message?.includes('Validation failed') === true,
    'submitContact extracts validation error message for UI display'
  );

  // ── TEST 7: Simulated Failure - Server 500 Internal Error ──────────────────────
  mockStatusCode = 500;
  mockResponseBody = {
    status: 'error',
    message: 'Internal server error occurred',
  };

  const failRes500 = await submitAssessment({
    name: 'Jane Doe',
    email: 'jane@example.com',
  });

  assert(failRes500.status === 'error', 'submitAssessment returns error on 500 Internal Server Error');
  assert(failRes500.message === 'Internal server error occurred', 'submitAssessment preserves 500 error message');

  // ── TEST 8: Simulated Network / Connection Offline Failure ─────────────────────
  (global as any).fetch = async () => {
    throw new Error('Failed to fetch (net::ERR_CONNECTION_REFUSED)');
  };

  const netFailRes = await submitAppointment({
    name: 'Offline User',
    email: 'offline@example.com',
    preferredDate: '2026-10-01',
    preferredTime: '14:00',
  });

  assert(netFailRes.status === 'error', 'submitAppointment returns error on network disconnect');
  assert(
    netFailRes.message?.includes('Network error') === true ||
    netFailRes.message?.includes('Failed to fetch') === true,
    'submitAppointment returns helpful offline/network message'
  );

  console.log(`\n=== Test Results: ${passed} Passed, ${failed} Failed ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
