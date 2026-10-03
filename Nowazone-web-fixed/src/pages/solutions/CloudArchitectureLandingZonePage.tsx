import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { ArrowLeft, ArrowRight, ShieldCheck, Layers, Lock, Cpu, Globe } from 'lucide-react';

export const CloudArchitectureLandingZonePage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "Do you design landing zones for AWS, Azure and Google Cloud?",
      a: "Yes — landing zone design follows the same discipline across AWS, Azure and Google Cloud, adapted to each platform's account/subscription and identity model."
    },
    {
      q: "Can you review or fix an existing landing zone instead of building a new one?",
      a: "Yes. A landing zone review applies the same checklist — account structure, network segmentation, identity and guardrails — to what already exists, and identifies what to restructure."
    },
    {
      q: "How long does landing zone design take before migration can start?",
      a: "It depends on scope and current environment complexity — timing is confirmed as part of the migration requirement review, alongside the cost model and wave plan."
    }
  ];

  return (
    <>
      <SEO
        title="Cloud Landing Zone Design Services — Nowazone"
        description="Landing zone design — account structure, networking, identity and guardrails, built before workloads land. For AWS, Azure and Google Cloud."
        canonical="/solutions/cloud-architecture-landing-zone"
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
            Cloud Architecture → Landing Zone Design
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Landing Zone Design — The Foundation Before Workloads Land.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            For organizations migrating to or scaling in the cloud, a well-architected landing zone is 5x cheaper to build right the first time than to retrofit onto sprawl later.
          </p>

          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold shadow-lg"
          >
            Request Landing Zone Review
          </button>
        </div>
      </section>

      {/* WHAT WE DESIGN */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Core Modules
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content dark:text-white">What We Design in Every Landing Zone</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <Layers className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Multi-Account Structure</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Management accounts, core security hubs, shared services, and workload-isolated environments.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <Globe className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Network Topology</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Hub-and-spoke routing, transit gateways, direct connect/ExpressRoute, and egress firewalls.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <Lock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Zero-Trust Identity</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                SSO integration, least-privilege RBAC, privileged identity management (PIM), and MFA enforcement.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Policy Guardrails</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Automated policy baselines preventing public S3/storage buckets and unauthorized regions.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <Cpu className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">FinOps Tagging from Day 1</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Mandatory cost-allocation tags enforced by policy before any compute or database can launch.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <Layers className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Logging &amp; Audit</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Centralized SIEM ingestion, immutable storage audit logs, and CloudTrail/Activity Log routing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY THIS COMES BEFORE MIGRATION */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-base-content">
            Why We Build This Before Workloads Move
          </h2>
          <p className="text-base text-base-content/70 leading-relaxed max-w-2xl mx-auto">
            A landing zone retrofitted after workloads have already landed means migrating accounts and re-architecting network boundaries while production traffic is live — far riskier and more expensive than getting it right before anything moves.
          </p>
        </div>
      </section>

      {/* SECTION 4: CROSS-LINK */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto text-center border border-base-300 dark:border-white/15 rounded-xl p-8 md:p-10 bg-base-100 dark:bg-navy-950/60 shadow-sm relative">
          <CornerMarkers />
          <h2 className="text-xl md:text-2xl font-bold font-heading text-base-content dark:text-white mb-3">
            Where This Connects to Migration Planning
          </h2>
          <p className="text-sm md:text-base text-base-content/70 dark:text-white/70 mb-5 leading-relaxed">
            Landing zone design is informed directly by the cost model and wave plan built during migration strategy.
          </p>
          <Link
            to="/solutions/cloud-migration-strategy-planning"
            className="inline-flex items-center gap-1.5 font-bold font-heading text-sm text-primary hover:underline"
          >
            See Migration Strategy &amp; Planning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content dark:text-white">Landing Zone Questions</h2>

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
