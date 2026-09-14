import React from 'react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';

export const MultiCloudPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "What is FOCUS and why does it matter for multi-cloud cost?",
      a: "FOCUS (FinOps Open Cost and Usage Specification) is a vendor-neutral billing data format. Normalizing every cloud's billing export to FOCUS lets you compare spend, usage and commitments in one consistent language instead of three different billing formats."
    },
    {
      q: "How much can we save managing multiple clouds together?",
      a: "Beyond per-cloud savings, most multi-cloud organizations find 5–15% more by removing duplicated tooling, redundant workloads and inconsistent governance across clouds."
    },
    {
      q: "Do we need to consolidate onto fewer clouds to benefit?",
      a: "No. Multi-cloud cost management works alongside a deliberate multi-cloud strategy — the goal is one consistent view and governance model, not fewer providers."
    },
    {
      q: "Can you support clouds beyond AWS, Azure and Google Cloud?",
      a: "Yes. Oracle Cloud, Alibaba Cloud, and data platforms like Databricks and BigQuery all normalize into the same unified view."
    }
  ];

  return (
    <>
      <SEO
        title="Multi-Cloud Cost Management & Governance — Nowazone"
        description="Unified multi-cloud FinOps across AWS, Azure, Google Cloud, and OCI. Normalized to the FOCUS 1.4 standard for cross-cloud financial clarity."
        canonical="/platforms/multi-cloud-cost-management"
      />

      {/* HERO WITH CENTERPIECE DASHBOARD */}
      <section className="bg-base-100 dark:bg-[#0a1830] text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary dark:text-[#60a5fa] font-bold px-3.5 py-1.5 bg-primary/10 dark:bg-[#60a5fa]/10 border border-primary/20 dark:border-[#60a5fa]/30 rounded-full mb-5 font-heading">
            Multi-Cloud Cost Management
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-5 leading-tight text-base-content dark:text-[#f2f2f3]">
            One Cost Language Across Every Cloud You Run.
          </h1>
          <p className="text-base text-base-content/75 dark:text-white/65 max-w-2xl mx-auto leading-relaxed mb-8">
            AWS, Azure, Google Cloud, Oracle, Alibaba, Databricks, BigQuery — different billing formats, different terminology, one bill to make sense of. We normalize it all to the FOCUS standard so you see one truth, not five.
          </p>

          <div className="flex gap-3.5 justify-center flex-wrap">
            <button
              type="button"
              onClick={openAssessmentModal}
              className="relative px-7 py-3.5 bg-[#0a63ce] hover:bg-[#0f5bdb] text-white font-heading font-bold text-sm rounded-sm transition-all shadow-lg hover:-translate-y-0.5"
            >
              <CornerMarkers />
              Free Multi-Cloud Assessment
            </button>
            <a
              href="#faq"
              className="inline-flex items-center px-6 py-3.5 border border-base-300 dark:border-white/30 text-base-content dark:text-[#f2f2f3] hover:bg-base-200 dark:hover:bg-white/10 font-heading font-semibold text-sm rounded-sm transition-colors"
            >
              Read the FAQ
            </a>
          </div>
        </div>

        {/* DASHBOARD CENTERPIECE */}
        <div className="max-w-5xl mx-auto bg-base-200/70 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-xl transition-colors relative">
          <CornerMarkers />
          <span className="block text-center text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-6">
            Sample Output — Unified Spend, Normalized to FOCUS
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Stacked Bar Representation */}
            <div className="lg:col-span-7">
              <div className="flex items-end justify-between gap-6 h-44 px-4 border-b border-base-300 dark:border-white/10 pb-2">
                {/* AWS */}
                <div className="flex-1 flex flex-col-reverse items-center gap-0.5 h-full justify-end">
                  <span className="text-[11.5px] text-base-content/70 dark:text-white/60 font-mono mt-2">AWS</span>
                  <div className="w-full bg-[#0a63ce] rounded-t h-[70px]" />
                  <div className="w-full bg-[#3b7fd6] h-[38px]" />
                  <div className="w-full bg-[#93c5fd] h-[22px]" />
                </div>
                {/* Azure */}
                <div className="flex-1 flex flex-col-reverse items-center gap-0.5 h-full justify-end">
                  <span className="text-[11.5px] text-base-content/70 dark:text-white/60 font-mono mt-2">Azure</span>
                  <div className="w-full bg-[#0a63ce] rounded-t h-[50px]" />
                  <div className="w-full bg-[#3b7fd6] h-[60px]" />
                  <div className="w-full bg-[#93c5fd] h-[18px]" />
                </div>
                {/* Google Cloud */}
                <div className="flex-1 flex flex-col-reverse items-center gap-0.5 h-full justify-end">
                  <span className="text-[11.5px] text-base-content/70 dark:text-white/60 font-mono mt-2">Google Cloud</span>
                  <div className="w-full bg-[#0a63ce] rounded-t h-[34px]" />
                  <div className="w-full bg-[#3b7fd6] h-[26px]" />
                  <div className="w-full bg-[#93c5fd] h-[14px]" />
                </div>
                {/* Other */}
                <div className="flex-1 flex flex-col-reverse items-center gap-0.5 h-full justify-end">
                  <span className="text-[11.5px] text-base-content/70 dark:text-white/60 font-mono mt-2">Other</span>
                  <div className="w-full bg-[#0a63ce] rounded-t h-[16px]" />
                  <div className="w-full bg-[#3b7fd6] h-[10px]" />
                  <div className="w-full bg-[#93c5fd] h-[8px]" />
                </div>
              </div>

              <div className="flex gap-4 justify-center mt-3.5 text-[11px] text-base-content/70 dark:text-white/55 font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#0a63ce] inline-block rounded-xs" /> Compute</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#3b7fd6] inline-block rounded-xs" /> Storage &amp; Data</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#93c5fd] inline-block rounded-xs" /> Committed / Reserved</span>
              </div>
            </div>

            {/* Governance Consistency Scorecard */}
            <div className="lg:col-span-5 bg-base-100 dark:bg-black/20 p-5 rounded-xl border border-base-300 dark:border-white/5 font-mono text-xs space-y-3.5 shadow-sm transition-colors">
              <span className="text-base-content/60 dark:text-white/50 uppercase tracking-wider text-[11px] block">
                Governance Consistency
              </span>
              <div className="flex justify-between border-b border-base-300 dark:border-white/10 pb-2 text-[12.5px] text-base-content/80 dark:text-white/75">
                <span>Tagging coverage</span>
                <span className="text-[#4ade80] font-bold">92%</span>
              </div>
              <div className="flex justify-between border-b border-base-300 dark:border-white/10 pb-2 text-[12.5px] text-base-content/80 dark:text-white/75">
                <span>Commitment coverage</span>
                <span className="text-[#fbbf24] font-bold">58%</span>
              </div>
              <div className="flex justify-between border-b border-base-300 dark:border-white/10 pb-2 text-[12.5px] text-base-content/80 dark:text-white/75">
                <span>Anomaly alerts active</span>
                <span className="text-[#4ade80] font-bold">All clouds</span>
              </div>
              <div className="flex justify-between text-[12.5px] text-base-content/80 dark:text-white/75">
                <span>FOCUS normalization</span>
                <span className="text-[#4ade80] font-bold">Complete</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-base-content/50 dark:text-white/40 mt-5">
            Illustrative example across a typical multi-cloud estate — your assessment reflects your actual environments.
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-base-100 dark:bg-base-200 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block font-heading">
              The Problem
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-base-content dark:text-white leading-snug">
              Every Cloud Speaks a Different Cost Dialect.
            </h2>
            <p className="text-sm md:text-base text-base-content/70 dark:text-white/70 leading-relaxed">
              AWS calls it a Savings Plan, Azure calls it a Reservation, Google calls it a Committed Use Discount. Without a shared framework, comparing spend across clouds means comparing apples to oranges — every time.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">No single view of total spend across providers</span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">Inconsistent tagging and governance between clouds</span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">Duplicated tooling and redundant workloads across providers</span>
            </div>
            <div className="flex gap-3 items-start py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">Different teams optimizing each cloud in isolation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ONE PRACTICE, EVERY CLOUD */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              Our Multi-Cloud Architecture
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              One Practice, Every Cloud.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">FOCUS Normalization</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Every provider's billing export mapped to the FOCUS 1.2–1.4 standard.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Unified Cost Dashboards</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                One view of spend, commitments and trends across every cloud.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Cross-Cloud Governance</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Consistent tagging, budgets and alerting policy everywhere.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Redundancy Elimination</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Find duplicated tools and workloads spread across providers.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Single FinOps Practice</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                One team, one methodology, applied consistently across your whole estate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT CARDS */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Get Started
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              Two Steps to One Unified Cloud Bill.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 dark:border-white/15 bg-base-200/50 dark:bg-white/5 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary font-heading block mb-2">
                  Step 1 — Always Free
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">Multi-Cloud Cost X-Ray Assessment</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  Read-only audit across all your cloud providers with normalized FOCUS telemetry and cross-cloud recommendations.
                </p>
              </div>
              <div>
                <span className="text-4xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$0</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-primary text-white w-full font-heading font-bold"
                >
                  Get Free Assessment
                </button>
              </div>
            </div>

            <div className="border border-base-300 dark:border-white/15 bg-base-200/50 dark:bg-white/5 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 dark:text-white/60 font-heading block mb-2">
                  2–5 Business Days
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">Multi-Cloud Leak Review</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  Complete cross-cloud architecture audit, egress heatmaps, consolidated tagging scripts, and commitment portfolio.
                </p>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$750–$1,250</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-outline border-base-300 dark:border-white/30 text-base-content dark:text-white hover:border-primary w-full font-heading font-bold"
                >
                  Book Diagnostic
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content dark:text-white">Multi-Cloud Cost Management, Answered.</h2>

          <div className="divide-y divide-base-300 dark:divide-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-heading font-semibold text-base cursor-pointer flex justify-between items-center text-base-content dark:text-white">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-base-content/75 dark:text-white/70 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-base-200 dark:bg-navy-950 text-base-content dark:text-white py-16 px-6 text-center border-t border-base-300 dark:border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold font-heading mb-4 text-base-content dark:text-white">
            Unify Your Multi-Cloud Estate Under One Standard.
          </h2>
          <p className="text-base-content/75 dark:text-slate-300 text-sm md:text-base mb-8">
            Speak to a multi-cloud FinOps certified practitioner. Get a normalized FOCUS assessment in 48 hours.
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
