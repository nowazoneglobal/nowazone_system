import React, { useState, useEffect } from 'react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { Server, HardDrive, Database, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AWSCostPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const [spend, setSpend] = useState<number>(62400);
  const [forecast, setForecast] = useState<number>(68900);
  const [savings, setSavings] = useState<number>(18200);
  const [coverage, setCoverage] = useState<number>(64);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpend((prev) => prev + (Math.floor(Math.random() * 5) - 2) * 12);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    {
      q: "How much can we save on AWS?",
      a: "Typical AWS environments carry 15–35% in avoidable spend from idle EC2/EBS, un-rightsized RDS and uncommitted usage. Your free assessment gives you an exact figure."
    },
    {
      q: "Do you need root access to our AWS accounts?",
      a: "No. A read-only IAM role with Cost Explorer and billing access is enough for the assessment. Elevated access is only requested if you move to implementation, under NDA."
    },
    {
      q: "Can you work across AWS Organizations with many linked accounts?",
      a: "Yes. Multi-account cost allocation and consolidated billing analysis is a core part of the engagement."
    },
    {
      q: "Savings Plans or Reserved Instances — which do you recommend?",
      a: "It depends on your workload mix. We model both against your actual usage and recommend the combination that gives the best coverage without over-committing."
    }
  ];

  return (
    <>
      <SEO
        title="AWS Cost Optimization & Cost Management Services — Nowazone"
        description="AWS cost management and optimization services — Savings Plans, rightsizing, unattached EBS volumes, and multi-account FinOps. Free AWS Cost Assessment."
        canonical="/platforms/aws"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              serviceType: 'AWS Cost Optimization',
              provider: { '@type': 'Organization', name: 'Nowazone' },
              description: 'AWS billing audits, Savings Plan optimization, EC2/RDS rightsizing, and multi-account cost governance.',
            },
          ],
        }}
      />

      {/* HERO: Split Layout */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
              AWS Cost Optimization Services
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
              AWS Cost Optimization &amp; Cost Management Services
            </h1>
            <p className="text-base md:text-lg text-base-content/70 leading-relaxed mb-8">
              Idle EC2 instances, oversized RDS clusters, and Savings Plan coverage gaps quietly inflate enterprise AWS bills. We isolate waste, restructure commitments, and commit to quantified savings before you pay a dollar.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                type="button"
                onClick={openAssessmentModal}
                className="btn btn-primary text-white font-heading font-bold shadow-lg relative group"
              >
                <CornerMarkers />
                Free AWS Cost Assessment
              </button>
              <a href="#faq" className="btn btn-outline border-base-300 font-heading font-semibold">
                Read the FAQ
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-base-100 dark:bg-navy-900 text-base-content dark:text-white rounded-2xl p-6 border border-base-300 dark:border-white/10 shadow-xl relative transition-colors">
            <CornerMarkers />
            <span className="text-xs uppercase tracking-widest text-base-content/60 dark:text-slate-400 font-mono block mb-4">
              30-Day Spend Trend vs Optimized Baseline
            </span>

            {/* SVG Visual Graph */}
            <div className="h-28 w-full mb-4">
              <svg viewBox="0 0 300 90" className="w-full h-full">
                <polyline
                  points="0,60 30,55 60,58 90,45 120,50 150,38 180,42 210,30 240,34 270,20 300,26"
                  fill="none"
                  stroke="#0F62FE"
                  strokeWidth="2.5"
                />
                <polyline
                  points="0,70 30,68 60,66 90,64 120,62 150,60 180,58 210,55 240,53 270,50 300,48"
                  fill="none"
                  stroke="currentColor"
                  className="text-base-content/25 dark:text-white/30"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            <div className="flex justify-between text-xs text-base-content/60 dark:text-slate-400 border-b border-base-300 dark:border-white/10 pb-4 mb-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" /> Actual Spend
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" /> Optimized Target
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-base-content/80 dark:text-slate-300">Savings Plan Utilization</span>
                <span className="text-emerald-500 font-semibold font-mono">71% utilized</span>
              </div>
              <div className="w-full bg-base-200 dark:bg-navy-950 rounded-full h-2.5 overflow-hidden">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '71%' }} />
              </div>
              <span className="text-[11px] text-base-content/60 dark:text-slate-400 mt-2 block">
                $6,200/mo of under-utilized commitments detected across linked member accounts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="bg-base-100 dark:bg-navy py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-3.5 font-heading">
              The Problem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading mb-4 text-base-content dark:text-white leading-tight">
              AWS Rewards Speed, Not Cleanup.
            </h2>
            <p className="text-sm sm:text-[15px] text-base-content/70 dark:text-white/70 leading-relaxed">
              Auto-scaling and self-service provisioning mean AWS spend grows fast — but nobody's job is to go back and turn things off. That gap is where most of the waste lives.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                Idle EC2 instances and unattached EBS volumes
              </span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                Un-rightsized RDS instances running oversized classes
              </span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                Savings Plan / RI coverage gaps across linked accounts
              </span>
            </div>
            <div className="flex gap-3 items-start py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                S3 storage sitting in the wrong tier, unmonitored data transfer costs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE AWS DASHBOARD */}
      <section className="bg-base-200/70 dark:bg-[#0a1830] text-base-content dark:text-white py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex justify-between items-baseline flex-wrap gap-3 mb-6">
            <div>
              <span className="block text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold font-heading mb-1.5">
                Live AWS Cost Dashboard — Sample Output
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-base-content dark:text-white">
                AWS Cost Management Dashboard: Spend, Forecast &amp; Savings
              </h2>
            </div>
            <span className="text-xs text-base-content/60 dark:text-white/50 font-mono">Refreshing live · telemetry sample</span>
          </div>

          {/* Row 1: 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-2">Total Monthly Spend</span>
              <span className="block font-heading font-bold text-2xl sm:text-[26px] text-base-content dark:text-white">
                ${spend.toLocaleString()}
              </span>
              <span className="block text-[11.5px] text-red-500 dark:text-red-400 mt-1 font-semibold">↑ +8.4% vs last month</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-2">Forecasted Next Month</span>
              <span className="block font-heading font-bold text-2xl sm:text-[26px] text-base-content dark:text-white">
                ${forecast.toLocaleString()}
              </span>
              <span className="block text-[11.5px] text-base-content/50 dark:text-white/45 mt-1">Based on 6-month trend</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-2">Savings Identified</span>
              <span className="block font-heading font-bold text-2xl sm:text-[26px] text-emerald-600 dark:text-[#4ade80]">
                ${savings.toLocaleString()}
              </span>
              <span className="block text-[11.5px] text-base-content/50 dark:text-white/45 mt-1">Per month, if actioned</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-2">Savings Plan Coverage</span>
              <span className="block font-heading font-bold text-2xl sm:text-[26px] text-base-content dark:text-white">
                {coverage}%
              </span>
              <span className="block text-[11.5px] text-base-content/50 dark:text-white/45 mt-1">Target: 80%+</span>
            </div>
          </div>

          {/* Row 2: Spend Trend & Service Donut Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mb-4">
            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-sm transition-colors">
              <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
                Spend Trend &amp; Forecast (6 Months)
              </span>
              <svg viewBox="0 0 320 90" className="w-full h-[90px] block">
                <polyline points="0,60 45,64 90,54 135,58 180,44 225,48 270,36 300,30" fill="none" stroke="#2563eb" className="dark:stroke-[#60a5fa]" strokeWidth="2.5" />
                <polyline points="300,30 320,24" fill="none" stroke="rgba(100,116,139,0.5)" className="dark:stroke-white/40" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="300" cy="30" r="3.5" fill="#2563eb" className="dark:fill-[#60a5fa]" />
                <circle cx="320" cy="24" r="3.5" fill="rgba(100,116,139,0.7)" className="dark:fill-white/60" />
              </svg>
              <div className="flex justify-between text-[11.5px] text-base-content/60 dark:text-white/50 mt-1.5">
                <span>● Actual spend</span>
                <span>┄ Forecast: ${forecast.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col items-center transition-colors">
              <span className="block self-start text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
                Spend by Service
              </span>
              <div
                className="w-[120px] h-[120px] rounded-full flex items-center justify-center mb-3"
                style={{
                  background: 'conic-gradient(#0a63ce 0% 52%, #60a5fa 52% 74%, #93c5fd 74% 87%, #bfdbfe 87% 94%, #dbeafe 94% 100%)'
                }}
              >
                <div className="w-20 h-20 rounded-full bg-base-100 dark:bg-[#0e1f33] flex flex-col items-center justify-center transition-colors">
                  <span className="font-heading font-bold text-[14px] text-base-content dark:text-white">${(spend / 1000).toFixed(1)}k</span>
                  <span className="text-[9px] text-base-content/50 dark:text-white/50 uppercase">total</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center text-[10.5px] text-base-content/70 dark:text-white/60 font-mono">
                <span>■ EC2 52%</span>
                <span>■ RDS 22%</span>
                <span>■ S3 13%</span>
                <span>■ Lambda 7%</span>
                <span>■ Other 6%</span>
              </div>
            </div>
          </div>

          {/* Row 3: 4 Service Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <div className="flex justify-between items-start mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" className="dark:stroke-[#60a5fa]" strokeWidth="1.6">
                  <rect x="3" y="6" width="18" height="12" rx="1.5" />
                  <path d="M7 18v2M17 18v2" />
                </svg>
                <span className="text-xs font-bold text-red-500 dark:text-red-400 font-mono">+11.2%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">EC2 Compute</span>
              <span className="block font-heading font-bold text-xl text-base-content dark:text-white">${Math.round(spend * 0.52).toLocaleString()}</span>
              <span className="block text-[11px] text-base-content/50 dark:text-white/40 mt-1 font-mono">52% of total spend</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <div className="flex justify-between items-start mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" className="dark:stroke-[#93c5fd]" strokeWidth="1.6">
                  <ellipse cx="12" cy="6" rx="7" ry="3" />
                  <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
                </svg>
                <span className="text-xs font-bold text-red-500 dark:text-red-400 font-mono">+6.8%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">RDS &amp; Aurora</span>
              <span className="block font-heading font-bold text-xl text-base-content dark:text-white">${Math.round(spend * 0.22).toLocaleString()}</span>
              <span className="block text-[11px] text-base-content/50 dark:text-white/40 mt-1 font-mono">22% of total spend</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <div className="flex justify-between items-start mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" className="dark:stroke-[#bfdbfe]" strokeWidth="1.6">
                  <ellipse cx="12" cy="6" rx="8" ry="3" />
                  <path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
                  <path d="M4 11v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" />
                </svg>
                <span className="text-xs font-bold text-emerald-600 dark:text-[#4ade80] font-mono">−2.1%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">S3 Storage</span>
              <span className="block font-heading font-bold text-xl text-base-content dark:text-white">${Math.round(spend * 0.13).toLocaleString()}</span>
              <span className="block text-[11px] text-base-content/50 dark:text-white/40 mt-1 font-mono">13% of total spend</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <div className="flex justify-between items-start mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" className="dark:stroke-[#dbeafe]" strokeWidth="1.6">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
                </svg>
                <span className="text-xs font-bold text-emerald-600 dark:text-[#4ade80] font-mono">−4.5%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">Lambda &amp; Serverless</span>
              <span className="block font-heading font-bold text-xl text-base-content dark:text-white">${Math.round(spend * 0.07).toLocaleString()}</span>
              <span className="block text-[11px] text-base-content/50 dark:text-white/40 mt-1 font-mono">7% of total spend</span>
            </div>
          </div>

          {/* Row 4: Top Savings Opportunities Detected */}
          <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-sm transition-colors">
            <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
              Top Savings Opportunities Detected
            </span>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/20 dark:border-red-500/25 rounded-lg">
                <span className="flex items-center gap-2.5 text-xs sm:text-[13px] text-base-content dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 flex-none" />
                  38 idle EC2 instances (m5.xlarge+ with &lt;4% CPU)
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-red-500 dark:text-red-400 font-mono flex-none">$6,450/mo</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/25 rounded-lg">
                <span className="flex items-center gap-2.5 text-xs sm:text-[13px] text-base-content dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-none" />
                  12 oversized RDS instances without autoscaling
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-amber-600 dark:text-amber-400 font-mono flex-none">$5,120/mo</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/25 rounded-lg">
                <span className="flex items-center gap-2.5 text-xs sm:text-[13px] text-base-content dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-none" />
                  210 unattached EBS volumes &amp; stale snapshots
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-amber-600 dark:text-amber-400 font-mono flex-none">$3,280/mo</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-base-content/50 dark:text-white/40 mt-4.5">
            Illustrative example — numbers refresh to show live-tracking style. Your assessment reflects your real account.
          </p>
        </div>
      </section>

      {/* FIVE LEVERS */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
              What We Do On AWS
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading">Five Levers, One AWS Practice.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Cost Explorer Audit</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Full billing and usage deep-dive across your AWS Organization accounts.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Savings Plans &amp; RIs</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Dynamic commitment modeling tailored to real steady-state usage.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Compute Rightsizing</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                EC2, Graviton migration, and RDS rightsizing recommendations ranked by ROI.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Multi-Account Tagging</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Cost allocation tags mapped to squads and products across linked accounts.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Anomaly Detection</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Automated budget alerts that catch sudden runaway egress or jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT CARDS */}
      <section className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Get Started on AWS
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content dark:text-white">Two Steps to a Lean AWS Bill.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#084ea3] dark:text-blue-400 font-heading block mb-2">
                  Step 1 — Always Free
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">AWS Cost X-Ray</h3>
                <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-6">
                  Read-only review of your AWS Organization with quantified savings categorized by service.
                </p>
              </div>
              <div>
                <span className="text-4xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$0</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-primary text-white w-full font-heading font-bold"
                >
                  Get My Free Assessment
                </button>
              </div>
            </div>

            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 dark:text-slate-400 font-heading block mb-2">
                  2–5 Business Days
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">AWS Cost Leak Review</h3>
                <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-6">
                  A fixed-price diagnostic deliverable with prioritized actions, Terraform policies, and commitment models.
                </p>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$750–$1,250*</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-outline text-base-content dark:text-white border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/10 w-full font-heading font-bold"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="bg-base-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content">AWS Cost Optimization, Answered.</h2>

          <div className="divide-y divide-base-300">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-heading font-semibold text-base cursor-pointer flex justify-between items-center text-base-content">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-base-content/70 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-base-200 dark:bg-navy-950 text-base-content dark:text-white py-16 px-6 text-center border-t border-base-300 dark:border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-heading mb-4 text-base-content dark:text-white">
            Ready to Cut Waste Across Your AWS Organization?
          </h2>
          <p className="text-base-content/75 dark:text-slate-300 text-sm md:text-base mb-8">
            Let our certified AWS FinOps engineers review your Savings Plans and EC2 footprints with zero disruption.
          </p>
          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold px-8 shadow-xl"
          >
            Start My Free Assessment
          </button>
        </div>
      </section>
    </>
  );
};
