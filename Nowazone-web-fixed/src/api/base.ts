/** API origin — empty means same-origin (Vite proxy in dev, reverse-proxy in prod). */
export const API_BASE = String(
  (import.meta as any).env?.VITE_API_BASE_URL || ''
).replace(/\/$/, '');

export function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

/** OAuth redirect must match the current site origin (and provider app settings). */
export function oauthRedirectUri(provider: 'linkedin' | 'github'): string {
  const origin = window.location.origin;
  if (provider === 'github') return `${origin}/portal?provider=github`;
  return `${origin}/portal`;
}
