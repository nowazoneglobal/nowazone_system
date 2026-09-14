import React, { useState, useEffect } from 'react';
import {
  getMyTickets,
  getMyTicket,
  createClientTicket,
  addMyTicketMessage,
  TicketItem,
  TicketMessage,
} from '../../api/tickets';
import {
  LifeBuoy,
  PlusCircle,
  Search,
  MessageSquare,
  Clock,
  Send,
  X,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Loader2,
  ArrowLeft,
} from 'lucide-react';

export const PortalTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTicket, setActiveTicket] = useState<TicketItem | null>(null);
  const [loadingTicket, setLoadingTicket] = useState(false);

  // New ticket modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [category, setCategory] = useState('cloud_cost');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Reply message
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Status filter
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadTickets = async () => {
    setLoading(true);
    try {
      const res = await getMyTickets({
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      if (res.status === 'success' && res.data?.tickets) {
        setTickets(res.data.tickets);
      }
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [statusFilter]);

  const handleOpenTicketDetails = async (ticket: TicketItem) => {
    setActiveTicket(ticket);
    setLoadingTicket(true);
    try {
      const res = await getMyTicket(ticket._id);
      if (res.status === 'success' && res.data?.ticket) {
        setActiveTicket(res.data.ticket);
      }
    } catch (err) {
      console.error('Failed to load ticket details:', err);
    } finally {
      setLoadingTicket(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const res = await createClientTicket({
      subject: subject.trim(),
      description: description.trim(),
      priority,
      category,
    });

    setSubmitting(false);

    if (res.status === 'success' && res.data?.ticket) {
      setCreateModalOpen(false);
      setSubject('');
      setDescription('');
      loadTickets();
      handleOpenTicketDetails(res.data.ticket);
    } else {
      setFormError(res.message || 'Failed to create support ticket. Please try again.');
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;

    setSendingReply(true);
    const res = await addMyTicketMessage(activeTicket._id, replyText.trim());
    setSendingReply(false);

    if (res.status === 'success') {
      setReplyText('');
      // Reload active ticket
      const updated = await getMyTicket(activeTicket._id);
      if (updated.status === 'success' && updated.data?.ticket) {
        setActiveTicket(updated.data.ticket);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeSlide">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
            Support Tickets & Engineering Desk
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/60 mt-1">
            Direct communication channel with Nowazone FinOps architects and dedicated engineers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormError(null);
            setCreateModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white font-semibold text-[13.5px] transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-lg shadow-[#0F62FE]/20"
        >
          <PlusCircle size={16} />
          <span>Open New Ticket</span>
        </button>
      </div>

      {/* Main Container: Split or Full depending on active ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tickets List */}
        <div className={`space-y-4 ${activeTicket ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
          {/* Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Tickets' },
              { key: 'open', label: 'Open' },
              { key: 'in_progress', label: 'In Progress' },
              { key: 'resolved', label: 'Resolved' },
            ].map(f => (
              <button
                key={f.key}
                type="button"
                onClick={() => setStatusFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === f.key
                    ? 'bg-[#0F62FE] text-white shadow-sm'
                    : 'bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Ticket items */}
          <div className="rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-white/5 transition-colors">
            {loading ? (
              <div className="py-16 text-center text-sm text-slate-400">Loading tickets...</div>
            ) : tickets.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <LifeBuoy size={22} />
                </div>
                <p className="text-base font-semibold text-slate-700 dark:text-white/80">
                  No tickets found
                </p>
                <p className="text-xs text-slate-400 dark:text-white/40 mt-1">
                  Have a question about cloud rightsizing or billing? Open a ticket.
                </p>
              </div>
            ) : (
              tickets.map(t => {
                const isSelected = activeTicket?._id === t._id;
                return (
                  <div
                    key={t._id}
                    onClick={() => handleOpenTicketDetails(t)}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#0F62FE]/10 border-l-4 border-l-[#0F62FE]'
                        : 'hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-white/50">
                        {t.ticketNumber || `#${t._id.slice(-6)}`}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          t.priority === 'urgent'
                            ? 'bg-red-500/10 text-red-500'
                            : t.priority === 'high'
                            ? 'bg-amber-500/10 text-amber-500'
                            : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/60'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                      {t.subject}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-slate-400 dark:text-white/40 mt-2">
                      <span className="capitalize">{t.status.replace('_', ' ')}</span>
                      <span>
                        {new Date(t.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Ticket Conversation Thread */}
        {activeTicket && (
          <div className="lg:col-span-7 flex flex-col rounded-2xl bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden min-h-[500px]">
            {/* Thread Header */}
            <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">
                    {activeTicket.ticketNumber || `#${activeTicket._id.slice(-6)}`}
                  </span>
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA]">
                    {activeTicket.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {activeTicket.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTicket(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-[500px]">
              {/* Initial ticket message */}
              {activeTicket.description && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-white/40 mb-2">
                    <span className="font-semibold text-slate-700 dark:text-white/80">
                      {activeTicket.requesterName || 'You'} (Original Request)
                    </span>
                    <span>{new Date(activeTicket.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-white/90 whitespace-pre-wrap leading-relaxed">
                    {activeTicket.description}
                  </p>
                </div>
              )}

              {/* Message Thread */}
              {activeTicket.messages?.map((msg, idx) => {
                const isClient = msg.senderName === activeTicket.requesterName;
                return (
                  <div
                    key={msg._id || idx}
                    className={`p-4 rounded-xl ${
                      isClient
                        ? 'bg-[#0F62FE]/10 border border-[#0F62FE]/20 ml-6'
                        : 'bg-emerald-500/10 border border-emerald-500/20 mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800 dark:text-white">
                        {msg.senderName || (isClient ? 'You' : 'Nowazone Engineer')}
                      </span>
                      <span className="text-slate-400 dark:text-white/40">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800 dark:text-white/90 whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Reply Input */}
            <form
              onSubmit={handleSendReply}
              className="p-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-3 bg-slate-50 dark:bg-white/[0.02]"
            >
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Type your reply to our engineering team..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
              />
              <button
                type="submit"
                disabled={sendingReply || !replyText.trim()}
                className="px-4 py-2.5 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-2 cursor-pointer transition-colors"
              >
                {sendingReply ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                <span>Send</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ─────────────────── CREATE TICKET MODAL ─────────────────── */}
      {createModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1F33]/80 backdrop-blur-sm animate-fadeSlide"
          onClick={() => setCreateModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white dark:bg-[#0E1F33] text-slate-900 dark:text-white rounded-2xl shadow-2xl p-6 sm:p-7 border border-slate-200 dark:border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-500 dark:text-white/70 transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="font-heading font-bold text-2xl mb-1">Open Support Ticket</h3>
            <p className="text-xs text-slate-500 dark:text-white/60 mb-5">
              Submit your cloud cost anomaly, licensing query, or engineering support request.
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                  Subject / Summary *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g., Azure VM rightsizing recommendations review"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0A1830] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
                  >
                    <option value="cloud_cost">Cloud Cost & Sizing</option>
                    <option value="architecture">Architecture & Migration</option>
                    <option value="licensing">Microsoft / Google Licensing</option>
                    <option value="telemetry">Spend Telemetry & Reports</option>
                    <option value="general">General Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#0A1830] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-semibold uppercase tracking-wider text-slate-600 dark:text-white/70 mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your workload, affected cloud subscription, or question in detail..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#0F62FE]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/15 text-slate-600 dark:text-white/70 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg bg-[#0F62FE] hover:bg-[#2563EB] text-white text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-[#0F62FE]/20"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <PlusCircle size={16} />}
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
