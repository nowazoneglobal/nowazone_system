import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  LifeBuoy,
  User,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const PortalLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/portal/overview', label: 'Overview', icon: LayoutDashboard },
    { to: '/portal/submissions', label: 'My Submissions', icon: FileText },
    { to: '/portal/tickets', label: 'Support Tickets', icon: LifeBuoy },
    { to: '/portal/profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070F1E] text-slate-900 dark:text-white flex flex-col md:flex-row transition-colors">
      <SEO
        title="Client Portal | Nowazone"
        description="Nowazone client portal — view your inquiries, assessments, tickets, and account details."
      />

      {/* ─────────────────── MOBILE TOP BAR ─────────────────── */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-white dark:bg-[#0E1F33] border-b border-slate-200 dark:border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-lg tracking-wider text-slate-900 dark:text-white">
              NOWA<span className="text-[#0F62FE]">ZONE</span>
            </span>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA] px-2 py-0.5 rounded-full">
            Portal
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ─────────────────── SIDEBAR (DESKTOP & MOBILE) ─────────────────── */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 lg:w-72 bg-white dark:bg-[#0E1F33] border-r border-slate-200 dark:border-white/10 flex flex-col justify-between z-40 transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-wider text-slate-900 dark:text-white">
                  NOWA<span className="text-[#0F62FE]">ZONE</span>
                </span>
              </Link>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA] px-2 py-0.5 rounded-full">
                Portal
              </span>
            </div>
            <p className="text-[11.5px] text-slate-400 dark:text-white/40 mt-1">
              Client Operations & FinOps Hub
            </p>
          </div>

          {/* User badge */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F62FE] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md shadow-[#0F62FE]/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-semibold text-[13.5px] text-slate-900 dark:text-white truncate">
                {user?.name || 'Client User'}
              </h4>
              <p className="text-[11.5px] text-slate-400 dark:text-white/50 truncate">
                {user?.email}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-medium capitalize">
                  {user?.company || 'Verified Client'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1.5 mt-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-[13.5px] transition-all ${isActive
                      ? 'bg-[#0F62FE] text-white shadow-lg shadow-[#0F62FE]/20'
                      : 'text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? 'text-white' : 'opacity-70'} />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight size={14} className={isActive ? 'text-white/70' : 'opacity-0'} />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-[13px] font-medium text-slate-600 dark:text-white/70 hover:text-[#0F62FE] dark:hover:text-[#60A5FA] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return to Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-[13px] font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ─────────────────── MAIN CONTENT VIEWPORT ─────────────────── */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
