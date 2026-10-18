/** API origin — empty means same-origin (Vite proxy in dev, reverse-proxy in prod). */
export const API_BASE = String(
  (import.meta as any).env?.VITE_API_BASE_URL || ''
).replace(/\/$/, '');

export function apiUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

/**
 * Absolute OAuth redirect_uri. It must byte-for-byte match the redirect/callback
 * URL registered in the provider's developer console. Prefer an explicit
 * VITE_<PROVIDER>_REDIRECT_URI override (set in .env) so the value stays correct
 * regardless of which host/port/subdomain the SPA is served from; otherwise fall
 * back to the current site origin so local development keeps working.
 *
 * Note: do NOT append query parameters (e.g. ?provider=github) — GitHub requires
 * the redirect_uri to match the registered callback URL exactly, so the provider
 * is carried via the OAuth `state` parameter instead.
 */
export function oauthRedirectUri(provider: 'linkedin' | 'github'): string {
  const env = ((import.meta as any).env || {}) as Record<string, string | undefined>;
  const override =
    provider === 'github'
      ? env.VITE_GITHUB_REDIRECT_URI
      : env.VITE_LINKEDIN_REDIRECT_URI;
  if (override) return override;
  return `${window.location.origin}/portal`;
}
