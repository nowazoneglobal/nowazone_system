import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { cloudMigrationCutoverSchema } from '../../data/seoSchemas';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Clock, RefreshCw } from 'lucide-react';

export const CloudMigrationCutoverPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "How do you minimize downtime during cutover?",
      a: "Defined cutover windows communicated in advance, data synchronization validation before the switch, and rollback criteria set before execution begins — so downtime is a planned window, not an open-ended risk."
    },
    {
      q: "What happens if something doesn't work after cutover?",
      a: "If something doesn't validate against the criteria set before execution, we roll back to the previous state rather than pushing forward and hoping — the rollback point exists for exactly that scenario."
    },
    {
      q: "How long does the post-cutover stabilization period last?",
      a: "Immediate post-cutover monitoring and validation runs through the first 30 days after go-live, followed by a defined handoff into ongoing operations."
    }
  ];

  return (
    <>
      <SEO
        title="Cloud Migration Execution & Cutover Services — Nowazone"
        description="Cloud migration execution and cutover — phased waves, defined rollback points, and minimized downtime windows."
        canonical="/solutions/cloud-migration-execution-cutover"
        jsonLd={cloudMigrationCutoverSchema}
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
            Phase Two · Execution &amp; Cutover
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Cloud Migration Execution &amp; Cutover — Phased, With Rollback at Every Wave.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Execution strictly follows the wave plan built during strategy — not a single high-risk, "big bang" cutover weekend. Every wave has pre-validated rollback criteria.
          </p>

          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold shadow-lg"
          >
            Schedule Cutover Planning Call
          </button>
        </div>
      </section>

      {/* SECTION 2: HOW WE EXECUTE EACH WAVE */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-14 px-6 border-b border-base-300 dark:border-white/10 text-center transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-base-content dark:text-white">
            How We Execute Each Wave
          </h2>
          <p className="text-sm md:text-base text-base-content/75 dark:text-slate-300 leading-relaxed">
            Execution follows the wave plan directly — each wave has its own staging validation, cutover execution, rollback point and stabilization window before the next wave begins.
          </p>
        </div>
      </section>

      {/* SECTION 3: MINIMIZING DOWNTIME DURING CUTOVER */}
      <section className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Minimizing Production Risk
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content">
              Minimizing Downtime During Cutover
            </h2>
            <p className="text-sm md:text-base text-base-content/70 max-w-2xl mx-auto mt-3">
              Defined cutover windows, data synchronization validation, and a rollback point at every wave — if something doesn't validate, we roll back, we don't push forward and hope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <CheckCircle2 className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Pre-Cutover Validation Checklist</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-400 leading-relaxed">
                Replication parity checks, data checksum validation, network firewall rule confirmation, and TLS certificate bindings.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <Clock className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Defined Downtime Windows, Communicated in Advance</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-400 leading-relaxed">
                Communicated with business stakeholders with real-time incident war-room status updates throughout execution.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <RefreshCw className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Rollback Criteria Set Before Execution Begins</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-400 leading-relaxed">
                If data latency, application response, or integration endpoints exceed agreed error budgets, rollback triggers automatically.
              </p>
            </div>
            <div className="p-6 bg-base-200/50 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <ShieldCheck className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-heading font-bold text-base mb-2 text-base-content dark:text-white">Post-Cutover Validation &amp; Stabilization Period</h3>
              <p className="text-xs text-base-content/70 dark:text-slate-400 leading-relaxed">
                Embedded cloud engineers monitoring log streams, CPU spikes, and user sessions through the stabilization window.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FIRST 30 DAYS */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto text-center border border-base-300 dark:border-white/15 rounded-xl p-8 md:p-10 bg-base-100 dark:bg-navy-950/60 shadow-sm relative">
          <CornerMarkers />
          <h2 className="text-xl md:text-2xl font-bold font-heading text-base-content dark:text-white mb-3">
            The First 30 Days After Go-Live
          </h2>
          <p className="text-sm md:text-base text-base-content/70 dark:text-white/70 mb-5 leading-relaxed">
            Immediate post-cutover monitoring and validation, followed by a defined handoff into ongoing operations — this is where most migration engagements end. Ours transitions into managed support instead.
          </p>
          <Link
            to="/solutions/managed-service"
            className="inline-flex items-center gap-1.5 font-bold font-heading text-sm text-primary hover:underline"
          >
            See Managed Service support tiers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">Execution &amp; Cutover Questions</h2>

          <div className="divide-y divide-base-300">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-heading font-semibold text-base cursor-pointer flex justify-between items-center text-base-content">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-base-content/70 mt-3 leading-relaxed">{f.a}</p>
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
            className="inline-flex items-center gap-2 font-heading font-bold text-base md:text-lg text-primary dark:text-amber-400 hover:underline transition-colors"
          >
            Ready to scope your migration? <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

