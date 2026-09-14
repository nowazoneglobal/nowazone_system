import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { submitContact } from '../api/forms';

export const PartnerProgramPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    workEmail: '',
    phone: '',
    partnerType: 'Cloud Solution Provider (CSP)',
    preferredTrack: 'Subcontract / Delivery Partner',
    cloudFocus: 'Multi-Cloud',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact({
        fullName: formData.contactName,
        workEmail: formData.workEmail,
        company: formData.companyName,
        phone: formData.phone,
        serviceInterest: `Partner Application: ${formData.partnerType} [${formData.preferredTrack}] (${formData.cloudFocus})`,
        message: formData.notes
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Partner Program | Subcontract & White-Label FinOps Delivery — Nowazone"
        description="Nowazone's Partner Program for CSPs, MSPs and IT service companies — subcontract certified FinOps capacity or offer FinOps as a Service fully white-labeled under your own brand."
        canonical="https://www.nowazone.com/partner-program"
      />

      {/* HERO */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-center transition-colors">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            Partner Program
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight tracking-tight">
            Certified FinOps Delivery Capacity, Under NDA or Under Your Brand.
          </h1>
          <p className="text-base sm:text-lg text-base-content/70 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Nowazone works behind CSPs, MSPs and IT service companies as their FinOps subcontractor — you stay customer-facing and set the terms, or we go fully white-label and your customer never knows we exist. Either way, you get certified capacity across every major cloud without building a practice yourself.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#apply"
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Apply to Become a Partner
            </a>
            <a
              href="mailto:partners@nowazone.com"
              className="inline-flex items-center px-6 py-3.5 border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm rounded transition-all"
            >
              Talk to Our Partnerships Team
            </a>
          </div>
        </div>
      </section>

      {/* TWO TRACKS */}
      <section id="tracks" className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-2">
              Two Ways to Work with Us
            </h2>
            <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/60">
              Pick the level of visibility that fits how you sell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-8 relative shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary dark:text-blue-400 block mb-2">Track 1</span>
              <h3 className="font-bold text-2xl text-base-content dark:text-white mb-3">Subcontract / Delivery Partner</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed mb-6">
                Best for CSPs and MSPs who already run a FinOps or cost-optimization practice and need extra certified capacity — small firms up to enterprise scale, across every major cloud.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-base-content/80 dark:text-white/100 border-t border-base-200 dark:border-white/10 pt-5">
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>NDA-governed subcontract terms, set by you</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>Overflow or specialist capacity across AWS, Azure, GCP, OCI & Kubernetes</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>Scoped per engagement — one project or an ongoing supply arrangement</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>You control the customer relationship and commercial terms throughout</span>
                </div>
              </div>
            </div>

            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-8 relative shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary dark:text-blue-400 block mb-2">Track 2</span>
              <h3 className="font-bold text-2xl text-base-content dark:text-white mb-3">White-Label Partner</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed mb-6">
                Best for cloud service providers and product companies who want to offer FinOps as a Service under their own name. Nowazone works entirely behind your brand — your customer never knows we exist.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-base-content/80 dark:text-white/100 border-t border-base-200 dark:border-white/10 pt-5">
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>Fully protected identity — no co-branding, no direct customer contact</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>Deliverables formatted with your logo, typography and corporate identity</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>White-label live dashboards and client-ready slide decks</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="text-primary dark:text-blue-400 font-bold">+</span>
                  <span>Expand into FinOps with zero practice buildout overhead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR STEPS FROM APPLICATION TO DELIVERY */}
      <section id="how" className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Four steps from application to delivery.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <span className="font-bold text-xs text-primary block mb-2">01</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Apply & sign NDA</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Tell us your track, your platforms, and your customer base. NDA first, always.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <span className="font-bold text-xs text-primary block mb-2">02</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Define terms & scope</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Confidentiality, branding rules, and commercial terms agreed before any delivery begins.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <span className="font-bold text-xs text-primary block mb-2">03</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Onboard the first account</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                We run delivery on your first customer or engagement, under your process or ours.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <span className="font-bold text-xs text-primary block mb-2">04</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Scale across your book</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Once the model is proven, we extend delivery across as many accounts as you bring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH NOWAZONE */}
      <section id="why" className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-2">
              Why partner with Nowazone
            </h2>
            <p className="text-sm text-base-content/70 dark:text-white/70">
              A FinOps practice you don't have to build, staff or maintain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">New revenue, no bench risk</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Offer FinOps under your name without hiring, training or carrying idle headcount between engagements.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Certified, proven delivery</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                FinOps Foundation-aligned practitioners and cloud architects run every engagement, with 15–42% savings committed in the SOW.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Fast to market</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Sign, scope and onboard your first account in weeks, not the months it takes to build an internal practice.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">NDA-protected from day one</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Confidentiality and read-only access govern every engagement — your customer relationships and data stay yours.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Every cloud, one team</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                AWS, Azure, Google Cloud, Oracle, Alibaba, Kubernetes and AI/LLM workloads — no need to source specialists per platform.
              </p>
            </div>
            <div className="relative border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">No exclusivity, no minimums</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Start with one account and scale at your own pace — nothing locks you in before you've seen results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section id="who" className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-2">
              Who this is for
            </h2>
            <p className="text-sm text-base-content/75 dark:text-white/70">
              Built for service, solutions and platform companies of every size.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Small &amp; Mid-Size CSPs</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Add a FinOps offering without hiring or training a team.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Managed Service Providers</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Extend existing cloud ops with certified FinOps capacity on demand.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">IT Service &amp; Consulting Firms</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Add cloud cost governance to your service catalog without a new practice line.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Systems Integrators &amp; Solutions Providers</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Fold cost optimization into the cloud solutions you already deliver.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">PaaS, ISV &amp; SaaS Platforms</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Offer cloud cost governance to your customers as a value-add, delivered by us.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Enterprise Cloud Resellers</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Bring FinOps depth to large accounts without building an internal practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JUST REFER, INSTEAD */}
      <section id="referral" className="bg-base-100 py-10 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-60 flex-none text-center md:text-left">
            <span className="text-[11px] uppercase tracking-wider text-primary font-bold block mb-1">
              Not ready to deliver?
            </span>
            <h3 className="font-semibold text-xl text-base-content dark:text-white">
              Just refer, instead.
            </h3>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="font-bold text-sm text-primary block mb-1">1. Refer</span>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Introduce us to your client, or let us know who to reach out to.
              </p>
            </div>
            <div>
              <span className="font-bold text-sm text-primary block mb-1">2. We Deliver</span>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Nowazone runs the full engagement, start to finish.
              </p>
            </div>
            <div>
              <span className="font-bold text-sm text-primary block mb-1">3. You Get Paid</span>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                A fixed monthly commission, for as long as the client stays — not a one-time fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-center text-base-content dark:text-white mb-2">
            Partner FAQ
          </h2>
          <p className="text-sm text-base-content/60 dark:text-white/60 text-center mb-8">
            Questions we get from partners.
          </p>
          <div className="divide-y divide-base-300 dark:divide-white/15">
            {[
              { q: "Will my customers know Nowazone is involved?", a: "Depends on the track. As a Subcontract/Delivery partner, you control the customer relationship and can position us as your backend team under NDA. As a White-Label partner, no — we work entirely behind your brand, with no co-branding and no direct customer contact." },
              { q: "What's the difference between the two partner tracks?", a: "Subcontract/Delivery gives you overflow or specialist FinOps capacity while you stay customer-facing and set the commercial terms. White-Label goes further: Nowazone runs delivery end-to-end under your name, and your customer never interacts with us directly." },
              { q: "Which cloud platforms do you support as a partner?", a: "AWS, Azure, Google Cloud, Oracle, Alibaba Cloud, Kubernetes and AI/LLM workloads — across both partner tracks." },
              { q: "How is the partnership commercially structured?", a: "Subcontract terms are NDA-governed and set by you, scoped per engagement — a single project or an ongoing supply arrangement. Exact terms are worked out during onboarding." },
              { q: "How long does partner onboarding take?", a: "Weeks, not months — your first account can typically be signed, scoped and onboarded within weeks rather than the time it takes to build an internal practice." },
              { q: "Is there a minimum commitment or exclusivity requirement?", a: "No. Start with one account and scale at your own pace — there's no exclusivity or minimum volume required before you've seen results." },
              { q: "Do you provide sales enablement and co-selling support?", a: "We'll walk through what's available for your track during the application conversation — this is worked out per partner rather than a fixed package." },
              { q: "What happens if a delivery issue comes up mid-engagement?", a: "You have a dedicated partnerships contact throughout the engagement, not a generic support inbox — issues get raised and resolved directly with that contact." }
            ].map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-semibold text-sm sm:text-base text-base-content dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 mt-3 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Apply Now
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
              Apply to Become a Partner
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">
              Submit your company details. Our partnerships team will reach out within 1 business day.
            </p>
          </div>

          {submitted ? (
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"></path></svg>
              </div>
              <h3 className="font-bold text-xl text-base-content dark:text-white mb-2">Partner Application Received</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">
                Our channel lead will review your application and schedule a partnership onboarding call.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-navy-light rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="partner@company.com"
                    value={formData.workEmail}
                    onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Primary Business Model</label>
                  <select
                    value={formData.partnerType}
                    onChange={e => setFormData({ ...formData, partnerType: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  >
                    <option>Cloud Solution Provider (CSP)</option>
                    <option>Managed Service Provider (MSP)</option>
                    <option>System Integrator (SI)</option>
                    <option>Consultancy / Advisory</option>
                    <option>Software / SaaS Vendor</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Preferred Track</label>
                  <select
                    value={formData.preferredTrack}
                    onChange={e => setFormData({ ...formData, preferredTrack: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  >
                    <option>Subcontract / Delivery Partner</option>
                    <option>White-Label Partner</option>
                    <option>Both / Case-by-Case</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Cloud Focus</label>
                <select
                  value={formData.cloudFocus}
                  onChange={e => setFormData({ ...formData, cloudFocus: e.target.value })}
                  className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                >
                  <option>Multi-Cloud (AWS + Azure + Google Cloud)</option>
                  <option>Microsoft Azure & M365</option>
                  <option>Amazon Web Services (AWS)</option>
                  <option>Google Cloud & Workspace</option>
                  <option>Oracle Cloud Infrastructure (OCI)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your client base, current capacity needs, or questions..."
                  className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded p-3 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-primary text-white font-bold text-xs sm:text-sm rounded hover:bg-primary-focus transition-all disabled:opacity-50"
              >
                {submitting ? 'Submitting Application...' : 'Submit Partner Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
export default PartnerProgramPage;
