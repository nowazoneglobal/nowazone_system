import { apiRequest, ApiResponse } from './client';

export interface AssessmentPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  platform?: string;
  spend?: string;
  model?: string;
  message?: string;
  page?: string;
  listEstimate?: number;
  optimizedEstimate?: number;
  resources?: {
    vms: number;
    databases: number;
    storage: number;
    network: number;
    monitoring: number;
  };
}

export interface ContactPayload {
  name?: string;
  fullName?: string;
  email?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  page?: string;
  partnerType?: string;
  partnerFocus?: string;
  serviceInterest?: string;
}

export interface AppointmentPayload {
  name?: string;
  fullName?: string;
  email?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  message?: string;
  page?: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // HH:MM
  serviceType?: string;
  timezone?: string;
  topic?: string;
}

export interface SubscriberPayload {
  email: string;
  name?: string;
  country?: string;
  tags?: string[];
}

export interface JobApplicationPayload {
  applicantName?: string;
  name?: string;
  fullName?: string;
  applicantEmail?: string;
  email?: string;
  applicantPhone?: string;
  phone?: string;
  jobId?: string;
  jobTitle?: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  coverLetter?: string;
  coverNote?: string;
  skills?: string[];
  experience?: string;
  currentCompany?: string;
  expectedSalary?: number;
  source?: string;
}

export async function submitAssessment(data: AssessmentPayload): Promise<ApiResponse> {
  return apiRequest('/api/forms/assessment', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      page: data.page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
    }),
  });
}

export async function submitContact(data: ContactPayload): Promise<ApiResponse> {
  return apiRequest('/api/forms/contact', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      page: data.page || (typeof window !== 'undefined' ? window.location.pathname : '/contact-us'),
    }),
  });
}

export async function submitAppointment(data: AppointmentPayload): Promise<ApiResponse> {
  return apiRequest('/api/forms/appointment', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function subscribeNewsletter(data: SubscriberPayload): Promise<ApiResponse> {
  return apiRequest('/api/subscribers/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function submitJobApplication(data: JobApplicationPayload): Promise<ApiResponse> {
  // Server route is POST /api/jobs/:jobId/apply — pass jobId in the URL
  const jobId = data.jobId || 'general';
  return apiRequest(`/api/jobs/${encodeURIComponent(jobId)}/apply`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface FormSubmissionItem {
  _id: string;
  type: 'contact' | 'assessment' | 'appointment' | 'download';
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  subject?: string;
  message?: string;
  page?: string;
  data?: Record<string, any>;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  createdAt: string;
}

export async function getMySubmissions(params?: { page?: number; limit?: number; type?: string }): Promise<ApiResponse<{ submissions: FormSubmissionItem[]; pagination: any }>> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());
  if (params?.type) query.set('type', params.type);
  const qStr = query.toString() ? `?${query.toString()}` : '';
  return apiRequest(`/api/forms/mine${qStr}`);
}

