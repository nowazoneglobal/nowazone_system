import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { ArrowLeft, ArrowRight, ShieldCheck, DollarSign, Users, AlertCircle } from 'lucide-react';

export const CloudArchitectureOperatingModelPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "What's the difference between the operating model and managed service support?",
      a: "The operating model defines who owns what. Managed Service is how that ownership is actually staffed and delivered day-to-day — see the Managed Service pillar."
    },
    {
      q: "Do you help design showback/chargeback reporting?",
      a: "Yes — cost accountability structure is one of the three pillars we define before cutover."
    },
    {
      q: "Can you review an existing operating model instead of designing a new one?",
      a: "Yes. A review applies the same three-pillar framework — governance, cost accountability and operational ownership — to what's already in place and identifies the gaps."
    }
  ];

  return (
    <>
      <SEO
        title="Cloud Operating Model Design Services — Nowazone"
        description="Cloud operating model design — governance, cost accountability and operational ownership, defined before migration cutover."
        canonical="/solutions/cloud-architecture-operating-model"
      />

      <div className="bg-base-100 border-b border-base-300 py-3 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/solutions/cloud-architecture"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary font-heading hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cloud Architecture Overview
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Cloud Architecture → Operating Model
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Cloud Operating Model — Defined Ownership Before Go-Live.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Migration without an operating model just moves chaos to a new hyperscaler address. Before cutover, we define clear financial, security, and operational ownership.
          </p>

          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold shadow-lg"
          >
            Design Your Cloud Operating Model
          </button>
        </div>
      </section>

      {/* 3 PILLARS */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              What We Define Before Cutover
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content dark:text-white">Three Pillars of Cloud Governance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-lg mb-2 text-base-content dark:text-white">Governance &amp; Guardrails</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Automated policy baselines, compliance tagging standards, and access control enforced through code from day one rather than cleaned up after a breach.
              </p>
            </div>

            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <DollarSign className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-lg mb-2 text-base-content dark:text-white">Cost Accountability</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                A chargeback and showback structure tied directly to the FinOps cost model built during migration planning — cloud cost ownership is unambiguous.
              </p>
            </div>

            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <Users className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-lg mb-2 text-base-content dark:text-white">Operational Ownership</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Defined escalation paths from first-line 24/7 monitoring through to architectural decision makers — connecting directly to our Managed Service operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY THIS IS DEFINED BEFORE MIGRATION */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-base-content">
            Why We Do This Before Go-Live
          </h2>
          <p className="text-base text-base-content/70 leading-relaxed max-w-2xl mx-auto">
            Day one in a new environment with no defined ownership is a scramble, not a launch. Every operating model decision here is made before cutover, so day one has clear ownership from the start.
          </p>
        </div>
      </section>

      {/* SECTION 4: CROSS-LINK */}
      <section className="bg-base-200/60 dark:bg-navy-900 py-8 px-6 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/solutions/managed-service"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm md:text-base text-primary dark:text-blue-400 hover:underline transition-colors"
          >
            See how this operating model is staffed and run day-to-day <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content dark:text-white">Operating Model Questions</h2>

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

      {/* SECTION 6: CTA BANNER */}
      <section className="bg-base-200/80 dark:bg-navy-950 text-base-content dark:text-white py-12 px-6 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/solutions/cloud-migration#requirement-form"
            className="inline-flex items-center gap-2 font-heading font-bold text-base md:text-lg text-primary dark:text-blue-400 hover:underline transition-colors"
          >
            Ready to scope your migration? <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};
