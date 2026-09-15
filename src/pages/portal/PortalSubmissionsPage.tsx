import React, { useState, useEffect } from 'react';
import { getMySubmissions, FormSubmissionItem } from '../../api/forms';
import { useModals } from '../../context/ModalContext';
import {
  FileText,
  Search,
  Filter,
  Clock,
  Calendar,
  ChevronRight,
  PlusCircle,
  X,
  Building,
  Mail,
  Phone,
  Layers,
  DollarSign,
} from 'lucide-react';

export const PortalSubmissionsPage: React.FC = () => {
  const { openAssessmentModal } = useModals();

  const [submissions, setSubmissions] = useState<FormSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<FormSubmissionItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    async function loadSubmissions() {
      setLoading(true);
      try {
        const res = await getMySubmissions({
          type: activeFilter !== 'all' ? activeFilter : undefined,
        });
        if (!cancelled && res.status === 'success' && res.data?.submissions) {
          setSubmissions(res.data.submissions);
        }
      } catch (err) {
        console.error('Failed to load submissions:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadSubmissions();
    return () => {
      cancelled = true;
    };
  }, [activeFilter]);

  const filteredSubmissions = submissions.filter(item => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (item.subject && item.subject.toLowerCase().includes(term)) ||
      (item.message && item.message.toLowerCase().includes(term)) ||
      (item.type && item.type.toLowerCase().includes(term)) ||
      (item.company && item.company.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeSlide">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
            My Submissions & Inquiries
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/60 mt-1">
            Track all cloud assessments, contact forms, and meeting requests linked to your account.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openAssessmentModal()}
          className="px-4 py-2.5 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-[13.5px] transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-lg shadow-[#0F62FE]/20"
        >
          <PlusCircle size={16} />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
        {/* Type pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {[
            { key: 'all', label: 'All Inquiries' },
            { key: 'assessment', label: 'Assessments' },
            { key: 'contact', label: 'Contact Forms' },
            { key: 'appointment', label: 'Appointments' },
            { key: 'download', label: 'Downloads' },
          ].map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-[#0F62FE] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#0F62FE]"
          />
        </div>
      </div>

      {/* Submissions List */}
      <div className="rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden transition-colors">
        {loading ? (
          <div className="py-16 text-center text-sm text-slate-400">Loading your submissions...</div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FileText size={22} />
            </div>
            <p className="text-base font-semibold text-slate-700 dark:text-white/80">
              No inquiries found
            </p>
            <p className="text-xs text-slate-400 dark:text-white/40 mt-1 max-w-sm mx-auto">
              Any time you submit a FinOps assessment, contact request, or appointment using this email, it will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredSubmissions.map(item => (
              <div
                key={item._id}
                onClick={() => setSelectedItem(item)}
                className="p-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA]">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-white/40 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                    {item.subject || (item.data?.serviceInterest ? `Interest in ${item.data.serviceInterest}` : `${item.type.toUpperCase()} Request`)}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-white/60 truncate max-w-xl">
                    {item.message || item.data?.platform || item.data?.spend || 'Form request received and under review.'}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-semibold capitalize px-3 py-1 rounded-full ${
                      item.status === 'converted'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : item.status === 'contacted'
                        ? 'bg-blue-500/10 text-[#0F62FE] dark:text-[#60A5FA]'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {item.status || 'Received'}
                  </span>
                  <ChevronRight size={16} className="text-slate-400 hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────── DETAIL MODAL ─────────────────── */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1F33]/80 backdrop-blur-sm animate-fadeSlide"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#0E1F33] text-slate-900 dark:text-white rounded-2xl shadow-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-500 dark:text-white/70 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA]">
                {selectedItem.type}
              </span>
              <span className="text-xs text-slate-400 dark:text-white/40">
                {new Date(selectedItem.createdAt).toLocaleString()}
              </span>
            </div>

            <h3 className="text-xl font-heading font-bold mb-4">
              {selectedItem.subject || `${selectedItem.type.toUpperCase()} Submission`}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-slate-600 dark:text-white/80">
                  <Mail size={15} className="text-[#0F62FE]" />
                  <span>{selectedItem.email}</span>
                </div>
                {selectedItem.company && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-white/80">
                    <Building size={15} className="text-[#0F62FE]" />
                    <span>{selectedItem.company}</span>
                  </div>
                )}
                {selectedItem.phone && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-white/80">
                    <Phone size={15} className="text-[#0F62FE]" />
                    <span>{selectedItem.phone}</span>
                  </div>
                )}
              </div>

              {selectedItem.message && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-1">
                    Message / Request Details
                  </h4>
                  <p className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedItem.message}
                  </p>
                </div>
              )}

              {selectedItem.data && Object.keys(selectedItem.data).length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50 mb-2">
                    Telemetry & Assessment Inputs
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedItem.data).map(([key, val]) => (
                      <div key={key} className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/5">
                        <span className="text-slate-400 dark:text-white/40 block capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-white/90">
                          {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                <span className="text-xs text-slate-500 dark:text-white/50">Current Status:</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F62FE] dark:text-[#60A5FA]">
                  {selectedItem.status || 'Received'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
