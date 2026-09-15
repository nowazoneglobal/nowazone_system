import React from 'react';
import { SEO } from '../../components/common/SEO';
import { oracleCloudCostSchema } from '../../data/seoSchemas';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { Server, Database, Layers, BarChart2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const OracleCloudCostPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "How much can we save on Oracle Cloud Infrastructure?",
      a: "Most OCI tenancies carry 10–25% in avoidable spend from unused Universal Credits allocation, oversized compute shapes and idle Autonomous Database instances."
    },
    {
      q: "Do you need Administrator access to our OCI tenancy?",
      a: "No. A read-only group with cost and usage report access is enough for the assessment."
    },
    {
      q: "What are Universal Credits and why do they matter for cost?",
      a: "Universal Credits are OCI's flexible prepaid commitment. Unused or misallocated credits at the end of a term are effectively wasted spend — we check utilization against your actual burn rate."
    },
    {
      q: "Can you review our Autonomous Database costs?",
      a: "Yes. OCPU and storage allocation for Autonomous Database is a common source of overspend, especially when auto-scaling limits are set too high."
    }
  ];

  return (
    <>
      <SEO
        title="Oracle Cloud (OCI) Cost Optimization Services — Nowazone"
        description="Oracle Cloud Infrastructure (OCI) cost management — Universal Credits burn-down, compartment allocation, and Autonomous Database rightsizing. Free OCI Cost Assessment."
        canonical="/platforms/oracle-cloud-cost-optimization"
        jsonLd={oracleCloudCostSchema}
      />

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Oracle Cloud (OCI) Cost Optimization
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Make Every Universal Credit Count.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Unused Universal Credits expiring at contract year-end, oversized bare-metal shapes, and Autonomous Database instances left on auto-scale maximums — OCI cost governance is underserved. We bring FinOps rigor to your tenancy.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              type="button"
              onClick={openAssessmentModal}
              className="btn btn-primary text-white font-heading font-bold shadow-lg relative group"
            >
              <CornerMarkers />
              Free OCI Cost Assessment
            </button>
            <a href="#faq" className="btn btn-outline border-base-300 font-heading font-semibold">
              Read the FAQ
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM + DASHBOARD SIDEBAR (right side) */}
      <section className="bg-base-100 dark:bg-navy py-12 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-11 items-start">
          <div>
            <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-3.5 font-heading">
              The Problem
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-bold font-heading text-base-content dark:text-white leading-tight mb-4">
              Oracle Cloud Governance Gets Less Attention Than It Needs.
            </h2>
            <p className="text-sm sm:text-[15px] text-base-content/70 dark:text-white/70 leading-relaxed mb-6">
              OCI's Universal Credits model is flexible, which also makes it easy to lose track of. Fewer tools and specialists cover OCI cost governance compared to AWS or Azure — that's exactly where we focus.
            </p>

            <div className="flex flex-col">
              <div className="flex gap-3 items-start py-3.5 border-b border-base-300 dark:border-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                  Universal Credits allocated but unused at term end
                </span>
              </div>
              <div className="flex gap-3 items-start py-3.5 border-b border-base-300 dark:border-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                  Oversized compute shapes across compartments
                </span>
              </div>
              <div className="flex gap-3 items-start py-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                  <path d="M12 2v20M2 12h20" />
                </svg>
                <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                  Autonomous Database auto-scaling limits set too high
                </span>
              </div>
            </div>
          </div>

          {/* OCI Visual Cockpit Card */}
          <div className="bg-base-100 dark:bg-[#0a1830] text-base-content dark:text-white rounded-[14px] p-6 sm:p-7 shadow-xl border border-base-300 dark:border-white/10 transition-colors">
            <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-3.5">
              Universal Credits Burn-down
            </span>

            <div className="relative h-3.5 bg-base-200 dark:bg-white/10 rounded-lg overflow-hidden mb-2">
              <div className="h-full bg-[#0a63ce] rounded-lg" style={{ width: '58%' }} />
              <div className="absolute left-[75%] top-0 bottom-0 w-[2px] bg-base-content/40 dark:bg-white/50" />
            </div>

            <div className="flex justify-between text-[11.5px] text-base-content/70 dark:text-white/60 font-mono mb-5">
              <span>58% consumed</span>
              <span>75% of term elapsed</span>
            </div>

            <span className="block text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 font-mono mb-2.5">
              Compartment Spend
            </span>
            <div className="flex flex-col gap-2.5 font-mono text-[12.5px] text-base-content/80 dark:text-white/80">
              <div className="flex justify-between">
                <span>prod-compartment</span>
                <span className="font-semibold text-base-content dark:text-white">$12.1K</span>
              </div>
              <div className="flex justify-between">
                <span>db-compartment</span>
                <span className="font-semibold text-base-content dark:text-white">$6.4K</span>
              </div>
              <div className="flex justify-between">
                <span>dev-compartment</span>
                <span className="font-semibold text-base-content dark:text-white">$1.9K</span>
              </div>
            </div>

            <p className="text-[11px] text-base-content/50 dark:text-white/40 mt-4 pt-3 border-t border-base-300 dark:border-white/10">
              Illustrative example. Your assessment reflects your actual tenancy.
            </p>
          </div>
        </div>
      </section>

      {/* FOUR LEVERS */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              What We Do On OCI
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              Four Levers, One OCI Practice.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Cost &amp; Usage Report Audit
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Full tenancy-level cost and usage review across compartments.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Universal Credits Optimization
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Utilization tracking so credits don't expire unused.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Compute &amp; ADB Rightsizing
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Shape and OCPU/storage recommendations for compute and Autonomous Database.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Tenancy Governance
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Budgets, tagging and compartment structure that scales with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT CARDS */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold font-heading mb-2 block">
              Get Started on OCI
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              Two Steps to a Lower OCI Bill.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 font-heading block mb-2">
                  Step 1 — Always Free
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">OCI Cost X-Ray Assessment</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  Read-only audit of your OCI tenancy with itemized savings by compartment and resource class.
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

            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 dark:text-white/60 font-heading block mb-2">
                  2–5 Business Days
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">OCI Cost Leak Review</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  A comprehensive engineering deliverable with rewritten compartment budgets, shape tuning, and UC forecasting.
                </p>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$750–$1,250</span>
                <button
                  type="button"
                  onClick={openAssessmentModal}
                  className="btn btn-outline border-base-300 dark:border-white/30 text-base-content dark:text-white hover:bg-base-200 dark:hover:bg-white/10 hover:border-primary w-full font-heading font-bold"
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
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content dark:text-white">Oracle Cloud Cost Optimization, Answered.</h2>

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
            Maximize Your Oracle Universal Credits.
          </h2>
          <p className="text-base-content/75 dark:text-slate-300 text-sm md:text-base mb-8">
            Don’t let your OCI commitments expire or overspend on idle flex shapes. Book a free 48-hour assessment.
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

