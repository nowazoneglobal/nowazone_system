import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile, updatePassword } from '../../api/auth';
import {
  User,
  Building,
  Mail,
  Phone,
  Briefcase,
  Shield,
  Key,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PortalProfilePage: React.FC = () => {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();

  // Profile Form state
  const [name, setName] = useState(user?.name || '');
  const [company, setCompany] = useState(user?.company || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password Form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);

    const res = await updateProfile({
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
      jobTitle: jobTitle.trim(),
    });

    setSavingProfile(false);

    if (res.status === 'success') {
      await refreshUser();
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } else {
      setProfileMsg({
        type: 'error',
        text: res.message || 'Failed to update profile. Please try again.',
      });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 8 characters long.' });
      return;
    }

    setSavingPassword(true);
    setPasswordMsg(null);

    const res = await updatePassword({
      currentPassword,
      newPassword,
    });

    setSavingPassword(false);

    if (res.status === 'success') {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
    } else {
      setPasswordMsg({
        type: 'error',
        text: res.message || 'Failed to update password. Verify your current password.',
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeSlide">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
          Client Profile & Security
        </h1>
        <p className="text-sm text-slate-500 dark:text-white/60 mt-1">
          Manage your account credentials, contact information, and security preferences.
        </p>
      </div>

      {/* Account Identity Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 transition-colors">
        <div className="w-20 h-20 rounded-2xl bg-[#0F62FE] text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#0F62FE]/25">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
        </div>
        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Customer Portal Account
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-white/60">{user?.email}</p>
          <p className="text-xs text-slate-400 dark:text-white/40 pt-1">
            Account ID: <span className="font-mono text-slate-600 dark:text-white/60">{user?.id}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Info Form */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-[#0F62FE]" />
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Personal & Company Details
            </h3>
          </div>

          {profileMsg && (
            <div
              className={`mb-4 p-3 rounded-lg text-xs flex items-center gap-2 ${
                profileMsg.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
              }`}
            >
              {profileMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
            </div>

            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03] text-slate-500 dark:text-white/40 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Enterprise Inc."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
            </div>

            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
            </div>

            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                Job Title / Department
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="Head of Cloud Engineering"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full py-2.5 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0F62FE]/20"
            >
              {savingProfile ? <Loader2 size={16} className="animate-spin" /> : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <Key size={18} className="text-[#0F62FE]" />
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Change Password
            </h3>
          </div>

          {passwordMsg && (
            <div
              className={`mb-4 p-3 rounded-lg text-xs flex items-center gap-2 ${
                passwordMsg.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
              }`}
            >
              {passwordMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
            </div>

            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                New Password (min 8 chars)
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
            </div>

            <div>
              <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="w-full py-2.5 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0F62FE]/20"
            >
              {savingPassword ? <Loader2 size={16} className="animate-spin" /> : 'Update Password'}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-xs text-slate-500 dark:text-white/60 space-y-1">
            <div className="font-semibold text-slate-700 dark:text-white/100 flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-500" />
              <span>Session & Cookie Protection</span>
            </div>
            <p>
              Your session is secured with httpOnly JWT tokens and real-time CSRF rotation. Password changes automatically invalidate expired sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
