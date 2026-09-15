import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { managedServiceDedicatedEngineersSchema } from '../../data/seoSchemas';

export const ManagedServiceDedicatedEngineersPage: React.FC = () => {
  const faqs = [
    {
      q: "Can we get a dedicated engineer in a specific country or time zone?",
      a: "Yes — staffing is aligned to your location where needed, or delivered remotely, depending on what your environment requires."
    },
    {
      q: "Is 24/7 coverage available for smaller environments, or only enterprise scale?",
      a: "Coverage is scoped to what your environment actually needs — talk to us about your specific situation rather than assuming a minimum size requirement."
    },
    {
      q: "Do dedicated engineers work with our existing in-house team, or replace them?",
      a: "Alongside — the model is built to fill gaps and add context, not replace the team you already have."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Dedicated Cloud Engineers | 24/7 & Time-Zone Aligned Staffing — Nowazone"
        description="Dedicated cloud engineers — staffed to your time zone or fully remote, including 24/7 coverage where your environment requires it."
        canonical="https://www.nowazone.com/managed-service/dedicated-engineers"
        jsonLd={managedServiceDedicatedEngineersSchema}
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-6">
        <Link
          to="/solutions/managed-service"
          className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
        >
          ← Managed Service
        </Link>
      </div>

      {/* SECTION 1: HERO */}
      <section className="bg-base-100 py-12 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold bg-teal-500/10 border border-teal-500/30 px-3.5 py-1.5 rounded-full mb-6">
            Managed Service → Dedicated Engineers
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight">
            Dedicated Engineers — Staffed to Your Environment, Not a Shared Queue.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            A named engineer or team who knows your environment — not a rotating queue of whoever's available.
          </p>
        </div>
      </section>

      {/* SECTION 2: STAFFING MODELS */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-8">
            How Staffing Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg text-base-content dark:text-white mb-2.5">
                Time-Zone Aligned
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-base-content/70 dark:text-white/70">
                An engineer or team working hours aligned to your business, so support overlaps with when your team is actually online.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg text-base-content dark:text-white mb-2.5">
                Fully Remote / In-House Coordination
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-base-content/70 dark:text-white/70">
                Engineers who work alongside your existing in-house team, filling gaps rather than replacing context you already have.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg text-base-content dark:text-white mb-2.5">
                24/7 Coverage
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-base-content/70 dark:text-white/70">
                Around-the-clock coverage for environments where downtime has real business impact, staffed and scoped to what your environment actually requires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY DEDICATED, NOT SHARED */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
            Why Dedicated Instead of a Shared Support Queue
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-base-content/75 dark:text-white/70">
            A dedicated engineer accumulates real context on your environment — the quirks, the history, the decisions behind why something is configured the way it is. That context is what a shared, ticket-queue model can't replicate.
          </p>
        </div>
      </section>

      {/* SECTION 4: CROSS-LINK */}
      <section className="bg-base-200 dark:bg-navy py-10 px-6 sm:px-10 text-center text-base-content dark:text-white border-y border-base-300 dark:border-white/10 transition-colors">
        <Link
          to="/solutions/managed-service-cloud-ops"
          className="font-semibold text-sm sm:text-base text-primary dark:text-teal-400 hover:underline transition-colors"
        >
          See how dedicated engineers fit alongside L1/L2 support →
        </Link>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-6">
            Dedicated Engineer Questions
          </h2>
          <div className="divide-y divide-base-300 dark:divide-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-semibold text-sm sm:text-base text-base-content dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 mt-2 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA BANNER */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-10 px-6 sm:px-10 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <Link
          to="/solutions/managed-service#support-conversation"
          className="font-bold text-base sm:text-lg text-primary dark:text-teal-400 hover:opacity-80 transition-colors"
        >
          Ready to talk about ongoing support? →
        </Link>
      </section>
    </div>
  );
};
export default ManagedServiceDedicatedEngineersPage;

