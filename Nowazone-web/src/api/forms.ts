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
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  resumeUrl?: string;
  coverLetter?: string;
  source?: 'direct' | 'linkedin' | 'indeed' | 'naukri' | 'referral' | 'other';
}

export interface GeneralProfilePayload {
  applicantName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  notes?: string;
}

/** Upload a PDF resume — POST /api/jobs/upload-resume (multipart, field: resume). */
export async function uploadResume(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append('resume', file);
  return apiRequest('/api/jobs/upload-resume', {
    method: 'POST',
    body: formData,
  });
}

export async function submitJobApplication(jobId: string, data: JobApplicationPayload): Promise<ApiResponse> {
  // Server route is POST /api/jobs/:jobId/apply — jobId goes in the URL
  return apiRequest(`/api/jobs/${encodeURIComponent(jobId)}/apply`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/** General application (no specific job) — POST /api/jobs/public/submit-profile */
export async function submitGeneralProfile(data: GeneralProfilePayload): Promise<ApiResponse> {
  return apiRequest('/api/jobs/public/submit-profile', {
    method: 'POST',
    body: JSON.stringify(data),
  });
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

