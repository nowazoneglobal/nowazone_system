import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useModals } from '../../context/ModalContext';
import { getMySubmissions, FormSubmissionItem } from '../../api/forms';
import { getMyTickets, TicketItem } from '../../api/tickets';
import {
  FileText,
  LifeBuoy,
  PlusCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const PortalOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { openAssessmentModal } = useModals();

  const [submissions, setSubmissions] = useState<FormSubmissionItem[]>([]);
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const [subRes, tickRes] = await Promise.all([
          getMySubmissions({ limit: 5 }),
          getMyTickets({ limit: 5 }),
        ]);
        if (cancelled) return;
        if (subRes.status === 'success' && subRes.data?.submissions) {
          setSubmissions(subRes.data.submissions);
        }
        if (tickRes.status === 'success' && tickRes.data?.tickets) {
          setTickets(tickRes.data.tickets);
        }
      } catch (err) {
        console.error('Failed to load portal overview data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const openTicketsCount = tickets.filter(t => t.status !== 'closed' && t.status !== 'resolved').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeSlide">
      {/* ─────────────────── WELCOME HERO ─────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0E1F33] via-[#102a4c] to-[#0A1830] text-white p-6 sm:p-8 border border-white/10 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F62FE]/20 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Client FinOps Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight">
            Welcome back, {user?.name || 'Client'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-[15px] mt-2 leading-relaxed">
            Here is your live Nowazone portal overview. Track your optimization assessments, active cloud cost inquiries, and direct engineering tickets.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => openAssessmentModal()}
              className="px-4 py-2.5 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-[13.5px] transition-all shadow-lg shadow-[#0F62FE]/25 flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle size={16} />
              <span>Request Cloud Assessment</span>
            </button>
            <Link
              to="/portal/tickets"
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-[13.5px] border border-white/15 transition-all flex items-center gap-2"
            >
              <LifeBuoy size={16} />
              <span>Open Support Ticket</span>
            </Link>
          </div>
        </div>

        {/* Subtle decorative background graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#0F62FE]/15 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* ─────────────────── STATS METRICS ─────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
              Form Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA] flex items-center justify-center">
              <FileText size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            {loading ? '—' : submissions.length}
          </div>
          <div className="text-xs text-slate-400 dark:text-white/40 mt-1">
            Assessments & Contact Submissions
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
              Active Tickets
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <LifeBuoy size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            {loading ? '—' : openTicketsCount}
          </div>
          <div className="text-xs text-slate-400 dark:text-white/40 mt-1">
            Awaiting response or resolution
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
              Account Status
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Shield size={18} />
            </div>
          </div>
          <div className="text-base font-bold font-heading text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 size={18} />
            <span>Verified Client</span>
          </div>
          <div className="text-xs text-slate-400 dark:text-white/40 mt-1">
            Role: Customer Portal Account
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/60">
              Optimization Target
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-[#0F62FE] dark:text-[#60A5FA]">
            20–35%
          </div>
          <div className="text-xs text-slate-400 dark:text-white/40 mt-1">
            Average cloud spend reduction
          </div>
        </div>
      </div>

      {/* ─────────────────── TWO-COLUMN CONTENT ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Submissions */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <FileText size={20} className="text-[#0F62FE]" />
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Recent Inquiries & Assessments
              </h3>
            </div>
            <Link
              to="/portal/submissions"
              className="text-xs font-semibold text-[#0F62FE] dark:text-[#60A5FA] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-slate-400">Loading inquiries...</div>
          ) : submissions.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <FileText size={22} />
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                No recent inquiries or assessments found.
              </p>
              <p className="text-xs text-slate-400 dark:text-white/40 mt-1">
                Submissions made on the website automatically appear here.
              </p>
              <button
                type="button"
                onClick={() => openAssessmentModal()}
                className="mt-4 text-xs font-semibold text-[#0F62FE] dark:text-[#60A5FA] hover:underline"
              >
                Submit your first assessment →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map(item => (
                <div
                  key={item._id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA]">
                        {item.type}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-white/40">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white/90 truncate mt-1">
                      {item.subject || item.message || `Cloud Assessment Request`}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold capitalize px-2.5 py-1 rounded-full shrink-0 ${
                      item.status === 'converted'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : item.status === 'contacted'
                        ? 'bg-blue-500/10 text-[#0F62FE] dark:text-[#60A5FA]'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {item.status || 'Received'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support Tickets */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <LifeBuoy size={20} className="text-emerald-500" />
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Support Tickets
              </h3>
            </div>
            <Link
              to="/portal/tickets"
              className="text-xs font-semibold text-[#0F62FE] dark:text-[#60A5FA] hover:underline flex items-center gap-1"
            >
              <span>Manage tickets</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-slate-400">Loading tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <LifeBuoy size={22} />
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                You have no active support tickets.
              </p>
              <p className="text-xs text-slate-400 dark:text-white/40 mt-1">
                Need help with cloud architecture or telemetry? Create a ticket anytime.
              </p>
              <Link
                to="/portal/tickets"
                className="inline-block mt-4 text-xs font-semibold text-[#0F62FE] dark:text-[#60A5FA] hover:underline"
              >
                Create a support ticket →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map(ticket => (
                <div
                  key={ticket._id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-white/50">
                        {ticket.ticketNumber || `#${ticket._id.slice(-6)}`}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          ticket.priority === 'urgent'
                            ? 'bg-red-500/10 text-red-500'
                            : ticket.priority === 'high'
                            ? 'bg-amber-500/10 text-amber-500'
                            : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white/60'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white/90 truncate mt-1">
                      {ticket.subject}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold capitalize px-2.5 py-1 rounded-full shrink-0 ${
                      ticket.status === 'resolved' || ticket.status === 'closed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : ticket.status === 'in_progress'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────── NOWAZONE ENGAGEMENT ROADMAP ─────────────────── */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2">
          Your FinOps Governance Framework
        </h3>
        <p className="text-sm text-slate-500 dark:text-white/60 mb-6">
          Nowazone standard operating workflow for ongoing visibility and automated cloud waste reduction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#0F62FE]/10 text-[#0F62FE] font-bold text-sm flex items-center justify-center mb-3">
              1
            </div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
              Telemetry & Audit
            </h4>
            <p className="text-xs text-slate-500 dark:text-white/60 mt-1">
              Analyze multi-cloud commitments, idle VM sizing, unattached block storage, and egress anomalies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#0F62FE]/10 text-[#0F62FE] font-bold text-sm flex items-center justify-center mb-3">
              2
            </div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
              Optimization Plan
            </h4>
            <p className="text-xs text-slate-500 dark:text-white/60 mt-1">
              Execute architecture rightsizing, Savings Plans / CUD strategies, and automated scaling policies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#0F62FE]/10 text-[#0F62FE] font-bold text-sm flex items-center justify-center mb-3">
              3
            </div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
              Continuous Governance
            </h4>
            <p className="text-xs text-slate-500 dark:text-white/60 mt-1">
              Monthly executive reviews, anomaly alerts, dedicated engineering tickets, and license optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
