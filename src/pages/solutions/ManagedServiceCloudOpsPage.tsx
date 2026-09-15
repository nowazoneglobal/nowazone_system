import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { managedServiceCloudOpsSchema } from '../../data/seoSchemas';

export const ManagedServiceCloudOpsPage: React.FC = () => {
  const faqs = [
    {
      q: "Can we start with L1 and move to L2 later?",
      a: "Yes — support tiers are matched to what your environment needs at the time, and can move from L1 to L2 as criticality or complexity changes."
    },
    {
      q: "Does L2 include cost optimization, or is that separate?",
      a: "L2 includes periodic cost optimization reviews. For deeper, ongoing optimization work, see FinOps as a Service."
    },
    {
      q: "What counts as an incident requiring L2 escalation?",
      a: "Anything beyond routine monitoring and first response — configuration changes, performance issues or complex incidents that need deeper ownership."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Cloud Operations Support (L1/L2) | Managed Cloud Ops — Nowazone"
        description="L1 and L2 cloud operations support — monitoring, incident response, performance tuning and cost optimization, sized to how critical your environment is."
        canonical="https://www.nowazone.com/managed-service/cloud-ops-support"
        jsonLd={managedServiceCloudOpsSchema}
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
            Managed Service → Cloud Ops Support
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight">
            Cloud Ops Support — L1 and L2, Sized to Your Environment.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            Not every environment needs the same level of hands-on management. Two support tiers, matched to what you're actually running.
          </p>
        </div>
      </section>

      {/* SECTION 2: L1 SUPPORT */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
            L1 Support
          </h2>
          <p className="text-center text-sm sm:text-base text-base-content/75 dark:text-white/70 max-w-xl mx-auto mb-8">
            Best for stable, lower-criticality environments that need consistent monitoring without constant hands-on management.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Continuous Monitoring</h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">First Response</h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Routine Patching</h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Escalation Handoff</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: L2 SUPPORT */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
            L2 Support
          </h2>
          <p className="text-center text-sm sm:text-base text-base-content/75 dark:text-white/70 max-w-xl mx-auto mb-8">
            Best for production environments that need active management, not just monitoring — and a clear owner when something goes beyond routine.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Everything in L1</h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Performance Tuning</h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Cost Optimization Reviews</h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Escalation Ownership</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW ESCALATION WORKS */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto text-center border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-8 sm:p-10 shadow-sm">
          <h2 className="font-semibold text-xl sm:text-2xl text-base-content dark:text-white mb-3">
            How Escalation Actually Works
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-base-content/75 dark:text-white/70 mb-5">
            L1 handles first response. Anything beyond routine escalates to L2 with full context — not a cold handoff. This escalation path is defined as part of your Cloud Operating Model before support even begins.
          </p>
          <Link
            to="/solutions/cloud-architecture-operating-model"
            className="inline-flex items-center font-semibold text-sm text-[#084ea3] dark:text-blue-400 hover:underline"
          >
            See how this ties to your Cloud Operating Model →
          </Link>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-6">
            Cloud Ops Support Questions
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
export default ManagedServiceCloudOpsPage;

