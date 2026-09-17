import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { FinOpsCycleRadar } from '../components/common/FinOpsCycleRadar';
import { Marquee } from '../components/common/Marquee';
import { useModals } from '../context/ModalContext';
import { ChevronRight, ArrowRight, CheckCircle2, Shield, Lock, Clock, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { openAssessmentModal } = useModals();

  // ─── Hero Live Dashboard State ──────────────────────────────────────────────
  const targets = { spend: 2480000, optOpp: 462000, savings: 324000, allocation: 84, anomalies: 7, variance: 6.4 };
  const [metrics, setMetrics] = useState(targets);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideTitles = [
    'Cloud Economics Intelligence',
    'Optimization & Savings',
    'Forecast & Anomalies',
    'Multi-Cloud Overview',
    'AI & GenAI Cost',
  ];

  // Jitter simulation
  useEffect(() => {
    const jitter = setInterval(() => {
      setMetrics({
        spend: targets.spend + (Math.random() - 0.5) * 6000,
        optOpp: targets.optOpp + (Math.random() - 0.5) * 4000,
        savings: targets.savings + Math.random() * 1400,
        allocation: Math.max(88, Math.min(94, targets.allocation + (Math.random() - 0.5) * 2)),
        anomalies: Math.max(4, Math.min(11, Math.round(targets.anomalies + (Math.random() - 0.5) * 4))),
        variance: targets.variance + (Math.random() - 0.5) * 0.6,
      });
    }, 2600);

    const slideTimer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % 5);
    }, 7000);

    return () => {
      clearInterval(jitter);
      clearInterval(slideTimer);
    };
  }, []);

  const fmtM = (n: number) => `$${(n / 1e6).toFixed(2)}M`;
  const fmtK = (n: number) => `$${Math.round(n / 1000)}K`;

  // ─── Credibility Pills State ────────────────────────────────────────────────
  const pillMeta = [
    { label: 'MICROSOFT AZURE', desc: 'Azure financial engineering & managed services — governance, rightsizing and reserved capacity planning for enterprise Azure estates' },
    { label: 'AWS', desc: 'AWS rate management, Savings Plans & Reserved Instance strategy — continuous rightsizing and commitment coverage across every account' },
    { label: 'GOOGLE CLOUD', desc: 'Google Cloud (GCP) Committed Use Discount governance — spend visibility, budgets and resource efficiency for BigQuery, GKE and Compute workloads' },
    { label: 'MULTI-CLOUD', desc: 'Cross-platform financial management across Azure, AWS & GCP — one consistent operational practice spanning every provider you run' },
    { label: 'FINOPS', desc: 'FinOps as a Service — financial governance for modern enterprises, from visibility and allocation through continuous optimization' },
    { label: 'CLOUD ARCHITECTURE', desc: 'Architecture review & sustainable design consulting — engineering-led recommendations that reduce overhead without adding risk' },
    { label: 'AI WORKLOADS', desc: 'AI & GPU workload optimization for LLM and GenAI stacks — token economics, cluster utilization and inference efficiency' },
  ];
  const [activePill, setActivePill] = useState(0);

  // ─── 8 FinOps Capabilities State ───────────────────────────────────────────
  const capMeta = [
    { title: 'Infrastructure Visibility', desc: 'Normalize billing, usage and telemetry data across diverse environments.', stat: '100%', statLabel: 'billing data normalized', bars: [70, 45, 88, 60] },
    { title: 'Allocation & Accountability', desc: 'Connect infrastructure spend to teams, products, projects and business owners.', stat: '91%', statLabel: 'spend allocated to owners', bars: [82, 65, 40, 91] },
    { title: 'Forecasting & Budgeting', desc: 'Build predictive forecasts, budgets and variance tracking.', stat: '±6.4%', statLabel: 'forecast variance', bars: [55, 62, 70, 68] },
    { title: 'Rate Optimization', desc: 'Identify and prioritize savings opportunities across infrastructure and architecture.', stat: '$412K', statLabel: 'opportunity identified', bars: [90, 74, 58, 66] },
    { title: 'Commitment Optimization', desc: 'Evaluate reservations, savings plans and commitment-based discounts.', stat: '68%', statLabel: 'commitment coverage', bars: [68, 50, 44, 72] },
    { title: 'Policy Governance', desc: 'Create policies, tagging standards, guardrails and automated controls.', stat: '96%', statLabel: 'tagging compliance', bars: [96, 80, 55, 62] },
    { title: 'Unit Economics', desc: 'Connect technology spend to meaningful business and product metrics.', stat: '$0.042', statLabel: 'cost per transaction', bars: [40, 66, 78, 52] },
    { title: 'Engineering Automation', desc: 'Turn recommendations into repeatable workflows and engineering action.', stat: '24', statLabel: 'automated workflows live', bars: [60, 84, 70, 90] },
  ];
  const [activeCap, setActiveCap] = useState(0);

  // ─── Phase Cycle for 3D Radar ───────────────────────────────────────────────
  const phases = ['PLAN', 'MEASURE', 'ALLOCATE', 'ANALYZE', 'OPTIMIZE', 'FORECAST', 'GOVERN', 'CONTINUOUSLY IMPROVE'];
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhaseIndex(prev => (prev + 1) % 8);
    }, 1700);
    return () => clearInterval(phaseTimer);
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Nowazone",
        "url": "https://www.nowazone.com",
        "logo": "https://www.nowazone.com/assets/favicon.png",
        "description": "Nowazone delivers multi-cloud FinOps and cost optimization across AWS, Azure, and Google Cloud with transparent flat fees.",
        "sameAs": [
          "https://www.linkedin.com/company/nowazone",
          "https://twitter.com/nowazone",
          "https://github.com/nowazone"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "info@nowazone.com",
          "availableLanguage": ["English"]
        },
        "knowsAbout": [
          "FinOps",
          "Cloud Cost Optimization",
          "Azure Cost Management",
          "AWS Cost Optimization",
          "Google Cloud FinOps",
          "AI Tokenomics & GPU Governance"
        ],
        "publishingPrinciples": "https://www.nowazone.com/trust-and-security"
      },
      {
        "@type": "Service",
        "serviceType": "FinOps as a Service",
        "provider": { "@type": "Organization", "name": "Nowazone", "url": "https://www.nowazone.com" },
        "areaServed": "Worldwide",
        "description": "Financial governance, multi-cloud cost optimization and AI/GPU workload governance across AWS, Azure and Google Cloud."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does FinOps as a Service cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nowazone's FinOps as a Service starts with a free Cost X-Ray Assessment, followed by a paid Cloud Cost Leak Review ($750–$1,250) or an ongoing FinOps Partner retainer starting from $1,500/month."
            }
          },
          {
            "@type": "Question",
            "name": "What is included in a cloud cost assessment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full billing and architecture review, a savings opportunity breakdown by category, and an executive summary you keep whether or not you continue with Nowazone."
            }
          },
          {
            "@type": "Question",
            "name": "Is my cloud data secure during the assessment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nowazone works under NDA, MCA and SOW agreements with read-only access to your environment."
            }
          },
          {
            "@type": "Question",
            "name": "Can I switch or cancel a FinOps Partner engagement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FinOps Partner engagements run on a flat monthly retainer with no long-term lock-in."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-base-100 text-base-content font-sans">
      <SEO
        title="FinOps & Cloud Cost Optimization | Nowazone"
        description="Nowazone delivers multi-cloud FinOps and cost optimization across AWS, Azure, and Google Cloud with transparent flat fees. Claim your free Cost X-Ray."
        canonical="https://www.nowazone.com/"
        ogTitle="FinOps & Cloud Cost Optimization | Nowazone"
        ogDescription="Nowazone delivers multi-cloud FinOps and cost optimization across AWS, Azure, and Google Cloud with transparent flat fees. Claim your free Cost X-Ray."
        schema={schema}
      />

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION (Clean Subtle Background, Refined Layout & Adaptability)
          ══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative pt-24 pb-16 sm:py-20 md:py-24 px-6 sm:px-10 overflow-hidden bg-base-100 dark:bg-[#060a12] border-b border-base-300 transition-colors">
        {/* Subtle, Static High-End Ambient Background (Zero distracting moving nodes) */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent dark:from-[#0F62FE]/10 dark:via-transparent dark:to-transparent" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.04] bg-[radial-gradient(#0F62FE_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative z-10 max-w-[1360px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div>
              <span className="block text-[12px] tracking-[0.14em] uppercase text-[#0F62FE] dark:text-[#60a5fa] font-bold font-heading mb-3">
                FinOps as a Service
              </span>

              <h1 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[1.08] tracking-tight mb-4 text-slate-900 dark:text-white">
                FinOps &amp; Cloud Cost Optimization That Turns Spend Into Business Value.
              </h1>

              <p className="text-[16px] leading-[1.65] text-slate-600 dark:text-white/75 max-w-[48ch] mb-6">
                Nowazone helps organizations understand, control and optimize cloud spending across AWS, Azure, Google Cloud and multi-cloud and AI platforms — with FinOps, engineering and business teams working from the same financial intelligence.
              </p>

              {/* Refined CTAs (No harsh effects or pulsing glow) */}
              <div className="flex flex-wrap gap-3.5 mb-6">
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold text-[15px] py-3.5 px-7 rounded-lg transition-colors shadow-sm hover:shadow cursor-pointer select-none"
                >
                  Free Cost X-Ray Assessment
                </button>

                <a
                  href="#finops"
                  className="inline-flex items-center border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-white font-semibold text-[14px] py-3.5 px-6 rounded-lg transition-colors select-none"
                >
                  Explore FinOps as a Service
                </a>
              </div>

              {/* FinOps Pipeline Ribbon (Refined Responsive Connected Lifecycle) */}
              <div className="flex items-center flex-wrap gap-1.5 text-[11px] sm:text-[11.5px] font-bold tracking-wider font-heading mb-6 select-none">
                <span className="bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA] py-1.5 px-3 rounded-md border border-[#0F62FE]/20">
                  VISIBILITY
                </span>
                <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold">→</span>
                <span className="bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA] py-1.5 px-3 rounded-md border border-[#0F62FE]/20">
                  ACCOUNTABILITY
                </span>
                <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold">→</span>
                <span className="bg-[#0F62FE]/10 text-[#0F62FE] dark:text-[#60A5FA] py-1.5 px-3 rounded-md border border-[#0F62FE]/20">
                  OPTIMIZATION
                </span>
                <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold">→</span>
                <span className="bg-[#0F62FE] text-white py-1.5 px-3.5 rounded-md shadow-sm">
                  CONTINUOUS IMPROVEMENT
                </span>
              </div>

              {/* Symmetrical Theme-Adaptive Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-2.5 items-start bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 shadow-sm transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#0F62FE]/10 dark:bg-[#0F62FE]/15 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3h6l5 5v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                      <path d="M14 3v5h5" />
                      <path d="M8 14c1-1.5 2.5-1.5 3 0s2 1.5 3 0" />
                      <line x1="8" y1="18" x2="15" y2="18" />
                    </svg>
                  </div>
                  <span className="text-[13px] text-slate-800 dark:text-white font-semibold font-heading leading-snug">
                    NDA, MCA &amp; SOW first
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 items-start bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 shadow-sm transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#0F62FE]/10 dark:bg-[#0F62FE]/15 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <span className="text-[13px] text-slate-800 dark:text-white font-semibold font-heading leading-snug">
                    Read-only access
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 items-start bg-white dark:bg-[#0E1F33] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 shadow-sm transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#0F62FE]/10 dark:bg-[#0F62FE]/15 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] flex-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                      <rect x="2" y="14" width="5" height="6" rx="1.5" />
                      <rect x="17" y="14" width="5" height="6" rx="1.5" />
                    </svg>
                  </div>
                  <span className="text-[13px] text-slate-800 dark:text-white font-semibold font-heading leading-snug">
                    24/7 expert support
                  </span>
                </div>
              </div>
            </div>

            {/* Right Live Dashboard Card: Full 5-Slide Dynamic Telemetry (Theme-Adaptive) */}
            <div className="w-full">
              <div
                className="relative border border-slate-200 dark:border-white/15 p-5 sm:p-7 bg-white dark:bg-[#0e1f33] text-slate-900 dark:text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),0_0_30px_rgba(15,98,254,0.06)] dark:shadow-[0_40px_90px_-30px_rgba(10,99,206,.45),0_12px_40px_rgba(10,25,45,.35)] rounded-2xl transition-colors"
              >
                {/* Dashboard Card Header */}
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="font-heading font-semibold text-[15px] tracking-[0.02em] text-slate-900 dark:text-[#f2f2f3] uppercase">
                    Live Dashboard
                  </span>
                  <span className="text-[10px] tracking-[0.1em] text-slate-500 dark:text-white/60 border border-slate-200 dark:border-white/25 bg-slate-50 dark:bg-white/5 px-2 py-0.5 rounded whitespace-nowrap">
                    ILLUSTRATIVE DATA
                  </span>
                </div>

                <span className="block text-[11px] tracking-[0.1em] uppercase text-[#0F62FE] dark:text-[#60a5fa] font-semibold mb-5">
                  {slideTitles[activeSlide]}
                </span>

                {/* Dynamic Slide Container */}
                <div className="min-h-[480px] transition-all duration-300">
                  {/* SLIDE 0: FinOps Executive Summary */}
                  {activeSlide === 0 && (
                    <div className="animate-fadeIn">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Monthly Spend</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {fmtM(metrics.spend)}
                          </span>
                          <span className="text-[11px] text-[#0F62FE] dark:text-[#60a5fa]">↑ 4.2% MoM</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Optimization</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {fmtK(metrics.optOpp)}
                          </span>
                          <span className="text-[11px] text-[#0F62FE] dark:text-[#60a5fa]">↓ 18.6% potential</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Savings Captured</span>
                          <span className="font-heading font-semibold text-2xl text-emerald-600 dark:text-[#4ade80] tabular-nums">
                            {fmtK(metrics.savings)}
                          </span>
                          <span className="text-[11px] text-emerald-600 dark:text-[#4ade80]">↑ this quarter</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Allocation</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {Math.round(metrics.allocation)}%
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">coverage</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-3 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 transition-colors">
                          <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3">
                            Spend Trend
                          </span>
                          <svg viewBox="0 0 260 90" className="w-full h-[90px] block">
                            <polyline
                              points="0,70 30,64 60,66 90,52 120,55 150,40 180,44 210,28 240,32 260,20"
                              fill="none"
                              stroke="#0F62FE"
                              strokeWidth="2"
                              strokeDasharray="480"
                              className="animate-[draw_1.6s_ease_forwards]"
                            />
                            <line x1="0" y1="82" x2="260" y2="82" stroke="currentColor" className="text-slate-200 dark:text-white/15" strokeWidth="1" />
                          </svg>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-2.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-0.5">
                            Cost by Business Unit
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-16 flex-none">Eng.</span>
                            <span className="h-2 bg-[#0F62FE] rounded-full w-[70%]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-16 flex-none">Data</span>
                            <span className="h-2 bg-[#3b82f6] rounded-full w-[45%]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-16 flex-none">Product</span>
                            <span className="h-2 bg-[#60a5fa] rounded-full w-[30%]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-16 flex-none">Corp IT</span>
                            <span className="h-2 bg-[#084ea3] rounded-full w-[20%]" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 mb-3 transition-colors">
                        <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3">
                          Optimization Queue
                        </span>
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] dark:bg-[#60a5fa] flex-none animate-ping" />
                            <span className="flex-1">Rightsize idle compute instances</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$86K</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] dark:bg-[#60a5fa] flex-none animate-ping [animation-delay:300ms]" />
                            <span className="flex-1">Consolidate unused storage tiers</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$54K</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] dark:bg-[#60a5fa] flex-none animate-ping [animation-delay:600ms]" />
                            <span className="flex-1">Apply committed-use discounts</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$122K</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5 flex-wrap mb-4">
                        <span className="text-[11px] text-slate-600 dark:text-white/70 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-2.5 py-1 rounded-md">
                          Forecast variance {metrics.variance >= 0 ? '+' : ''}
                          {metrics.variance.toFixed(1)}%
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-white/70 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-2.5 py-1 rounded-md">
                          {Math.round(metrics.anomalies)} anomalies detected
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 1: Realized Savings & Opportunity */}
                  {activeSlide === 1 && (
                    <div className="animate-fadeIn">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Opportunity</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {fmtK(metrics.optOpp)}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">identified</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Captured</span>
                          <span className="font-heading font-semibold text-2xl text-emerald-600 dark:text-[#4ade80] tabular-nums">
                            {fmtK(metrics.savings)}
                          </span>
                          <span className="text-[11px] text-emerald-600 dark:text-[#4ade80]">↑ growing</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Realized</span>
                          <span className="font-heading font-semibold text-2xl text-emerald-600 dark:text-[#4ade80] tabular-nums">70%</span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">of opportunity</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Initiatives</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">14</span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">in progress</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-3 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 transition-colors">
                          <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3">
                            Savings Captured Trend
                          </span>
                          <svg viewBox="0 0 260 90" className="w-full h-[90px] block">
                            <polyline
                              points="0,80 30,76 60,70 90,66 120,55 150,48 180,38 210,30 240,22 260,14"
                              fill="none"
                              stroke="#16a34a"
                              strokeWidth="2"
                              strokeDasharray="480"
                              className="animate-[draw_1.6s_ease_forwards]"
                            />
                            <line x1="0" y1="82" x2="260" y2="82" stroke="currentColor" className="text-slate-200 dark:text-white/15" strokeWidth="1" />
                          </svg>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-2.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-0.5">
                            Savings by Category
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-20 flex-none">Rightsizing</span>
                            <span className="h-2 bg-[#0F62FE] rounded-full w-[38%]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-20 flex-none">Storage</span>
                            <span className="h-2 bg-[#3b82f6] rounded-full w-[22%]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-20 flex-none">Commitments</span>
                            <span className="h-2 bg-[#60a5fa] rounded-full w-[26%]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-600 dark:text-white/65 w-20 flex-none">Licensing</span>
                            <span className="h-2 bg-[#084ea3] rounded-full w-[14%]" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 mb-3 transition-colors">
                        <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3">
                          Top Optimization Actions
                        </span>
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] dark:bg-[#60a5fa] flex-none animate-ping" />
                            <span className="flex-1">Migrate to reserved instances</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$138K</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] dark:bg-[#60a5fa] flex-none animate-ping [animation-delay:300ms]" />
                            <span className="flex-1">Consolidate dev/test environments</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$64K</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] dark:bg-[#60a5fa] flex-none animate-ping [animation-delay:600ms]" />
                            <span className="flex-1">Decommission orphaned volumes</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$29K</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5 flex-wrap mb-4">
                        <span className="text-[11px] text-emerald-700 dark:text-[#4ade80] bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-[#4ade80]/35 px-2.5 py-1 rounded-md font-medium">
                          Savings realized {fmtK(metrics.savings)}
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-white/70 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-2.5 py-1 rounded-md">
                          Opportunity {fmtK(metrics.optOpp)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2: Cost Forecast & Anomaly Detection */}
                  {activeSlide === 2 && (
                    <div className="animate-fadeIn">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Forecast</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">$1.91M</span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">next 30 days</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Variance</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {metrics.variance >= 0 ? '+' : ''}
                            {metrics.variance.toFixed(1)}%
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">vs. budget</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Anomalies</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {Math.round(metrics.anomalies)}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">active alerts</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Budget Used</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">87%</span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">of Q3 plan</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 mb-3 transition-colors">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">
                            Forecast vs Actual
                          </span>
                          <div className="flex gap-3.5 text-[10.5px] text-slate-500 dark:text-white/55">
                            <span>
                              <i className="inline-block w-2 h-0.5 bg-[#0F62FE] dark:bg-[#60a5fa] mr-1.5 align-middle" />
                              Actual
                            </span>
                            <span>
                              <i className="inline-block w-2 h-0.5 bg-slate-400 dark:bg-white/40 mr-1.5 align-middle" />
                              Forecast
                            </span>
                          </div>
                        </div>
                        <svg viewBox="0 0 500 100" className="w-full h-[100px] block">
                          <polyline
                            points="0,74 60,68 120,62 180,58 240,44 300,40 360,30 420,26 480,16"
                            fill="none"
                            stroke="#0F62FE"
                            strokeWidth="2"
                            strokeDasharray="620"
                            className="animate-[draw_1.6s_ease_forwards]"
                          />
                          <polyline
                            points="0,70 60,64 120,60 180,50 240,48 300,36 360,34 420,22 480,20"
                            fill="none"
                            stroke="currentColor"
                            className="text-slate-400 dark:text-white/40"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                          <line x1="0" y1="88" x2="500" y2="88" stroke="currentColor" className="text-slate-200 dark:text-white/15" strokeWidth="1" />
                        </svg>
                      </div>

                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 mb-3 transition-colors">
                        <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3">
                          Anomaly Feed
                        </span>
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] dark:bg-[#60a5fa] flex-none animate-ping" />
                            <span className="flex-1">Unexpected spike — data egress, us-east</span>
                            <span className="text-[10px] tracking-[0.06em] text-[#0F62FE] dark:text-[#60a5fa] border border-[#0F62FE]/30 bg-[#0F62FE]/10 px-1.5 py-0.5 rounded font-semibold">
                              HIGH
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white/40 flex-none" />
                            <span className="flex-1">Idle GPU cluster, 36 hours</span>
                            <span className="text-[10px] tracking-[0.06em] text-slate-600 dark:text-white/60 border border-slate-200 dark:border-white/25 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                              MEDIUM
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white/40 flex-none" />
                            <span className="flex-1">Storage tier drift, backup volumes</span>
                            <span className="text-[10px] tracking-[0.06em] text-slate-500 dark:text-white/60 border border-slate-200 dark:border-white/25 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                              LOW
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2.5 flex-wrap mb-4">
                        <span className="text-[11px] text-slate-600 dark:text-white/70 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-2.5 py-1 rounded-md">
                          {Math.round(metrics.anomalies)} anomalies detected
                        </span>
                        <span className="text-[11px] text-slate-600 dark:text-white/70 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-2.5 py-1 rounded-md">
                          Variance {metrics.variance >= 0 ? '+' : ''}
                          {metrics.variance.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 3: Multi-Cloud Spend & Allocation */}
                  {activeSlide === 3 && (
                    <div className="animate-fadeIn">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Total Spend</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {fmtM(metrics.spend)}
                          </span>
                          <span className="text-[11px] text-[#0F62FE] dark:text-[#60a5fa]">↓ 18.6% vs. last 30d</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Forecast</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">$2.72M</span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">next 30 days</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">
                            Potential Savings
                          </span>
                          <span className="font-heading font-semibold text-2xl text-emerald-600 dark:text-[#4ade80] tabular-nums">
                            {fmtK(metrics.optOpp)}
                          </span>
                          <span className="text-[11px] text-emerald-600 dark:text-[#4ade80]">25.1% of spend</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">
                            Commitment Coverage
                          </span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">
                            {Math.round(metrics.allocation)}%
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">of eligible usage</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 transition-colors">
                          <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-2.5">
                            Spend by Cloud
                          </span>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] text-slate-700 dark:text-white/70 w-11 flex-none font-semibold">AWS</span>
                              <div className="flex-1 h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: '53%',
                                    background: 'linear-gradient(90deg,#ff9900,#ffb84d)',
                                  }}
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-white/60 w-20 text-right flex-none">$1.32M · 53%</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] text-slate-700 dark:text-white/70 w-11 flex-none font-semibold">Azure</span>
                              <div className="flex-1 h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: '31%',
                                    background: 'linear-gradient(90deg,#3b82f6,#60a5fa)',
                                  }}
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-white/60 w-20 text-right flex-none">$780K · 31%</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] text-slate-700 dark:text-white/70 w-11 flex-none font-semibold">GCP</span>
                              <div className="flex-1 h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: '16%',
                                    background: 'linear-gradient(90deg,#22c55e,#4ade80)',
                                  }}
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-white/60 w-20 text-right flex-none">$390K · 16%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex gap-3.5 items-center transition-colors">
                          <svg viewBox="0 0 100 100" className="w-[72px] h-[72px] flex-none">
                            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="14" />
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#60a5fa"
                              strokeWidth="14"
                              strokeDasharray="109 239"
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#4ade80"
                              strokeWidth="14"
                              strokeDasharray="60 239"
                              strokeDashoffset="-109"
                              transform="rotate(-90 50 50)"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="14"
                              strokeDasharray="28 239"
                              strokeDashoffset="-169"
                              transform="rotate(-90 50 50)"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#fb923c"
                              strokeWidth="14"
                              strokeDasharray="19 239"
                              strokeDashoffset="-197"
                              transform="rotate(-90 50 50)"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#a78bfa"
                              strokeWidth="14"
                              strokeDasharray="24 239"
                              strokeDashoffset="-216"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="flex flex-col gap-1 text-[11px] text-slate-700 dark:text-white/75">
                            <span>
                              <i className="inline-block w-2 h-2 rounded-sm bg-[#60a5fa] mr-1.5 align-middle" />
                              Compute — 46%
                            </span>
                            <span>
                              <i className="inline-block w-2 h-2 rounded-sm bg-[#4ade80] mr-1.5 align-middle" />
                              Storage — 25%
                            </span>
                            <span>
                              <i className="inline-block w-2 h-2 rounded-sm bg-[#fbbf24] mr-1.5 align-middle" />
                              Database — 12%
                            </span>
                            <span>
                              <i className="inline-block w-2 h-2 rounded-sm bg-[#fb923c] mr-1.5 align-middle" />
                              Network — 8%
                            </span>
                            <span>
                              <i className="inline-block w-2 h-2 rounded-sm bg-[#a78bfa] mr-1.5 align-middle" />
                              Other — 10%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-3 mb-4">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 transition-colors">
                          <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-2.5">
                            Utilization Overview
                          </span>
                          <div className="flex gap-4 flex-wrap">
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#0F62FE"
                                  strokeWidth="6"
                                  strokeDasharray="78 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">Compute 52%</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#16a34a"
                                  strokeWidth="6"
                                  strokeDasharray="72 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">Storage 48%</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#fbbf24"
                                  strokeWidth="6"
                                  strokeDasharray="83 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">Database 55%</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#a78bfa"
                                  strokeWidth="6"
                                  strokeDasharray="71 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">K8s 47%</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#fb923c"
                                  strokeWidth="6"
                                  strokeDasharray="92 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">GPU 61%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col items-center justify-center gap-1 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Governance Score</span>
                          <svg viewBox="0 0 100 100" className="w-[76px] h-[76px]">
                            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="9" />
                            <circle
                              cx="50"
                              cy="50"
                              r="38"
                              fill="none"
                              stroke="#fbbf24"
                              strokeWidth="9"
                              strokeDasharray="186 239"
                              transform="rotate(-90 50 50)"
                            />
                            <text
                              x="50"
                              y="56"
                              textAnchor="middle"
                              fill="currentColor"
                              className="text-slate-900 dark:text-[#f2f2f3]"
                              fontFamily="Montserrat, sans-serif"
                              fontWeight="700"
                              fontSize="24"
                            >
                              78
                            </text>
                          </svg>
                          <span className="text-[11px] text-amber-600 dark:text-[#fbbf24] font-medium">Needs Attention</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 4: AI & Tokenomics Cost Intelligence */}
                  {activeSlide === 4 && (
                    <div className="animate-fadeIn">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">Token Spend</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">$196K</span>
                          <span className="text-[11px] text-[#fb923c]">↑ 22% MoM</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">GPU Spend</span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">$284K</span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">H100 / A100 fleet</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">
                            Cost / 1M Tokens
                          </span>
                          <span className="font-heading font-semibold text-2xl text-emerald-600 dark:text-[#4ade80] tabular-nums">$3.12</span>
                          <span className="text-[11px] text-emerald-600 dark:text-[#4ade80]">↓ 9% w/ caching</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 flex flex-col gap-1.5 transition-colors">
                          <span className="text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55">
                            GPU Utilization
                          </span>
                          <span className="font-heading font-semibold text-2xl text-slate-900 dark:text-[#f2f2f3] tabular-nums">64%</span>
                          <span className="text-[11px] text-slate-400 dark:text-white/50">fleet average</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 transition-colors">
                          <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3.5">
                            Spend by Model / Provider
                          </span>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] text-slate-700 dark:text-white/70 w-20 flex-none">GPT-4 class</span>
                              <div className="flex-1 h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: '44%',
                                    background: 'linear-gradient(90deg,#22c55e,#4ade80)',
                                  }}
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-white/60 w-12 text-right flex-none">44%</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] text-slate-700 dark:text-white/70 w-20 flex-none">Claude</span>
                              <div className="flex-1 h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: '31%',
                                    background: 'linear-gradient(90deg,#fb923c,#fbbf24)',
                                  }}
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-white/60 w-12 text-right flex-none">31%</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] text-slate-700 dark:text-white/70 w-20 flex-none">Gemini</span>
                              <div className="flex-1 h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: '16%',
                                    background: 'linear-gradient(90deg,#60a5fa,#a78bfa)',
                                  }}
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-white/60 w-12 text-right flex-none">16%</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] text-slate-700 dark:text-white/70 w-20 flex-none">OSS / hosted</span>
                              <div className="flex-1 h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: '9%',
                                    background: 'linear-gradient(90deg,#a78bfa,#c084fc)',
                                  }}
                                />
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-white/60 w-12 text-right flex-none">9%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 transition-colors">
                          <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3.5">
                            GPU Fleet by Type
                          </span>
                          <div className="flex gap-4 flex-wrap">
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#fb923c"
                                  strokeWidth="6"
                                  strokeDasharray="106 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">H100 70%</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#0F62FE"
                                  strokeWidth="6"
                                  strokeDasharray="75 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">A100 50%</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                              <svg viewBox="0 0 60 60" className="w-11 h-11">
                                <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="6" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="24"
                                  fill="none"
                                  stroke="#16a34a"
                                  strokeWidth="6"
                                  strokeDasharray="45 151"
                                  transform="rotate(-90 30 30)"
                                />
                              </svg>
                              <span className="text-[10.5px] text-slate-500 dark:text-white/60">L40S 30%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-xl p-3.5 mb-4 transition-colors">
                        <span className="block text-[10.5px] tracking-[0.08em] uppercase text-slate-500 dark:text-white/55 mb-3">
                          Top AI Cost Drivers
                        </span>
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] flex-none animate-ping" />
                            <span className="flex-1">Inference — production traffic</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$118K</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] flex-none animate-ping [animation-delay:300ms]" />
                            <span className="flex-1">Fine-tuning &amp; evaluation runs</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$52K</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-[12.5px] text-slate-800 dark:text-white/100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] flex-none animate-ping [animation-delay:600ms]" />
                            <span className="flex-1">Idle GPU reservation, off-peak</span>
                            <span className="text-slate-500 dark:text-white/55 font-medium">$41K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dashboard Controls (Theme-Adaptive) */}
                <div className="flex items-center justify-center gap-4 pt-3.5 border-t border-slate-200 dark:border-white/12">
                  <button
                    type="button"
                    onClick={() => setActiveSlide(prev => (prev + 4) % 5)}
                    aria-label="Previous dashboard"
                    className="w-7 h-7 flex items-center justify-center border border-slate-300 dark:border-white/25 text-slate-700 dark:text-white/70 hover:border-[#0F62FE] hover:text-[#0F62FE] dark:hover:border-white/50 dark:hover:text-white rounded transition-colors cursor-pointer text-sm leading-none bg-slate-50 dark:bg-transparent"
                  >
                    ‹
                  </button>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map(idx => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`w-1.5 h-1.5 rounded-full border-none p-0 cursor-pointer transition-colors ${
                          activeSlide === idx
                            ? 'bg-[#0F62FE]'
                            : 'bg-slate-300 dark:bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSlide(prev => (prev + 1) % 5)}
                    aria-label="Next dashboard"
                    className="w-7 h-7 flex items-center justify-center border border-slate-300 dark:border-white/25 text-slate-700 dark:text-white/70 hover:border-[#0F62FE] hover:text-[#0F62FE] dark:hover:border-white/50 dark:hover:text-white rounded transition-colors cursor-pointer text-sm leading-none bg-slate-50 dark:bg-transparent"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CREDIBILITY BAR & INTERACTIVE PILLS
          ══════════════════════════════════════════════════════════════ */}
      <section id="credibility" className="py-6 px-6 sm:px-10 bg-base-100 border-b border-base-300">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-3">
          <span className="text-[13px] text-base-content/65 font-heading tracking-wide">
            Microsoft &amp; Google Cloud Partner — Trusted to run FinOps across every major cloud and AI platform
          </span>

          <span className="inline-flex items-center gap-2 bg-[#0a63ce]/10 text-[#084ea3] dark:text-[#60a5fa] font-heading font-bold text-[13px] px-4 py-2 rounded-full">
            15–42% savings committed
          </span>

          <div className="flex flex-wrap gap-2.5 justify-center pt-1">
            {pillMeta.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePill(idx)}
                className={`font-heading font-semibold text-[13.5px] tracking-[0.08em] px-5 py-2.5 transition-all cursor-pointer ${
                  activePill === idx
                    ? 'bg-[#0a63ce] text-white shadow'
                    : 'bg-[#0a63ce]/10 text-[#084ea3] dark:text-[#60a5fa] hover:bg-[#0a63ce]/20'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <p className="text-[13.5px] text-base-content font-semibold max-w-[62ch] min-h-[18px] leading-normal transition-opacity">
            {pillMeta[activePill].desc}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          THE PROBLEM SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="problem" className="py-12 px-6 sm:px-10 bg-base-100 border-b border-base-300">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end mb-9 pb-6 border-b border-base-300">
            <div>
              <span className="block text-[12px] tracking-[0.14em] uppercase text-[#084ea3] dark:text-[#60a5fa] font-bold font-heading mb-3.5">
                The Problem
              </span>
              <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-base-content tracking-tight leading-[1.1] max-w-[16ch]">
                Your Cloud Bill Is a Business Signal.
              </h2>
            </div>
            <div>
              <p className="text-[16.5px] leading-[1.65] text-base-content/75">
                Cloud spend is no longer just an infrastructure expense. It reflects architecture decisions, product demand, engineering behavior, business priorities and operational discipline.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Card 1: Invisible Waste with exact dashed trash SVG */}
            <div className="relative border border-base-300 rounded-lg p-7 sm:p-8 bg-base-100 dark:bg-base-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#0a63ce]/50 hover:bg-[#0a63ce]/5 cursor-default">
              <div className="w-[52px] h-[52px] rounded-[10px] bg-[#0a63ce]/10 text-[#084ea3] dark:text-[#60a5fa] flex items-center justify-center mb-5">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 7h16" strokeDasharray="2.2 2.2" />
                  <path d="M9.5 7V5.3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V7" strokeDasharray="2.2 2.2" />
                  <path
                    d="M6.2 7l1.1 12.1A2 2 0 0 0 9.3 21h5.4a2 2 0 0 0 2-1.9L17.8 7"
                    strokeDasharray="2.2 2.2"
                  />
                  <line x1="10" y1="11" x2="10" y2="16.5" />
                  <line x1="14" y1="11" x2="14" y2="16.5" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-[18px] tracking-[0.01em] mb-2.5 text-base-content">
                Invisible Waste
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-base-content/72">
                Idle resources, overprovisioned workloads, unused storage and orphaned services quietly accumulate.
              </p>
            </div>

            {/* Card 2: Missing Accountability with exact chain link SVG */}
            <div className="relative border border-base-300 rounded-lg p-7 sm:p-8 bg-base-100 dark:bg-base-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#0a63ce]/50 hover:bg-[#0a63ce]/5 cursor-default">
              <div className="w-[52px] h-[52px] rounded-[10px] bg-[#0a63ce]/10 text-[#084ea3] dark:text-[#60a5fa] flex items-center justify-center mb-5">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18h-2.2a5 5 0 0 1 0-10H9" />
                  <path d="M15 8h2.2a5 5 0 1 1 0 10H15" />
                  <line x1="7.5" y1="13" x2="9.8" y2="13" strokeDasharray="1.6 2.4" />
                  <line x1="14.2" y1="13" x2="16.5" y2="13" strokeDasharray="1.6 2.4" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-[18px] tracking-[0.01em] mb-2.5 text-base-content">
                Missing Accountability
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-base-content/72">
                Finance sees the invoice. Engineering sees resources. Leadership sees the total. FinOps connects them.
              </p>
            </div>

            {/* Card 3: Optimization Without Continuity with exact bar chart SVG */}
            <div className="relative border border-base-300 rounded-lg p-7 sm:p-8 bg-base-100 dark:bg-base-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#0a63ce]/50 hover:bg-[#0a63ce]/5 cursor-default">
              <div className="w-[52px] h-[52px] rounded-[10px] bg-[#0a63ce]/10 text-[#084ea3] dark:text-[#60a5fa] flex items-center justify-center mb-5">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3.2" y="11" width="3.4" height="8" rx="0.4" />
                  <rect x="9.3" y="15" width="3.4" height="4" rx="0.4" />
                  <rect x="15.4" y="9" width="3.4" height="10" rx="0.4" />
                  <line x1="3" y1="19.6" x2="21" y2="19.6" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-[18px] tracking-[0.01em] mb-2.5 text-base-content">
                Optimization Without Continuity
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-base-content/72">
                One-time cost cutting does not create a mature FinOps practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINOPS AS A SERVICE & 3D CONTINUOUS LOOP
          ══════════════════════════════════════════════════════════════ */}
      <section id="finops" className="py-20 px-6 sm:px-10 bg-base-100 border-b border-base-300">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="block text-[12px] tracking-widest uppercase text-[#0F62FE] font-bold mb-3">
              FinOps as a Service
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight mb-5 text-base-content">
              Your FinOps Team, Without Building One From Scratch.
            </h2>
            <p className="text-[16px] leading-relaxed text-base-content/75 mb-8">
              Nowazone operates as an extension of your Finance, Engineering and Technology teams — establishing visibility, governance, optimization and decision-making processes required to continuously improve technology economics.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 border-t border-base-300">
                <span className="font-bold text-[#0F62FE] text-base w-6">01</span>
                <div>
                  <h3 className="font-bold text-[15px] mb-1 text-base-content">A dedicated FinOps pod</h3>
                  <p className="text-[13.5px] text-base-content/70">
                    Analysts, engineers and governance leads embedded with your team, not a slow ticket queue.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 border-t border-base-300">
                <span className="font-bold text-[#0F62FE] text-base w-6">02</span>
                <div>
                  <h3 className="font-bold text-[15px] mb-1 text-base-content">Weekly optimization cadence</h3>
                  <p className="text-[13.5px] text-base-content/70">
                    Recurring reviews turn raw savings opportunities into shipped engineering changes and committed discounts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 border-t border-b border-base-300">
                <span className="font-bold text-[#0F62FE] text-base w-6">03</span>
                <div>
                  <h3 className="font-bold text-[15px] mb-1 text-base-content">Built into your workflow</h3>
                  <p className="text-[13.5px] text-base-content/70">
                    Direct access via Slack and your existing tooling — no separate confusing portal to check.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Exact HTML FinOps Continuous Delivery Cycle Radar */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <FinOpsCycleRadar activePhase={phaseIndex} onSelectPhase={setPhaseIndex} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINOPS CAPABILITIES & METRICS
          ══════════════════════════════════════════════════════════════ */}
      <section id="capabilities" className="py-20 px-6 sm:px-10 bg-base-100 dark:bg-[#0E1F33] text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10">
            <span className="block text-[12px] tracking-widest uppercase text-[#084EA3] dark:text-[#60A5FA] font-bold mb-3">
              FinOps Capabilities
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-base-content dark:text-white tracking-tight">
              From Cloud Spend to Business Insight.
            </h2>
            <p className="text-[15px] text-base-content/75 dark:text-white/70 max-w-xl mt-3">
              Cost allocation is the foundation — mapping every dollar of spend to the team, product or workload that owns it, before any optimization work begins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-base-300 dark:border-white/15 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
            {/* Left 8 Tabs */}
            <div className="lg:col-span-5 divide-y divide-base-300 dark:divide-white/10 bg-base-200/80 dark:bg-[#0A1830]">
              {capMeta.map((cap, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveCap(idx)}
                  className={`w-full flex items-center gap-4 p-4 text-left transition-all cursor-pointer ${
                    activeCap === idx
                      ? 'bg-[#0F62FE] text-white border-l-4 border-white'
                      : 'text-base-content/75 dark:text-white/70 hover:bg-base-300/60 dark:hover:bg-white/5 hover:text-base-content dark:hover:text-white'
                  }`}
                >
                  <span className="font-mono text-xs opacity-70">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold text-[14.5px]">{cap.title}</span>
                </button>
              ))}
            </div>

            {/* Right Capability Details */}
            <div className="lg:col-span-7 bg-base-100 dark:bg-[#0E1F33] p-8 sm:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-base-300 dark:border-white/15">
              <p className="text-[17px] text-base-content/90 dark:text-white/105 leading-relaxed mb-8">
                {capMeta[activeCap].desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-base-200/60 dark:bg-white/5 p-6 rounded-xl border border-base-300 dark:border-white/10">
                <div className="flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-base-300 dark:border-white/10 pb-4 sm:pb-0 sm:pr-4">
                  <span className="text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 mb-1 font-semibold">
                    Illustrative Signal
                  </span>
                  <span className="font-heading font-extrabold text-3xl text-base-content dark:text-white">
                    {capMeta[activeCap].stat}
                  </span>
                  <span className="text-[12px] text-base-content/70 dark:text-white/60 mt-1">
                    {capMeta[activeCap].statLabel}
                  </span>
                </div>

                <div className="flex flex-col justify-center sm:pl-4">
                  <span className="text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 mb-4 font-semibold">
                    Quarterly Progress
                  </span>
                  <div className="flex items-end justify-between gap-3 h-28 pt-2">
                    {capMeta[activeCap].bars.map((barVal, bIdx) => (
                      <div key={bIdx} className="flex-1 flex flex-col items-center justify-end h-full">
                        <span className="text-[11px] font-bold text-base-content dark:text-white mb-1.5">{barVal}%</span>
                        <div
                          className={`w-full rounded-t transition-all duration-500 ${
                            bIdx === 3 ? 'bg-[#10B981]' : 'bg-[#0F62FE]'
                          }`}
                          style={{ height: `${barVal}%` }}
                        />
                        <span className="text-[10px] text-base-content/60 dark:text-white/50 mt-1">Q{bIdx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BUILD VS PARTNER COMPARISON
          ══════════════════════════════════════════════════════════════ */}
      <section id="compare" className="py-20 px-6 sm:px-10 bg-base-200/70 dark:bg-[#0A1830] text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10">
            <span className="block text-[12px] tracking-widest uppercase text-[#084EA3] dark:text-[#60A5FA] font-bold mb-3">
              Build vs. Partner
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-base-content dark:text-white tracking-tight">
              Partnering With <span className="text-[#0F62FE] dark:text-[#60A5FA]">Nowazone</span> Takes Days.
            </h2>
            <p className="text-[15px] text-base-content/75 dark:text-white/70 max-w-xl mt-3">
              A full-time FinOps hire costs recruitment fees, ramp-up time, tooling licenses and salary — before saving a single dollar. Nowazone gives you the outcome immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Full-Time Hire Column */}
            <div className="bg-base-100 dark:bg-white/5 border border-base-300 dark:border-white/10 p-7 rounded-xl flex flex-col justify-between shadow-sm dark:shadow-none">
              <div>
                <span className="block text-[11px] tracking-wider uppercase text-base-content/60 dark:text-white/50 font-bold mb-4">
                  Full-Time FinOps Hire
                </span>
                <div className="space-y-4 text-[14.5px]">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 dark:text-red-400 font-bold">✕</span>
                    <div>
                      <span className="block font-semibold text-base-content/90 dark:text-white/100">3–6 months hiring + ramp-up</span>
                      <span className="text-[12px] text-base-content/60 dark:text-white/40">Time to savings</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 dark:text-red-400 font-bold">✕</span>
                    <div>
                      <span className="block font-semibold text-base-content/90 dark:text-white/100">Salary + benefits + tools year-round</span>
                      <span className="text-[12px] text-base-content/60 dark:text-white/40">Fixed high overhead</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 dark:text-red-400 font-bold">✕</span>
                    <div>
                      <span className="block font-semibold text-base-content/90 dark:text-white/100">One person, one cloud skillset</span>
                      <span className="text-[12px] text-base-content/60 dark:text-white/40">Limited depth</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 dark:text-red-400 font-bold">✕</span>
                    <div>
                      <span className="block font-semibold text-base-content/90 dark:text-white/100">You restart hiring if they leave</span>
                      <span className="text-[12px] text-base-content/60 dark:text-white/40">Key-person dependency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nowazone Partnership Column */}
            <div className="bg-brand-blue/5 dark:bg-[#0F62FE]/15 border-2 border-[#0F62FE] p-7 rounded-xl shadow-lg flex flex-col justify-between">
              <div>
                <span className="block text-[11px] tracking-wider uppercase text-[#084EA3] dark:text-[#60A5FA] font-bold mb-4">
                  Nowazone Partnership
                </span>
                <div className="space-y-4 text-[14.5px]">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span>
                    <div>
                      <span className="block font-semibold text-base-content dark:text-white">Days after your free assessment</span>
                      <span className="text-[12px] text-[#084EA3] dark:text-[#60A5FA] font-medium">→ Faster time-to-savings</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span>
                    <div>
                      <span className="block font-semibold text-base-content dark:text-white">Fixed monthly retainer or flat fee</span>
                      <span className="text-[12px] text-[#084EA3] dark:text-[#60A5FA] font-medium">→ Predictable, lower total cost</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span>
                    <div>
                      <span className="block font-semibold text-base-content dark:text-white">Bench of certified Cloud, FinOps &amp; AI engineers</span>
                      <span className="text-[12px] text-[#084EA3] dark:text-[#60A5FA] font-medium">→ Azure, AWS, GCP, OCI, Databricks</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span>
                    <div>
                      <span className="block font-semibold text-base-content dark:text-white">Continuity built into the contract</span>
                      <span className="text-[12px] text-[#084EA3] dark:text-[#60A5FA] font-medium">→ Zero organizational disruption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="button"
              onClick={openAssessmentModal}
              className="bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold text-[14.5px] py-3 px-7 rounded-lg transition-colors shadow-sm hover:shadow cursor-pointer"
            >
              Free Cost X-Ray Assessment
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PLATFORMS & TOOLS MARQUEE (Two-Row Streamlined Ecosystem)
          ══════════════════════════════════════════════════════════════ */}
      <section id="platforms-tools" className="py-12 sm:py-14 bg-base-100 dark:bg-base-200 border-y border-base-300 relative overflow-hidden transition-colors">
        <div className="max-w-[1280px] mx-auto px-6 mb-7 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <span className="block text-[11.5px] tracking-[0.16em] uppercase text-[#084EA3] dark:text-[#60A5FA] font-bold font-heading mb-1.5">
              Multi-Cloud &amp; FinOps Ecosystem
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-base-content tracking-tight">
              Cloud Platforms, Data &amp; FinOps Tools We Work With
            </h3>
          </div>
          <span className="text-[12px] text-base-content/60 font-medium tracking-wide">
            Enterprise Cloud &amp; AI Telemetry
          </span>
        </div>

        <div className="space-y-3 sm:space-y-3.5">
          {/* Row 1 - Cloud & Infrastructure Platforms */}
          <Marquee speed={36} pauseOnHover={true}>
            {[
              { name: 'Microsoft Azure', file: 'azure.png' },
              { name: 'AWS', file: 'aws.png' },
              { name: 'Google Cloud', file: 'google-cloud.png' },
              { name: 'Oracle Cloud', file: 'oracle-cloud.png' },
              { name: 'Alibaba Cloud', file: 'alibaba-cloud.png' },
              { name: 'Kubernetes', file: 'kubernetes.png' },
              { name: 'Terraform', file: 'terraform.png' },
              { name: 'Microsoft Fabric', file: 'microsoft-fabric.png' },
            ].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white dark:bg-slate-900/80 px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200/90 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none h-14 sm:h-15 w-40 sm:w-44 flex-none hover:border-[#0F62FE]/40 dark:hover:border-[#60A5FA]/40 transition-colors"
              >
                <img
                  src={`/assets/logos/${logo.file}`}
                  alt={logo.name}
                  width="125"
                  height="32"
                  className="max-h-7 sm:max-h-8 max-w-[110px] sm:max-w-[125px] w-auto object-contain select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>

          {/* Row 2 - Data, Analytics & FinOps Tools (Reverse Flow) */}
          <Marquee speed={40} reverse={true} pauseOnHover={true}>
            {[
              { name: 'Databricks', file: 'databricks.png' },
              { name: 'Snowflake', file: 'snowflake.png' },
              { name: 'Datadog', file: 'datadog.png' },
              { name: 'ServiceNow', file: 'servicenow.png' },
              { name: 'Grafana', file: 'grafana.png' },
              { name: 'Prometheus', file: 'prometheus.png' },
              { name: 'Google BigQuery', file: 'bigquery.png' },
              { name: 'Amazon Athena', file: 'amazon-athena.png' },
            ].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white dark:bg-slate-900/80 px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200/90 dark:border-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-none h-14 sm:h-15 w-40 sm:w-44 flex-none hover:border-[#0F62FE]/40 dark:hover:border-[#60A5FA]/40 transition-colors"
              >
                <img
                  src={`/assets/logos/${logo.file}`}
                  alt={logo.name}
                  width="125"
                  height="32"
                  className="max-h-7 sm:max-h-8 max-w-[110px] sm:max-w-[125px] w-auto object-contain select-none"
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SUPPORTING SERVICES
          ══════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 px-6 sm:px-10 bg-base-100 border-b border-base-300">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <span className="block text-[12px] tracking-widest uppercase text-[#0F62FE] font-bold mb-3">
              Supporting Services
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-base-content tracking-tight">
              FinOps First. Cloud Expertise Around It.
            </h2>
            <p className="text-[15px] text-base-content/70 max-w-2xl mt-3">
              FinOps is the core discipline. Everything else we do — consulting, operations, security, licensing and AI engineering — exists to support that core.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="blueprint bg-base-200 border border-base-300 p-6 rounded-xl flex flex-col justify-between">
              <CornerMarkers colorClass="text-[#0F62FE]/30" />
              <div>
                <div className="w-10 h-10 rounded bg-[#0F62FE]/15 text-[#0F62FE] flex items-center justify-center mb-4">
                  <Shield size={20} />
                </div>
                <h3 className="font-heading font-bold text-[16px] mb-2 text-base-content">Cloud Consulting</h3>
                <p className="text-[13px] text-base-content/70 leading-relaxed">
                  Architecture, migration cutover and workload modernization.
                </p>
              </div>
            </div>

            <div className="blueprint bg-base-200 border border-base-300 p-6 rounded-xl flex flex-col justify-between">
              <CornerMarkers colorClass="text-[#0F62FE]/30" />
              <div>
                <div className="w-10 h-10 rounded bg-[#0F62FE]/15 text-[#0F62FE] flex items-center justify-center mb-4">
                  <Clock size={20} />
                </div>
                <h3 className="font-heading font-bold text-[16px] mb-2 text-base-content">Managed Cloud</h3>
                <p className="text-[13px] text-base-content/70 leading-relaxed">
                  Operational support, reliability, SLA management and cost reviews.
                </p>
              </div>
            </div>

            <div className="blueprint bg-base-200 border border-base-300 p-6 rounded-xl flex flex-col justify-between">
              <CornerMarkers colorClass="text-[#0F62FE]/30" />
              <div>
                <div className="w-10 h-10 rounded bg-[#0F62FE]/15 text-[#0F62FE] flex items-center justify-center mb-4">
                  <Lock size={20} />
                </div>
                <h3 className="font-heading font-bold text-[16px] mb-2 text-base-content">Cloud Security</h3>
                <p className="text-[13px] text-base-content/70 leading-relaxed">
                  Identity, guardrails, compliance posture and risk reduction.
                </p>
              </div>
            </div>

            <div className="blueprint bg-base-200 border border-base-300 p-6 rounded-xl flex flex-col justify-between">
              <CornerMarkers colorClass="text-[#0F62FE]/30" />
              <div>
                <div className="w-10 h-10 rounded bg-[#0F62FE]/15 text-[#0F62FE] flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-heading font-bold text-[16px] mb-2 text-base-content">Cloud Licensing</h3>
                <p className="text-[13px] text-base-content/70 leading-relaxed">
                  Microsoft and Google licensing rightsized to actual usage.
                </p>
              </div>
            </div>

            <div className="blueprint bg-base-200 border border-base-300 p-6 rounded-xl flex flex-col justify-between">
              <CornerMarkers colorClass="text-[#0F62FE]/30" />
              <div>
                <div className="w-10 h-10 rounded bg-[#0F62FE]/15 text-[#0F62FE] flex items-center justify-center mb-4">
                  <ArrowRight size={20} />
                </div>
                <h3 className="font-heading font-bold text-[16px] mb-2 text-base-content">AI Engineering</h3>
                <p className="text-[13px] text-base-content/70 leading-relaxed">
                  LLM tokenomics, GPU utilization and inference cost governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8: WHY NOWAZONE — WHERE FINANCE MEETS ENGINEERING
          ══════════════════════════════════════════════════════════════ */}
      <section id="why" className="py-16 sm:py-20 px-6 sm:px-10 bg-base-100 dark:bg-[#070D18] text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10 sm:mb-12">
            <span className="block text-[12px] tracking-[0.14em] uppercase text-[#0F62FE] dark:text-[#60A5FA] font-bold font-heading mb-3">
              Why Nowazone
            </span>
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl text-base-content dark:text-white tracking-tight">
              Where Finance Meets Engineering.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 sm:gap-12 items-start">
            {/* Left Column: Blueprint Feature Card */}
            <div className="relative bg-blue-50/60 dark:bg-[#0E1F33] border border-blue-200 dark:border-[#0F62FE]/30 p-8 sm:p-10 rounded-2xl flex flex-col gap-6 shadow-sm">
              <CornerMarkers colorClass="text-[#0F62FE]" />
              <svg width="34" height="26" viewBox="0 0 34 26" fill="currentColor" className="text-[#0F62FE] dark:text-[#60A5FA]">
                <path d="M0 26V15.6C0 6.9 5.7 1.1 14.5 0l1 3.7C9.9 5.3 7 8.9 6.6 13.4H14V26H0Zm19.5 0V15.6C19.5 6.9 25.2 1.1 34 0l1 3.7c-5.6 1.6-8.5 5.2-8.9 9.7H33.5V26h-14Z" />
              </svg>
              <p className="font-heading font-semibold text-xl sm:text-2xl lg:text-[26px] leading-snug tracking-tight text-base-content dark:text-white">
                Finance owns the budget. Engineering owns the architecture. Most tools serve one side.{' '}
                <span className="text-[#0F62FE] dark:text-[#60A5FA]">Nowazone connects both</span> to the same number.
              </p>
              <div className="flex gap-8 flex-wrap border-t border-blue-200 dark:border-white/15 pt-5 mt-2">
                <div>
                  <span className="block font-heading font-bold text-2xl sm:text-3xl text-[#0F62FE] dark:text-[#60A5FA]">
                    14
                  </span>
                  <span className="text-xs text-base-content/70 dark:text-white/60">
                    Optimization disciplines, one engagement
                  </span>
                </div>
                <div>
                  <span className="block font-heading font-bold text-2xl sm:text-3xl text-[#0F62FE] dark:text-[#60A5FA]">
                    2
                  </span>
                  <span className="text-xs text-base-content/70 dark:text-white/60">
                    Teams aligned: finance and engineering
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 5 Value Rows */}
            <div className="flex flex-col divide-y divide-base-300 dark:divide-white/10 border-t border-b border-base-300 dark:border-white/10">
              {/* Row 1 */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200/80 dark:border-white/10 flex items-center justify-center flex-none text-[#0F62FE] dark:text-[#60A5FA] mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 12a8 8 0 1 1-2.34-5.66" />
                    <polyline points="20 4 20 8 16 8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[15px] mb-1 text-base-content dark:text-white">
                    Continuous, Not One-Time
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Optimization becomes an operating discipline, not a one-off audit.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200/80 dark:border-white/10 flex items-center justify-center flex-none text-[#0F62FE] dark:text-[#60A5FA] mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="6" cy="6" r="2.5" />
                    <circle cx="18" cy="6" r="2.5" />
                    <circle cx="12" cy="18" r="2.5" />
                    <line x1="7.5" y1="7.5" x2="11" y2="16" />
                    <line x1="16.5" y1="7.5" x2="13" y2="16" />
                    <line x1="8.5" y1="6" x2="15.5" y2="6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[15px] mb-1 text-base-content dark:text-white">
                    Multi-Cloud Ready
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Designed for AWS, Azure, Google Cloud and evolving technology environments.
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200/80 dark:border-white/10 flex items-center justify-center flex-none text-[#0F62FE] dark:text-[#60A5FA] mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[15px] mb-1 text-base-content dark:text-white">
                    Action-Oriented
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Every insight leads to an owner, decision and measurable outcome.
                  </p>
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200/80 dark:border-white/10 flex items-center justify-center flex-none text-[#0F62FE] dark:text-[#60A5FA] mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="4" width="18" height="12" rx="1" />
                    <line x1="8" y1="20" x2="16" y2="20" />
                    <line x1="12" y1="16" x2="12" y2="20" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[15px] mb-1 text-base-content dark:text-white">
                    Executive + Engineering Visibility
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Leadership gets business context while engineers get actionable recommendations.
                  </p>
                </div>
              </div>

              {/* Row 5 */}
              <div className="flex gap-4 py-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200/80 dark:border-white/10 flex items-center justify-center flex-none text-[#0F62FE] dark:text-[#60A5FA] mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <line x1="12" y1="3" x2="12" y2="21" />
                    <path d="M4 7h6M4 7l-2 5 4 0-2-5Z" />
                    <path d="M20 7h-6M20 7l2 5-4 0 2-5Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[15px] mb-1 text-base-content dark:text-white">
                    Independent Optimization
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Optimize technology value, not simply cloud consumption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9: NEW TO CLOUD
          ══════════════════════════════════════════════════════════════ */}
      <section id="new-to-cloud" className="py-16 sm:py-20 px-6 sm:px-10 bg-base-100 dark:bg-[#060C16] text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="block text-[12px] tracking-[0.14em] uppercase text-[#0F62FE] dark:text-[#60A5FA] font-bold font-heading mb-3">
                New to Cloud
              </span>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[32px] leading-snug tracking-tight mb-4 text-base-content dark:text-white">
                Launching Your First Cloud Environment? Know the Number Before You Sign.
              </h2>
              <p className="text-[15px] leading-relaxed text-base-content/75 dark:text-white/70 mb-6 max-w-lg">
                Most first-time cloud buyers get a quote, not a plan. Nowazone builds your landing zone and hands you a workload-by-workload cost estimate first — so procurement, budgets and alerts are already in place on day one.
              </p>
              <div className="flex gap-3.5 flex-wrap mb-4">
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="relative inline-flex items-center px-6 py-3.5 bg-[#0F62FE] hover:bg-[#084EA3] text-white font-heading font-bold text-[14.5px] rounded transition-all shadow-md animate-ctaGlow"
                >
                  <CornerMarkers />
                  Get My Pre-Launch Estimate
                </button>
                <Link
                  to="/cloud-architecture-landing-zone"
                  className="inline-flex items-center border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/10 text-base-content dark:text-white font-heading font-semibold text-[14px] px-5 py-3.5 rounded transition-colors"
                >
                  What's a Landing Zone?
                </Link>
              </div>
              <span className="block text-xs text-base-content/60 dark:text-white/50 mb-8">
                Free scoping call · No architecture experience required
              </span>
            </div>

            <div className="border-t border-base-300 dark:border-white/15 pt-5">
              <span className="block text-[11px] tracking-[0.12em] uppercase text-base-content/60 dark:text-white/50 font-heading font-semibold mb-3">
                One Engagement Covers
              </span>
              <div className="flex flex-wrap gap-2">
                {['Landing Zone', 'Cost Estimate', 'Budgets & Alerts', 'Licensing', 'Azure', 'Google Cloud'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-md bg-base-200/50 dark:bg-white/5 text-base-content/80 dark:text-white/100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Timeline */}
          <div className="flex flex-col">
            <span className="block text-[11px] tracking-[0.12em] uppercase text-base-content/60 dark:text-white/50 font-heading font-semibold mb-6">
              Your First 30 Days
            </span>
            <div className="flex flex-col flex-1 space-y-6">
              {/* Step 1 */}
              <div className="grid grid-cols-[36px_1fr] gap-4 relative">
                <div className="relative flex justify-center">
                  <div className="absolute top-9 -bottom-6 w-[1px] bg-base-300 dark:bg-white/15" />
                  <div className="w-9 h-9 border border-[#0F62FE] dark:border-[#60A5FA] rounded-full flex items-center justify-center font-heading font-bold text-sm text-[#0F62FE] dark:text-[#60A5FA] bg-base-100 dark:bg-[#0A1830] z-10 flex-none shadow-sm">
                    1
                  </div>
                </div>
                <div className="pb-4">
                  <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                    Landing zone, built right the first time
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Identity, network, tagging and guardrails set up before a single workload lands.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-[36px_1fr] gap-4 relative">
                <div className="relative flex justify-center">
                  <div className="absolute top-9 -bottom-6 w-[1px] bg-base-300 dark:bg-white/15" />
                  <div className="w-9 h-9 border border-[#0F62FE] dark:border-[#60A5FA] rounded-full flex items-center justify-center font-heading font-bold text-sm text-[#0F62FE] dark:text-[#60A5FA] bg-base-100 dark:bg-[#0A1830] z-10 flex-none shadow-sm">
                    2
                  </div>
                </div>
                <div className="pb-4">
                  <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                    A costed estimate, not a range
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65 mb-2.5">
                    Workload-by-workload modelling so you know your monthly run-rate before you commit.
                  </p>
                  <div className="inline-flex items-baseline gap-2 border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-md bg-base-200/50 dark:bg-white/5">
                    <span className="text-[10.5px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-heading">
                      Sample output
                    </span>
                    <span className="font-heading font-bold text-sm text-[#0F62FE] dark:text-[#60A5FA]">
                      Est. $4,200–$5,800/mo
                    </span>
                  </div>
                  <span className="block text-[11px] text-base-content/50 dark:text-white/45 mt-1">
                    Illustrative — actual estimate varies by workload.
                  </span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-[36px_1fr] gap-4 relative">
                <div className="relative flex justify-center">
                  <div className="absolute top-9 -bottom-6 w-[1px] bg-base-300 dark:bg-white/15" />
                  <div className="w-9 h-9 border border-[#0F62FE] dark:border-[#60A5FA] rounded-full flex items-center justify-center font-heading font-bold text-sm text-[#0F62FE] dark:text-[#60A5FA] bg-base-100 dark:bg-[#0A1830] z-10 flex-none shadow-sm">
                    3
                  </div>
                </div>
                <div className="pb-4">
                  <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                    Budgets and alerts from launch day
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Forecasts, thresholds and anomaly alerts live before your first invoice arrives.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-[36px_1fr] gap-4 relative">
                <div className="relative flex justify-center">
                  <div className="w-9 h-9 border border-[#0F62FE] dark:border-[#60A5FA] rounded-full flex items-center justify-center font-heading font-bold text-sm text-[#0F62FE] dark:text-[#60A5FA] bg-base-100 dark:bg-[#0A1830] z-10 flex-none shadow-sm">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                    Licensing checked before you commit
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-base-content/70 dark:text-white/65">
                    Microsoft 365, Azure and Google Workspace sized to actual usage, not vendor defaults.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ENGAGEMENT MODELS & TRANSPARENT PRICING
          ══════════════════════════════════════════════════════════════ */}
      <section id="engagement" className="py-20 px-6 sm:px-10 bg-base-200/70 dark:bg-[#0A1830] text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <span className="block text-[12px] tracking-widest uppercase text-[#0F62FE] dark:text-[#60A5FA] font-bold mb-3">
              Engagement Model
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-base-content dark:text-white tracking-tight">
              Start Free. Then Pick the Path That Fits.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="border border-base-300 dark:border-white/15 rounded-xl p-8 bg-base-100 dark:bg-white/5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-[11.5px] uppercase tracking-wider text-[#0F62FE] dark:text-[#60A5FA] font-bold">
                  Step 1 — Always Free
                </span>
                <h3 className="font-heading font-bold text-2xl text-base-content dark:text-white mt-2 mb-3">
                  Free Cost X-Ray Assessment
                </h3>
                <p className="text-[14px] text-base-content/70 dark:text-white/70 leading-relaxed mb-6">
                  A certified analyst reviews your cloud environment and delivers a category-by-category savings breakdown. Zero obligation.
                </p>

                <ul className="space-y-3 text-[13.5px] text-base-content/80 dark:text-white/100 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#0F62FE] dark:text-[#60A5FA]">✓</span> Full billing &amp; architecture review
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#0F62FE] dark:text-[#60A5FA]">✓</span> Savings opportunity by category
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#0F62FE] dark:text-[#60A5FA]">✓</span> Executive summary yours to keep
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#0F62FE] dark:text-[#60A5FA]">✓</span> Delivered within 24 working hours
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-base-200 dark:border-white/10">
                <span className="text-[28px] font-bold font-heading text-base-content dark:text-white">$0</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="w-full mt-4 bg-slate-900 text-white dark:bg-white dark:text-[#0A1830] font-bold text-[14px] py-3 rounded hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
                >
                  Request Assessment
                </button>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="border border-base-300 dark:border-white/15 rounded-xl p-8 bg-base-100 dark:bg-white/5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-[11.5px] uppercase tracking-wider text-base-content/50 dark:text-white/50 font-bold">
                  2–5 Business Days
                </span>
                <h3 className="font-heading font-bold text-2xl text-base-content dark:text-white mt-2 mb-3">
                  Cloud Cost Leak Review
                </h3>
                <p className="text-[14px] text-base-content/70 dark:text-white/70 leading-relaxed mb-6">
                  A comprehensive, paid diagnostic scan with ranked findings and exact remediation instructions.
                </p>

                <ul className="space-y-3 text-[13.5px] text-base-content/80 dark:text-white/100 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-[#0F62FE] dark:text-[#60A5FA]">✓</span> Full billing &amp; architecture leak scan
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#0F62FE] dark:text-[#60A5FA]">✓</span> Documented, ranked engineering findings
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#0F62FE] dark:text-[#60A5FA]">✓</span> Fixed price for a defined deliverable
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-base-200 dark:border-white/10">
                <span className="text-[24px] font-bold font-heading text-base-content dark:text-white">$750–$1,250*</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="w-full mt-4 bg-slate-900 text-white dark:bg-white dark:text-[#0A1830] font-bold text-[14px] py-3 rounded hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Tier 3 (Featured) */}
            <div className="border-2 border-[#0F62FE] rounded-xl p-8 bg-blue-50/70 dark:bg-[#0F62FE]/15 flex flex-col justify-between relative shadow-xl">
              <span className="absolute -top-3.5 left-8 bg-[#0F62FE] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                Recommended
              </span>

              <div>
                <span className="text-[11.5px] uppercase tracking-wider text-[#0F62FE] dark:text-[#60A5FA] font-bold">
                  Ongoing Retainer
                </span>
                <h3 className="font-heading font-bold text-2xl text-base-content dark:text-white mt-2 mb-3">
                  FinOps Partner
                </h3>
                <p className="text-[14px] text-base-content/80 dark:text-white/100 leading-relaxed mb-6">
                  Your extended FinOps team, continuous — flat monthly retainer, never a percentage of savings.
                </p>

                <ul className="space-y-3 text-[13.5px] text-base-content/90 dark:text-white/90 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span> Continuous monitoring, governance &amp; reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span> Cross-platform: multi-cloud and AI spend
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">✓</span> Savings commitment written into the SOW
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[#0F62FE]/20 dark:border-white/10">
                <span className="text-[26px] font-bold font-heading text-base-content dark:text-white">From $1,500* /mo</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="w-full mt-4 bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold text-[14px] py-2.5 rounded-lg transition-colors shadow-sm hover:shadow cursor-pointer"
                >
                  Talk to a FinOps Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          COMMON QUESTIONS (FAQ)
          ══════════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 px-6 sm:px-10 bg-base-100 border-b border-base-300">
        <div className="max-w-[900px] mx-auto">
          <span className="block text-[12px] tracking-widest uppercase text-[#0F62FE] font-bold mb-3">
            Common Questions
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-base-content tracking-tight mb-8">
            FinOps as a Service, Answered.
          </h2>

          <div className="divide-y divide-base-300">
            <details className="py-5 group">
              <summary className="font-heading font-semibold text-lg text-base-content cursor-pointer list-none flex items-center justify-between">
                <span>How much does FinOps as a Service cost?</span>
                <span className="text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-[14.5px] leading-relaxed text-base-content/70 mt-3 pl-1">
                Nowazone's FinOps as a Service starts with a free Cost X-Ray Assessment, followed by a paid Cloud Cost Leak Review ($750–$1,250) or an ongoing FinOps Partner retainer starting from $1,500/month. Final pricing depends on your cloud footprint, account count and scope.
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-heading font-semibold text-lg text-base-content cursor-pointer list-none flex items-center justify-between">
                <span>What is included in a cloud cost assessment?</span>
                <span className="text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-[14.5px] leading-relaxed text-base-content/70 mt-3 pl-1">
                A full billing and architecture review, a savings opportunity breakdown by category, and an executive summary you keep whether or not you continue with Nowazone.
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-heading font-semibold text-lg text-base-content cursor-pointer list-none flex items-center justify-between">
                <span>Is my cloud data secure during the assessment?</span>
                <span className="text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-[14.5px] leading-relaxed text-base-content/70 mt-3 pl-1">
                Nowazone works under NDA, MCA and SOW agreements with read-only access to your environment — we never make changes without your approval.
              </p>
            </details>

            <details className="py-5 group">
              <summary className="font-heading font-semibold text-lg text-base-content cursor-pointer list-none flex items-center justify-between">
                <span>Can I switch or cancel a FinOps Partner engagement?</span>
                <span className="text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-[14.5px] leading-relaxed text-base-content/70 mt-3 pl-1">
                FinOps Partner engagements run on a flat monthly retainer with no long-term lock-in — you can adjust scope or step down as your needs change.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CALL TO ACTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="cta" className="py-20 px-6 sm:px-10 bg-base-100 dark:bg-[#0E1F33] text-base-content dark:text-white text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[760px] mx-auto">
          <span className="inline-block text-[12px] tracking-widest uppercase text-[#0F62FE] dark:text-[#60A5FA] font-bold mb-3">
            Get Started
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-base-content dark:text-white tracking-tight mb-5">
            What Is Your Cloud Really Costing You?
          </h2>
          <p className="text-[16px] text-base-content/75 dark:text-white/75 leading-relaxed mb-8 max-w-xl mx-auto">
            Get a practical view of where your cloud spend is going, where optimization opportunities exist, and what should be addressed first.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={openAssessmentModal}
              className="bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold text-[14.5px] py-3 px-7 rounded-lg transition-colors shadow-sm hover:shadow cursor-pointer"
            >
              Free Cost X-Ray Assessment
            </button>
            <Link
              to="/contact-us"
              className="border border-base-300 dark:border-white/30 text-base-content dark:text-white hover:bg-base-200 dark:hover:bg-white/10 font-bold text-[14.5px] py-4 px-8 rounded transition-all shadow-sm"
            >
              Talk to a FinOps Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 13: RESOURCES — FROM THE NOWAZONE BLOG
          ══════════════════════════════════════════════════════════════ */}
      <section id="resources" className="py-16 sm:py-20 bg-base-100 dark:bg-[#070D18] text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 mb-8 sm:mb-10">
          <span className="block text-[12px] tracking-[0.14em] uppercase text-[#0F62FE] dark:text-[#60A5FA] font-bold font-heading mb-3">
            Resources
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[32px] text-base-content dark:text-white tracking-tight">
              From the Nowazone Blog
            </h2>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-[#0F62FE] dark:text-[#60A5FA] hover:underline"
            >
              View all articles <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Continuous Marquee Carousel of Blog Articles */}
        <div className="relative w-full">
          <Marquee pauseOnHover speed={32} className="py-2">
            {[
              {
                title: 'Reading Your Azure/Google Cloud Bill',
                desc: 'What each line item actually means, and where costs hide in usage-based billing.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2h9l5 5v15H6V2Z" />
                    <path d="M9 11h6M9 15h6M9 7h3" />
                  </svg>
                ),
              },
              {
                title: 'Landing Zones, Explained',
                desc: 'The baseline environment that governs identity, networking and security before workloads move in.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                ),
              },
              {
                title: 'Licensing 101: EA vs. CSP vs. Google Workspace',
                desc: 'How the major Microsoft and Google licensing paths differ, and which fits your organization.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M8 3h6l5 5v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 14h6M9 17h4" />
                  </svg>
                ),
              },
              {
                title: 'Cloud Cost Anomalies: What to Watch',
                desc: 'The spend patterns that signal a misconfiguration, an unused resource, or a billing error.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3 2 20h20L12 3Z" />
                    <path d="M12 10v4" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                  </svg>
                ),
              },
              {
                title: 'Choosing a Cloud Partner vs. Going Direct',
                desc: "What a partner adds beyond a direct vendor relationship, and when it's worth it.",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" />
                    <path d="m15 9-2 6-6 2 2-6 6-2Z" />
                  </svg>
                ),
              },
            ].map((art, idx) => (
              <div
                key={idx}
                className="w-[290px] sm:w-[320px] mx-3.5 flex flex-col justify-between p-6 rounded-2xl bg-base-100 dark:bg-[#0E1F33] border border-base-300 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#0F62FE]/40 transition-all flex-none group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-white/5 border border-blue-200/80 dark:border-white/10 flex items-center justify-center text-[#0F62FE] dark:text-[#60A5FA] mb-4">
                    {art.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-[15.5px] leading-snug text-base-content dark:text-white mb-2 group-hover:text-[#0F62FE] dark:group-hover:text-[#60A5FA] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-base-content/70 dark:text-white/65 mb-4">
                    {art.desc}
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 font-heading font-semibold text-[13px] text-[#0F62FE] dark:text-[#60A5FA] group-hover:translate-x-1 transition-transform"
                >
                  Read article <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


