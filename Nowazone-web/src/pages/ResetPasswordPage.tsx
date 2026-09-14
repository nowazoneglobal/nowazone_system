import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import { SEO } from '../components/common/SEO';
import { KeyRound, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useModals } from '../context/ModalContext';

export const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token?: string }>();
  const navigate = useNavigate();
  const { openAuthModal } = useModals();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Reset token is missing from the link.');
      return;
    }
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

    const res = await resetPassword({ token, password });
    setLoading(false);

    if (res.status === 'success') {
      setSuccess(true);
    } else {
      setError(res.message || 'Invalid or expired reset token. Please request a new password reset.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-[#070F1E] transition-colors">
      <SEO
        title="Reset Password | Nowazone"
        description="Reset your Nowazone client portal account password."
      />

      <div className="max-w-md w-full p-8 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-[#0F62FE]/10 text-[#0F62FE] flex items-center justify-center mx-auto mb-4">
          <KeyRound size={26} />
        </div>

        <h1 className="text-2xl font-heading font-extrabold text-slate-900 dark:text-white text-center mb-2">
          Set New Password
        </h1>

        {success ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <p className="text-sm text-slate-600 dark:text-white/70">
              Your password has been successfully reset! You can now sign in to your client portal.
            </p>
            <button
              type="button"
              onClick={() => {
                navigate('/');
                openAuthModal('login');
              }}
              className="w-full py-3 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-sm transition-all shadow-lg shadow-[#0F62FE]/20 flex items-center justify-center gap-2"
            >
              <span>Sign In to Portal</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 dark:text-white/60 text-center mb-6">
              Enter your new secure password below to regain access to your client portal.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                  New Password (min 8 characters)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0F62FE]/20"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : 'Update Password'}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link to="/" className="text-xs text-[#0F62FE] dark:text-[#60A5FA] hover:underline">
                Back to Nowazone Homepage
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
