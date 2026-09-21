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

    let data: any;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch {
        data = { message: `Invalid JSON response from server (HTTP ${response.status})` };
      }
    } else {
      try {
        const text = await response.text();
        data = { message: text || `Request failed with status ${response.status}` };
      } catch {
        data = { message: `Request failed with status ${response.status}` };
      }
    }

    if (!response.ok || data?.status === 'fail' || data?.status === 'error') {
      const errorMsg = data?.message || (data?.errors && data.errors[0]?.message) || `Request failed with status ${response.status}`;
      console.warn(`[API Failure] ${options.method || 'GET'} ${path} (HTTP ${response.status}):`, errorMsg, data?.errors || '');
      return {
        status: 'error',
        message: errorMsg,
        errors: data?.errors,
      };
    }

    return data;
  } catch (err: any) {
    console.error(`[API Network Error] ${options.method || 'GET'} ${path}:`, err);
    return {
      status: 'error',
      message: err.message || 'Network error. Please check your connection and try again.',
    };
  }
}

