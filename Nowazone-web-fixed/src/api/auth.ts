import { apiRequest, ApiResponse } from './client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
  company?: string;
  phone?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  passwordConfirm?: string;
}

export async function loginUser(data: LoginPayload): Promise<ApiResponse> {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function registerUser(data: RegisterPayload): Promise<ApiResponse> {
  return apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function requestPasswordReset(data: ForgotPasswordPayload): Promise<ApiResponse> {
  return apiRequest('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function resetPassword(data: ResetPasswordPayload): Promise<ApiResponse> {
  return apiRequest(`/api/auth/reset-password/${encodeURIComponent(data.token)}`, {
    method: 'POST',
    body: JSON.stringify({ password: data.password }),
  });
}

export async function googleLogin(idToken: string): Promise<ApiResponse> {
  return apiRequest('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({ id_token: idToken }),
  });
}

export async function githubLogin(payload: {
  code?: string;
  token?: string;
  access_token?: string;
  redirect_uri?: string;
}): Promise<ApiResponse> {
  return apiRequest('/api/auth/github', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function linkedinLogin(payload: {
  code?: string;
  token?: string;
  access_token?: string;
  redirect_uri?: string;
}): Promise<ApiResponse> {
  return apiRequest('/api/auth/linkedin', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getProfile(): Promise<ApiResponse> {
  return apiRequest('/api/auth/profile', {
    method: 'GET',
  });
}

export async function updateProfile(
  data: Partial<{ name: string; phone: string; jobTitle: string; company: string }>
): Promise<ApiResponse> {
  return apiRequest('/api/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<ApiResponse> {
  return apiRequest('/api/auth/profile/password', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function logoutUser(): Promise<ApiResponse> {
  return apiRequest('/api/auth/logout', {
    method: 'POST',
  });
}
