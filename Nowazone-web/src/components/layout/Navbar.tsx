import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useModals } from '../../context/ModalContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ArrowRight,
  Globe,
  Database,
  Cpu,
  Layers,
  TrendingUp,
  UploadCloud,
  ShieldCheck,
  Key,
  ShoppingBag,
  Users,
  Workflow,
  Receipt,
  Terminal,
  Handshake,
  Lock,
  Compass,
  Mail,
  LayoutDashboard,
  FileText,
  LifeBuoy,
  User as UserIcon,
  LogOut,
} from 'lucide-react';

type MenuType = 'platforms' | 'solutions' | 'company';

export const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const { openAssessmentModal, openAuthModal } = useModals();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  // Detect scroll to apply backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // References for measuring button positions for sliding dropdown
  const centerNavRef = useRef<HTMLDivElement>(null);
  const platformsBtnRef = useRef<HTMLButtonElement>(null);
  const solutionsBtnRef = useRef<HTMLButtonElement>(null);
  const companyBtnRef = useRef<HTMLButtonElement>(null);

  const [panelStyle, setPanelStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 860,
  });

  const updatePanelPosition = (menu: MenuType) => {
    const nav = centerNavRef.current;
    if (!nav) return;

    let targetBtn: HTMLButtonElement | null = null;
    let targetWidth = 860;

    if (menu === 'platforms') {
      targetBtn = platformsBtnRef.current;
      targetWidth = 860;
    } else if (menu === 'solutions') {
      targetBtn = solutionsBtnRef.current;
      targetWidth = 720;
    } else if (menu === 'company') {
      targetBtn = companyBtnRef.current;
      targetWidth = 660;
    }

    if (targetBtn) {
      const navRect = nav.getBoundingClientRect();
      const btnRect = targetBtn.getBoundingClientRect();
      const btnCenter = btnRect.left + btnRect.width / 2 - navRect.left;

      // Position panel so its center aligns with the button center
      let computedLeft = btnCenter - targetWidth / 2;

      // Dynamic boundary clamp: ensure panel does not overflow the screen margins
      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;
      const minLeft = 20 - navRect.left;
      const maxLeft = windowWidth - 20 - navRect.left - targetWidth;
      computedLeft = Math.max(minLeft, Math.min(maxLeft, computedLeft));

      setPanelStyle({ left: computedLeft, width: targetWidth });
    }
  };

  const handleMouseEnter = (menu: MenuType) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
    updatePanelPosition(menu);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleMenuKeepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Close dropdown on window resize or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', () => setActiveMenu(null));
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', () => setActiveMenu(null));
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-white/100 dark:bg-[#070E1A]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_-4px_rgba(0,0,0,0.4)]'
          : 'py-3.5 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 relative">
        {/* 1. Brand Logo (Theme-Adaptive: black in light theme, white in dark theme) */}
        <Link to="/" className="flex items-center mr-2 flex-none" aria-label="Nowazone Home">
          <img
            src={theme === 'dark' ? '/nowazone_white.svg' : '/nowazone_black.svg'}
            alt="Nowazone - FinOps & Cloud Cost Optimization"
            width="160"
            height="36"
            fetchPriority="high"
            loading="eager"
            className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200"
          />
        </Link>

        {/* 2. Center Navigation Group (Theme-Adaptive Pill Control with spacious width) */}
        <div
          ref={centerNavRef}
          onMouseLeave={handleMouseLeave}
          className="hidden lg:flex items-center gap-1.5 bg-white/95 dark:bg-[#0A1830]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/15 rounded-full px-4 py-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] dark:shadow-xl relative"
        >
          {/* Platforms Dropdown Trigger */}
          <button
            ref={platformsBtnRef}
            type="button"
            onMouseEnter={() => handleMouseEnter('platforms')}
            className={`px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              activeMenu === 'platforms'
                ? 'bg-slate-100 text-[#0F62FE] dark:bg-white/15 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-white/100 dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            Platforms
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                activeMenu === 'platforms'
                  ? 'rotate-180 text-[#0F62FE] dark:text-[#60A5FA] opacity-100'
                  : 'opacity-60'
              }`}
            />
          </button>

          {/* Solutions Dropdown Trigger */}
          <button
            ref={solutionsBtnRef}
            type="button"
            onMouseEnter={() => handleMouseEnter('solutions')}
            className={`px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              activeMenu === 'solutions'
                ? 'bg-slate-100 text-[#0F62FE] dark:bg-white/15 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-white/100 dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            Solutions
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                activeMenu === 'solutions'
                  ? 'rotate-180 text-[#0F62FE] dark:text-[#60A5FA] opacity-100'
                  : 'opacity-60'
              }`}
            />
          </button>

          {/* Direct Nav Links */}
          <Link
            to="/finops"
            onMouseEnter={handleMouseLeave}
            className="px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-white/100 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
          >
            FinOps
          </Link>

          <Link
            to="/how-we-work"
            onMouseEnter={handleMouseLeave}
            className="px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-white/100 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
          >
            How We Work
          </Link>

          {/* Company Dropdown Trigger */}
          <button
            ref={companyBtnRef}
            type="button"
            onMouseEnter={() => handleMouseEnter('company')}
            className={`px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer select-none ${
              activeMenu === 'company'
                ? 'bg-slate-100 text-[#0F62FE] dark:bg-white/15 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-white/100 dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            Company
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                activeMenu === 'company'
                  ? 'rotate-180 text-[#0F62FE] dark:text-[#60A5FA] opacity-100'
                  : 'opacity-60'
              }`}
            />
          </button>

          <Link
            to="/careers"
            onMouseEnter={handleMouseLeave}
            className="px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-white/100 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
          >
            Careers
          </Link>

          {user ? (
            <div className="relative" onMouseLeave={() => setUserMenuOpen(false)}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                onMouseEnter={() => {
                  handleMouseLeave();
                  setUserMenuOpen(true);
                }}
                className="flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full text-[13.5px] font-semibold tracking-wide bg-[#0F62FE]/10 hover:bg-[#0F62FE]/15 text-[#0F62FE] dark:text-[#60A5FA] border border-[#0F62FE]/20 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#0F62FE] text-white text-[11px] font-bold flex items-center justify-center">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-2 text-slate-900 dark:text-white z-50 animate-fadeSlide">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                    <p className="text-xs font-bold truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 dark:text-white/40 truncate">{user.email}</p>
                    <span className="inline-block text-[9.5px] font-bold uppercase tracking-wider text-[#0F62FE] dark:text-[#60A5FA] mt-0.5">
                      Client Portal
                    </span>
                  </div>
                  <Link
                    to="/portal/overview"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    <LayoutDashboard size={14} className="text-[#0F62FE]" />
                    <span>Portal Overview</span>
                  </Link>
                  <Link
                    to="/portal/submissions"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    <FileText size={14} className="text-[#0F62FE]" />
                    <span>My Submissions</span>
                  </Link>
                  <Link
                    to="/portal/tickets"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    <LifeBuoy size={14} className="text-[#0F62FE]" />
                    <span>Support Tickets</span>
                  </Link>
                  <Link
                    to="/portal/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    <UserIcon size={14} className="text-[#0F62FE]" />
                    <span>Profile & Settings</span>
                  </Link>
                  <div className="pt-1 mt-1 border-t border-slate-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              onMouseEnter={handleMouseLeave}
              className="px-5 py-2 rounded-full text-[14px] font-semibold tracking-wide text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-white/100 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              Login
            </button>
          )}

          {/* ══════════════════════════════════════════════════════════════
              THEME-ADAPTIVE SLIDING DROPDOWN PANEL (Spacious & Exact Brand Colors)
              ══════════════════════════════════════════════════════════════ */}
          <div
            onMouseEnter={handleMenuKeepOpen}
            onMouseLeave={handleMouseLeave}
            className={`absolute top-[calc(100%+14px)] bg-white dark:bg-[#0A1830] border border-slate-200/90 dark:border-white/15 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12),0_0_25px_rgba(15,98,254,0.06)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6),0_0_35px_rgba(15,98,254,0.15)] p-5 sm:p-6 text-slate-900 dark:text-white overflow-hidden ${
              activeMenu
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
            style={{
              left: `${panelStyle.left}px`,
              width: `${panelStyle.width}px`,
              transition:
                'left 0.28s cubic-bezier(0.16, 1, 0.3, 1), width 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            {/* Invisible hover bridge spanning gap to trigger button */}
            <div className="absolute -top-4 left-0 right-0 h-4" />

            {/* ─── DROPDOWN CONTENT: Platforms (3 Columns, Exact Brand Icons) ─── */}
            {activeMenu === 'platforms' && (
              <div className="animate-[fadeSlide_0.25s_ease]">
                <div className="grid grid-cols-3 gap-5">
                  {/* Column 1: Hyperscalers */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] px-2 py-1">
                      Hyperscalers
                    </span>

                    <Link
                      to="/platforms/azure"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center p-1.5 flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <img src="/assets/logos/azure.png" alt="Azure" width="24" height="24" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Microsoft Azure
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Cost optimization, reservations &amp; governance
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/platforms/aws"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center p-1.5 flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <img src="/assets/logos/aws.png" alt="AWS" width="24" height="24" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          AWS
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Savings Plans, rightsizing &amp; accounts
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/platforms/google-cloud"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center p-1.5 flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <img src="/assets/logos/google-cloud.png" alt="Google Cloud" width="24" height="24" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Google Cloud
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          CUD strategy, allocation &amp; guardrails
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: Enterprise & Hybrid */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] px-2 py-1">
                      Enterprise &amp; Hybrid
                    </span>

                    <Link
                      to="/platforms/oracle-cloud"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center p-1 flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <img src="/assets/logos/oracle-cloud.png" alt="Oracle Cloud" width="24" height="24" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Oracle Cloud (OCI)
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Cost management &amp; credits optimization
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/platforms/alibaba-cloud"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center p-1 flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <img src="/assets/logos/alibaba-cloud.png" alt="Alibaba Cloud" width="24" height="24" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Alibaba Cloud
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          ECS, OSS and regional cost governance
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/platforms/multi-cloud"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Globe size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Multi-Cloud &amp; FOCUS
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Standardized FOCUS 1.2–1.4 telemetry
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Column 3: Workloads & AI */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] px-2 py-1">
                      Data &amp; AI
                    </span>

                    <Link
                      to="/platforms/databricks-bigquery"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Database size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Data Platforms
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Snowflake, Databricks, BigQuery &amp; Fabric
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/solutions/ai-tokenomics"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Cpu size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          FinOps for AI (Tokenomics)
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Token economics, GPU &amp; inference efficiency
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[12px]">
                  <span className="text-slate-500 dark:text-white/60">Multi-cloud from day one — no per-cloud silos</span>
                  <Link
                    to="/platforms/multi-cloud"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#0F62FE] dark:text-[#60A5FA] hover:text-[#084EA3] dark:hover:text-white transition-colors"
                  >
                    Compare all platforms <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}

            {/* ─── DROPDOWN CONTENT: Solutions (2 Columns, Exact Brand Icons) ─── */}
            {activeMenu === 'solutions' && (
              <div className="animate-[fadeSlide_0.25s_ease]">
                <div className="grid grid-cols-2 gap-6">
                  {/* Column 1 */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] px-2 py-1">
                      FinOps &amp; Architecture
                    </span>

                    <Link
                      to="/finops"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <TrendingUp size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          FinOps as a Service
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Continuous cloud cost optimization on a flat fee
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/cloud-architecture"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Layers size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Cloud Architecture
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Landing zones, Well-Architected reviews &amp; designs
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/cloud-migration"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <UploadCloud size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Cloud Migration
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Cost-aware migration planning, cutover &amp; execution
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] px-2 py-1">
                      Operations &amp; Licensing
                    </span>

                    <Link
                      to="/managed-service"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <ShieldCheck size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Managed Cloud
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Ongoing operations, monitoring &amp; cost governance
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/microsoft-licensing"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Key size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Microsoft Licensing &amp; Reselling
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Microsoft 365, Azure &amp; CSP licensing rightsizing
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/google-cloud-licensing"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <ShoppingBag size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Google Cloud Licensing &amp; Reselling
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Google Workspace &amp; Google Cloud partner procurement
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[12px]">
                  <span className="text-slate-500 dark:text-white/60">Not sure where to start? Get a scoped assessment</span>
                  <Link
                    to="/contact-us"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#0F62FE] dark:text-[#60A5FA] hover:text-[#084EA3] dark:hover:text-white transition-colors"
                  >
                    Book an assessment <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}

            {/* ─── DROPDOWN CONTENT: Company (2 Columns, Exact Brand Icons) ─── */}
            {activeMenu === 'company' && (
              <div className="animate-[fadeSlide_0.25s_ease]">
                <div className="grid grid-cols-2 gap-6">
                  {/* Column 1: About & Ethos */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] px-2 py-1">
                      Organization
                    </span>

                    <Link
                      to="/about-us"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Users size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          About Us
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Vendor-independent FinOps partner thesis &amp; ethos
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/our-process"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Workflow size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Our Process
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          From initial X-Ray to committed ongoing savings
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/pricing-models"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Receipt size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          FinOps Pricing &amp; Engagement
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Flat monthly retainers, zero percentage cut
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/how-we-work"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Terminal size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          How We Work
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Interactive 8-discipline engineering delivery
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: Ecosystem & Trust */}
                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] px-2 py-1">
                      Ecosystem &amp; Trust
                    </span>

                    <Link
                      to="/partner-program"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Handshake size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Partner Program
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Channel tracks for MSPs &amp; advisory firms
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/trust-and-security"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Lock size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Trust &amp; Security
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Read-only access, certified leads &amp; NDA protocols
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/careers"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Compass size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Careers
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Open roles across FinOps &amp; cloud teams
                        </span>
                      </div>
                    </Link>

                    <Link
                      to="/contact-us"
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none group-hover:border-[#0F62FE]/50 group-hover:bg-[#0F62FE]/10 dark:group-hover:bg-[#0F62FE]/15 transition-all mt-0.5">
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold text-slate-900 dark:text-white group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                          Contact Us
                        </span>
                        <span className="block text-[12px] text-slate-500 dark:text-white/55 group-hover:text-slate-700 dark:group-hover:text-white/75 transition-colors leading-snug mt-1">
                          Schedule a direct discussion with our team
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[12px]">
                  <span className="text-slate-500 dark:text-white/60">Questions about pricing, partnership or careers?</span>
                  <Link
                    to="/contact-us"
                    onClick={() => setActiveMenu(null)}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#0F62FE] dark:text-[#60A5FA] hover:text-[#084EA3] dark:hover:text-white transition-colors"
                  >
                    Contact Us <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Right Action Buttons & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2.5 flex-none">
          {/* Cost Estimator Button (Hidden per user request, ready for future use)
          <Link
            to="/cost-estimator"
            className="border border-slate-300 dark:border-white/25 text-slate-700 dark:text-white/90 hover:text-slate-900 dark:hover:text-white bg-white/100 dark:bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-400 dark:hover:border-white/50 text-[12.5px] font-semibold py-2 px-3.5 rounded transition-all select-none shadow-sm dark:shadow-none"
          >
            Cost Estimator
          </Link>
          */}

          <button
            type="button"
            onClick={openAssessmentModal}
            className="bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold text-[13px] py-2 px-4 rounded-full transition-colors shadow-sm hover:shadow cursor-pointer select-none"
          >
            Free Cost X-Ray Assessment
          </button>

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/20 rounded bg-white/100 dark:bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer shadow-sm dark:shadow-none"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        {/* 4. Mobile Hamburger & Theme Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 text-slate-700 dark:text-white/100 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/20 rounded bg-white/90 dark:bg-[#0E1F33] shadow-sm dark:shadow-none"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle Mobile Menu"
            className="p-2 text-slate-700 dark:text-white/100 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/20 rounded bg-white/90 dark:bg-[#0E1F33] shadow-sm dark:shadow-none"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE NAVIGATION ACCORDION DRAWER (Theme-Adaptive)
          ══════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0E1F33] border-t border-slate-200 dark:border-white/15 px-6 py-6 flex flex-col gap-4 shadow-2xl z-50 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/10 text-[14.5px]">
            {/* Platforms Accordion */}
            <details className="py-3 group">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
                <span>Platforms</span>
                <ChevronDown size={16} className="transition-transform group-open:rotate-180 text-slate-400 dark:text-white/60" />
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 pl-2 text-slate-700 dark:text-white/75 text-[13.5px]">
                <Link
                  to="/platforms/azure"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <img src="/assets/logos/azure.png" alt="Azure" width="16" height="16" loading="lazy" className="w-4 h-4 object-contain" />
                  Microsoft Azure
                </Link>
                <Link
                  to="/platforms/aws"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <img src="/assets/logos/aws.png" alt="AWS" width="16" height="16" loading="lazy" className="w-4 h-4 object-contain" />
                  AWS
                </Link>
                <Link
                  to="/platforms/google-cloud"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <img src="/assets/logos/google-cloud.png" alt="Google Cloud" width="16" height="16" loading="lazy" className="w-4 h-4 object-contain" />
                  Google Cloud
                </Link>
                <Link
                  to="/platforms/oracle-cloud"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <img src="/assets/logos/oracle-cloud.png" alt="Oracle" width="16" height="16" loading="lazy" className="w-4 h-4 object-contain" />
                  Oracle Cloud (OCI)
                </Link>
                <Link
                  to="/platforms/alibaba-cloud"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <img src="/assets/logos/alibaba-cloud.png" alt="Alibaba" width="16" height="16" loading="lazy" className="w-4 h-4 object-contain" />
                  Alibaba Cloud
                </Link>
                <Link
                  to="/platforms/multi-cloud"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Globe size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Multi-Cloud &amp; FOCUS
                </Link>
                <Link
                  to="/platforms/databricks-bigquery"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Database size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Data Platforms
                </Link>
                <Link
                  to="/solutions/ai-tokenomics"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Cpu size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  FinOps for AI (Tokenomics)
                </Link>
              </div>
            </details>

            {/* Solutions Accordion */}
            <details className="py-3 group">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
                <span>Solutions</span>
                <ChevronDown size={16} className="transition-transform group-open:rotate-180 text-slate-400 dark:text-white/60" />
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 pl-2 text-slate-700 dark:text-white/75 text-[13.5px]">
                <Link
                  to="/finops"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <TrendingUp size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  FinOps as a Service
                </Link>
                <Link
                  to="/cloud-architecture"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Layers size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Cloud Architecture
                </Link>
                <Link
                  to="/cloud-migration"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <UploadCloud size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Cloud Migration
                </Link>
                <Link
                  to="/managed-service"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <ShieldCheck size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Managed Cloud
                </Link>
                <Link
                  to="/microsoft-licensing"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Key size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Microsoft Licensing &amp; Reselling
                </Link>
                <Link
                  to="/google-cloud-licensing"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <ShoppingBag size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Google Cloud Licensing &amp; Reselling
                </Link>
              </div>
            </details>

            {/* Direct Links */}
            <Link
              to="/finops"
              onClick={() => setMobileOpen(false)}
              className="py-3 font-semibold text-slate-900 dark:text-white flex items-center justify-between"
            >
              FinOps
            </Link>

            <Link
              to="/how-we-work"
              onClick={() => setMobileOpen(false)}
              className="py-3 font-semibold text-slate-900 dark:text-white flex items-center justify-between"
            >
              How We Work
            </Link>

            {/* Company Accordion */}
            <details className="py-3 group">
              <summary className="font-semibold text-slate-900 dark:text-white cursor-pointer flex items-center justify-between list-none">
                <span>Company</span>
                <ChevronDown size={16} className="transition-transform group-open:rotate-180 text-slate-400 dark:text-white/60" />
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 pl-2 text-slate-700 dark:text-white/75 text-[13.5px]">
                <Link
                  to="/about-us"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Users size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  About Us
                </Link>
                <Link
                  to="/our-process"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Workflow size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Our Process
                </Link>
                <Link
                  to="/pricing-models"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Receipt size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  FinOps Pricing &amp; Engagement
                </Link>
                <Link
                  to="/partner-program"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Handshake size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Partner Program
                </Link>
                <Link
                  to="/careers"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Compass size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Careers
                </Link>
                <Link
                  to="/trust-and-security"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Lock size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Trust &amp; Security
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => setMobileOpen(false)}
                  className="py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <Mail size={15} className="text-[#0F62FE] dark:text-[#60A5FA]" />
                  Contact Us
                </Link>
              </div>
            </details>

            {user ? (
              <div className="py-2 border-t border-b border-slate-200 dark:border-white/10 space-y-1.5">
                <div className="px-2 py-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-[11px] text-slate-400 dark:text-white/40">{user.email}</p>
                </div>
                <Link
                  to="/portal/overview"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-semibold text-[#0F62FE] dark:text-[#60A5FA]"
                >
                  <LayoutDashboard size={15} />
                  <span>Client Portal Overview</span>
                </Link>
                <Link
                  to="/portal/submissions"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-sm text-slate-700 dark:text-white/100"
                >
                  <FileText size={15} />
                  <span>My Submissions</span>
                </Link>
                <Link
                  to="/portal/tickets"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-sm text-slate-700 dark:text-white/100"
                >
                  <LifeBuoy size={15} />
                  <span>Support Tickets</span>
                </Link>
                <Link
                  to="/portal/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-100 dark:hover:bg-white/5 text-sm text-slate-700 dark:text-white/100"
                >
                  <UserIcon size={15} />
                  <span>Profile & Settings</span>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setMobileOpen(false);
                    await logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-2 py-1.5 px-2 text-sm text-red-600 dark:text-red-400 cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openAuthModal('login');
                }}
                className="py-3 text-left font-semibold text-slate-900 dark:text-white cursor-pointer"
              >
                Login
              </button>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {/* Cost Estimator (Hidden per user request, ready for future use)
            <Link
              to="/cost-estimator"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center border border-slate-300 dark:border-white/30 text-slate-800 dark:text-white font-semibold py-2.5 text-[13.5px] rounded bg-slate-50 dark:bg-transparent"
            >
              Cost Estimator
            </Link>
            */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openAssessmentModal();
              }}
              className="w-full bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold py-2.5 text-[13.5px] rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Free Cost X-Ray Assessment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
