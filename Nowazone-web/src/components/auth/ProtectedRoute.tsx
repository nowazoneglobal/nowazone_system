import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Lock } from 'lucide-react';
import { useModals } from '../../context/ModalContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { openAuthModal } = useModals();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#0F62FE] animate-spin" />
        <p className="text-sm font-medium text-slate-500 dark:text-white/60">Verifying secure session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-[#0F62FE]/10 text-[#0F62FE] flex items-center justify-center mx-auto mb-4">
            <Lock size={26} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Portal Access Required</h2>
          <p className="text-sm text-slate-500 dark:text-white/60 mb-6">
            Please sign in to access your client telemetry, FinOps assessments, and support tickets.
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="w-full py-3 px-4 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#0F62FE]/20"
            >
              Sign In to Client Portal
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('signup')}
              className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white/100 hover:bg-slate-50 dark:hover:bg-white/5 font-medium text-sm transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : null;
};
