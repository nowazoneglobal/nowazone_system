import React, { useState, useEffect } from 'react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { Server, Database, Layers, BarChart2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const GoogleCloudCostPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const [spend, setSpend] = useState<number>(38400);
  const [forecast, setForecast] = useState<number>(42800);
  const [savings, setSavings] = useState<number>(9850);
  const [coverage, setCoverage] = useState<number>(52);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpend((prev) => prev + (Math.floor(Math.random() * 5) - 2) * 8);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const faqs = [
    {
      q: "How much can we save on Google Cloud?",
      a: "Most GCP environments carry 15–30% in avoidable spend from uncommitted usage, oversized Compute Engine instances and unoptimized BigQuery queries. Your free assessment gives you an exact number."
    },
    {
      q: "Do you need Owner IAM access to our GCP project?",
      a: "No. A Viewer role plus Billing Account Viewer is enough for the assessment. Elevated access is only requested if you move to implementation, under NDA."
    },
    {
      q: "Can you help with BigQuery costs specifically?",
      a: "Yes. We review slot reservations vs. on-demand pricing, partitioning and query patterns driving unnecessary scan costs."
    },
    {
      q: "Committed Use Discounts or Sustained Use Discounts — what's the difference?",
      a: "Sustained Use Discounts apply automatically based on usage; Committed Use Discounts require a 1- or 3-year commitment for a deeper discount. We model both against your workload stability before recommending."
    }
  ];

  return (
    <>
      <SEO
        title="Google Cloud Cost Optimization Services — Nowazone"
        description="Google Cloud cost optimization and FinOps — CUD commitments, GKE cluster rightsizing, and BigQuery query governance. Free GCP Cost Assessment."
        canonical="/platforms/google-cloud-cost-optimization"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              serviceType: 'Google Cloud Cost Optimization',
              provider: { '@type': 'Organization', name: 'Nowazone' },
              description: 'GCP billing audits, Committed Use Discounts, BigQuery slot management, and GKE rightsizing.',
            },
          ],
        }}
      />

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Google Cloud Cost Optimization
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Get More Out of Every Google Cloud Dollar.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Committed Use Discount gaps, oversized Compute Engine instances, idle GKE node pools, and BigQuery queries scanning far more data than needed — we isolate your GCP spend leaks and engineer the fixes.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              type="button"
              onClick={openAssessmentModal}
              className="btn btn-primary text-white font-heading font-bold shadow-lg relative group"
            >
              <CornerMarkers />
              Free GCP Cost Assessment
            </button>
            <a href="#faq" className="btn btn-outline border-base-300 font-heading font-semibold">
              Read the FAQ
            </a>
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
              GCP Costs Hide in Two Places: Compute and Queries.
            </h2>
            <p className="text-sm sm:text-[15px] text-base-content/70 dark:text-white/70 leading-relaxed">
              Compute Engine and GKE waste behaves like every other cloud. BigQuery is different — a single unpartitioned table scanned repeatedly can quietly cost more than your entire compute bill.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                Committed Use Discount gaps — paying on-demand where a commitment would pay off
              </span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                Oversized Compute Engine instances and idle GKE node pools
              </span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                BigQuery queries scanning unpartitioned tables on every run
              </span>
            </div>
            <div className="flex gap-3 items-start py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">
                No project-level cost allocation — nobody owns the bill
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 LEVERS */}
      <section className="bg-base-100 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
              What We Do On Google Cloud
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content dark:text-white">Five Levers, One GCP Practice.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Billing Export Audit</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-300 leading-relaxed">
                Complete BigQuery billing export audit across all projects and folders.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">CUD Strategy</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-300 leading-relaxed">
                Right-sized flexible and resource-based commitments matched to workloads.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">GKE &amp; Compute</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-300 leading-relaxed">
                Node pool rightsizing, GKE Autopilot vs Standard evaluation, and preemptible jobs.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">BigQuery Optimization</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-300 leading-relaxed">
                Slot reservations, query partitioning, clustering, and BI Engine caching.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Project Allocation</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-300 leading-relaxed">
                Mandatory labeling policies that ensure every project has financial ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE DASHBOARD */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs tracking-widest uppercase text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              Sample Output
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              What Your Google Cloud Cost Dashboard Looks Like
            </h2>
          </div>

          <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl relative transition-colors">
            <CornerMarkers />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-4">
                  CUD Coverage by Project
                </span>
                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs text-base-content/80 dark:text-white/80 mb-1.5">
                      <span>prod-serving</span>
                      <span className="font-mono font-semibold text-primary dark:text-primary-light">74%</span>
                    </div>
                    <div className="h-2 bg-base-300 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '74%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-base-content/80 dark:text-white/80 mb-1.5">
                      <span>analytics-pipeline</span>
                      <span className="font-mono font-semibold text-blue-500 dark:text-blue-400">38%</span>
                    </div>
                    <div className="h-2 bg-base-300 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: '38%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-base-content/80 dark:text-white/80 mb-1.5">
                      <span>ml-training</span>
                      <span className="font-mono font-semibold text-blue-400 dark:text-blue-300">21%</span>
                    </div>
                    <div className="h-2 bg-base-300 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 dark:bg-blue-300 rounded-full" style={{ width: '21%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-4">
                  BigQuery: Top Query Cost Drivers
                </span>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/25 rounded-lg">
                    <span className="text-xs text-base-content dark:text-white/90">events_raw — full scan, unpartitioned</span>
                    <span className="text-xs font-bold font-mono text-red-500 dark:text-red-400 flex-none ml-2">$2,940/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-500/10 border border-amber-500/25 rounded-lg">
                    <span className="text-xs text-base-content dark:text-white/90">daily_rollup — re-run 40x/day</span>
                    <span className="text-xs font-bold font-mono text-amber-500 dark:text-amber-400 flex-none ml-2">$1,120/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-500/10 border border-amber-500/25 rounded-lg">
                    <span className="text-xs text-base-content dark:text-white/90">user_sessions — SELECT * on wide table</span>
                    <span className="text-xs font-bold font-mono text-amber-500 dark:text-amber-400 flex-none ml-2">$680/mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-base-content/60 dark:text-white/40 mt-4">
            Illustrative example from a typical GCP + BigQuery environment — your assessment reflects your actual usage.
          </p>
        </div>
      </section>

      {/* ENGAGEMENT CARDS */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Engagement Models
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content dark:text-white">Two Steps to a Lower GCP Bill.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 dark:border-white/15 bg-base-200/50 dark:bg-white/5 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary font-heading block mb-2">
                  Step 1 — Always Free
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">GCP Cost X-Ray</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  Read-only review of your Google Cloud billing exports with itemized savings broken down by project and service.
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
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">GCP Cost Leak Review</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  A comprehensive engineering diagnostic deliverable with BigQuery query refactors, CUD portfolio roadmap, and GKE configs.
                </p>
              </div>
              <div>
                <span className="text-3xl font-extrabold font-heading block mb-4 text-base-content dark:text-white">$750–$1,250*</span>
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

      {/* FAQ SECTION */}
      <section id="faq" className="bg-base-100 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content dark:text-white">Google Cloud Cost Optimization, Answered.</h2>

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
            Take Control of Your Google Cloud &amp; BigQuery Spend.
          </h2>
          <p className="text-base-content/75 dark:text-slate-300 text-sm md:text-base mb-8">
            Stop overpaying on uncommitted Compute Engine instances and runaway queries. Let our Google Cloud Partner specialists audit your tenant.
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
