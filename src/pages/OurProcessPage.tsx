import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { ourProcessSchema } from '../data/seoSchemas';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { useModal } from '../context/ModalContext';

export const OurProcessPage: React.FC = () => {
  const { openAssessment } = useModal();

  const steps = [
    {
      num: "1",
      period: "Day 1 — Request & Scope",
      title: "You Request a Free Cost X-Ray Assessment",
      desc: "Tell us your platform(s), approximate spend and what you want help with. We confirm scope and send an NDA."
    },
    {
      num: "2",
      period: "Days 2–4 — Read-Only Review",
      title: "We Review Your Environment, Read-Only",
      desc: "A FinOps analyst reviews billing, usage and architecture with reader-level access only — nothing is changed."
    },
    {
      num: "3",
      period: "Day 5 — Findings Delivered",
      title: "You Get a Savings Breakdown by Category",
      desc: "Percentages by category for the free assessment; a fully ranked, dollar-quantified report if you upgrade to the Cost Leak Review. Yours to keep either way."
    },
    {
      num: "4",
      period: "Week 2 — Your Decision",
      title: "You Decide What Happens Next",
      desc: "Implement the findings yourself, bring us in for a fixed-price implementation, or step into an ongoing FinOps Partner retainer. No pressure either way."
    },
    {
      num: "5",
      period: "Ongoing — If You Continue",
      title: "Monthly FinOps Discipline, Not a One-Time Fix",
      desc: "Savings erode without upkeep. A FinOps Partner retainer keeps commitments right-sized and new waste caught early, every month."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Our Process | From Free Assessment to Committed Savings — Nowazone"
        description="Nowazone's cloud cost optimization process, step by step: free Cost X-Ray Assessment, fixed-price Cost Leak Review, and an ongoing FinOps Partner retainer — with a clear timeline and security model at every step."
        canonical="https://www.nowazone.com/our-process"
        jsonLd={ourProcessSchema}
      />

      {/* HERO */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            Our Process
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight tracking-tight">
            From Free Assessment to Committed Savings.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Four clear stages, each with a defined deliverable and no surprise costs. Here's exactly what happens, day by day, from the moment you request an assessment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Start My Free Assessment
            </button>
            <Link
              to="/legal/trust-security"
              className="inline-flex items-center px-6 py-3.5 border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm rounded transition-all"
            >
              See our full Trust &amp; Security page →
            </Link>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto flex flex-col">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-6 relative pb-10 last:pb-0">
              {idx !== steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-base-300 dark:bg-white/15" />
              )}
              <div className="flex-none">
                <span className="w-10 h-10 rounded-full bg-primary text-white font-bold text-base flex items-center justify-center relative z-10 shadow-md">
                  {step.num}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  {step.period}
                </span>
                <h3 className="font-semibold text-lg text-base-content dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECURITY AT EVERY STEP */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs tracking-widest uppercase text-blue-500 dark:text-blue-400 font-bold block mb-3">
              Security at Every Step
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4 leading-tight">
              Nothing Changes Without Your Sign-Off.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-base-content/75 dark:text-white/70">
              Every step above runs under NDA, with read-only access by default. Elevated, scoped access is only requested — and only used — once you've approved a specific implementation step in writing.
            </p>
          </div>

          <div className="bg-base-100 dark:bg-navy-light border border-base-300 dark:border-white/10 rounded-2xl p-6 sm:p-8 divide-y divide-base-300 dark:divide-white/10 shadow-sm">
            <div className="py-3.5 flex gap-3 items-center">
              <svg className="text-emerald-500 dark:text-emerald-400 flex-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"></path></svg>
              <span className="text-sm text-base-content/90 dark:text-white/90">NDA signed before any access is granted</span>
            </div>
            <div className="py-3.5 flex gap-3 items-center">
              <svg className="text-emerald-500 dark:text-emerald-400 flex-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"></path></svg>
              <span className="text-sm text-base-content/90 dark:text-white/90">Read-only for assessment and review stages</span>
            </div>
            <div className="py-3.5 flex gap-3 items-center">
              <svg className="text-emerald-500 dark:text-emerald-400 flex-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"></path></svg>
              <span className="text-sm text-base-content/90 dark:text-white/90">Written approval required before any change</span>
            </div>
            <div className="py-3.5 flex gap-3 items-center">
              <svg className="text-emerald-500 dark:text-emerald-400 flex-none" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"></path></svg>
              <span className="text-sm text-base-content/90 dark:text-white/90">You keep every finding, whether you continue or not</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-base-100 dark:bg-navy py-14 px-6 sm:px-10 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
            Ready to Start Day 1?
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 mb-6">
            Get your report delivered within 24 working hours.
          </p>
          <button
            type="button"
            onClick={openAssessment}
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
          >
            <CornerMarkers />
            Start My Free Assessment
          </button>
        </div>
      </section>
    </div>
  );
};
export default OurProcessPage;

