'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Search,
  RefreshCw,
  Send,
  Phone,
  Mail,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  MessageCircle,
  User,
  Bot,
  ShieldAlert,
  ChevronRight,
  Filter,
  Sparkles,
  Settings as SettingsIcon,
  LifeBuoy,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import api from '@/lib/api';
import { getSocket } from '@/lib/socket';
import { showSuccess, showError, showWarning } from '@/lib/sweetalert';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'bot' | 'agent' | 'system';
  content: string;
  source?: string;
  confidence?: number;
  timestamp: string;
  _id?: string;
}

interface ChatSessionItem {
  _id: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  pageUrl?: string;
  channel: string;
  status: 'open' | 'escalated' | 'resolved' | 'closed';
  lastMessage?: string;
  lastMessageAt?: string;
  unreadByAdmin?: number;
  unreadByClient?: number;
  messages?: ChatMessage[];
  escalatedTicketId?: {
    _id: string;
    ticketNumber?: string;
    status?: string;
  } | null;
  user?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

const CANNED_REPLIES = [
  'Hi there! 👋 How can I assist you with your cloud infrastructure or FinOps today?',
  'Let me review that details for you right now. One moment please!',
  'Would you like to schedule a personalized live demo with one of our FinOps architects?',
  'I have created a priority support ticket for our engineering team to follow up with you.',
  'Is there anything else I can help you with today?',
];

export default function ChatSessionsPage() {
  const [sessions, setSessions] = useState<ChatSessionItem[]>([]);
  const [selectedSession, setSelectedSession] = useState<ChatSessionItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSession, setLoadingSession] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const replyInputRef = useRef<HTMLTextAreaElement | null>(null);

  // Stats calculation
  const openCount = sessions.filter((s) => s.status === 'open').length;
  const escalatedCount = sessions.filter((s) => s.status === 'escalated').length;
  const resolvedCount = sessions.filter((s) => s.status === 'resolved').length;

  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  }, []);

  // Fetch session list
  const fetchSessions = useCallback(
    async (isBackground = false) => {
      if (!isBackground) setLoading(true);
      try {
        const params: Record<string, any> = {
          page,
          limit: 30,
        };
        if (statusFilter !== 'all') {
          params.status = statusFilter;
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        const res = await api.get('/chatbot/sessions', { params });
        const data = res.data?.data;
        if (data?.sessions) {
          setSessions(data.sessions);
          setTotalPages(data.pagination?.pages || 1);
          setTotalCount(data.pagination?.total || 0);

          // If current selected session is updated in list, update local summary
          if (selectedSession) {
            const found = data.sessions.find((s: ChatSessionItem) => s._id === selectedSession._id);
            if (found && found.updatedAt !== selectedSession.updatedAt && !loadingSession) {
              // Refresh selected session details
              fetchSessionDetails(selectedSession._id, true);
            }
          }
        }
      } catch (err: any) {
        console.error('Failed to load chat sessions:', err);
        if (!isBackground) {
          showError(err.response?.data?.message || 'Failed to load conversations.');
        }
      } finally {
        if (!isBackground) setLoading(false);
      }
    },
    [page, statusFilter, searchQuery, selectedSession, loadingSession]
  );

  // Fetch full details of single session
  const fetchSessionDetails = async (id: string, isBackground = false) => {
    if (!isBackground) setLoadingSession(true);
    try {
      const res = await api.get(`/chatbot/sessions/${id}`);
      const session = res.data?.data?.session;
      if (session) {
        setSelectedSession(session);
        // Mark session as read locally
        setSessions((prev) =>
          prev.map((s) => (s._id === id ? { ...s, unreadByAdmin: 0 } : s))
        );
        setTimeout(() => scrollToBottom(false), 80);
      }
    } catch (err: any) {
      console.error('Failed to load session details:', err);
      if (!isBackground) {
        showError(err.response?.data?.message || 'Failed to load session messages.');
      }
    } finally {
      if (!isBackground) setLoadingSession(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [page, statusFilter]);

  // Handle Search submit / debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSessions();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Socket.io Real-time Event Subscriptions
  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();

    const handleNewMessage = (payload: any) => {
      // If the incoming message belongs to currently selected session, refresh conversation
      if (payload?.sessionId && selectedSession && payload.sessionId === selectedSession._id) {
        fetchSessionDetails(selectedSession._id, true);
      }
      // Refresh conversation list in background
      fetchSessions(true);
    };

    socket.on('agent:message', handleNewMessage);
    socket.on('visitor:message', handleNewMessage);
    socket.on('chat:notification', handleNewMessage);

    // Auto-polling interval as fallback
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchSessions(true);
      }
    }, 7000);

    return () => {
      socket.off('agent:message', handleNewMessage);
      socket.off('visitor:message', handleNewMessage);
      socket.off('chat:notification', handleNewMessage);
      clearInterval(interval);
    };
  }, [selectedSession, fetchSessions]);

  // Send Staff Reply
  const handleSendReply = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedSession || !replyText.trim() || sending) return;

    const messageContent = replyText.trim();
    setSending(true);

    // Optimistic UI update
    const optimisticMessage: ChatMessage = {
      role: 'agent',
      content: messageContent,
      source: 'system',
      timestamp: new Date().toISOString(),
    };

    setSelectedSession((prev) =>
      prev
        ? {
            ...prev,
            messages: [...(prev.messages || []), optimisticMessage],
            lastMessage: messageContent,
            lastMessageAt: new Date().toISOString(),
          }
        : null
    );
    setReplyText('');
    setTimeout(() => scrollToBottom(true), 50);

    try {
      const res = await api.post(`/chatbot/sessions/${selectedSession._id}/respond`, {
        message: messageContent,
      });
      if (res.data?.data?.session) {
        setSelectedSession(res.data.data.session);
        fetchSessions(true);
      }
      showSuccess('Reply delivered successfully.');
      if (replyInputRef.current) {
        replyInputRef.current.focus();
      }
    } catch (err: any) {
      console.error('Failed to send reply:', err);
      showError(err.response?.data?.message || 'Failed to send message.');
      // Revert optimism if needed by refetching
      fetchSessionDetails(selectedSession._id, true);
    } finally {
      setSending(false);
    }
  };

  // Update session status (open, escalated, resolved, closed)
  const handleUpdateStatus = async (newStatus: 'open' | 'escalated' | 'resolved' | 'closed') => {
    if (!selectedSession || isUpdatingStatus) return;
    setIsUpdatingStatus(true);
    try {
      const res = await api.patch(`/chatbot/sessions/${selectedSession._id}`, {
        status: newStatus,
      });
      if (res.data?.data?.session) {
        setSelectedSession(res.data.data.session);
        setSessions((prev) =>
          prev.map((s) => (s._id === selectedSession._id ? { ...s, status: newStatus } : s))
        );
        showSuccess(`Session status marked as ${newStatus}.`);
      }
    } catch (err: any) {
      console.error('Failed to update session status:', err);
      showError(err.response?.data?.message || 'Failed to update status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatTimestamp = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const cleanPhoneForWhatsApp = (phone?: string) => {
    if (!phone) return '';
    return phone.replace(/\D/g, '');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open
          </span>
        );
      case 'escalated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <AlertCircle size={12} />
            Escalated
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <CheckCircle2 size={12} />
            Resolved
          </span>
        );
      case 'closed':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <XCircle size={12} />
            Closed
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] min-h-[650px] p-4 lg:p-6 space-y-4">
      {/* ─── Top Header & Metrics Bar ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <MessageSquare size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">Live Chat & WhatsApp Inbox</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Sync
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Omnichannel visitor messaging, WhatsApp deep-links, AI chatbot escalation & live staff replies.
            </p>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border text-xs font-medium">
            <span className="px-2.5 py-1 text-muted-foreground">
              Total: <strong className="text-foreground">{totalCount}</strong>
            </span>
            <span className="px-2.5 py-1 text-emerald-600 dark:text-emerald-400">
              Open: <strong>{openCount}</strong>
            </span>
            <span className="px-2.5 py-1 text-amber-600 dark:text-amber-400">
              Escalated: <strong>{escalatedCount}</strong>
            </span>
          </div>

          <button
            onClick={() => fetchSessions()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition"
            title="Refresh conversations"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition"
          >
            <SettingsIcon size={14} />
            <span>WhatsApp Settings</span>
          </Link>
        </div>
      </div>

      {/* ─── 3-Pane Omnichannel Inbox Grid ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
        {/* ─── LEFT PANE: Conversation List & Filters (4 cols) ───────────────── */}
        <div className="lg:col-span-4 flex flex-col bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm h-full">
          {/* Filter Tabs */}
          <div className="p-3 border-b border-border space-y-2.5">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search visitor, phone, message..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'open', label: 'Open' },
                { id: 'escalated', label: 'Escalated' },
                { id: 'resolved', label: 'Resolved' },
                { id: 'closed', label: 'Closed' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setStatusFilter(tab.id);
                    setPage(1);
                  }}
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors',
                    statusFilter === tab.id
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/25'
                      : 'text-muted-foreground hover:bg-muted/70'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Session Cards List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {loading && sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground space-y-2">
                <RefreshCw size={24} className="animate-spin text-emerald-500" />
                <p className="text-xs">Loading conversations...</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 p-6 text-center text-muted-foreground space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">No conversations found</p>
                  <p className="text-xs mt-1">
                    {searchQuery ? 'Try changing your search terms or filters.' : 'Website visitor chats and WhatsApp inquiries will appear here.'}
                  </p>
                </div>
              </div>
            ) : (
              sessions.map((session) => {
                const isSelected = selectedSession?._id === session._id;
                const cleanPhone = cleanPhoneForWhatsApp(session.visitorPhone);

                return (
                  <button
                    key={session._id}
                    onClick={() => fetchSessionDetails(session._id)}
                    className={cn(
                      'w-full text-left p-3.5 flex items-start gap-3 transition relative hover:bg-muted/50 focus:outline-none',
                      isSelected ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-l-4 border-l-emerald-500' : ''
                    )}
                  >
                    {/* Visitor Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 text-sm">
                        {session.visitorName ? session.visitorName.charAt(0).toUpperCase() : <User size={18} />}
                      </div>
                      {session.visitorPhone && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] shadow-sm" title="WhatsApp Connected">
                          <MessageCircle size={10} />
                        </span>
                      )}
                    </div>

                    {/* Content preview */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="text-xs font-semibold text-foreground truncate max-w-[140px]">
                          {session.visitorName || 'Website Visitor'}
                        </h4>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(session.lastMessageAt || session.updatedAt)}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground truncate mb-1.5">
                        {session.lastMessage || 'Started conversation'}
                      </p>

                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          {getStatusBadge(session.status)}
                          {session.escalatedTicketId && (
                            <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 font-medium">
                              <LifeBuoy size={10} />
                              Ticket
                            </span>
                          )}
                        </div>

                        {session.unreadByAdmin && session.unreadByAdmin > 0 ? (
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                            {session.unreadByAdmin}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-muted/30">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded border border-border bg-card hover:bg-muted disabled:opacity-40"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded border border-border bg-card hover:bg-muted disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* ─── CENTER PANE: Active Conversation History & Reply (5 cols) ───── */}
        <div className="lg:col-span-5 flex flex-col bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm h-full">
          {selectedSession ? (
            <>
              {/* Header */}
              <div className="p-3.5 border-b border-border flex items-center justify-between gap-3 bg-muted/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {selectedSession.visitorName ? selectedSession.visitorName.charAt(0).toUpperCase() : 'V'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {selectedSession.visitorName || 'Website Visitor'}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground truncate">
                      <span>{selectedSession.visitorEmail || 'No email provided'}</span>
                      {selectedSession.visitorPhone && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{selectedSession.visitorPhone}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {getStatusBadge(selectedSession.status)}
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-900/20">
                {loadingSession ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <RefreshCw size={20} className="animate-spin text-emerald-500" />
                  </div>
                ) : !selectedSession.messages || selectedSession.messages.length === 0 ? (
                  <div className="text-center text-muted-foreground text-xs py-12">
                    No messages in this session yet.
                  </div>
                ) : (
                  selectedSession.messages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    const isAgent = msg.role === 'agent';
                    const isBot = msg.role === 'bot';

                    return (
                      <div
                        key={msg._id || idx}
                        className={cn('flex flex-col', isAgent ? 'items-end' : 'items-start')}
                      >
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          {isUser ? (
                            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <User size={11} />
                              {selectedSession.visitorName || 'Visitor'}
                            </span>
                          ) : isAgent ? (
                            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <ShieldAlert size={11} />
                              Staff Agent
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                              <Bot size={11} />
                              Nowazone AI Bot
                              {msg.source && (
                                <span className="text-[9px] px-1 rounded bg-purple-500/10 font-normal">
                                  {msg.source}
                                </span>
                              )}
                            </span>
                          )}
                          <span className="text-[10px] text-muted-foreground">
                            {formatTimestamp(msg.timestamp)}
                          </span>
                        </div>

                        <div
                          className={cn(
                            'max-w-[85%] rounded-2xl px-4 py-2.5 text-xs shadow-sm whitespace-pre-wrap leading-relaxed',
                            isAgent
                              ? 'bg-emerald-600 text-white rounded-br-none'
                              : isBot
                              ? 'bg-card border border-purple-500/20 text-foreground rounded-bl-none'
                              : 'bg-muted/90 text-foreground rounded-bl-none border border-border/60'
                          )}
                        >
                          {msg.content}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Canned Responses Pills */}
              <div className="px-3.5 py-2 border-t border-border/60 bg-card overflow-x-auto no-scrollbar flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1 flex-shrink-0 mr-1">
                  <Zap size={12} className="text-amber-500" /> Canned:
                </span>
                {CANNED_REPLIES.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setReplyText(reply);
                      if (replyInputRef.current) replyInputRef.current.focus();
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-muted/60 hover:bg-muted border border-border text-foreground truncate max-w-[190px] transition"
                    title={reply}
                  >
                    {reply}
                  </button>
                ))}
              </div>

              {/* Staff Reply Composer */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-border bg-card">
                <div className="relative">
                  <textarea
                    ref={replyInputRef}
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                    placeholder="Type reply as Staff Agent (Press Enter to send)..."
                    className="w-full pl-3 pr-24 py-2 text-xs rounded-xl bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-foreground resize-none"
                  />
                  <div className="absolute right-2 bottom-2.5 flex items-center gap-1.5">
                    <button
                      type="submit"
                      disabled={sending || !replyText.trim()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white shadow-sm transition"
                    >
                      {sending ? (
                        <RefreshCw size={13} className="animate-spin" />
                      ) : (
                        <Send size={13} />
                      )}
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <MessageSquare size={28} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Select a conversation</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Choose a visitor session from the left to view message history, reply as an agent, or direct chat via WhatsApp.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ─── RIGHT PANE: Visitor Profile & Omnichannel Tools (3 cols) ────── */}
        <div className="lg:col-span-3 flex flex-col bg-card border border-border/80 rounded-2xl p-4 shadow-sm h-full overflow-y-auto space-y-4">
          {selectedSession ? (
            <>
              {/* Profile Card */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                  Visitor Information
                </h3>

                <div className="bg-muted/40 rounded-xl p-3 border border-border/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Full Name</span>
                    <span className="text-xs font-semibold text-foreground">
                      {selectedSession.visitorName || 'Website Visitor'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Email</span>
                    {selectedSession.visitorEmail ? (
                      <div className="flex items-center gap-1">
                        <a
                          href={`mailto:${selectedSession.visitorEmail}`}
                          className="text-xs text-emerald-600 hover:underline max-w-[120px] truncate"
                          title={selectedSession.visitorEmail}
                        >
                          {selectedSession.visitorEmail}
                        </a>
                        <button
                          onClick={() => copyToClipboard(selectedSession.visitorEmail!, 'email')}
                          className="text-muted-foreground hover:text-foreground"
                          title="Copy email"
                        >
                          {copiedField === 'email' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Not provided</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Phone</span>
                    {selectedSession.visitorPhone ? (
                      <div className="flex items-center gap-1">
                        <a
                          href={`tel:${selectedSession.visitorPhone}`}
                          className="text-xs font-mono text-foreground hover:underline"
                        >
                          {selectedSession.visitorPhone}
                        </a>
                        <button
                          onClick={() => copyToClipboard(selectedSession.visitorPhone!, 'phone')}
                          className="text-muted-foreground hover:text-foreground"
                          title="Copy phone"
                        >
                          {copiedField === 'phone' ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">Not provided</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Page Landed</span>
                    <span className="text-xs font-mono text-muted-foreground max-w-[120px] truncate" title={selectedSession.pageUrl || '/'}>
                      {selectedSession.pageUrl || '/'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Channel</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium text-foreground">
                      {selectedSession.channel || 'widget'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Omnichannel WhatsApp Direct Actions */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Omnichannel Action
                </h3>

                {selectedSession.visitorPhone ? (
                  <a
                    href={`https://wa.me/${cleanPhoneForWhatsApp(selectedSession.visitorPhone)}?text=${encodeURIComponent(
                      `Hello ${selectedSession.visitorName || 'there'}, this is Nowazone Support following up on your inquiry.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-sm transition"
                  >
                    <MessageCircle size={15} />
                    <span>Open WhatsApp Chat</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <div className="p-3 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground">
                    <Phone size={16} className="mx-auto mb-1 text-muted-foreground/60" />
                    Visitor has not entered a phone number for direct WhatsApp.
                  </div>
                )}
              </div>

              {/* Status Management */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Update Session Status
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={isUpdatingStatus || selectedSession.status === 'open'}
                    onClick={() => handleUpdateStatus('open')}
                    className="p-2 text-xs font-medium rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 disabled:opacity-40 transition"
                  >
                    Mark Open
                  </button>
                  <button
                    disabled={isUpdatingStatus || selectedSession.status === 'escalated'}
                    onClick={() => handleUpdateStatus('escalated')}
                    className="p-2 text-xs font-medium rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 disabled:opacity-40 transition"
                  >
                    Escalate
                  </button>
                  <button
                    disabled={isUpdatingStatus || selectedSession.status === 'resolved'}
                    onClick={() => handleUpdateStatus('resolved')}
                    className="p-2 text-xs font-medium rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 disabled:opacity-40 transition"
                  >
                    Mark Resolved
                  </button>
                  <button
                    disabled={isUpdatingStatus || selectedSession.status === 'closed'}
                    onClick={() => handleUpdateStatus('closed')}
                    className="p-2 text-xs font-medium rounded-xl border border-border bg-muted hover:bg-muted/80 text-foreground disabled:opacity-40 transition"
                  >
                    Close Chat
                  </button>
                </div>
              </div>

              {/* Linked Ticket Section */}
              {selectedSession.escalatedTicketId && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <LifeBuoy size={14} />
                      Support Ticket
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      {selectedSession.escalatedTicketId.ticketNumber || 'TICKET'}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    This conversation was escalated into a formal ticket.
                  </p>
                  <Link
                    href="/dashboard/tickets"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:underline"
                  >
                    <span>View in Tickets</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center text-muted-foreground space-y-2">
              <Sparkles size={24} className="text-emerald-500" />
              <p className="text-xs">Visitor details and WhatsApp quick-actions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
