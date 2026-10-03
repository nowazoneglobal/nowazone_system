import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { submitAppointment } from '../../api/forms';
import { AlertCircle } from 'lucide-react';

export const ManagedServicePage: React.FC = () => {
  const { openAssessment } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    supportNeed: 'Post-migration handoff',
    environmentSize: 'Under 25 servers/VMs'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await submitAppointment({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim() || undefined,
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '10:00',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        topic: `Managed Service: ${formData.supportNeed} (${formData.environmentSize})`,
        page: '/solutions/managed-service',
      });
      if (res.status === 'success') {
        setSubmitted(true);
      } else {
        setErrorMsg(res.message || 'Unable to submit appointment request. Please check your details and try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };


  const faqs = [
    {
      q: "Do we need to have migrated with Nowazone to use Managed Service?",
      a: "No — this support model works for any existing cloud environment, not only migrations we've delivered."
    },
    {
      q: "What's the difference between L1 and L2 support?",
      a: "L1 covers monitoring, first-response incident handling and routine patching. L2 adds performance tuning, cost optimization reviews and escalation ownership for complex incidents — see the Cloud Ops Support page for the full breakdown."
    },
    {
      q: "Can you staff a dedicated engineer in our specific time zone?",
      a: "Yes — staffing can be aligned to your time zone, fully remote alongside your in-house team, or 24/7 where the environment requires it. See the Dedicated Engineers page for staffing options."
    },
    {
      q: "How is Managed Service priced?",
      a: "Scoped to your environment during a support conversation — see Pricing for our standard engagement structure."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Managed Cloud Services | AMC Support & Dedicated Engineers — Nowazone"
        description="Managed cloud services — L1/L2 operational support and dedicated engineers, sized to your environment after migration or for ongoing cloud operations."
        canonical="/solutions/managed-service"
      />

      {/* SECTION 1: HERO */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold bg-teal-500/10 border border-teal-500/30 px-3.5 py-1.5 rounded-full mb-6">
            Managed Service
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-base-content dark:text-white mb-5 leading-tight">
            Managed Cloud Service — Support That Doesn't End When the Migration Does.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Most migration partners leave once cutover is done. Nowazone's Managed Service model picks up from there — monitoring, incident response, cost accountability and staffing sized to what you actually run, not a one-size retainer.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <a
              href="#support-conversation"
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Talk About Ongoing Support
            </a>
            <button
              type="button"
              onClick={openAssessment}
              className="border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm px-6 py-3.5 rounded transition-all"
            >
              Talk to a FinOps Expert
            </button>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1.5 rounded-full">
              L1/L2 support tiers
            </span>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1.5 rounded-full">
              Cost accountability built in
            </span>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1.5 rounded-full">
              Staffing aligned to your time zone
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY THIS EXISTS */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold block mb-3">
            The Gap
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
            The Gap Most Migration Engagements Leave Open
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-base-content/75 dark:text-white/70">
            Independent industry research consistently points to the same weak spot across the migration industry: post-migration optimization — FinOps, performance tuning, security hardening — is where most engagements under-deliver. The team that migrated you gets paid when migration is "done." Nowazone's model is built for what happens after, not just the move itself.
          </p>
        </div>
      </section>

      {/* SECTION 3: CLOUD OPS SUPPORT */}
      <section id="cloud-ops-support" className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold block mb-3">
              Tiered Support
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
              Cloud Ops Support — L1 &amp; L2
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 mb-6 leading-relaxed">
              Monitoring, incident response, patching, performance tuning and cost optimization reviews — sized to how critical your environment actually is.
            </p>
            <Link
              to="/solutions/managed-service-cloud-ops"
              className="inline-flex items-center gap-2 font-semibold text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              See the full L1/L2 support breakdown →
            </Link>
          </div>
          <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 items-start py-3 border-b border-base-300 dark:border-white/10">
              <span className="font-bold text-teal-600 dark:text-teal-400 flex-none text-lg">L1</span>
              <span className="text-sm text-base-content dark:text-white">Monitoring, first-response, routine patching</span>
            </div>
            <div className="flex gap-4 items-start py-3">
              <span className="font-bold text-teal-600 dark:text-teal-400 flex-none text-lg">L2</span>
              <span className="text-sm text-base-content dark:text-white">Performance tuning, cost reviews, escalation ownership</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DEDICATED ENGINEERS */}
      <section id="dedicated-engineers" className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <span className="text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold block mb-3">
              Named, Not Rotating
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
              Dedicated Engineers
            </h2>
            <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 mb-6 leading-relaxed">
              A named engineer or team assigned to your environment — staffed to your time zone, or fully remote, including 24/7 coverage where the environment requires it.
            </p>
            <Link
              to="/solutions/managed-service-dedicated-engineers"
              className="inline-flex items-center gap-2 font-semibold text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              See dedicated engineer staffing options →
            </Link>
          </div>
          <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 order-1 md:order-2 shadow-sm">
            <div className="flex gap-4 items-start py-3 border-b border-base-300 dark:border-white/10">
              <span className="font-bold text-teal-600 dark:text-teal-400 flex-none text-lg">01</span>
              <span className="text-sm text-base-content dark:text-white/90">Time-zone aligned staffing</span>
            </div>
            <div className="flex gap-4 items-start py-3 border-b border-base-300 dark:border-white/10">
              <span className="font-bold text-teal-600 dark:text-teal-400 flex-none text-lg">02</span>
              <span className="text-sm text-base-content dark:text-white/90">Fully remote, alongside your in-house team</span>
            </div>
            <div className="flex gap-4 items-start py-3">
              <span className="font-bold text-teal-600 dark:text-teal-400 flex-none text-lg">03</span>
              <span className="text-sm text-base-content dark:text-white/90">24/7 coverage where the environment requires it</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CROSS-SELL */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold block mb-2">
              Beyond Support
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Managed Service Connects to Migration and Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/solutions/cloud-migration"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 hover:border-primary transition-all group shadow-sm"
            >
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2 group-hover:text-primary transition-colors">
                Cloud Migration →
              </h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">
                The migration this support model picks up after.
              </p>
            </Link>
            <Link
              to="/solutions/cloud-architecture"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 hover:border-primary transition-all group shadow-sm"
            >
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2 group-hover:text-primary transition-colors">
                Cloud Architecture →
              </h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">
                See the operating model this support tier actually runs day-to-day.
              </p>
            </Link>
            <Link
              to="/finops"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 hover:border-primary transition-all group shadow-sm"
            >
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2 group-hover:text-primary transition-colors">
                FinOps as a Service →
              </h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">
                The ongoing cost discipline behind every support tier.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: TALK ABOUT ONGOING SUPPORT */}
      <section id="support-conversation" className="bg-base-200/50 dark:bg-[#0a1830] py-16 px-6 sm:px-10 text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs tracking-widest uppercase text-primary dark:text-teal-400 font-bold block mb-2">
              Ongoing Support
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
              Talk About Ongoing Support
            </h2>
            <p className="text-sm sm:text-base text-base-content/70 dark:text-white/60 max-w-xl mx-auto">
              Whether you're finishing a migration or just want better-managed day-to-day cloud operations, tell us what you're running and we'll recommend a support tier.
            </p>
          </div>

          {submitted ? (
            <div className="bg-base-100 dark:bg-navy border border-base-300 dark:border-white/10 rounded-2xl p-10 text-center shadow-xl">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"></path></svg>
              </div>
              <h3 className="font-semibold text-xl text-base-content dark:text-white mb-2">Request Received.</h3>
              <p className="text-sm text-base-content/70 dark:text-white/70 mb-6">A support specialist will follow up shortly to recommend the right tier.</p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setErrorMsg(null);
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    phone: '',
                    supportNeed: 'Post-migration handoff',
                    environmentSize: 'Under 25 servers/VMs'
                  });
                }}
                className="px-6 py-2 rounded border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-xs font-semibold"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-base-100 dark:bg-navy border border-base-300 dark:border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-xl">
              {errorMsg && (
                <div className="sm:col-span-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <div>
                <label className="text-xs tracking-wider uppercase text-base-content/70 dark:text-white/60 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-base-content/70 dark:text-white/60 block mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-base-content/70 dark:text-white/60 block mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-base-content/70 dark:text-white/60 block mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm focus:border-primary outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs tracking-wider uppercase text-base-content/70 dark:text-white/60 block mb-1">Current Support Need</label>
                <select
                  value={formData.supportNeed}
                  onChange={e => setFormData({ ...formData, supportNeed: e.target.value })}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm focus:border-primary outline-none [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                >
                  <option>Post-migration handoff</option>
                  <option>Ongoing L1/L2 support</option>
                  <option>Dedicated engineer staffing</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs tracking-wider uppercase text-base-content/70 dark:text-white/60 block mb-1">Approximate Environment Size</label>
                <select
                  value={formData.environmentSize}
                  onChange={e => setFormData({ ...formData, environmentSize: e.target.value })}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm focus:border-primary outline-none [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                >
                  <option>Under 25 servers/VMs</option>
                  <option>25–100</option>
                  <option>100–500</option>
                  <option>500+</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="sm:col-span-2 relative py-3.5 bg-primary text-white font-bold text-sm rounded transition-all hover:bg-primary-focus disabled:opacity-50 mt-2"
              >
                <CornerMarkers />
                {submitting ? 'Submitting...' : 'Request a Support Conversation'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section id="faq" className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-teal-600 dark:text-teal-400 font-bold block mb-3">
            Common Questions
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-8">
            Managed Service Questions, Answered
          </h2>
          <div className="divide-y divide-base-300 dark:divide-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-semibold text-base text-base-content dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-sm text-base-content/75 dark:text-white/70 mt-3 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOSING CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-14 px-6 sm:px-10 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl mb-6 text-base-content dark:text-white">
            Support That's Still There After Go-Live.
          </h2>
          <a
            href="#support-conversation"
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
          >
            <CornerMarkers />
            Talk About Ongoing Support
          </a>
        </div>
      </section>
    </div>
  );
};
export default ManagedServicePage;
