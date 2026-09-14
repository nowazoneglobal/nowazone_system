import React from 'react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { Server, HardDrive, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AlibabaCloudCostPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "How much can we save on Alibaba Cloud?",
      a: "Environments we review typically carry 10–25% in avoidable spend from idle ECS instances, unoptimized OSS storage tiers and uncommitted usage."
    },
    {
      q: "Do you support Alibaba Cloud accounts outside mainland China?",
      a: "Yes. We work with Alibaba Cloud International accounts serving APAC, Middle East and cross-border workloads."
    },
    {
      q: "Do you need Owner access to our Alibaba Cloud account?",
      a: "No. A read-only RAM role with billing and BSS OpenAPI access is enough for the assessment."
    },
    {
      q: "Can you help with resource plans and reserved instances?",
      a: "Yes. We model resource plan and reserved instance commitments against your actual ECS usage before recommending a term."
    }
  ];

  return (
    <>
      <SEO
        title="Alibaba Cloud Cost Optimization Services — Nowazone"
        description="Alibaba Cloud cost governance — ECS rightsizing, OSS storage tiering, and regional commitment planning for APAC & cross-border workloads. Free Assessment."
        canonical="/platforms/alibaba-cloud-cost-optimization"
      />

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Alibaba Cloud Cost Optimization
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Regional Cost Governance for Alibaba Cloud.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            ECS rightsizing, OSS storage tiering, and reserved resource planning for APAC and cross-border operations — delivered with the exact same FinOps discipline we bring to every other cloud.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              type="button"
              onClick={openAssessmentModal}
              className="btn btn-primary text-white font-heading font-bold shadow-lg relative group"
            >
              <CornerMarkers />
              Free Cost Assessment
            </button>
            <a href="#faq" className="btn btn-outline border-base-300 font-heading font-semibold">
              Read the FAQ
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM (narrow, editorial single column) */}
      <section className="bg-base-100 dark:bg-navy py-12 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[680px] mx-auto">
          <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-3.5 font-heading">
            The Problem
          </span>
          <h2 className="text-2xl sm:text-[26px] font-bold font-heading text-base-content dark:text-white leading-snug mb-4">
            Fewer Tools Cover Alibaba Cloud Cost Governance.
          </h2>
          <p className="text-sm sm:text-[15px] text-base-content/70 dark:text-white/70 leading-relaxed mb-5">
            Most FinOps tooling is built around AWS, Azure and Google Cloud first. Alibaba Cloud workloads — often supporting APAC operations or cross-border commerce — get less scrutiny, and waste accumulates unnoticed.
          </p>

          <ul className="space-y-3 pl-0 list-none text-sm sm:text-[14.5px] text-base-content/85 dark:text-white/85">
            <li className="relative pl-5 leading-relaxed">
              <span className="absolute left-0 text-primary font-bold">—</span>
              Idle ECS instances running outside peak regional hours
            </li>
            <li className="relative pl-5 leading-relaxed">
              <span className="absolute left-0 text-primary font-bold">—</span>
              OSS storage sitting in Standard tier when IA or Archive would do
            </li>
            <li className="relative pl-5 leading-relaxed">
              <span className="absolute left-0 text-primary font-bold">—</span>
              No reserved instance or resource plan coverage on stable workloads
            </li>
            <li className="relative pl-5 leading-relaxed">
              <span className="absolute left-0 text-primary font-bold">—</span>
              Cross-region data transfer costs left unmonitored
            </li>
          </ul>
        </div>
      </section>

      {/* CAPABILITIES + DASHBOARD SIDEBAR (left side) */}
      <section className="bg-base-200/70 dark:bg-[#0e1f33] text-base-content dark:text-white py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-11 items-start">
          {/* Left: Dashboard Sidebar */}
          <div className="bg-base-100 dark:bg-[#0a1830] rounded-[14px] p-6 sm:p-7 shadow-xl border border-base-300 dark:border-white/10 transition-colors">
            <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
              ECS Utilization by Region
            </span>
            <div className="flex flex-col gap-2.5 mb-5 font-mono text-xs">
              <div>
                <div className="flex justify-between text-base-content/70 dark:text-white/70 mb-1">
                  <span>ap-southeast-1 (Singapore)</span>
                  <span className="text-base-content dark:text-white font-semibold">81%</span>
                </div>
                <div className="h-1.5 bg-base-200 dark:bg-white/10 rounded">
                  <div className="h-full bg-[#0a63ce] rounded" style={{ width: '81%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-base-content/70 dark:text-white/70 mb-1">
                  <span>me-central-1 (UAE)</span>
                  <span className="text-base-content dark:text-white font-semibold">34%</span>
                </div>
                <div className="h-1.5 bg-base-200 dark:bg-white/10 rounded">
                  <div className="h-full bg-[#60a5fa] rounded" style={{ width: '34%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-base-content/70 dark:text-white/70 mb-1">
                  <span>ap-south-1 (Mumbai)</span>
                  <span className="text-base-content dark:text-white font-semibold">19%</span>
                </div>
                <div className="h-1.5 bg-base-200 dark:bg-white/10 rounded">
                  <div className="h-full bg-[#93c5fd] rounded" style={{ width: '19%' }} />
                </div>
              </div>
            </div>

            <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-2.5">
              OSS Storage Tier Mix
            </span>
            <div className="flex h-2.5 rounded overflow-hidden mb-1.5">
              <div style={{ width: '64%' }} className="bg-[#0a63ce]" />
              <div style={{ width: '24%' }} className="bg-[#60a5fa]" />
              <div style={{ width: '12%' }} className="bg-[#c7d2fe]" />
            </div>
            <div className="flex justify-between text-[11px] text-base-content/70 dark:text-white/55 font-mono">
              <span>Standard 64%</span>
              <span>IA 24%</span>
              <span>Archive 12%</span>
            </div>

            <p className="text-[11px] text-base-content/50 dark:text-white/40 mt-4 pt-3 border-t border-base-300 dark:border-white/10">
              Illustrative example. Your assessment reflects your actual account.
            </p>
          </div>

          {/* Right: What We Do */}
          <div>
            <span className="block text-xs uppercase tracking-widest text-primary dark:text-[#60a5fa] font-bold font-heading mb-3">
              What We Do on Alibaba Cloud
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-base-content dark:text-white mb-5">
              Four Levers, One Regional Practice.
            </h2>
            <div className="flex flex-col gap-4">
              <div className="border-b border-base-300 dark:border-white/10 pb-4">
                <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                  ECS Rightsizing
                </h3>
                <p className="text-xs sm:text-[13.5px] text-base-content/70 dark:text-white/60 leading-relaxed m-0">
                  Instance type recommendations matched to actual utilization by region.
                </p>
              </div>
              <div className="border-b border-base-300 dark:border-white/10 pb-4">
                <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                  OSS Storage Tiering
                </h3>
                <p className="text-xs sm:text-[13.5px] text-base-content/70 dark:text-white/60 leading-relaxed m-0">
                  Move cold data to IA or Archive tiers without breaking access patterns.
                </p>
              </div>
              <div className="border-b border-base-300 dark:border-white/10 pb-4">
                <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                  Reserved Instance Strategy
                </h3>
                <p className="text-xs sm:text-[13.5px] text-base-content/70 dark:text-white/60 leading-relaxed m-0">
                  Resource plans and RIs modeled against stable workload baselines.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[15.5px] text-base-content dark:text-white mb-1.5">
                  Cross-Border Cost Review
                </h3>
                <p className="text-xs sm:text-[13.5px] text-base-content/70 dark:text-white/60 leading-relaxed m-0">
                  Data transfer and bandwidth packages optimized across international routes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT CARDS */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Engagement Models
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content">Two Steps to Lower Alibaba Cloud Costs.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 bg-base-200/50 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary font-heading block mb-2">
                  Step 1 — Always Free
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content">Alibaba Cloud Cost X-Ray</h3>
                <p className="text-sm text-base-content/70 leading-relaxed mb-6">
                  Read-only audit of your Alibaba Cloud account with quantified savings broken down by ECS, OSS, and CEN networking.
                </p>
              </div>
              <div>
                <span className="text-4xl font-extrabold font-heading block mb-4 text-base-content">$0</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-primary text-white w-full font-heading font-bold"
                >
                  Get Free Assessment
                </button>
              </div>
            </div>

            <div className="border border-base-300 bg-base-200/50 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 font-heading block mb-2">
                  2–5 Business Days
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content">Alibaba Cost Leak Review</h3>
                <p className="text-sm text-base-content/70 leading-relaxed mb-6">
                  A documented engineering audit with regional Subscription planning, OSS lifecycle scripts, and ECS scheduling.
                </p>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-heading block mb-4 text-base-content">$750–$1,250</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-outline border-base-300 hover:border-primary w-full font-heading font-bold"
                >
                  Book Diagnostic
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content">Alibaba Cloud Optimization, Answered.</h2>

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
            Optimize Your Alibaba Cloud Footprint.
          </h2>
          <p className="text-base-content/75 dark:text-slate-300 text-sm md:text-base mb-8">
            Gain immediate visibility into your APAC and cross-border cloud spend. Request your free assessment today.
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
