import { API_BASE } from './base';

export interface ApiResponse<T = any> {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: T;
  errors?: any[];
}

function getCsrfToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const fromStorage = window.sessionStorage?.getItem('csrf_token') || window.localStorage?.getItem('csrf_token');
    if (fromStorage) return fromStorage;
  } catch {
    // Storage access might be restricted in private browsing
  }
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const csrfToken = getCsrfToken();
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${path}`;

  try {
    const response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: 'error',
        message: data.message || `Request failed with status ${response.status}`,
        errors: data.errors,
      };
    }

    return data;
  } catch (err: any) {
    return {
      status: 'error',
      message: err.message || 'Network error. Please try again later.',
    };
  }
}
