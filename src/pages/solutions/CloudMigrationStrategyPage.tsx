import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { cloudMigrationStrategySchema } from '../../data/seoSchemas';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, DollarSign, Layers } from 'lucide-react';

export const CloudMigrationStrategyPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "What's included in a migration cost estimate?",
      a: 'Target-state compute and storage sizing, data egress during and after migration, temporary parallel-environment costs during cutover, licensing impact, Reserved Instance/Savings Plan strategy for the target state, and a 90-day post-migration optimization forecast.',
    },
    {
      q: 'How do you account for costs during the cutover period itself?',
      a: 'We model the temporary cost of running old and new environments in parallel during cutover windows — one of the most commonly underestimated line items in a migration budget.',
    },
    {
      q: 'Do you plan for licensing changes as part of the cost model?',
      a: 'Yes. Licensing impact is modeled alongside compute and storage, and connects directly into our Microsoft and Google Cloud licensing and reselling services where relevant.',
    },
  ];

  return (
    <>
      <SEO
        title="Cloud Migration Strategy & Planning | FinOps-First Cost Estimation — Nowazone"
        description="Cloud migration strategy and planning — discovery, FinOps-based cost estimation, and wave planning before a single workload moves."
        canonical="/solutions/cloud-migration-strategy-planning"
        jsonLd={cloudMigrationStrategySchema}
      />

      {/* BACK LINK */}
      <div className="bg-base-100 border-b border-base-300 py-3 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/solutions/cloud-migration"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary font-heading hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cloud Migration Overview
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Phase One · Strategy &amp; Planning
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Cloud Migration Strategy &amp; Planning — Cost Modeled Before Architecture.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Before any architecture decision is signed off, we model what it will actually cost to operate — including data egress, licensing, and parallel environment cutover runs.
          </p>

          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold shadow-lg"
          >
            Request Free Pre-Migration Assessment
          </button>
        </div>
      </section>

      {/* DISCOVERY */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-14 px-6 border-b border-base-300 dark:border-white/10 text-center transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-base-content dark:text-white">Discovery &amp; Inventory</h2>
          <p className="text-sm md:text-base text-base-content/75 dark:text-slate-300 leading-relaxed">
            Automated dependency mapping and complete inventory of virtual machines, bare metal servers, database engines, network subnets, and active storage tiers. Nothing is scheduled for migration until it is cataloged and risk-scored.
          </p>
        </div>
      </section>

      {/* 6 KEY ELEMENTS */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              The FinOps Cost Model
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading">
              Six Critical Dimensions Planned Upfront
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Compute &amp; Storage Sizing</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Right-sized target instance families based on actual P95 CPU and RAM usage, not static on-prem allocation.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Egress &amp; Replication Costs</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Calculating initial block sync and incremental delta sync bandwidth before execution starts.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Parallel-Run Dual Costs</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Strict duration ceilings on co-running on-premises and target cloud environments during validation windows.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Licensing Portability</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Evaluating BYOL, Azure Hybrid Benefit, and CSP reselling discounts for Windows, SQL Server, and Oracle.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">Target Commitment Strategy</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Scheduling 1-year and 3-year RI/Savings Plans to lock in 35–65% discounts on stable core systems immediately.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-300 relative">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-base mb-2">90-Day Optimization Curve</h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                Forecasting post-migration savings through containerization, managed databases, and cold storage lifecycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE PLANNING */}
      <section className="bg-base-200/60 dark:bg-navy-950 text-base-content dark:text-white py-14 px-6 border-b border-base-300 dark:border-white/10 text-center transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-base-content dark:text-white">Migration Wave Sequencing</h2>
          <p className="text-sm md:text-base text-base-content/75 dark:text-slate-300 leading-relaxed">
            Applications are partitioned into pilot, non-prod, low-risk, and mission-critical waves. Each wave has its own performance validation, cutover protocol, and rollback criteria.
          </p>
        </div>
      </section>

      {/* SECTION 5: LANDING ZONE CROSS-LINK */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-2xl mx-auto text-center border border-base-300 dark:border-white/15 rounded-xl p-8 md:p-10 bg-base-100 dark:bg-navy-950/60 shadow-sm relative">
          <CornerMarkers />
          <h2 className="text-xl md:text-2xl font-bold font-heading text-base-content dark:text-white mb-3">
            Where This Connects to Landing Zone Design
          </h2>
          <p className="text-sm md:text-base text-base-content/70 dark:text-white/70 mb-5 leading-relaxed">
            Cost estimation and wave planning feed directly into your target landing zone — account structure, networking and identity foundation.
          </p>
          <Link
            to="/solutions/cloud-architecture-landing-zone-design"
            className="inline-flex items-center gap-1.5 font-bold font-heading text-sm text-primary hover:underline"
          >
            See Landing Zone Design <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section id="faq" className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content dark:text-white">
            Strategy &amp; Planning Questions
          </h2>

          <div className="divide-y divide-base-300 dark:divide-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-heading font-semibold text-base cursor-pointer flex justify-between items-center text-base-content dark:text-white">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-base-content/70 dark:text-white/70 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA BANNER */}
      <section className="bg-base-200/80 dark:bg-navy-950 text-base-content dark:text-white py-12 px-6 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/solutions/cloud-migration#requirement-form"
            className="inline-flex items-center gap-2 font-heading font-bold text-base md:text-lg text-primary dark:text-amber-400 hover:underline transition-colors"
          >
            Ready to scope your migration? <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

