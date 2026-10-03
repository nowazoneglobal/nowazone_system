import { apiRequest, ApiResponse } from './client';

export interface AssessmentPayload {
  name?: string;
  fullName?: string;
  email?: string;
  workEmail?: string;
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
  engagementModel?: string;
  spendRange?: string;
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
  preferredTime: string; // HH:MM (24-hour)
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

export interface DownloadPayload {
  name?: string;
  fullName?: string;
  email?: string;
  workEmail?: string;
  phone?: string;
  company?: string;
  resourceName: string;
  page?: string;
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
    body: JSON.stringify({
      applicantName: data.applicantName.trim(),
      applicantEmail: data.applicantEmail.trim().toLowerCase(),
      applicantPhone: data.applicantPhone?.trim() || undefined,
      resumeUrl: data.resumeUrl?.trim() || undefined,
      coverLetter: data.coverLetter?.trim() || undefined,
      source: data.source || 'direct',
    }),
  });
}

/** General application (no specific job) — POST /api/jobs/public/submit-profile */
export async function submitGeneralProfile(data: GeneralProfilePayload): Promise<ApiResponse> {
  return apiRequest('/api/jobs/public/submit-profile', {
    method: 'POST',
    body: JSON.stringify({
      applicantName: data.applicantName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || undefined,
      resumeUrl: data.resumeUrl?.trim() || undefined,
      notes: data.notes?.trim() || undefined,
    }),
  });
}

export async function submitAssessment(data: AssessmentPayload): Promise<ApiResponse> {
  const name = (data.name || data.fullName || '').trim();
  const email = (data.email || data.workEmail || '').trim().toLowerCase();
  const company = data.company?.trim() || undefined;
  const phone = data.phone?.trim() || undefined;
  const jobTitle = data.jobTitle?.trim() || undefined;
  const platform = data.platform?.trim() || undefined;
  const spend = data.spend?.trim() || undefined;
  const model = data.model?.trim() || undefined;
  const message = data.message?.trim() || undefined;
  const page = data.page || (typeof window !== 'undefined' ? window.location.pathname : '/');

  return apiRequest('/api/forms/assessment', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      company,
      phone,
      jobTitle,
      platform,
      spend,
      model,
      message,
      page,
      listEstimate: data.listEstimate,
      optimizedEstimate: data.optimizedEstimate,
      resources: data.resources,
    }),
  });
}

export async function submitContact(data: ContactPayload): Promise<ApiResponse> {
  const name = (data.name || data.fullName || '').trim();
  const email = (data.email || data.workEmail || '').trim().toLowerCase();
  const company = data.company?.trim() || undefined;
  const phone = data.phone?.trim() || undefined;
  const subject = (data.subject || data.serviceInterest || 'Contact Inquiry').trim();
  const message = data.message?.trim() || undefined;
  const page = data.page || (typeof window !== 'undefined' ? window.location.pathname : '/contact-us');

  return apiRequest('/api/forms/contact', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      company,
      phone,
      subject,
      message,
      page,
      partnerType: data.partnerType?.trim() || undefined,
      partnerFocus: data.partnerFocus?.trim() || undefined,
    }),
  });
}

export async function submitAppointment(data: AppointmentPayload): Promise<ApiResponse> {
  const name = (data.name || data.fullName || '').trim();
  const email = (data.email || data.workEmail || '').trim().toLowerCase();
  const company = data.company?.trim() || undefined;
  const phone = data.phone?.trim() || undefined;
  const page = data.page || (typeof window !== 'undefined' ? window.location.pathname : '/solutions/managed-service');
  const serviceType = data.serviceType?.trim() || data.topic?.trim() || undefined;
  const message = data.message?.trim() || (data.topic ? `Topic: ${data.topic}` : undefined);

  // Normalize preferredTime to HH:MM format (24-hour)
  let preferredTime = (data.preferredTime || '').trim();
  const time12Match = preferredTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (time12Match) {
    let hours = parseInt(time12Match[1], 10);
    const mins = time12Match[2];
    const meridiem = time12Match[3].toUpperCase();
    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;
    preferredTime = `${String(hours).padStart(2, '0')}:${mins}`;
  } else if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(preferredTime)) {
    preferredTime = '10:00';
  }

  // Ensure preferredDate is YYYY-MM-DD
  let preferredDate = (data.preferredDate || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    preferredDate = new Date().toISOString().split('T')[0];
  }

  return apiRequest('/api/forms/appointment', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      company,
      phone,
      preferredDate,
      preferredTime,
      serviceType,
      message,
      page,
    }),
  });
}

export async function subscribeNewsletter(data: SubscriberPayload): Promise<ApiResponse> {
  return apiRequest('/api/subscribers/subscribe', {
    method: 'POST',
    body: JSON.stringify({
      email: data.email.trim().toLowerCase(),
      name: data.name?.trim() || undefined,
      country: data.country?.trim() || undefined,
      tags: data.tags?.length ? data.tags : undefined,
    }),
  });
}

export async function submitDownload(data: DownloadPayload): Promise<ApiResponse> {
  const name = (data.name || data.fullName || '').trim();
  const email = (data.email || data.workEmail || '').trim().toLowerCase();
  const company = data.company?.trim() || undefined;
  const phone = data.phone?.trim() || undefined;
  const resourceName = data.resourceName.trim();
  const page = data.page || (typeof window !== 'undefined' ? window.location.pathname : '/');

  return apiRequest('/api/forms/download', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      company,
      phone,
      resourceName,
      page,
    }),
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
