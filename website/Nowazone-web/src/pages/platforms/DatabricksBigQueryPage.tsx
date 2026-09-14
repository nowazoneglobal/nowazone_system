import React from 'react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';

export const DatabricksBigQueryPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const drivers = [
    {
      job: 'all_events_scan — unpartitioned',
      platform: 'BigQuery',
      freq: '62x/day',
      cost: '$3,180',
      color: 'text-[#f87171]',
    },
    {
      job: 'etl-nightly-cluster — idle 40% of runtime',
      platform: 'Databricks',
      freq: 'Daily, 6hrs',
      cost: '$2,640',
      color: 'text-[#f87171]',
    },
    {
      job: 'ml-features-job — all-purpose cluster',
      platform: 'Databricks',
      freq: 'Hourly',
      cost: '$1,410',
      color: 'text-[#fbbf24]',
    },
    {
      job: 'dashboard_refresh — SELECT * on wide table',
      platform: 'BigQuery',
      freq: '15min',
      cost: '$960',
      color: 'text-[#fbbf24]',
    },
  ];

  const faqs = [
    {
      q: "How much can we save on Databricks and BigQuery?",
      a: "Data platform environments typically carry 20–40% in avoidable spend from idle clusters, inefficient queries and unmanaged storage lifecycle."
    },
    {
      q: "Do you need admin access to our workspace?",
      a: "No. Read-only access to billing, cluster logs and query history is enough for the assessment."
    },
    {
      q: "Can you optimize our Databricks cluster configuration?",
      a: "Yes. We review cluster sizing, autoscaling policies, job vs. all-purpose cluster usage and DBU consumption patterns."
    },
    {
      q: "What's the biggest BigQuery cost mistake you see?",
      a: "Repeatedly querying unpartitioned tables with SELECT * — a single fix here often has more impact than any compute optimization."
    }
  ];

  return (
    <>
      <SEO
        title="Databricks & BigQuery Cost Optimization Services — Nowazone"
        description="Optimize data platform costs — Databricks DBU rightsizing, Photon engine tuning, and BigQuery query governance. Free Data Platform Cost Assessment."
        canonical="/platforms/databricks-bigquery-cost-optimization"
      />

      {/* HERO */}
      <section className="bg-base-100 dark:bg-base-200 border-b border-base-300 dark:border-white/10 py-16 px-6 text-center transition-colors">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Databricks &amp; BigQuery Cost Optimization
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content dark:text-white leading-tight">
            Your Data Platform Bill Is a Query Problem, Not Just a Compute Problem.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 dark:text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Idle Databricks clusters and inefficient BigQuery queries both drive costs that traditional cloud cost tools miss. We review compute, storage and the queries themselves.
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
            <a href="#faq" className="btn btn-outline border-base-300 dark:border-white/20 text-base-content dark:text-white hover:bg-base-200 dark:hover:bg-white/10 font-heading font-semibold">
              Read the FAQ
            </a>
          </div>
        </div>
      </section>

      {/* SAMPLE OUTPUT TABLE (LIVE DASHBOARD) */}
      <section className="bg-base-200/70 dark:bg-[#0a1830] text-base-content dark:text-white py-14 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-primary dark:text-[#60a5fa] font-bold font-heading mb-2 block">
              Sample Output
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-[#f2f2f3]">
              Top Cost Drivers Across Your Data Platform
            </h2>
          </div>

          <div className="bg-base-100 dark:bg-[#0e1f33] border border-base-300 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl transition-colors relative">
            <CornerMarkers />
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-base-300 dark:border-white/10 bg-base-200/60 dark:bg-white/[0.04] text-[11px] text-base-content/60 dark:text-white/50 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Job / Query</th>
                    <th className="py-3.5 px-6">Platform</th>
                    <th className="py-3.5 px-6">Frequency</th>
                    <th className="py-3.5 px-6">Monthly Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300 dark:divide-white/[0.08] text-xs md:text-sm">
                  {drivers.map((d, i) => (
                    <tr key={i} className="hover:bg-base-200/40 dark:hover:bg-white/[0.03] transition-colors text-base-content dark:text-[#f2f2f3]">
                      <td className="py-3.5 px-6 font-medium">{d.job}</td>
                      <td className="py-3.5 px-6 text-base-content/70 dark:text-white/60">{d.platform}</td>
                      <td className="py-3.5 px-6 text-base-content/70 dark:text-white/60">{d.freq}</td>
                      <td className={`py-3.5 px-6 font-bold ${d.color}`}>{d.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-xs text-base-content/50 dark:text-white/40 mt-4">
            Illustrative example from a typical Databricks + BigQuery environment — your assessment reflects your actual jobs and queries.
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
              Data Platforms Have a Different Cost Shape.
            </h2>
            <p className="text-sm md:text-base text-base-content/70 dark:text-white/70 leading-relaxed">
              Unlike general compute, data platform costs spike on usage patterns — a bad query or an oversized cluster can cost more in a day than a whole month of idle VMs elsewhere.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">Databricks clusters left running idle between jobs</span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">All-purpose clusters used for scheduled jobs that should run on job clusters</span>
            </div>
            <div className="flex gap-3 items-start py-4 border-b border-base-300 dark:border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">BigQuery queries scanning unpartitioned tables on every run</span>
            </div>
            <div className="flex gap-3 items-start py-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-none mt-0.5">
                <path d="M12 2v20M2 12h20" />
              </svg>
              <span className="text-[14.5px] leading-relaxed text-base-content dark:text-white">No storage lifecycle policy on old tables and stale checkpoints</span>
            </div>
          </div>
        </div>
      </section>

      {/* FIVE LEVERS */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              What We Do On Data Platforms
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              Five Levers Across Your Data Platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Cluster &amp; DBU Audit
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Cluster sizing, autoscaling policy and DBU consumption review.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Job vs. All-Purpose Cleanup
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Move scheduled workloads onto the cheaper cluster type.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                BigQuery Query Review
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Partitioning, clustering and slot vs. on-demand pricing analysis.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Storage Lifecycle
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Retention policies for tables, checkpoints and Delta Lake versions.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-white/5 rounded-xl border border-base-300 dark:border-white/15 relative shadow-sm flex flex-col">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">
                Workspace Cost Allocation
              </h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Tag and attribute spend to teams, pipelines and business units.
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
              Get Started
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              Two Steps to a Lower Data Platform Bill.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 p-8 rounded-xl flex flex-col justify-between relative shadow-sm">
              <CornerMarkers />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 font-heading block mb-2">
                  Step 1 — Always Free
                </span>
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">Cost X-Ray Assessment</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  Read-only audit of your Databricks cluster telemetry and BigQuery audit logs identifying top query spenders.
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
                <h3 className="text-2xl font-bold font-heading mb-3 text-base-content dark:text-white">Cost Leak Review</h3>
                <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
                  A comprehensive engineering deliverable with rewritten SQL queries, cluster configuration templates, and slot sizing.
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
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              Databricks &amp; BigQuery Cost Optimization, Answered.
            </h2>
          </div>
          <div className="divide-y divide-base-300 dark:divide-white/10">
            {[
              {
                q: 'How much can we save on Databricks and BigQuery?',
                a: 'Data platform environments typically carry 20–40% in avoidable spend from idle clusters, inefficient queries and unmanaged storage lifecycle.'
              },
              {
                q: 'Do you need admin access to our workspace?',
                a: 'No. Read-only access to billing, cluster logs and query history is enough for the assessment.'
              },
              {
                q: 'Can you optimize our Databricks cluster configuration?',
                a: 'Yes. We review cluster sizing, autoscaling policies, job vs. all-purpose cluster usage and DBU consumption patterns.'
              },
              {
                q: "What's the biggest BigQuery cost mistake you see?",
                a: 'Repeatedly querying unpartitioned tables with SELECT * — a single fix here often has more impact than any compute optimization.'
              }
            ].map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-heading font-semibold text-base text-base-content dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-sm text-base-content/70 dark:text-white/70 mt-2 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] text-base-content dark:text-white py-16 px-6 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-base-content dark:text-white">
            Ready to See What Your Data Platform Is Actually Costing You?
          </h2>
          <p className="text-base-content/75 dark:text-white/70 text-sm max-w-lg mx-auto mb-8">
            Get a clear, query-level and cluster-level audit of avoidable spend — completely free.
          </p>
          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold shadow-xl relative group px-8"
          >
            <CornerMarkers />
            Free Cost X-Ray Assessment
          </button>
        </div>
      </section>
    </>
  );
};
