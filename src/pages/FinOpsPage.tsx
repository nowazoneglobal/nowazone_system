import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { finOpsSchema } from '../data/seoSchemas';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { useModal } from '../context/ModalContext';

export const FinOpsPage: React.FC = () => {
  const { openAssessment } = useModal();

  const [spend, setSpend] = useState<number>(1840320);
  const [savings, setSavings] = useState<number>(287410);
  const [aiSpend, setAiSpend] = useState<number>(212050);
  const [anomaliesCount, setAnomaliesCount] = useState<number>(7);

  const [anomalies, setAnomalies] = useState([
    { sev: 'critical', text: 'Unusual spend spike — us-east-1 compute', amt: '$4,120', t: '14 min ago' },
    { sev: 'warning', text: 'Idle GPU reservation detected — off-peak', amt: '$1,860', t: '28 min ago' },
    { sev: 'info', text: 'New Reserved Instance opportunity found', amt: '$2,940', t: '42 min ago' },
    { sev: 'warning', text: 'Storage lifecycle policy missing — cold data', amt: '$780', t: '56 min ago' },
  ]);

  useEffect(() => {
    const tick = setInterval(() => {
      setSpend((s) => s + Math.round(300 + Math.random() * 900));
      setSavings((sv) => sv + Math.round(20 + Math.random() * 120));
      setAiSpend((ai) => Math.max(0, ai + Math.round(-40 + Math.random() * 160)));
    }, 2200);

    const anomTick = setInterval(() => {
      const pool = [
        { sev: 'critical', text: 'Unusual spend spike — us-east-1 compute', amt: '$4,120' },
        { sev: 'warning', text: 'Idle GPU reservation detected — off-peak', amt: '$1,860' },
        { sev: 'info', text: 'New Reserved Instance opportunity found', amt: '$2,940' },
        { sev: 'warning', text: 'Storage lifecycle policy missing — cold data', amt: '$780' },
        { sev: 'critical', text: 'Anomalous egress traffic — ap-south-1', amt: '$3,210' }
      ];
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setAnomalies((prev) => [
        { ...pick, t: 'just now' },
        ...prev.slice(0, 3).map((item, idx) => ({
          ...item,
          t: idx === 0 ? '1 min ago' : (idx + 1) * 14 + ' min ago'
        }))
      ]);
      setAnomaliesCount((a) => a + 1);
    }, 6000);

    return () => {
      clearInterval(tick);
      clearInterval(anomTick);
    };
  }, []);

  const tools = [
    'Cloudability',
    'CloudHealth',
    'Kubecost',
    'CAST AI',
    'Finout',
    'Vantage',
    'Native cloud consoles',
    'No tool at all'
  ];

  const faqs = [
    {
      q: 'What is FinOps as a Service?',
      a: "FinOps as a Service is the ongoing delivery of the FinOps Foundation's Inform, Optimize, Operate lifecycle by a dedicated Nowazone team — cost allocation, rate optimization, commitment management, anomaly response, forecasting and governance — run for you, using FOCUS as the common cost language across every cloud you operate."
    },
    {
      q: 'How is this different from a FinOps tool or dashboard?',
      a: 'A tool gives you a dashboard. FaaS gives you the people who read it, act on it, negotiate the commitments, fix broken tagging, and are accountable for the savings number at the end of the month.'
    },
    {
      q: 'Do you charge a percentage of the savings you find?',
      a: 'No. Nowazone prices every engagement as a flat fee or fixed retainer, agreed before work starts, with a committed savings range written into the SOW. You know the cost on day one.'
    },
    {
      q: 'Is Nowazone a FinOps Foundation member organization?',
      a: "Nowazone's team holds individual FinOps Foundation certifications — FinOps Certified Professional, FinOps Certified Engineer and FinOps Certified: Technology Value. This is not the same as organizational Foundation membership, and we don't represent it as such."
    },
    {
      q: 'Which clouds and tools do you work with?',
      a: "AWS, Azure, Google Cloud, OCI and Alibaba Cloud, normalized to FOCUS. We're vendor-neutral on tooling too — Cloudability, CloudHealth, Kubecost, CAST AI, Finout, Vantage, native cloud consoles, or no tool at all."
    },
    {
      q: 'Does FinOps as a Service cover AI and GPU spend?',
      a: 'Yes. GPU utilization, token cost and inference efficiency get the same Inform-Optimize-Operate treatment as the rest of your cloud bill — see FinOps for AI (Tokenomics).'
    },
    {
      q: 'What happens in the free Cost X-Ray Assessment?',
      a: 'A FinOps-certified analyst reviews your environment under read-only, NDA-protected access and delivers a category-by-category savings breakdown within 24 working hours — no cost, no obligation.'
    },
    {
      q: 'How much does a FinOps Partner Retainer cost?',
      a: 'Retainers start from $1,500/month and scale with environment size and scope, always agreed as a flat fee before work begins — never a percentage of savings.'
    },
    {
      q: 'Do I need to replace my existing tools to work with Nowazone?',
      a: 'No. Nowazone works with whatever cost tooling you already have, or none at all — the engagement is the practice, not another piece of software.'
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 dark:bg-navy text-base-content dark:text-white transition-colors">
      <SEO
        title="FinOps as a Service | Managed Cloud Cost Optimization — Nowazone"
        description="Managed FinOps practice covering cost allocation, rate optimization, commitment management, and AI/GPU cost governance across AWS, Azure, Google Cloud, OCI and Alibaba Cloud, normalized to FOCUS."
        canonical="https://www.nowazone.com/finops"
        jsonLd={finOpsSchema}
      />

      {/* SECTION 1: HERO */}
      <section className="py-20 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            FinOps as a Service
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-6 leading-tight tracking-tight">
            Cloud Cost Optimization, Delivered as a Managed FinOps Service.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Nowazone is a vendor-neutral FinOps partner — cost allocation, rate optimization, commitment management and AI/GPU governance, run for you across AWS, Azure, Google Cloud, OCI and Alibaba Cloud, normalized to FOCUS.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-7 py-3.5 bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-bold text-sm rounded shadow-lg transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Free Cost X-Ray Assessment
            </button>
            <button
              type="button"
              onClick={openAssessment}
              className="border border-primary/40 dark:border-white/20 hover:bg-primary/5 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm px-6 py-3.5 rounded transition-all"
            >
              Talk to a FinOps Expert
            </button>
          </div>
          <div className="flex flex-wrap gap-3 justify-center text-xs text-base-content/70 dark:text-white/60">
            <span className="border border-base-300 dark:border-white/15 px-3 py-1 rounded-full">15–42% savings committed in SOW</span>
            <span className="border border-base-300 dark:border-white/15 px-3 py-1 rounded-full">Not a software reseller</span>
            <span className="border border-base-300 dark:border-white/15 px-3 py-1 rounded-full">Vendor-neutral, FOCUS-aligned</span>
            <span className="border border-base-300 dark:border-white/15 px-3 py-1 rounded-full">Certified: FinOps Professional, Engineer &amp; Technology Value</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT THE DASHBOARD IS ACTUALLY TRACKING */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Live Simulated FinOps Console */}
          <div className="lg:col-span-7 bg-base-100 dark:bg-navy-950 border border-base-300 dark:border-white/15 rounded-2xl p-5 sm:p-6 shadow-xl text-base-content dark:text-white transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-500 dark:text-emerald-400 font-mono">Live — Illustrative Data</span>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-2.5 rounded-lg shadow-sm">
                <span className="text-[10px] uppercase text-base-content/60 dark:text-white/50 block mb-1 font-mono">Total Spend (MTD)</span>
                <span className="text-sm sm:text-base font-bold text-base-content dark:text-white block font-mono">${spend.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium font-mono">▲ 3.1% vs last</span>
              </div>
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-2.5 rounded-lg shadow-sm">
                <span className="text-[10px] uppercase text-base-content/60 dark:text-white/50 block mb-1 font-mono">Savings Identified</span>
                <span className="text-sm sm:text-base font-bold text-emerald-500 dark:text-emerald-400 block font-mono">${savings.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium font-mono">▲ growing</span>
              </div>
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-2.5 rounded-lg shadow-sm">
                <span className="text-[10px] uppercase text-base-content/60 dark:text-white/50 block mb-1 font-mono">AI / GPU Spend</span>
                <span className="text-sm sm:text-base font-bold text-pink-500 dark:text-pink-400 block font-mono">${aiSpend.toLocaleString()}</span>
                <span className="text-[10px] text-base-content/60 dark:text-white/50 font-mono">11.5% of total</span>
              </div>
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-2.5 rounded-lg shadow-sm">
                <span className="text-[10px] uppercase text-base-content/60 dark:text-white/50 block mb-1 font-mono">Anomalies Detected</span>
                <span className="text-sm sm:text-base font-bold text-amber-500 dark:text-amber-400 block font-mono">{anomaliesCount}</span>
                <span className="text-[10px] text-base-content/60 dark:text-white/50 font-mono">last 24h</span>
              </div>
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-2.5 rounded-lg col-span-2 sm:col-span-1 shadow-sm">
                <span className="text-[10px] uppercase text-base-content/60 dark:text-white/50 block mb-1 font-mono">Budget Utilization</span>
                <span className="text-sm sm:text-base font-bold text-base-content dark:text-white block font-mono">91%</span>
                <div className="h-1.5 w-full bg-base-300 dark:bg-white/10 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
            </div>

            {/* Charts Row 1: Trend, Provider & Cost Breakdown Donut */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {/* Spend Trend */}
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-3 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-base-content dark:text-white block mb-2 font-mono">Spend Trend — 30 Days</span>
                <svg viewBox="0 0 320 100" className="w-full h-16">
                  <path d="M0,80 L40,75 L80,62 L120,58 L160,45 L200,42 L240,30 L280,26 L320,15" fill="none" stroke="#0a63ce" strokeWidth="2.5" />
                  <path d="M0,80 L40,75 L80,62 L120,58 L160,45 L200,42 L240,30 L280,26 L320,15 L320,100 L0,100 Z" fill="rgba(10,99,206,0.15)" />
                  <path d="M0,88 L80,78 L160,58 L240,38 L320,20" fill="none" stroke="rgba(10,99,206,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="320" cy="15" r="4" fill="#0a63ce" />
                </svg>
                <div className="flex gap-3 text-[10px] text-base-content/60 dark:text-white/50 mt-1 font-mono">
                  <span className="text-primary font-medium">— Actual</span>
                  <span>┄ Forecast</span>
                </div>
              </div>

              {/* Spend by Provider (AWS, Azure, GCP, OCI, Alibaba) */}
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-3 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-base-content dark:text-white block mb-2 font-mono">Spend by Provider</span>
                <div className="space-y-1 text-[10px]">
                  <div>
                    <div className="flex justify-between text-base-content/75 dark:text-white/70"><span>AWS</span><span className="font-mono">$690K · 38%</span></div>
                    <div className="h-1.5 bg-base-300 dark:bg-white/10 rounded-full"><div className="h-full bg-[#e0a458] rounded-full" style={{ width: '38%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-base-content/75 dark:text-white/70"><span>Azure</span><span className="font-mono">$570K · 31%</span></div>
                    <div className="h-1.5 bg-base-300 dark:bg-white/10 rounded-full"><div className="h-full bg-[#4d9de0] rounded-full" style={{ width: '31%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-base-content/75 dark:text-white/70"><span>Google Cloud</span><span className="font-mono">$330K · 18%</span></div>
                    <div className="h-1.5 bg-base-300 dark:bg-white/10 rounded-full"><div className="h-full bg-[#4caf7d] rounded-full" style={{ width: '18%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-base-content/75 dark:text-white/70"><span>OCI</span><span className="font-mono">$150K · 8%</span></div>
                    <div className="h-1.5 bg-base-300 dark:bg-white/10 rounded-full"><div className="h-full bg-[#c05a4d] rounded-full" style={{ width: '8%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-base-content/75 dark:text-white/70"><span>Alibaba Cloud</span><span className="font-mono">$100K · 5%</span></div>
                    <div className="h-1.5 bg-base-300 dark:bg-white/10 rounded-full"><div className="h-full bg-[#d97a4d] rounded-full" style={{ width: '5%' }}></div></div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown Donut Chart */}
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-3 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-base-content dark:text-white block mb-2 font-mono">Cost Breakdown</span>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 42 42" className="w-16 h-16 flex-none">
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#4d9de0" strokeWidth="6" strokeDasharray="34 66" strokeDashoffset="25" />
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#8b6fd6" strokeWidth="6" strokeDasharray="20 80" strokeDashoffset="91" />
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#3aa596" strokeWidth="6" strokeDasharray="16 84" strokeDashoffset="71" />
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#d0a13a" strokeWidth="6" strokeDasharray="12 88" strokeDashoffset="55" />
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#f472b6" strokeWidth="6" strokeDasharray="11 89" strokeDashoffset="43" />
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#7a8494" strokeWidth="6" strokeDasharray="7 93" strokeDashoffset="32" />
                  </svg>
                  <div className="flex flex-col gap-0.5 text-[9px] text-base-content/75 dark:text-white/70">
                    <span><span className="inline-block w-2 h-2 rounded bg-[#4d9de0] mr-1"></span>Compute 34%</span>
                    <span><span className="inline-block w-2 h-2 rounded bg-[#8b6fd6] mr-1"></span>Storage 20%</span>
                    <span><span className="inline-block w-2 h-2 rounded bg-[#3aa596] mr-1"></span>Database 16%</span>
                    <span><span className="inline-block w-2 h-2 rounded bg-[#d0a13a] mr-1"></span>Network 12%</span>
                    <span><span className="inline-block w-2 h-2 rounded bg-[#f472b6] mr-1"></span>AI/GPU 11%</span>
                    <span><span className="inline-block w-2 h-2 rounded bg-[#7a8494] mr-1"></span>Other 7%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row 2: Reservations, AI/GPU Panel & Opportunities */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {/* Reservations & Savings Plans */}
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-3 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-base-content dark:text-white block mb-2 font-mono">Reservations &amp; Savings</span>
                <div className="mb-2">
                  <div className="flex justify-between text-[10px] text-base-content/75 dark:text-white/70 mb-1">
                    <span>RI Coverage</span>
                    <span className="font-mono">58%</span>
                  </div>
                  <div className="relative h-1.5 bg-base-300 dark:bg-white/10 rounded-full mb-1">
                    <div className="h-full bg-primary rounded-full" style={{ width: '58%' }}></div>
                    <div className="absolute left-[70%] -top-1 w-0.5 h-3.5 bg-base-content/70 dark:bg-white"></div>
                  </div>
                  <span className="text-[9.5px] text-base-content/50 dark:text-white/45">12% below target</span>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-base-content/75 dark:text-white/70 mb-1">
                    <span>Savings Plan Util</span>
                    <span className="font-mono">94%</span>
                  </div>
                  <div className="relative h-1.5 bg-base-300 dark:bg-white/10 rounded-full mb-1">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                    <div className="absolute left-[90%] -top-1 w-0.5 h-3.5 bg-base-content/70 dark:bg-white"></div>
                  </div>
                  <span className="text-[9.5px] text-base-content/50 dark:text-white/45">4% above target</span>
                </div>
              </div>

              {/* AI / GPU Cost Panel */}
              <div className="border border-pink-500/30 bg-pink-500/5 p-3 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-pink-500 dark:text-pink-400 block mb-2 font-mono">AI / GPU Cost Panel</span>
                <div className="flex justify-between items-center text-[10px] text-base-content/75 dark:text-white/70 mb-1">
                  <span>GPU Utilization</span>
                  <span className="font-bold text-sm text-pink-500 dark:text-pink-400 font-mono">5%</span>
                </div>
                <div className="h-1.5 bg-base-300 dark:bg-white/10 rounded-full mb-2">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '5%' }}></div>
                </div>
                <svg viewBox="0 0 200 35" className="w-full h-5 mb-1.5">
                  <path d="M0,28 L30,24 L60,26 L90,16 L120,18 L150,8 L180,10 L200,4" fill="none" stroke="#ec4899" strokeWidth="2" />
                </svg>
                <span className="text-[9.5px] text-base-content/60 dark:text-white/55 leading-tight block">95% of provisioned compute sits idle industry-wide.</span>
              </div>

              {/* Optimization Opportunities */}
              <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-3 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-base-content dark:text-white block mb-2 font-mono">Opportunities</span>
                <div className="space-y-1 text-[10px] text-base-content/75 dark:text-white/75">
                  <div className="flex justify-between"><span>1. Migrate to RIs</span><span className="text-emerald-500 dark:text-emerald-400 font-semibold font-mono">$142K</span></div>
                  <div className="flex justify-between"><span>2. Right-size over-provisioned VMs</span><span className="text-emerald-500 dark:text-emerald-400 font-semibold font-mono">$96K</span></div>
                  <div className="flex justify-between"><span>3. Decommission orphaned disks</span><span className="text-emerald-400 font-semibold font-mono">$31K</span></div>
                  <div className="flex justify-between"><span>4. Consolidate idle GPUs</span><span className="text-emerald-400 font-semibold font-mono">$18K</span></div>
                </div>
                <div className="border-t border-base-300 dark:border-white/10 pt-1.5 mt-2 flex justify-between text-[11px] font-bold text-base-content dark:text-white">
                  <span>Total Opportunity</span>
                  <span className="text-emerald-500 dark:text-emerald-400 font-mono">$287K</span>
                </div>
              </div>
            </div>

            {/* Anomalies List */}
            <div className="border border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/5 p-3 rounded-lg shadow-sm">
              <span className="text-xs font-semibold text-base-content dark:text-white block mb-2 font-mono">Anomalies Feed</span>
              <div className="space-y-1.5">
                {anomalies.map((anom, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-base-content/75 dark:text-white/75">
                    <span className={`w-2 h-2 rounded-full flex-none ${
                      anom.sev === 'critical' ? 'bg-red-400' : anom.sev === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                    }`}></span>
                    <span className="flex-1 truncate">{anom.text}</span>
                    <span className="text-emerald-500 dark:text-emerald-400 font-semibold font-mono">{anom.amt}</span>
                    <span className="text-[10px] text-base-content/50 dark:text-white/40 font-mono">{anom.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10.5px] text-base-content/50 dark:text-white/45 mt-3 text-center font-mono">
              Illustrative dashboard simulating a live FinOps environment. Not client data.
            </p>
          </div>

          {/* Right Description Column */}
          <div className="lg:col-span-5">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3">
              Every FinOps Discipline, One Practice
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4 leading-tight">
              What the dashboard is actually tracking.
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
              This is the same discipline your engagement runs on — cost allocation, rate optimization, commitment management and AI/GPU governance, normalized to FOCUS across every cloud you operate.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-full">Cost Allocation &amp; Tagging</span>
              <span className="text-xs font-semibold border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-full">Rate Optimization</span>
              <span className="text-xs font-semibold border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-full">Commitment Management</span>
              <span className="text-xs font-semibold border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-full">Anomaly Detection &amp; Response</span>
              <span className="text-xs font-semibold border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-full">FOCUS Normalization</span>
              <span className="text-xs font-semibold border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-full">Continuous Forecasting</span>
              <span className="text-xs font-semibold border border-pink-400/30 text-pink-500 dark:text-pink-400 px-3 py-1.5 rounded-full">AI / GPU Cost Governance</span>
              <span className="text-xs font-semibold border border-base-300 dark:border-white/15 px-3 py-1.5 rounded-full">Cloud Financial Governance</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE WASTE IS REAL */}
      <section className="bg-base-200/50 dark:bg-[#0c1a2e] py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Why This Matters Now
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
              The waste is real, and it's getting worse, not better.
            </h2>
            <p className="text-sm text-base-content/70 dark:text-white/70 max-w-xl mx-auto">
              Most of it traces back to weak cost allocation — spend that no team owns is spend no one is incentivized to fix.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-4xl font-extrabold text-primary block mb-3">29%</span>
              <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-4">
                of cloud spend goes to waste, up from 27% the year before, as AI workloads add new cost complexity.
              </p>
              <span className="text-xs text-base-content/50 dark:text-white/40 block">
                Source: Flexera, 2026 State of the Cloud Report
              </span>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-4xl font-extrabold text-primary block mb-3">84%</span>
              <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-4">
                of organizations call managing cloud spend a significant challenge, typically exceeding budget by ~17%.
              </p>
              <span className="text-xs text-base-content/50 dark:text-white/40 block">
                Source: Flexera
              </span>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-4xl font-extrabold text-primary block mb-3">5%</span>
              <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-4">
                average GPU utilization across enterprise clusters — 95% of provisioned AI compute sits idle.
              </p>
              <span className="text-xs text-base-content/50 dark:text-white/40 block">
                Source: CAST AI, State of Kubernetes Optimization Report
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: A MANAGED FINOPS PRACTICE, NOT ANOTHER COST TOOL */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3">
              What Is FinOps as a Service?
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4 leading-tight">
              A managed FinOps practice, not another cost tool.
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 leading-relaxed">
              FinOps as a Service is the ongoing delivery of the FinOps Foundation's Inform → Optimize → Operate lifecycle by a dedicated team — cost allocation, rate optimization, commitment management, anomaly response, forecasting and cloud financial governance — run for you, using FOCUS as the common cost language across every cloud you operate. Where a FinOps tool gives you a dashboard, FaaS gives you the people who read it, act on it, and are accountable for the savings number at the end of the month.
            </p>
          </div>
          <div className="divide-y divide-base-300 dark:divide-white/15">
            <div className="py-3.5"><span className="text-sm font-semibold text-base-content dark:text-white">Cost allocation &amp; tagging governance</span></div>
            <div className="py-3.5"><span className="text-sm font-semibold text-base-content dark:text-white">Reserved Instance &amp; Savings Plan negotiation</span></div>
            <div className="py-3.5"><span className="text-sm font-semibold text-base-content dark:text-white">Anomaly detection &amp; response</span></div>
            <div className="py-3.5"><span className="text-sm font-semibold text-base-content dark:text-white">Continuous forecasting</span></div>
            <div className="py-3.5"><span className="text-sm font-semibold text-base-content dark:text-white">Cost-ownership culture embedding</span></div>
          </div>
        </div>
      </section>

      {/* SECTION 5: A DASHBOARD WAS NEVER THE HARD PART */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3">
            Why Teams Call Us Instead of Buying Another License
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
            A dashboard was never the hard part.
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 leading-relaxed">
            Most FinOps "solutions" hand you a dashboard and a bill. You still have to negotiate commitments, fix broken tagging, chase engineering teams to rightsize idle compute, and build a culture where cost is everyone's job. Every engagement is led by FinOps Foundation–certified practitioners — FinOps Certified Professional, FinOps Certified Engineer and FinOps Certified: Technology Value — trained on the same framework and FOCUS specification your own tooling reports against.
          </p>
        </div>
      </section>

      {/* SECTION 6: MOST FINOPS PROVIDERS TAKE A CUT OF YOUR SAVINGS. WE DON'T */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3">
            How We're Paid
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
            Most FinOps providers take a cut of your savings. We don't.
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 leading-relaxed">
            The industry default is a share of whatever we save you — which means the incentive is to find savings, not fix the underlying problem permanently. Nowazone prices every engagement as a flat fee or fixed retainer, agreed before work starts, with a committed savings range written into the SOW. You know the cost on day one.
          </p>
        </div>
      </section>

      {/* SECTION 7: 6-STEP PROCESS MAPPED TO INFORM -> OPTIMIZE -> OPERATE */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              The Same Methodology, Delivered as a Service
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Our six-step process, mapped to Inform → Optimize → Operate.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">Inform · Steps 01–02</span>
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-2">Discover &amp; Assess</h3>
              <p className="text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Read-only access, full billing and architecture review, category-by-category cost visibility.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">Optimize · Steps 03–04</span>
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-2">Prioritize &amp; Implement</h3>
              <p className="text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Findings ranked by impact, fixes implemented with your team's sign-off, tracked against savings identified.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">Operate · Steps 05–06</span>
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-2">Operate &amp; Improve</h3>
              <p className="text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Ongoing budgets, anomaly response and governance so improvements don't erode over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TOOLS WE SUPPORT */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
            Tools We Support
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-6">
            Vendor-neutral by design — we work with what you have.
          </h2>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm font-semibold border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/5 px-4 py-2 rounded-full text-base-content dark:text-white/90 shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINOPS FOR AI */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3">
            The Fastest-Growing Part of Your Cloud Bill
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
            FinOps for AI: the same discipline, applied to GPUs and tokens.
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 leading-relaxed mb-6 max-w-2xl mx-auto">
            AI infrastructure spend is adding hundreds of billions in new cost industry-wide, and most of it is unmanaged. Token cost, GPU utilization, inference efficiency and agentic workload economics get the same Inform-Optimize-Operate treatment as the rest of your cloud bill.
          </p>
          <Link
            to="/solutions/ai-tokenomics"
            className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:underline"
          >
            Explore FinOps for AI (Tokenomics) →
          </Link>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section id="faq" className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Common Questions
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Questions we get about FaaS.
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

      {/* SECTION 11: FINAL CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-16 px-6 sm:px-10 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl mb-4 text-base-content dark:text-white">
            See what a managed FinOps practice actually finds.
          </h2>
          <button
            type="button"
            onClick={openAssessment}
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow mb-6"
          >
            <CornerMarkers />
            Free Cost X-Ray Assessment
          </button>
          <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50">
            Also procuring licenses? See{' '}
            <Link to="/solutions/microsoft-licensing-reselling" className="text-primary hover:underline">
              Microsoft Licensing &amp; Reselling
            </Link>{' '}
            and{' '}
            <Link to="/solutions/google-licensing-reselling" className="text-primary hover:underline">
              Google Cloud Licensing &amp; Reselling
            </Link>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FinOpsPage;

