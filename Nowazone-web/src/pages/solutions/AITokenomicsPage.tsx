import React, { useState, useEffect } from 'react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';

export const AITokenomicsPage: React.FC = () => {
  const { openAssessment } = useModal();

  // Hero interactive state
  const [heroHours, setHeroHours] = useState<number>(500);
  const heroSpend = Math.round(heroHours * 2.5);

  // Estimator interactive state
  const [estGpuType, setEstGpuType] = useState<'H100' | 'A100' | 'Consumer-grade'>('H100');
  const [estGpuCount, setEstGpuCount] = useState<number>(8);
  const [estUtilization, setEstUtilization] = useState<number>(22);
  const [tokenVolume, setTokenVolume] = useState<string>('10M–100M tokens/mo');

  const gpuRates: Record<string, number> = { H100: 4.10, A100: 2.10, 'Consumer-grade': 0.55 };
  const monthlyHours = 730;
  const rate = gpuRates[estGpuType] || gpuRates.H100;
  const estMonthlySpend = Math.round(estGpuCount * monthlyHours * rate);
  const estWaste = Math.round(estMonthlySpend * (1 - estUtilization / 100));

  const [tokenTrendY, setTokenTrendY] = useState<number>(22);
  useEffect(() => {
    const timer = setInterval(() => {
      setTokenTrendY(20 + Math.round(Math.random() * 8));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    {
      q: 'What is AI cost optimization?',
      a: 'AI cost optimization applies FinOps discipline to AI infrastructure — GPU utilization, token consumption, inference efficiency and agentic workflow costs — so AI spend is visible, allocated and managed instead of running unchecked.'
    },
    {
      q: 'What is tokenomics?',
      a: 'Tokenomics, in this context, is the economics of token-based AI usage — what each model call costs, how token volume scales with usage, and how to allocate that cost by team, product or feature.'
    },
    {
      q: 'How is AI cost optimization different from regular cloud FinOps?',
      a: "Same Inform-Optimize-Operate discipline, different cost drivers. Instead of instance types and storage tiers, you're managing GPU utilization, token cost per model call, inference latency-cost tradeoffs and the compounding cost of autonomous agents making many calls per task."
    },
    {
      q: 'Is the Cost Estimator on this page accurate?',
      a: "It's an illustrative benchmark based on public GPU pricing, not a quote. A Free Cost X-Ray Assessment gives you an exact number based on your actual environment."
    },
    {
      q: 'Do you help with agentic AI cost control specifically?',
      a: 'Yes. Agentic workflows make many API calls per task without a human in the loop, which can compound cost quickly. We build governance and budgets specifically for that pattern.'
    },
    {
      q: 'Is your team certified for AI cost governance?',
      a: 'Yes. Our team holds FinOps Certified: AI Value alongside FinOps Certified Professional, FinOps Certified Engineer and FinOps Certified: Technology Value — individual practitioner certifications, not organizational membership.'
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 dark:bg-navy text-base-content dark:text-white transition-colors">
      <SEO
        title="AI Cost Optimization & Tokenomics | GPU & LLM Cost Governance — Nowazone"
        description="FinOps for AI: GPU utilization audits, token cost allocation, model rightsizing, inference cost benchmarking and agentic workload governance."
        canonical="/solutions/ai-tokenomics"
      />

      {/* SECTION 1: HERO */}
      <section className="py-20 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3.5 py-1.5 bg-primary/10 border border-primary/30 rounded-full mb-6 font-heading">
              AI Cost Optimization &amp; Tokenomics
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content dark:text-white leading-tight">
              GPU, Token and Agentic Workload Cost Governance.
            </h1>
            <p className="text-base md:text-lg text-base-content/75 dark:text-white/70 leading-relaxed mb-8">
              The exact same FinOps discipline that eliminates cloud waste, applied to GPUs, token burn rates, and autonomous AI agents. Most AI infrastructure today is completely unmanaged.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                type="button"
                onClick={openAssessment}
                className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
              >
                <CornerMarkers />
                Free Cost X-Ray Assessment
              </button>
              <a
                href="#estimator"
                className="border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm px-6 py-3.5 rounded transition-all flex items-center"
              >
                Run AI Waste Calculator
              </a>
            </div>
          </div>

          {/* Interactive Hero Widget */}
          <div className="lg:col-span-5 bg-base-100 dark:bg-[#0a1830] text-base-content dark:text-white rounded-2xl p-6 sm:p-8 border border-base-300 dark:border-white/10 shadow-2xl relative transition-colors">
            <CornerMarkers />
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase tracking-widest text-base-content/70 dark:text-white/60 font-mono">
                Live Interactive Telemetry
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center mb-6 pb-6 border-b border-base-300 dark:border-white/10">
              <div className="flex flex-col items-center justify-center p-3 bg-base-200/70 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/5">
                <span className="text-3xl font-extrabold font-heading text-primary dark:text-blue-400">38%</span>
                <span className="text-[10px] text-base-content/60 dark:text-white/50 uppercase tracking-wider font-mono mt-1">
                  Target Utilization
                </span>
                <span className="text-[10px] text-red-500 font-semibold mt-0.5">Industry avg: 5%</span>
              </div>
              <div>
                <span className="text-xs text-base-content/70 dark:text-white/70 block mb-2 font-mono">Token Cost Trend</span>
                <div className="h-10 w-full">
                  <svg viewBox="0 0 160 34" className="w-full h-full">
                    <polyline
                      points="0,30 20,26 40,27 60,20 80,22 100,14 120,16 140,8 160,10"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <span className="text-[10px] text-emerald-500 font-mono block">−64% cost / 1k tokens</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-base-content/70 dark:text-white/70 font-mono mb-2">
                <span>Monthly GPU Compute Hours</span>
                <span className="text-primary dark:text-blue-400 font-bold">{heroHours} hrs/mo</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={heroHours}
                onChange={(e) => setHeroHours(Number(e.target.value))}
                className="w-full accent-primary mb-3"
              />
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-xs text-base-content/60 dark:text-white/60">Estimated blended spend:</span>
                <span className="text-2xl font-bold font-heading text-emerald-500 font-mono">
                  ${heroSpend.toLocaleString()}<span className="text-xs font-normal text-base-content/60 dark:text-white/60">/mo</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE WASTE IS REAL */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              The Fastest-Growing Part of Your Cloud Bill
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white font-heading">
              The waste is real, and it's getting worse, not better.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy-950 rounded-xl p-6 sm:p-8 shadow-sm relative">
              <CornerMarkers />
              <span className="text-4xl font-extrabold text-primary dark:text-blue-400 block mb-3 font-heading">5%</span>
              <p className="text-sm text-base-content/75 dark:text-white/75 leading-relaxed mb-4">
                average GPU utilization across enterprise clusters — 95% of provisioned AI compute sits idle.
              </p>
              <span className="text-xs text-base-content/50 dark:text-white/40 block">
                Source: CAST AI, 2026 State of Kubernetes Optimization Report (23,000 clusters analyzed)
              </span>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy-950 rounded-xl p-6 sm:p-8 shadow-sm relative">
              <CornerMarkers />
              <span className="text-4xl font-extrabold text-primary dark:text-blue-400 block mb-3 font-heading">$401B</span>
              <p className="text-sm text-base-content/75 dark:text-white/75 leading-relaxed mb-4">
                in new AI infrastructure spending industry-wide in 2026.
              </p>
              <span className="text-xs text-base-content/50 dark:text-white/40 block">
                Source: Gartner
              </span>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy-950 rounded-xl p-6 sm:p-8 shadow-sm relative">
              <CornerMarkers />
              <span className="text-4xl font-extrabold text-primary dark:text-blue-400 block mb-3 font-heading">83%</span>
              <p className="text-sm text-base-content/75 dark:text-white/75 leading-relaxed mb-4">
                of container costs are associated with idle resources — 54% cluster idle, 29% workload idle.
              </p>
              <span className="text-xs text-base-content/50 dark:text-white/40 block">
                Source: Datadog, State of Cloud Costs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SAME FRAMEWORK, EXTENDED TO GPUS, TOKENS AND AGENTS */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3 font-heading">
              What Is FinOps for AI?
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4 leading-tight font-heading">
              The same framework, extended to GPUs, tokens and agents.
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 leading-relaxed">
              FinOps for AI applies the same Inform → Optimize → Operate discipline to a new set of cost drivers — GPU utilization, token consumption per model call, inference efficiency, and the compounding cost of autonomous agent workflows that make many API calls per task without a human in the loop. Most organizations have no visibility into any of this yet, and tokenomics — the economics of token-based usage — is treated as an afterthought rather than a managed line item.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-base-content dark:text-white block mb-1">GPU/compute utilization tracking</span>
              <p className="text-xs text-base-content/65 dark:text-white/60">Cluster-level visibility into idle vs active execution capacity.</p>
            </div>
            <div className="p-4 border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-base-content dark:text-white block mb-1">Token cost allocation by model and team</span>
              <p className="text-xs text-base-content/65 dark:text-white/60">Mapping input/output tokens to individual features and departments.</p>
            </div>
            <div className="p-4 border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-base-content dark:text-white block mb-1">Inference cost-per-request benchmarking</span>
              <p className="text-xs text-base-content/65 dark:text-white/60">Evaluating latency, context size, and accuracy trade-offs.</p>
            </div>
            <div className="p-4 border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-base-content dark:text-white block mb-1">Agentic workload cost governance</span>
              <p className="text-xs text-base-content/65 dark:text-white/60">Circuit breakers and budgets for recursive multi-agent loops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: ESTIMATE YOUR AI INFRASTRUCTURE WASTE */}
      <section id="estimator" className="bg-base-200/50 dark:bg-navy-950 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              See It In Action
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white font-heading">
              Estimate your AI infrastructure waste.
            </h2>
          </div>

          <div className="bg-base-100 dark:bg-navy-900 border border-base-300 dark:border-white/15 rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl">
            {/* Input Controls */}
            <div className="p-6 sm:p-8 space-y-6 border-b md:border-b-0 md:border-r border-base-300 dark:border-white/15">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 dark:text-white/60 mb-2 font-heading">
                  GPU Type / Tier
                </label>
                <select
                  className="w-full bg-base-200/70 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                  value={estGpuType}
                  onChange={(e) => setEstGpuType(e.target.value as any)}
                >
                  <option value="H100" className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white">H100 ($4.10/hr benchmark)</option>
                  <option value="A100" className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white">A100 ($2.10/hr benchmark)</option>
                  <option value="Consumer-grade" className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white">Consumer-grade / L40S ($0.55/hr benchmark)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-base-content/80 dark:text-white/100 mb-2">
                  <span>Number of GPUs</span>
                  <span className="text-primary dark:text-blue-400 font-mono font-bold">{estGpuCount}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="128"
                  value={estGpuCount}
                  onChange={(e) => setEstGpuCount(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-base-content/80 dark:text-white/100 mb-2">
                  <span>Average Utilization</span>
                  <span className={`font-mono font-bold ${estUtilization < 30 ? 'text-red-500' : 'text-emerald-500'}`}>{estUtilization}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="95"
                  value={estUtilization}
                  onChange={(e) => setEstUtilization(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 dark:text-white/60 mb-2 font-heading">
                  Monthly Token Volume
                </label>
                <select
                  className="w-full bg-base-200/70 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white rounded-lg p-3 text-sm focus:outline-none focus:border-primary"
                  value={tokenVolume}
                  onChange={(e) => setTokenVolume(e.target.value)}
                >
                  <option className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white">Under 10M tokens/mo</option>
                  <option className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white">10M–100M tokens/mo</option>
                  <option className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white">100M–1B tokens/mo</option>
                  <option className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white">1B+ tokens/mo</option>
                </select>
              </div>
            </div>

            {/* Results Output */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-base-100 dark:bg-navy-950/60">
              <div>
                <span className="text-xs uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-1 font-mono">
                  Illustrative Monthly GPU Spend
                </span>
                <span className="text-3xl font-extrabold text-base-content dark:text-white font-mono block mb-4">
                  ${estMonthlySpend.toLocaleString()}
                </span>

                <span className="text-xs uppercase tracking-wider text-red-500 block mb-1 font-mono">
                  Illustrative Waste at Current Utilization
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-red-500 font-mono block mb-6">
                  ${estWaste.toLocaleString()}
                </span>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-base-content/70 dark:text-white/70 mb-1 font-mono">
                      <span>Your estimated utilization</span>
                      <span className="font-bold">{estUtilization}%</span>
                    </div>
                    <div className="h-2 bg-base-300 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary dark:bg-blue-400 rounded-full" style={{ width: `${estUtilization}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-base-content/70 dark:text-white/70 mb-1 font-mono">
                      <span>Industry average</span>
                      <span className="font-bold text-red-500">5%</span>
                    </div>
                    <div className="h-2 bg-base-300 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-base-content/70 dark:text-white/70 mb-1 font-mono">
                      <span>Optimized target</span>
                      <span className="font-bold text-emerald-500">65–80%</span>
                    </div>
                    <div className="h-2 bg-base-300 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-base-content/60 dark:text-white/50 mb-4 leading-relaxed">
                  ILLUSTRATIVE ESTIMATE based on public GPU pricing benchmarks — not a quote. Get an exact number with a Free Cost X-Ray Assessment.
                </p>
                <button
                  type="button"
                  onClick={openAssessment}
                  className="relative w-full inline-flex justify-center items-center px-6 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
                >
                  <CornerMarkers />
                  Get My Real AI Cost Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT TOKEN COST GOVERNANCE LOOKS LIKE */}
      <section id="dashboard" className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-baseline flex-wrap gap-4 mb-8">
            <div>
              <span className="text-xs tracking-widest uppercase text-primary dark:text-blue-400 font-bold block mb-1 font-heading">
                What Token Cost Governance Looks Like
              </span>
              <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white font-heading">
                From black-box AI spend to line-item accountability.
              </h2>
            </div>
            <span className="text-xs text-base-content/60 dark:text-white/50 font-mono">Refreshing live · just now</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-7 bg-base-200/50 dark:bg-navy-950 border border-base-300 dark:border-white/10 rounded-xl p-6 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-4 font-mono">Token Cost Trend (30 Days)</span>
              <svg viewBox="0 0 320 90" className="w-full h-24">
                <polyline
                  points={`0,68 32,64 64,58 96,60 128,50 160,52 192,42 224,44 256,34 288,30 320,${tokenTrendY}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />
              </svg>
              <span className="text-[10px] text-base-content/50 dark:text-white/40 block mt-2 font-mono">ILLUSTRATIVE — not client data</span>
            </div>

            <div className="md:col-span-5 bg-base-200/50 dark:bg-navy-950 border border-base-300 dark:border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-xs uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-4 self-start font-mono">Cost by Model Category</span>
              <div className="w-28 h-28 rounded-full mb-4 flex items-center justify-center shadow-inner" style={{ background: 'conic-gradient(#0a63ce 0% 52%, #3b82f6 52% 78%, #93c5fd 78% 100%)' }}>
                <div className="w-20 h-20 rounded-full bg-base-100 dark:bg-navy-900 flex flex-col items-center justify-center">
                  <span className="font-bold text-xs text-base-content dark:text-white">Token</span>
                  <span className="text-[9px] text-base-content/60 dark:text-white/50">spend</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center text-[10px] text-base-content/75 dark:text-white/70 font-mono">
                <span>■ Frontier 52%</span>
                <span>■ Mid-tier 26%</span>
                <span>■ Self-hosted 22%</span>
              </div>
            </div>
          </div>

          <div className="bg-base-200/50 dark:bg-navy-950 border border-base-300 dark:border-white/10 rounded-xl p-6 shadow-sm">
            <span className="text-xs uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-3 font-mono">Top Optimization Opportunities</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-3 bg-primary/5 dark:bg-blue-500/10 border border-primary/20 dark:border-blue-400/20 rounded-lg text-base-content dark:text-white">
                <span className="font-medium">Prompt caching for repeated context</span>
                <span className="text-base-content/60 dark:text-white/60 font-mono">High impact</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/5 dark:bg-blue-500/10 border border-primary/20 dark:border-blue-400/20 rounded-lg text-base-content dark:text-white">
                <span className="font-medium">Model right-sizing — smaller model where accuracy allows</span>
                <span className="text-base-content/60 dark:text-white/60 font-mono">High impact</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/5 dark:bg-blue-500/10 border border-primary/20 dark:border-blue-400/20 rounded-lg text-base-content dark:text-white">
                <span className="font-medium">Batching inference requests</span>
                <span className="text-base-content/60 dark:text-white/60 font-mono">Medium impact</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/5 dark:bg-blue-500/10 border border-primary/20 dark:border-blue-400/20 rounded-lg text-base-content dark:text-white">
                <span className="font-medium">Spot/preemptible GPU instances for training</span>
                <span className="text-base-content/60 dark:text-white/60 font-mono">Medium impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHAT WE DO FOR AI COST GOVERNANCE */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2 font-heading">
              AI Cost Governance
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white font-heading">
              What We Do for AI Cost Governance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">GPU Utilization Audit</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Cluster-by-cluster review of provisioned vs. actually used GPU capacity.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Token Cost Allocation</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Mapping token spend to team, product or feature so cost has an owner.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Model Right-Sizing Review</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Identifying where a smaller or self-hosted model matches accuracy needs at lower cost.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Inference Cost Benchmarking</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Cost-per-request benchmarks across model and infrastructure choices.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 rounded-xl p-6 shadow-sm sm:col-span-2 lg:col-span-2">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Agentic Workload Governance</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Budgets and guardrails for autonomous agents that make many calls per task.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: NOT A GENERIC FINOPS ADD-ON */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              Certified For AI Cost Governance Specifically
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white font-heading">
              Not a generic FinOps add-on.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="border-2 border-primary bg-primary/10 rounded-xl p-6 md:col-span-2 flex flex-col justify-center shadow-sm">
              <span className="inline-block bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full mb-3 self-start font-mono">
                Lead Credential for This Page
              </span>
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-2 font-heading">FinOps Certified: AI Value</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/75 leading-relaxed">
                Individual practitioner certification specific to AI and GPU cost governance — the credential most directly relevant to everything on this page.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy-950 rounded-xl p-6 flex items-center justify-center text-center shadow-sm">
              <h3 className="font-semibold text-sm text-base-content dark:text-white font-heading">FinOps Certified Professional</h3>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy-950 rounded-xl p-6 flex items-center justify-center text-center shadow-sm">
              <h3 className="font-semibold text-sm text-base-content dark:text-white font-heading">FinOps Certified Engineer</h3>
            </div>
          </div>
          <p className="text-center text-xs text-base-content/60 dark:text-white/50">
            These are individual FinOps Foundation practitioner certifications held by our team — not organizational membership.
          </p>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Common Questions
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Questions we get about AI cost optimization.
            </h2>
          </div>
          <div className="divide-y divide-base-300 dark:divide-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-semibold text-sm sm:text-base text-base-content dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 mt-2 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-16 px-6 sm:px-10 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl mb-4 text-base-content dark:text-white">
            Your AI spend is growing faster than your visibility into it.
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
            Let our AI FinOps practitioners audit your token usage, GPU infrastructure, and model routing in 24 hours.
          </p>
          <button
            type="button"
            onClick={openAssessment}
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
          >
            <CornerMarkers />
            Start My Free Assessment
          </button>
        </div>
      </section>
    </div>
  );
};

export default AITokenomicsPage;
