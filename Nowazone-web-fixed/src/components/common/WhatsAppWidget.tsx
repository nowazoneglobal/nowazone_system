import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { apiUrl } from '../../api/base';
import {
  MessageSquare,
  Send,
  X,
  ShieldCheck,
  Loader2,
  ArrowRight,
} from 'lucide-react';

interface ChatSettings {
  enabled: boolean;
  widgetPosition: 'bottom-right' | 'bottom-left';
  agentName: string;
  greetingMessage: string;
}

interface ChatMessage {
  role: 'user' | 'bot' | 'agent';
  content: string;
  createdAt?: string;
}

// Phase 1: collect visitor info. Phase 2: active chat.
type ChatPhase = 'gate' | 'chat';

const DEFAULT_SETTINGS: ChatSettings = {
  enabled: true,
  widgetPosition: 'bottom-right',
  agentName: 'Nowazone FinOps Desk',
  greetingMessage:
    'Hi there! Need help with cloud costs, FinOps, or migration? Our team is ready to help.',
};

export const WhatsAppWidget: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);

  // Gate form state
  const [phase, setPhase] = useState<ChatPhase>('gate');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [gateError, setGateError] = useState('');
  const [gateLoading, setGateLoading] = useState(false);

  // Active chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Load public settings from backend
  useEffect(() => {
    let cancelled = false;
    async function loadSettings() {
      try {
        const res = await fetch(apiUrl('/api/settings/public'));
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json.status === 'success' && json.data?.whatsapp) {
            const w = json.data.whatsapp;
            setSettings({
              enabled: w.enabled ?? true,
              widgetPosition: w.widgetPosition || 'bottom-right',
              agentName: w.agentName || DEFAULT_SETTINGS.agentName,
              greetingMessage: w.greetingMessage || DEFAULT_SETTINGS.greetingMessage,
            });
          }
        }
      } catch {
        // fallback to defaults
      }
    }
    loadSettings();
    return () => { cancelled = true; };
  }, []);

  // Restore stored session / visitor info
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedSession = localStorage.getItem('nowazone_chat_session_id');
    const storedName = localStorage.getItem('nowazone_visitor_name') || '';
    const storedEmail = localStorage.getItem('nowazone_visitor_email') || '';

    if (storedName && storedEmail) {
      setVisitorName(storedName);
      setVisitorEmail(storedEmail);
      setNameInput(storedName);
      setEmailInput(storedEmail);
      setPhase('chat');
    }

    if (storedSession) {
      setSessionId(storedSession);
      fetch(apiUrl(`/api/chatbot/public/session/${encodeURIComponent(storedSession)}`))
        .then(r => r.json())
        .then(data => {
          if (data.status === 'success' && data.data?.session?.messages) {
            setChatMessages(data.data.session.messages);
          }
        })
        .catch(() => {});
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen && phase === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isOpen, phase]);

  // Focus chat input when chat opens
  useEffect(() => {
    if (isOpen && phase === 'chat') {
      setTimeout(() => chatInputRef.current?.focus(), 120);
    }
  }, [isOpen, phase]);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  if (!settings.enabled) return null;

  const isLeft = settings.widgetPosition === 'bottom-left';

  // Gate form submit
  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameInput.trim();
    const email = emailInput.trim().toLowerCase();

    if (!name) { setGateError('Please enter your name.'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGateError('Please enter a valid email address.');
      return;
    }

    setGateError('');
    setGateLoading(true);

    localStorage.setItem('nowazone_visitor_name', name);
    localStorage.setItem('nowazone_visitor_email', email);
    setVisitorName(name);
    setVisitorEmail(email);

    // Fire initial message to create backend session
    try {
      const res = await fetch(apiUrl('/api/chatbot/public/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Hi, I'm ${name}. I'd like to chat with your team.`,
          sessionId: undefined,
          visitorName: name,
          visitorEmail: email,
          pageUrl: location.pathname,
        }),
      });
      const data = await res.json();
      if (data.status === 'success' && data.data) {
        if (data.data.session?._id) {
          setSessionId(data.data.session._id);
          localStorage.setItem('nowazone_chat_session_id', data.data.session._id);
        }
        const initial: ChatMessage[] = [
          { role: 'user', content: `Hi, I'm ${name}. I'd like to chat with your team.`, createdAt: new Date().toISOString() },
        ];
        if (data.data.reply) {
          initial.push({ role: 'bot', content: data.data.reply, createdAt: new Date().toISOString() });
        }
        setChatMessages(initial);
      }
    } catch {
      setChatMessages([
        { role: 'bot', content: `Welcome ${name}! How can our FinOps team help you today?`, createdAt: new Date().toISOString() },
      ]);
    } finally {
      setGateLoading(false);
      setPhase('chat');
    }
  };

  // Send chat message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || isSending) return;

    setIsSending(true);
    setChatMessages(prev => [...prev, { role: 'user', content: text, createdAt: new Date().toISOString() }]);
    setChatInput('');

    try {
      const res = await fetch(apiUrl('/api/chatbot/public/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId || undefined,
          visitorName: visitorName || 'Website Visitor',
          visitorEmail: visitorEmail || undefined,
          pageUrl: location.pathname,
        }),
      });
      const data = await res.json();
      if (data.status === 'success' && data.data) {
        if (data.data.session?._id) {
          setSessionId(data.data.session._id);
          localStorage.setItem('nowazone_chat_session_id', data.data.session._id);
        }
        if (data.data.reply) {
          setChatMessages(prev => [
            ...prev,
            { role: 'bot', content: data.data.reply, createdAt: new Date().toISOString() },
          ]);
        }
      } else {
        setChatMessages(prev => [
          ...prev,
          { role: 'bot', content: 'Our FinOps team has received your message and will follow up shortly!', createdAt: new Date().toISOString() },
        ]);
      }
    } catch {
      setChatMessages(prev => [
        ...prev,
        { role: 'bot', content: 'We received your message! A team member will reply to your email shortly.', createdAt: new Date().toISOString() },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  // Reset / new session
  const handleReset = () => {
    localStorage.removeItem('nowazone_chat_session_id');
    localStorage.removeItem('nowazone_visitor_name');
    localStorage.removeItem('nowazone_visitor_email');
    setSessionId(null);
    setVisitorName('');
    setVisitorEmail('');
    setNameInput('');
    setEmailInput('');
    setChatMessages([]);
    setChatInput('');
    setPhase('gate');
  };

  return (
    <div
      ref={widgetRef}
      className={`fixed z-30 flex flex-col items-end ${
        isLeft
          ? 'left-4 sm:left-6 bottom-4 sm:bottom-6 items-start'
          : 'right-4 sm:right-6 bottom-4 sm:bottom-6'
      }`}
    >
      {/* Chat box */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nowazone Live Chat"
          className="mb-3 w-[92vw] sm:w-[380px] max-h-[580px] rounded-2xl bg-white dark:bg-[#0E1F33] text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fadeSlide"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0F62FE] to-[#2563EB] dark:from-[#0A3A8C] dark:to-[#1344B4] p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-sm border border-white/30 backdrop-blur-md">
                  <span>NZ</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0F62FE] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white leading-tight">{settings.agentName}</h3>
                  <ShieldCheck size={14} className="text-emerald-300" />
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Online - Typically replies in 5m</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {phase === 'chat' && (
                <button
                  type="button"
                  onClick={handleReset}
                  title="Start a new chat session"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-base font-bold"
                >
                  &#8635;
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Phase 1: Email / Name gate */}
          {phase === 'gate' && (
            <div className="flex-1 p-5 overflow-y-auto flex flex-col bg-slate-50/60 dark:bg-[#0E1F33]/80 space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 shadow-sm text-xs leading-relaxed text-slate-700 dark:text-white/90">
                <p>{settings.greetingMessage}</p>
              </div>

              <p className="text-[11px] font-semibold text-slate-500 dark:text-white/50 uppercase tracking-wider">
                Please introduce yourself to start chatting:
              </p>

              <form onSubmit={handleGateSubmit} className="space-y-3" noValidate>
                <div>
                  <label
                    htmlFor="chat-visitor-name"
                    className="block text-[11px] font-bold text-slate-600 dark:text-white/70 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="chat-visitor-name"
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    autoComplete="name"
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/15 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/35 outline-none focus:border-[#0F62FE] dark:focus:border-[#60A5FA] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="chat-visitor-email"
                    className="block text-[11px] font-bold text-slate-600 dark:text-white/70 mb-1"
                  >
                    Work Email <span className="text-[#0F62FE]">*</span>
                  </label>
                  <input
                    id="chat-visitor-email"
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/15 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/35 outline-none focus:border-[#0F62FE] dark:focus:border-[#60A5FA] transition-colors"
                  />
                  {gateError && (
                    <p className="text-[10.5px] text-red-500 mt-1.5">{gateError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={gateLoading}
                  className="w-full py-2.5 rounded-xl bg-[#0F62FE] hover:bg-[#2563EB] disabled:opacity-60 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#0F62FE]/25 cursor-pointer"
                >
                  {gateLoading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <>
                      <span>Start Chatting</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400 dark:text-white/35 leading-relaxed">
                  Your email is only used to follow up on this conversation. We never share it.
                </p>
              </form>
            </div>
          )}

          {/* Phase 2: Live chat */}
          {phase === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 dark:bg-[#0E1F33]/80">
              {/* Visitor tag bar */}
              <div className="px-4 py-2 border-b border-slate-100 dark:border-white/5 bg-white/80 dark:bg-[#0A1830]/60 flex items-center gap-1.5 text-[10.5px] text-slate-500 dark:text-white/40">
                <span>Chatting as</span>
                <span className="font-semibold text-slate-700 dark:text-white/70">{visitorName || 'You'}</span>
                <span className="text-slate-300 dark:text-white/20">|</span>
                <span className="truncate max-w-[160px]">{visitorEmail}</span>
              </div>

              {/* Message stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.length === 0 && (
                  <div className="p-3 rounded-xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-white/80">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Welcome to Nowazone Live Desk!
                    </p>
                    <p>
                      Ask anything about cloud cost reduction, Microsoft / Google licensing,
                      or infrastructure architecture. An engineer will answer directly.
                    </p>
                  </div>
                )}

                {chatMessages.map((m, i) => {
                  const isUser = m.role === 'user';
                  return (
                    <div
                      key={i}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? 'bg-[#0F62FE] text-white rounded-br-none shadow-sm'
                            : 'bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      </div>
                      <span className="text-[9.5px] text-slate-400 dark:text-white/40 px-1">
                        {isUser ? 'You' : m.role === 'agent' ? 'Nowazone Staff' : 'AI Assistant'}
                      </span>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isSending && (
                  <div className="flex items-start gap-2">
                    <div className="px-4 py-2.5 rounded-2xl rounded-bl-none bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 shadow-sm flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-white dark:bg-[#0A1830] border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
              >
                <input
                  ref={chatInputRef}
                  type="text"
                  required
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isSending}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#142A45] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 outline-none focus:border-[#0F62FE] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isSending || !chatInput.trim()}
                  className="p-2 rounded-xl bg-[#0F62FE] hover:bg-[#2563EB] text-white disabled:opacity-50 transition-all cursor-pointer shrink-0"
                >
                  {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Floating action button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle Live Chat"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-[#0F62FE] hover:bg-[#2563EB] text-white shadow-xl shadow-[#0F62FE]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span className="absolute -inset-0 rounded-full bg-[#0F62FE]/10 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
        <MessageSquare size={22} className="shrink-0" />
        <span className="font-bold text-xs tracking-wide pr-1 hidden sm:inline-block">
          {isOpen ? 'Close Chat' : 'Live Chat'}
        </span>
      </button>
    </div>
  );
};
