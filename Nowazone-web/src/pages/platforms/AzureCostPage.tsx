import React, { useState, useEffect } from 'react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { Server, HardDrive, Database, Network, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AzureCostPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  // Dynamic live dashboard numbers simulation
  const [spend, setSpend] = useState<number>(47820);
  const [forecast, setForecast] = useState<number>(53400);
  const [savings, setSavings] = useState<number>(12350);
  const [coverage, setCoverage] = useState<number>(58);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpend((prev) => prev + (Math.floor(Math.random() * 5) - 2) * 10);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    {
      q: "How much can we save on Azure costs?",
      a: "Most Azure environments we review carry 15–35% in avoidable spend from idle resources, oversized VMs and uncommitted usage. Your free assessment gives you an exact number."
    },
    {
      q: "Do you need Owner access to our Azure subscription?",
      a: "No. Cost Management Reader access is enough for the assessment. We only request elevated access if you move forward with implementation, under NDA."
    },
    {
      q: "Does this replace our Azure support plan?",
      a: "No, it complements it. Microsoft support handles technical issues; we focus specifically on cost — commitments, rightsizing and waste."
    },
    {
      q: "How does Azure Hybrid Benefit factor into cost savings?",
      a: "We check whether your on-premises Windows Server and SQL Server licenses with Software Assurance are being applied in Azure — a commonly missed discount worth 40%+ on eligible workloads."
    },
    {
      q: "What Azure services carry the most hidden cost?",
      a: "Virtual Machines, managed disks and Azure SQL Database are the most common sources of overspend, typically from oversizing and missed Reserved Instance coverage."
    }
  ];

  return (
    <>
      <SEO
        title="Azure Cost Management & Optimization Services — Nowazone"
        description="Azure cost management and optimization services — Reserved Instance gaps, oversized VMs, Azure Hybrid Benefit review. Free Azure Cost Assessment."
        canonical="/platforms/azure"
      />

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Azure Cost Optimization Services
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Azure Cost Management &amp; Optimization Services
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            We audit your Azure tenant for Reserved Instance gaps, oversized VMs, unused disks, and missed Azure Hybrid Benefit discounts — then hand you a prioritized cost reduction blueprint with the dollar impact of every single fix.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-10">
            <button
              type="button"
              onClick={openAssessmentModal}
              className="btn btn-primary text-white font-heading font-bold shadow-lg relative group"
            >
              <CornerMarkers />
              Free Azure Cost Assessment
            </button>
            <a href="#faq" className="btn btn-outline border-base-300 font-heading font-semibold">
              Read the FAQ
            </a>
          </div>

          <div className="flex gap-8 md:gap-14 justify-center flex-wrap pt-6 border-t border-base-200">
            <div>
              <span className="block font-heading font-extrabold text-2xl md:text-3xl text-primary">15–35%</span>
              <span className="text-xs text-base-content/60">Typical Azure savings found</span>
            </div>
            <div>
              <span className="block font-heading font-extrabold text-2xl md:text-3xl text-primary">2–5 Days</span>
              <span className="text-xs text-base-content/60">To documented findings</span>
            </div>
            <div>
              <span className="block font-heading font-extrabold text-2xl md:text-3xl text-primary">$0</span>
              <span className="text-xs text-base-content/60">To start with an assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="bg-base-100 dark:bg-navy py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-3.5 font-heading">
              Why Azure Bills Grow
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading mb-4 text-base-content dark:text-white leading-tight">
              Azure Rewards Provisioning, Not Cleanup.
            </h2>
            <p className="text-sm sm:text-[15px] text-base-content/70 dark:text-white/70 leading-relaxed">
              Teams spin up resources fast and rarely revisit them. Over months, on-demand rates, oversized VMs and forgotten disks compound into a bill that's far bigger than the workload actually needs.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3.5 items-center py-4 border-b border-base-300 dark:border-white/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-primary flex-none">
                <rect x="3" y="6" width="18" height="12" rx="1.5" />
                <path d="M7 18v2M17 18v2M3 10h18" />
              </svg>
              <div>
                <span className="block text-[14.5px] font-semibold text-base-content dark:text-white leading-snug">
                  Oversized VMs running 24/7
                </span>
                <span className="block text-xs text-base-content/60 dark:text-white/55 mt-1">
                  Avg. impact: $2,400–$9,000/mo
                </span>
              </div>
            </div>

            <div className="flex gap-3.5 items-center py-4 border-b border-base-300 dark:border-white/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-primary flex-none">
                <path d="M12 2l7 4v6l-7 4-7-4V6z" />
                <path d="M12 12v8" />
              </svg>
              <div>
                <span className="block text-[14.5px] font-semibold text-base-content dark:text-white leading-snug">
                  Reserved Instance coverage gaps
                </span>
                <span className="block text-xs text-base-content/60 dark:text-white/55 mt-1">
                  Avg. impact: $3,000–$14,000/mo
                </span>
              </div>
            </div>

            <div className="flex gap-3.5 items-center py-4 border-b border-base-300 dark:border-white/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-primary flex-none">
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
              </svg>
              <div>
                <span className="block text-[14.5px] font-semibold text-base-content dark:text-white leading-snug">
                  Orphaned disks &amp; unused public IPs
                </span>
                <span className="block text-xs text-base-content/60 dark:text-white/55 mt-1">
                  Avg. impact: $600–$2,800/mo
                </span>
              </div>
            </div>

            <div className="flex gap-3.5 items-center py-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-primary flex-none">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
              <div>
                <span className="block text-[14.5px] font-semibold text-base-content dark:text-white leading-snug">
                  Dev/test running outside business hours
                </span>
                <span className="block text-xs text-base-content/60 dark:text-white/55 mt-1">
                  Avg. impact: $900–$3,500/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE AZURE COST DASHBOARD */}
      <section className="bg-base-200/70 dark:bg-[#0a1830] text-base-content dark:text-white py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex justify-between items-baseline flex-wrap gap-3 mb-6">
            <div>
              <span className="block text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold font-heading mb-1.5">
                Live Azure Cost Dashboard — Sample Output
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-base-content dark:text-white">
                Azure Cost Management Dashboard: Spend, Forecast &amp; Savings
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
              <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-2">Reservation Coverage</span>
              <span className="block font-heading font-bold text-2xl sm:text-[26px] text-base-content dark:text-white">
                {coverage}%
              </span>
              <span className="block text-[11.5px] text-base-content/50 dark:text-white/45 mt-1">Target: 80%+</span>
            </div>
          </div>

          {/* Row 2: Spend Trend & Resource Distribution Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mb-4">
            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-sm transition-colors">
              <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
                Spend Trend &amp; Forecast (6 Months)
              </span>
              <svg viewBox="0 0 320 90" className="w-full h-[90px] block">
                <polyline points="0,62 45,58 90,64 135,50 180,54 225,40 270,44 300,32" fill="none" stroke="#2563eb" className="dark:stroke-[#60a5fa]" strokeWidth="2.5" />
                <polyline points="300,32 320,26" fill="none" stroke="rgba(100,116,139,0.5)" className="dark:stroke-white/40" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="300" cy="32" r="3.5" fill="#2563eb" className="dark:fill-[#60a5fa]" />
                <circle cx="320" cy="26" r="3.5" fill="rgba(100,116,139,0.7)" className="dark:fill-white/60" />
              </svg>
              <div className="flex justify-between text-[11.5px] text-base-content/60 dark:text-white/50 mt-1.5">
                <span>● Actual spend</span>
                <span>┄ Forecast: ${forecast.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col items-center transition-colors">
              <span className="block self-start text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
                Cost Distribution by Resource
              </span>
              <div
                className="w-[120px] h-[120px] rounded-full flex items-center justify-center mb-3"
                style={{
                  background: 'conic-gradient(#0a63ce 0% 48%, #60a5fa 48% 70%, #93c5fd 70% 86%, #c7d2fe 86% 100%)'
                }}
              >
                <div className="w-20 h-20 rounded-full bg-base-100 dark:bg-[#0e1f33] flex flex-col items-center justify-center transition-colors">
                  <span className="font-heading font-bold text-[14px] text-base-content dark:text-white">${(spend / 1000).toFixed(1)}k</span>
                  <span className="text-[9px] text-base-content/50 dark:text-white/50 uppercase">total</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center text-[10.5px] text-base-content/70 dark:text-white/60 font-mono">
                <span>■ VM 48%</span>
                <span>■ SQL 22%</span>
                <span>■ Storage 16%</span>
                <span>■ Network 14%</span>
              </div>
            </div>
          </div>

          {/* Row 3: 4 Resource Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <div className="flex justify-between items-start mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" className="dark:stroke-[#60a5fa]" strokeWidth="1.6">
                  <rect x="3" y="6" width="18" height="12" rx="1.5" />
                  <path d="M7 18v2M17 18v2" />
                </svg>
                <span className="text-xs font-bold text-red-500 dark:text-red-400 font-mono">+8.4%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">Virtual Machines</span>
              <span className="block font-heading font-bold text-xl text-base-content dark:text-white">${Math.round(spend * 0.48).toLocaleString()}</span>
              <span className="block text-[11px] text-base-content/50 dark:text-white/40 mt-1 font-mono">48% of total spend</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <div className="flex justify-between items-start mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" className="dark:stroke-[#93c5fd]" strokeWidth="1.6">
                  <ellipse cx="12" cy="6" rx="7" ry="3" />
                  <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
                </svg>
                <span className="text-xs font-bold text-red-500 dark:text-red-400 font-mono">+14.2%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">SQL Databases</span>
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
                <span className="text-xs font-bold text-emerald-600 dark:text-[#4ade80] font-mono">−1.8%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">Storage</span>
              <span className="block font-heading font-bold text-xl text-base-content dark:text-white">${Math.round(spend * 0.16).toLocaleString()}</span>
              <span className="block text-[11px] text-base-content/50 dark:text-white/40 mt-1 font-mono">16% of total spend</span>
            </div>

            <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 shadow-sm transition-colors">
              <div className="flex justify-between items-start mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" className="dark:stroke-[#dbeafe]" strokeWidth="1.6">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M9 9h6v6H9z" />
                </svg>
                <span className="text-xs font-bold text-red-500 dark:text-red-400 font-mono">+3.1%</span>
              </div>
              <span className="block text-xs text-base-content/70 dark:text-white/55 mb-1">Network</span>
              <span className="block font-heading font-bold text-xl text-base-content dark:text-white">${Math.round(spend * 0.14).toLocaleString()}</span>
              <span className="block text-[11px] text-base-content/50 dark:text-white/40 mt-1 font-mono">14% of total spend</span>
            </div>
          </div>

          {/* Row 4: Top Actionable Remediations Detected */}
          <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-sm transition-colors">
            <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
              Top Actionable Remediations Detected
            </span>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/20 dark:border-red-500/25 rounded-lg">
                <span className="flex items-center gap-2.5 text-xs sm:text-[13px] text-base-content dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 flex-none" />
                  14 unattached Managed Disks (Standard &amp; Premium SSD)
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-red-500 dark:text-red-400 font-mono flex-none">$1,850/mo</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-500/10 border border-amber-500/20 dark:border-amber-500/25 rounded-lg">
                <span className="flex items-center gap-2.5 text-xs sm:text-[13px] text-base-content dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-none" />
                  9 idle D-series VMs operating at &lt;5% average CPU
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-amber-600 dark:text-amber-400 font-mono flex-none">$3,420/mo</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-500/10 border border-blue-500/20 dark:border-blue-500/25 rounded-lg">
                <span className="flex items-center gap-2.5 text-xs sm:text-[13px] text-base-content dark:text-white">
                  <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-none" />
                  Azure Hybrid Benefit unclaimed across 6 production SQL VMs
                </span>
                <span className="text-xs sm:text-[13px] font-bold text-blue-600 dark:text-blue-400 font-mono flex-none">$4,180/mo</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-base-content/50 dark:text-white/40 mt-4.5">
            Illustrative example — numbers refresh to show live-tracking style. Your assessment reflects your real account.
          </p>
        </div>
      </section>

      {/* 5 LEVERS / CAPABILITIES */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
              What We Do On Azure
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading">Five Levers, One Azure Cost Practice.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Cost Audit</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Complete Azure Cost Management + Billing subscription hierarchy analysis.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">RI &amp; Savings Plans</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Right-term, right-scope reservations aligned to steady-state utilization.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Compute Rightsizing</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Modern CPU family recommendations (e.g. v5 series) and tier downsizing.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Governance &amp; Alerts</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Strict tag taxonomy enforcement, automated anomaly triggers, and budget fences.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Hybrid Benefit</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Software Assurance license verification for Windows and SQL Server workloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT TIERS */}
      <section className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Engagement Models
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content dark:text-white">Two Steps to a Lean Azure Tenant.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#084ea3] dark:text-blue-400 font-heading block mb-2">
                  Step 1 — Always Free
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">Azure Cost X-Ray</h3>
                <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-6">
                  Read-only scan of your Azure subscription with itemized savings broken down by workload and category.
                </p>
              </div>
              <div>
                <span className="text-4xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$0</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-primary text-white w-full font-heading font-bold"
                >
                  Request Free Assessment
                </button>
              </div>
            </div>

            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-950 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 dark:text-slate-400 font-heading block mb-2">
                  Step 2 — Diagnostic Deep Dive
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">Azure Cost Leak Review</h3>
                <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-6">
                  A comprehensive, fixed-price sprint with engineer-ready remediation code, ARM/Bicep policies, and reservation plan.
                </p>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$750–$1,250</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-outline text-base-content dark:text-white border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/10 w-full font-heading font-bold"
                >
                  Book Diagnostic
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
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content">Azure Cost Optimization, Answered.</h2>

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
            Ready to See What Azure Is Actually Costing You?
          </h2>
          <p className="text-base-content/75 dark:text-slate-300 text-sm md:text-base mb-8">
            Connect with a certified FinOps architect. We will evaluate your reservations and compute rightsizing opportunities in 48 hours.
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
