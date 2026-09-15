import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useModals } from '../context/ModalContext';
import { githubLogin, linkedinLogin } from '../api/auth';
import { oauthRedirectUri } from '../api/base';
import { Loader2 } from 'lucide-react';

function detectProvider(params: URLSearchParams): 'github' | 'linkedin' | null {
  const raw = (params.get('provider') || params.get('state') || '').toLowerCase();
  if (raw === 'github') return 'github';
  if (raw === 'linkedin') return 'linkedin';
  return null;
}

/**
 * Handles LinkedIn/GitHub OAuth return to /portal?code=… outside AuthModal
 * so the exchange still runs when the modal is closed.
 */
export const OAuthCallback: React.FC = () => {
  const { login } = useAuth();
  const { openAuthModal } = useModals();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const provider = detectProvider(params);
    if (!code || !provider || started.current) return;
    started.current = true;
    setBusy(true);
    setMessage(`Signing in with ${provider === 'github' ? 'GitHub' : 'LinkedIn'}…`);

    const run = async () => {
      try {
        const redirect_uri = oauthRedirectUri(provider);
        const res =
          provider === 'github'
            ? await githubLogin({ code, redirect_uri })
            : await linkedinLogin({ code, redirect_uri });

        if (res.status === 'success' && res.data?.user) {
          login(res.data.user, res.data.csrfToken || '');
          window.history.replaceState({}, document.title, '/portal');
          navigate('/portal/overview', { replace: true });
          return;
        }

        const err = res.message || `${provider} authentication failed.`;
        sessionStorage.setItem('oauth_error', err);
        window.history.replaceState({}, document.title, '/portal');
        openAuthModal('login');
      } catch (e: any) {
        sessionStorage.setItem('oauth_error', e?.message || 'Social authentication failed.');
        window.history.replaceState({}, document.title, '/portal');
        openAuthModal('login');
      } finally {
        setBusy(false);
        setMessage(null);
      }
    };

    void run();
  }, [login, navigate, openAuthModal]);

  if (!busy) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3 bg-white/90 dark:bg-[#070F1E]/95">
      <Loader2 className="w-8 h-8 text-[#0F62FE] animate-spin" />
      <p className="text-sm font-medium text-slate-600 dark:text-white/70">
        {message || 'Completing sign-in…'}
      </p>
    </div>
  );
};
