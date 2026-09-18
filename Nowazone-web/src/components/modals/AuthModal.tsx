import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModals } from '../../context/ModalContext';
import { useAuth } from '../../context/AuthContext';
import {
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  googleLogin,
} from '../../api/auth';
import { oauthRedirectUri } from '../../api/base';
import { X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authView, setAuthView } = useModals();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [resetToken, setResetToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Surface OAuth errors stored by OAuthCallback when the modal opens
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const oauthErr = sessionStorage.getItem('oauth_error');
    if (oauthErr) {
      sessionStorage.removeItem('oauth_error');
      setError(oauthErr);
    }
  }, [isAuthModalOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await loginUser({ email: email.trim().toLowerCase(), password });
    setLoading(false);

    if (res.status === 'success' && res.data?.user) {
      login(res.data.user, res.data.csrfToken || '');
      closeAuthModal();
      navigate('/portal');
    } else {
      setError(res.message || 'Invalid email or password. Please try again.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmPassword && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    // Register as a customer (client portal user)
    const res = await registerUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      company: company.trim() || undefined,
      role: 'customer',
    });

    if (res.status === 'success') {
      // Automatically log the new user in
      const loginRes = await loginUser({ email: email.trim().toLowerCase(), password });
      setLoading(false);

      if (loginRes.status === 'success' && loginRes.data?.user) {
        login(loginRes.data.user, loginRes.data.csrfToken || '');
        closeAuthModal();
        navigate('/portal');
      } else {
        setInfoMessage('Account created successfully! Please sign in with your credentials.');
        setAuthView('login');
      }
    } else {
      setLoading(false);
      setError(res.message || (res.errors && res.errors[0]?.message) || 'Registration failed. Please check your information.');
    }
  };

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await requestPasswordReset({ email: email.trim().toLowerCase() });
    setLoading(false);

    if (res.status === 'success') {
      setInfoMessage('If an account exists with that email, password reset instructions have been sent.');
      setAuthView('forgot-otp');
    } else {
      setError(res.message || 'Unable to process reset request. Please check your email and try again.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await resetPassword({ token: resetToken.trim(), password });
    setLoading(false);

    if (res.status === 'success') {
      setAuthView('forgot-done');
    } else {
      setError(res.message || 'Invalid or expired reset token. Please request a new one.');
    }
  };

  // ─── Social Authentication Handlers ──────────────────────────────────────────

  const googleBtnContainerRef = React.useRef<HTMLDivElement>(null);

  const handleGoogleCredentialResponse = async (credential: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await googleLogin(credential);
      if (res.status === 'success' && res.data?.user) {
        login(res.data.user, res.data.csrfToken || '');
        closeAuthModal();
        navigate('/portal');
      } else {
        setError(res.message || 'Google authentication failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthModalOpen) return;
    const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    let checkCount = 0;
    const checkGoogle = setInterval(() => {
      checkCount++;
      // @ts-ignore
      if (window.google?.accounts?.id && googleBtnContainerRef.current) {
        clearInterval(checkGoogle);
        try {
          // @ts-ignore
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: any) => {
              if (response?.credential) {
                handleGoogleCredentialResponse(response.credential);
              }
            },
          });

          if (googleBtnContainerRef.current) {
            googleBtnContainerRef.current.innerHTML = '';
            // @ts-ignore
            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              theme: document.documentElement.classList.contains('dark') ? 'filled_black' : 'outline',
              size: 'large',
              width: 360,
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left',
            });
          }
        } catch (e) {
          console.warn('Google button render error:', e);
        }
      }
      if (checkCount > 30) clearInterval(checkGoogle);
    }, 100);

    return () => clearInterval(checkGoogle);
  }, [isAuthModalOpen, authView]);

  const handleLinkedInSignIn = async () => {
    const clientId = (import.meta as any).env?.VITE_LINKEDIN_CLIENT_ID;
    if (!clientId) {
      setError('LinkedIn Sign-In is not configured (missing VITE_LINKEDIN_CLIENT_ID).');
      return;
    }
    const redirectUri = encodeURIComponent(oauthRedirectUri('linkedin'));
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=linkedin&scope=openid%20profile%20email`;
  };

  const handleGitHubSignIn = async () => {
    const clientId = (import.meta as any).env?.VITE_GITHUB_CLIENT_ID;
    if (!clientId) {
      setError('GitHub Sign-In is not configured (missing VITE_GITHUB_CLIENT_ID).');
      return;
    }
    const redirectUri = encodeURIComponent(oauthRedirectUri('github'));
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
  };

  // ─── Social Buttons Component ───────────────────────────────────────────────

  const renderSocialButtons = () => (
    <div className="flex flex-col gap-2.5 mb-5">
      {/* Official Google Sign-In Button Container (FedCM & Popup Compatible) */}
      <div ref={googleBtnContainerRef} className="w-full flex justify-center min-h-[44px]" />

      {/* Continue with LinkedIn */}
      <button
        type="button"
        onClick={handleLinkedInSignIn}
        disabled={loading}
        className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-heading font-semibold text-[13.5px] flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.56v11.45z" />
        </svg>
        <span>Continue with LinkedIn</span>
      </button>

      {/* Continue with GitHub */}
      <button
        type="button"
        onClick={handleGitHubSignIn}
        disabled={loading}
        className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-heading font-semibold text-[13.5px] flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current text-[#181717] dark:text-white">
          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
        </svg>
        <span>Continue with GitHub</span>
      </button>
    </div>
  );

  if (!isAuthModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1F33]/80 backdrop-blur-sm animate-fadeSlide"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0E1F33] text-slate-900 dark:text-white rounded-2xl shadow-2xl p-7 sm:p-8 border border-slate-200 dark:border-white/10 transition-colors max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-white/70 dark:hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Global Info Banner */}
        {infoMessage && (
          <div className="mb-5 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-[#0F62FE] dark:text-[#60A5FA] text-xs flex items-start gap-2.5">
            <CheckCircle size={16} className="shrink-0 mt-0.5" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* ─────────────────── LOGIN VIEW ─────────────────── */}
        {authView === 'login' && (
          <div>
            <div className="mb-5">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0F62FE] dark:text-[#60A5FA] bg-[#0F62FE]/10 px-2.5 py-0.5 rounded-full mb-2">
                Client Portal
              </span>
              <h3 className="font-heading font-bold text-2xl">Log In to Nowazone.</h3>
              <p className="text-[13px] text-slate-500 dark:text-white/60 mt-1">
                Access your client FinOps reporting, spend telemetry, and executive reviews.
              </p>
            </div>

            {/* Social Authentication: Google, LinkedIn, GitHub */}
            {renderSocialButtons()}

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
              <span className="text-[11.5px] text-slate-400 dark:text-white/40 lowercase">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setInfoMessage(null);
                      setAuthView('forgot-email');
                    }}
                    className="text-[12px] text-[#0F62FE] dark:text-[#60A5FA] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-heading font-bold text-[14.5px] py-3 rounded-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-lg shadow-[#0a63ce]/20"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Log In'}
              </button>
            </form>

            <div className="text-center text-[13.5px] text-slate-500 dark:text-white/60 mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setInfoMessage(null);
                  setAuthView('signup');
                }}
                className="font-semibold text-[#0a63ce] dark:text-[#60A5FA] hover:underline"
              >
                Sign up
              </button>
            </div>
          </div>
        )}

        {/* ─────────────────── SIGNUP VIEW ─────────────────── */}
        {authView === 'signup' && (
          <div>
            <div className="mb-5">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0F62FE] dark:text-[#60A5FA] bg-[#0F62FE]/10 px-2.5 py-0.5 rounded-full mb-2">
                Client Registration
              </span>
              <h3 className="font-heading font-bold text-2xl">Create Your Account.</h3>
              <p className="text-[13px] text-slate-500 dark:text-white/60 mt-1">
                Start your cloud cost visibility journey with Nowazone.
              </p>
            </div>

            {/* Social Authentication: Google, LinkedIn, GitHub */}
            {renderSocialButtons()}

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
              <span className="text-[11.5px] text-slate-400 dark:text-white/40 lowercase">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
            </div>

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sarah Connor"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enterprise Inc."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-heading font-bold text-[14.5px] py-3 rounded-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-lg shadow-[#0a63ce]/20"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Create Account'}
              </button>
            </form>

            <div className="text-center text-[13.5px] text-slate-500 dark:text-white/60 mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setInfoMessage(null);
                  setAuthView('login');
                }}
                className="font-semibold text-[#0a63ce] dark:text-[#60A5FA] hover:underline"
              >
                Log in
              </button>
            </div>
          </div>
        )}

        {/* ─────────────────── FORGOT PASSWORD (EMAIL) ─────────────────── */}
        {authView === 'forgot-email' && (
          <div>
            <h3 className="font-heading font-semibold text-[22px] mb-2">Reset Your Password.</h3>
            <p className="text-[14px] text-slate-500 dark:text-white/60 mb-6 leading-relaxed">
              Enter your email and we'll send a one-time code to verify it's you.
            </p>

            <form onSubmit={handleSendResetEmail} className="space-y-4">
              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-heading font-bold text-[14.5px] py-3 rounded-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send OTP'}
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setAuthView('login');
                }}
                className="text-[13.5px] font-semibold text-slate-600 dark:text-white/70 hover:underline"
              >
                ← Back to login
              </button>
            </div>
          </div>
        )}

        {/* ─────────────────── FORGOT (ENTER CODE / OTP) ─────────────────── */}
        {authView === 'forgot-otp' && (
          <div>
            <h3 className="font-heading font-semibold text-[22px] mb-2">Enter the Code.</h3>
            <p className="text-[14px] text-slate-500 dark:text-white/60 mb-5 leading-relaxed">
              We sent a 6-digit code to <strong className="text-slate-900 dark:text-white">{email}</strong>.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthView('forgot-reset');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                  One-Time Code / Reset Token
                </label>
                <input
                  type="text"
                  required
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  placeholder="123456"
                  className="w-full px-3.5 py-3 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono text-center text-lg tracking-[0.2em] focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-heading font-bold text-[14.5px] py-3 rounded-md transition-all"
              >
                Verify Code
              </button>
            </form>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="text-[13.5px] font-semibold text-slate-600 dark:text-white/70 hover:underline"
              >
                ← Back to login
              </button>
            </div>
          </div>
        )}

        {/* ─────────────────── SET NEW PASSWORD ─────────────────── */}
        {authView === 'forgot-reset' && (
          <div>
            <h3 className="font-heading font-semibold text-[22px] mb-2">Set a New Password.</h3>
            <p className="text-[13.5px] text-slate-500 dark:text-white/60 mb-5">
              Create a strong password for your Nowazone client account.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-3.5">
              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  Reset Token / Code *
                </label>
                <input
                  type="text"
                  required
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  placeholder="Paste code or token..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-mono text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-[14px]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-heading font-bold text-[14.5px] py-3 rounded-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : 'Reset Password'}
              </button>
            </form>
          </div>
        )}

        {/* ─────────────────── RESET SUCCESS ─────────────────── */}
        {authView === 'forgot-done' && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-heading font-semibold text-[20px] mb-2">Password Reset.</h3>
            <p className="text-[14px] text-slate-500 dark:text-white/70 mb-6 leading-relaxed">
              You can now log in with your new password.
            </p>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setInfoMessage(null);
                setAuthView('login');
              }}
              className="bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-heading font-bold text-[14px] px-8 py-2.5 rounded-md shadow-lg shadow-[#0a63ce]/20"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
