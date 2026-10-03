import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { submitAssessment } from '../../api/forms';
import { CheckCircle2, ArrowRight, ShieldAlert, Layers, Activity, Server, Clock, AlertCircle, Loader2 } from 'lucide-react';

export const CloudMigrationPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    phone: '',
    currentEnv: 'On-Premises/Data Center',
    targetPlatform: 'Azure',
    vmCount: '25–100',
    criticalApps: '5',
    timeframe: '3–6 months',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await submitAssessment({
        name: formData.fullName.trim(),
        email: formData.workEmail.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim() || undefined,
        platform: formData.targetPlatform,
        spend: `${formData.vmCount} VMs`,
        model: 'Cloud Migration Requirement Review',
        message: `Current: ${formData.currentEnv}. Target: ${formData.targetPlatform}. Apps: ${formData.criticalApps}. Timeframe: ${formData.timeframe}. Notes: ${formData.notes}`.trim(),
        page: '/solutions/cloud-migration',
      });
      if (res.status === 'success') {
        setFormSubmitted(true);
      } else {
        setErrorMsg(res.message || 'Unable to submit migration requirements. Please check your information and try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };


  const faqs = [
    {
      q: "How is a migration cost estimate different from a general cloud cost assessment?",
      a: "A general cost assessment looks at what you're already running. A migration cost estimate models a future state that doesn't exist yet — target-state compute and storage, egress during and after the move, temporary parallel-environment costs during cutover, and licensing changes — before you commit to an architecture."
    },
    {
      q: "Do you handle execution, or just plan the migration?",
      a: "Both. Strategy and planning produce the cost model and wave plan; execution and cutover carry that plan through to go-live, with defined rollback points at every wave."
    },
    {
      q: "What if we're only partially moving to the cloud?",
      a: "Hybrid and partial migrations are scoped the same way — discovery, wave planning and cost modeling account for what stays on-prem and what moves, including the ongoing cost of running both."
    },
    {
      q: "Is the requirement review free?",
      a: "No — migration scoping requires more depth than our free Cost X-Ray Assessment."
    },
    {
      q: "What happens after the migration is done?",
      a: "Most migration engagements end at go-live. Ours transitions into ongoing operations through our Managed Service pillar — Cloud Ops support and dedicated engineers for what happens after cutover."
    }
  ];

  return (
    <>
      <SEO
        title="Cloud Migration Services | FinOps-Planned Execution — Nowazone"
        description="Cloud migration services planned around cost, not just execution. FinOps-first discovery, zero-downtime cutover waves, and post-migration operations."
        canonical="/solutions/cloud-migration"
      />

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Cloud Migration Services
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Cloud Migration Services — Planned Around Cost, Not Just Execution.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Most migration partners hand you the keys and leave. Nowazone plans the cost model before the architecture, executes in defined waves, and transitions you smoothly into managed operations after go-live.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-10">
            <a href="#requirement-form" className="btn btn-primary text-white font-heading font-bold shadow-lg relative group">
              <CornerMarkers />
              Get a Migration Requirement Review
            </a>
            <button
              type="button"
              onClick={openAssessmentModal}
              className="btn btn-outline border-base-300 font-heading font-semibold"
            >
              Talk to a FinOps Expert
            </button>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-base-300 bg-base-200/50">
              FinOps-first cost estimation
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-base-300 bg-base-200/50">
              Zero-downtime cutover approach
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-base-300 bg-base-200/50">
              Post-migration support included
            </span>
          </div>
        </div>
      </section>

      {/* RISKS */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              The Real Risk
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-base-content dark:text-white">
              The Migration Isn't the Hard Part. What Happens After Is.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-lg mb-3 text-base-content dark:text-white">Cost Surprises After Go-Live</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Most migration plans estimate basic VM and disk tiers. Few estimate egress, idle headroom, or the cost of running parallel environments during cutover windows.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-lg mb-3 text-base-content dark:text-white">No Ownership After Handoff</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Systems integrators get paid when servers are moved. Rightsizing and financial governance become someone else's problem — usually no one's.
              </p>
            </div>
            <div className="p-6 bg-base-100 dark:bg-navy-950 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-heading font-bold text-lg mb-3 text-base-content dark:text-white">Hybrid Complexity Trap</h3>
              <p className="text-xs text-base-content/75 dark:text-slate-300 leading-relaxed">
                Identity, active directory, latency tolerances, and legacy dependencies that worked on-prem don't automatically translate to the cloud without rework.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 1: STRATEGY & PLANNING */}
      <section id="strategy-planning" className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-2 block font-heading">
              Phase One
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4 text-base-content leading-snug">
              Strategy &amp; Planning
            </h2>
            <p className="text-sm md:text-base text-base-content/70 leading-relaxed mb-6">
              Discovery, FinOps-first cost estimation, and migration wave planning — modeled before a single workload moves.
            </p>
            <Link
              to="/solutions/cloud-migration-strategy-planning"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline font-heading"
            >
              See the full strategy &amp; planning process <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3 bg-base-200/50 p-6 rounded-xl border border-base-300 relative">
            <CornerMarkers />
            <div className="p-3 bg-base-100 rounded-lg flex items-center gap-3">
              <span className="text-primary font-bold font-heading">01</span>
              <span className="text-xs md:text-sm font-medium">Discovery &amp; dependency inventory of servers, apps &amp; DBs</span>
            </div>
            <div className="p-3 bg-base-100 rounded-lg flex items-center gap-3">
              <span className="text-primary font-bold font-heading">02</span>
              <span className="text-xs md:text-sm font-medium">FinOps cost modeling before target architecture is signed off</span>
            </div>
            <div className="p-3 bg-base-100 rounded-lg flex items-center gap-3">
              <span className="text-primary font-bold font-heading">03</span>
              <span className="text-xs md:text-sm font-medium">Wave sequencing by criticality, blast radius, and network affinity</span>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 2: EXECUTION & CUTOVER */}
      <section id="execution-cutover" className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-3 bg-base-100 dark:bg-navy-950 p-6 rounded-xl border border-base-300 dark:border-white/10 relative shadow-sm">
            <CornerMarkers />
            <div className="p-3 bg-base-200/60 dark:bg-navy-900 rounded-lg flex items-center gap-3">
              <span className="text-primary dark:text-blue-400 font-bold font-heading">01</span>
              <span className="text-xs md:text-sm font-medium text-base-content/85 dark:text-slate-200">Each wave migrated, verified, and stabilized in turn</span>
            </div>
            <div className="p-3 bg-base-200/60 dark:bg-navy-900 rounded-lg flex items-center gap-3">
              <span className="text-primary dark:text-blue-400 font-bold font-heading">02</span>
              <span className="text-xs md:text-sm font-medium text-base-content/85 dark:text-slate-200">Pre-communicated maintenance windows with dry-run drills</span>
            </div>
            <div className="p-3 bg-base-200/60 dark:bg-navy-900 rounded-lg flex items-center gap-3">
              <span className="text-primary dark:text-blue-400 font-bold font-heading">03</span>
              <span className="text-xs md:text-sm font-medium text-base-content/85 dark:text-slate-200">Hard rollback criteria established before execution begins</span>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <span className="text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold mb-2 block font-heading">
              Phase Two
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4 text-base-content dark:text-white leading-snug">
              Execution &amp; Cutover
            </h2>
            <p className="text-sm md:text-base text-base-content/75 dark:text-slate-300 leading-relaxed mb-6">
              Phased wave execution with validated rollback points — eliminating guesswork and minimizing production downtime.
            </p>
            <Link
              to="/solutions/cloud-migration-execution-cutover"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-blue-400 hover:underline font-heading"
            >
              See the full execution &amp; cutover process <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BEYOND THE MOVE */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2 font-heading">
              Beyond the Move
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-white">
              Migration Is the Starting Point, Not the Whole Relationship
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/solutions/cloud-architecture"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 hover:border-primary/50 transition-all block shadow-sm"
            >
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Cloud Architecture →</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Landing zone design, migration architecture patterns, and your cloud operating model.
              </p>
            </Link>
            <Link
              to="/solutions/managed-service"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 hover:border-primary/50 transition-all block shadow-sm"
            >
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Managed Service →</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                AMC support tiers and dedicated engineers for what happens after cutover.
              </p>
            </Link>
            <Link
              to="/finops"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 hover:border-primary/50 transition-all block shadow-sm"
            >
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">FinOps as a Service →</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Ongoing cost optimization once you've landed.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* REQUIREMENT FORM */}
      <section id="requirement-form" className="bg-base-100 py-16 px-6 border-b border-base-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
              Scoped Architecture Review
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading">Tell Us About Your Environment.</h2>
            <p className="text-sm text-base-content/70 mt-2 max-w-xl mx-auto">
              Migration scoping requires environment details. Submit your parameters to start a formal technical review.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 p-8 rounded-2xl text-center max-w-md mx-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold font-heading mb-2">Requirements Received</h3>
              <p className="text-sm text-base-content/70 mb-6">
                Our Cloud Migration Lead will review your server inventory and follow up to schedule a technical discovery call.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setErrorMsg(null);
                  setFormData({
                    fullName: '',
                    workEmail: '',
                    company: '',
                    phone: '',
                    currentEnv: 'On-Premises/Data Center',
                    targetPlatform: 'Azure',
                    vmCount: '25–100',
                    criticalApps: '5',
                    timeframe: '3–6 months',
                    notes: '',
                  });
                }}
                className="px-6 py-2.5 rounded-lg border border-base-300 hover:bg-base-200 text-xs font-semibold"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-base-200/50 p-8 rounded-2xl border border-base-300 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <CornerMarkers />
              {errorMsg && (
                <div className="md:col-span-2 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input input-bordered w-full font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="input input-bordered w-full font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="input input-bordered w-full font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input input-bordered w-full font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Current Environment
                </label>
                <select
                  className="select select-bordered w-full font-body"
                  value={formData.currentEnv}
                  onChange={(e) => setFormData({ ...formData, currentEnv: e.target.value })}
                >
                  <option>On-Premises/Data Center</option>
                  <option>Virtualized (VMware/Hyper-V)</option>
                  <option>Single Cloud already</option>
                  <option>Multi-Cloud</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Target Cloud Platform
                </label>
                <select
                  className="select select-bordered w-full font-body"
                  value={formData.targetPlatform}
                  onChange={(e) => setFormData({ ...formData, targetPlatform: e.target.value })}
                >
                  <option>Microsoft Azure</option>
                  <option>AWS</option>
                  <option>Google Cloud</option>
                  <option>Not decided yet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Approx. Number of VMs / Servers
                </label>
                <select
                  className="select select-bordered w-full font-body"
                  value={formData.vmCount}
                  onChange={(e) => setFormData({ ...formData, vmCount: e.target.value })}
                >
                  <option>Under 25</option>
                  <option>25–100</option>
                  <option>100–500</option>
                  <option>500+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Critical Workload Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.criticalApps}
                  onChange={(e) => setFormData({ ...formData, criticalApps: e.target.value })}
                  className="input input-bordered w-full font-body"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Target Migration Timeframe
                </label>
                <select
                  className="select select-bordered w-full font-body"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                >
                  <option>Under 3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>Exploring options</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                  Project Notes &amp; Special Constraints (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="textarea textarea-bordered w-full font-body"
                  placeholder="Compliance mandates, databases (Oracle, SQL Server, Postgres), regulatory data residency..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary text-white md:col-span-2 font-heading font-bold shadow-lg py-3 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Requirements...</span>
                  </>
                ) : (
                  'Submit Migration Requirements'
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">Migration Questions, Answered.</h2>

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

      {/* Closing CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-14 px-6 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-[#f2f2f3] mb-4">
            Plan the Migration Around the Number You'll Actually Land On.
          </h2>
          <a
            href="#requirement-form"
            className="btn btn-primary text-white font-heading font-bold shadow-lg px-8 py-3.5 inline-flex items-center"
          >
            Get a Migration Requirement Review
          </a>
        </div>
      </section>
    </>
  );
};
