import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { apiUrl } from '../../api/base';
import {
  MessageSquare,
  Send,
  X,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from 'lucide-react';

interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  displayNumber: string;
  defaultMessage: string;
  widgetPosition: 'bottom-right' | 'bottom-left';
  agentName: string;
  greetingMessage: string;
  allowInBrowserChat: boolean;
}

interface ChatMessage {
  role: 'user' | 'bot' | 'agent';
  content: string;
  createdAt?: string;
}

const DEFAULT_SETTINGS: WhatsAppSettings = {
  enabled: true,
  phoneNumber: '18005550199',
  displayNumber: '+1 (800) 555-0199',
  defaultMessage: 'Hi Nowazone team! I would like to inquire about cloud FinOps and cost optimization.',
  widgetPosition: 'bottom-right',
  agentName: 'Nowazone FinOps Desk',
  greetingMessage: 'Hi there! 👋 Need help with cloud costs, FinOps, or migration? Chat with our team directly on WhatsApp or right here.',
  allowInBrowserChat: true,
};

// Quick contextual chips according to the current URL route
const getContextualPills = (pathname: string): { label: string; text: string }[] => {
  if (pathname.includes('ai-tokenomics')) {
    return [
      { label: '🤖 AI Tokenomics Audit', text: 'Hi! I am interested in an AI Tokenomics & GPU cost optimization audit.' },
      { label: '📉 GPU Waste Calculation', text: 'Hi, we want to benchmark our GPU utilization and cut idle AI container spend.' },
      { label: '💬 Talk to AI FinOps Architect', text: 'Hi, I would like to consult with a FinOps Certified AI Value specialist.' },
    ];
  }
  if (pathname.includes('cloud-migration')) {
    return [
      { label: '☁️ Cloud Migration Review', text: 'Hi! We are planning a cloud migration and need an infrastructure review and cost model.' },
      { label: '🎯 Cutover Strategy', text: 'Hi, we want to discuss wave planning and zero-downtime cutover execution.' },
    ];
  }
  if (pathname.includes('managed-service')) {
    return [
      { label: '🛠️ 24/7 Cloud Ops Support', text: 'Hi! I want to inquire about your Managed Cloud Operations and L1/L2 engineering support.' },
      { label: '👨‍💻 Dedicated Engineers', text: 'Hi, we are looking for dedicated certified FinOps engineers to augment our team.' },
    ];
  }
  if (pathname.includes('pricing-models')) {
    return [
      { label: '💰 Custom Pricing Inquiry', text: 'Hi! I would like details on your fixed-scope vs. gain-share FinOps pricing models.' },
      { label: '📊 Enterprise Quote', text: 'Hi, our cloud spend is significant and we would like a custom enterprise proposal.' },
    ];
  }
  if (pathname.includes('partner-program')) {
    return [
      { label: '🤝 Partner Program Inquiry', text: 'Hi! We are a CSP/MSP interested in white-labeling Nowazone FinOps services.' },
    ];
  }
  if (pathname.includes('cost-estimator')) {
    return [
      { label: '📐 Custom Architecture Estimate', text: 'Hi! I ran an estimate on your calculator and want to verify enterprise discounts.' },
    ];
  }
  return [
    { label: '⚡ Free Cost X-Ray Assessment', text: 'Hi Nowazone team! I would like to book a Free Cost X-Ray Assessment for our cloud accounts.' },
    { label: '💡 Multi-Cloud FinOps Review', text: 'Hi! We run AWS/Azure/GCP workloads and need assistance with unit cost governance.' },
    { label: '👨‍💼 Speak with an Architect', text: 'Hi! Can I speak directly with a certified FinOps practitioner today?' },
  ];
};

export const WhatsAppWidget: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'livechat'>('whatsapp');
  const [settings, setSettings] = useState<WhatsAppSettings>(DEFAULT_SETTINGS);
  const [customMessage, setCustomMessage] = useState('');

  // Live in-browser chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Fetch dynamic WhatsApp settings from the backend admin settings API
  useEffect(() => {
    let cancelled = false;
    async function loadPublicSettings() {
      try {
        const res = await fetch(apiUrl('/api/settings/public'));
        if (res.ok) {
          const json = await res.json();
          if (!cancelled && json.status === 'success' && json.data?.whatsapp) {
            setSettings({
              enabled: json.data.whatsapp.enabled ?? true,
              phoneNumber: json.data.whatsapp.phoneNumber || DEFAULT_SETTINGS.phoneNumber,
              displayNumber: json.data.whatsapp.displayNumber || DEFAULT_SETTINGS.displayNumber,
              defaultMessage: json.data.whatsapp.defaultMessage || DEFAULT_SETTINGS.defaultMessage,
              widgetPosition: json.data.whatsapp.widgetPosition || DEFAULT_SETTINGS.widgetPosition,
              agentName: json.data.whatsapp.agentName || DEFAULT_SETTINGS.agentName,
              greetingMessage: json.data.whatsapp.greetingMessage || DEFAULT_SETTINGS.greetingMessage,
              allowInBrowserChat: json.data.whatsapp.allowInBrowserChat ?? true,
            });
          }
        }
      } catch {
        // graceful offline fallback
      }
    }
    loadPublicSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  // Restore stored session and chat history if existing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedSession = localStorage.getItem('nowazone_chat_session_id');
    const storedName = localStorage.getItem('nowazone_visitor_name') || '';
    const storedEmail = localStorage.getItem('nowazone_visitor_email') || '';
    if (storedName) setVisitorName(storedName);
    if (storedEmail) setVisitorEmail(storedEmail);

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

  // Auto-scroll chat stream
  useEffect(() => {
    if (isOpen && activeTab === 'livechat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isOpen, activeTab]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!settings.enabled) return null;

  // Sanitize phone number to E.164 without punctuation (digits only)
  const cleanPhone = (settings.phoneNumber || '').replace(/\D/g, '') || '18005550199';

  const handleLaunchWhatsApp = (textToSend?: string) => {
    const text = (textToSend || customMessage || settings.defaultMessage).trim();
    const pageRef = typeof window !== 'undefined' ? `\n\n(From: ${window.location.href})` : '';
    const fullMessage = `${text}${pageRef}`;
    const encoded = encodeURIComponent(fullMessage);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendLiveChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || isSendingChat) return;

    setIsSendingChat(true);
    const newMsg: ChatMessage = { role: 'user', content: text, createdAt: new Date().toISOString() };
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');

    try {
      if (visitorName) localStorage.setItem('nowazone_visitor_name', visitorName);
      if (visitorEmail) localStorage.setItem('nowazone_visitor_email', visitorEmail);

      const res = await fetch(apiUrl('/api/chatbot/public/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId || undefined,
          visitorName: visitorName.trim() || 'Website Visitor',
          visitorEmail: visitorEmail.trim() || undefined,
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
          {
            role: 'bot',
            content: 'Our FinOps desk has received your inquiry and will follow up shortly!',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: 'Unable to connect to live chat. You can reach us directly on WhatsApp below!',
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const contextualPills = getContextualPills(location.pathname);
  const isLeft = settings.widgetPosition === 'bottom-left';

  return (
    <div
      ref={widgetRef}
      className={`fixed z-30 flex flex-col items-end ${
        isLeft ? 'left-4 sm:left-6 bottom-4 sm:bottom-6 items-start' : 'right-4 sm:right-6 bottom-4 sm:bottom-6'
      }`}
    >
      {/* ── EXPANDABLE CHAT BOX ────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Nowazone WhatsApp & Live Chat Desk"
          className="mb-3 w-[92vw] sm:w-[380px] max-h-[580px] h-[520px] rounded-2xl bg-white dark:bg-[#0E1F33] text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-fadeSlide transition-all"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] dark:from-[#08332E] dark:to-[#0D4D43] p-4 text-white flex items-center justify-between shadow-sm relative">
            <div className="flex items-center gap-3">
              {/* Agent Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-bold font-heading text-sm border border-white/30 backdrop-blur-md">
                  <span>NZ</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold text-sm text-white leading-tight">
                    {settings.agentName}
                  </h3>
                  <ShieldCheck size={14} className="text-[#25D366]" />
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                  <span>Online · Typically replies in 5m</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat widget"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tab Selector */}
          {settings.allowInBrowserChat && (
            <div className="flex border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A1830] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('whatsapp')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'whatsapp'
                    ? 'border-[#25D366] text-[#075E54] dark:text-[#25D366] bg-white dark:bg-[#0E1F33]'
                    : 'border-transparent text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                </svg>
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('livechat')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'livechat'
                    ? 'border-[#0F62FE] text-[#0F62FE] dark:text-[#60A5FA] bg-white dark:bg-[#0E1F33]'
                    : 'border-transparent text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare size={14} />
                <span>Live Chat</span>
              </button>
            </div>
          )}

          {/* ── TAB 1: WHATSAPP CLICK-TO-CHAT ──────────────────────────── */}
          {activeTab === 'whatsapp' && (
            <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-between bg-slate-50/50 dark:bg-[#0E1F33]/80 space-y-4">
              <div className="space-y-3">
                {/* Greeting Bubble */}
                <div className="p-3.5 rounded-2xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 shadow-sm text-xs leading-relaxed text-slate-700 dark:text-white/90">
                  <p>{settings.greetingMessage}</p>
                  <span className="block text-[10px] text-slate-400 dark:text-white/40 mt-1.5 font-mono">
                    Official WhatsApp: {settings.displayNumber}
                  </span>
                </div>

                {/* Contextual Suggestion Pills */}
                <div>
                  <span className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/50 mb-2">
                    Quick Inquiries (Tap to open)
                  </span>
                  <div className="space-y-1.5">
                    {contextualPills.map((pill, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleLaunchWhatsApp(pill.text)}
                        className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 hover:border-[#25D366] hover:bg-[#25D366]/5 dark:hover:bg-[#25D366]/10 text-xs text-slate-700 dark:text-white/90 flex items-center justify-between group transition-all cursor-pointer"
                      >
                        <span className="font-medium truncate pr-2">{pill.label}</span>
                        <ArrowRight size={13} className="text-slate-400 group-hover:text-[#25D366] shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Message Field */}
                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/50 mb-1.5">
                    Or type your question
                  </label>
                  <textarea
                    rows={2}
                    value={customMessage}
                    onChange={e => setCustomMessage(e.target.value)}
                    placeholder="How can we help optimize your cloud environment?"
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 outline-none focus:border-[#25D366] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleLaunchWhatsApp()}
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-heading font-bold text-xs shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zM12.05 3.67c4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.16-.48-.28z" />
                </svg>
                <span>Continue on WhatsApp →</span>
              </button>
            </div>
          )}

          {/* ── TAB 2: LIVE IN-BROWSER CHAT ────────────────────────────── */}
          {activeTab === 'livechat' && (
            <div className="flex-1 flex flex-col justify-between bg-slate-50/50 dark:bg-[#0E1F33]/80 overflow-hidden">
              {/* Message Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {/* Initial greeting if empty */}
                {chatMessages.length === 0 && (
                  <div className="p-3 rounded-xl bg-white dark:bg-[#142A45] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-white/80">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Welcome to Nowazone Live Desk!
                    </p>
                    <p>
                      Ask any question about cloud cost reduction, Microsoft / Google licensing, or infrastructure architecture. An engineer will answer you directly.
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
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={handleSendLiveChatMessage}
                className="p-3 bg-white dark:bg-[#0A1830] border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
              >
                <input
                  type="text"
                  required
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isSendingChat}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#142A45] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 outline-none focus:border-[#0F62FE]"
                />
                <button
                  type="submit"
                  disabled={isSendingChat || !chatInput.trim()}
                  className="p-2 rounded-xl bg-[#0F62FE] hover:bg-[#2563EB] text-white disabled:opacity-50 transition-all cursor-pointer shrink-0"
                >
                  {isSendingChat ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ── FLOATING ACTION BADGE BUTTON ────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle WhatsApp & Live Chat"
        className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        {/* Animated Green Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zM12.05 3.67c4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.25-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.16-.48-.28z" />
        </svg>

        <span className="font-heading font-bold text-xs tracking-wide pr-1 hidden sm:inline-block">
          {isOpen ? 'Close Desk' : 'Chat with Us'}
        </span>
      </button>
    </div>
  );
};
