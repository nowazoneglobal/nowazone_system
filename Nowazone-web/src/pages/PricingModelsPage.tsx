import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { useModal } from '../context/ModalContext';
import { submitContact } from '../api/forms';

export const PricingModelsPage: React.FC = () => {
  const { openAssessment } = useModal();
  const [activeTab, setActiveTab] = useState<'diagnose' | 'fix' | 'recurring'>('diagnose');
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    phone: '',
    engagementModel: 'Fixed Assessment',
    spendRange: '$50K–$250K',
    message: ''
  });
  const [emailError, setEmailError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateBusinessEmail = (email: string) => {
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !freeDomains.includes(domain);
  };

  const handleEmailChange = (val: string) => {
    setFormData({ ...formData, workEmail: val });
    if (val && !validateBusinessEmail(val)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBusinessEmail(formData.workEmail)) {
      setEmailError(true);
      return;
    }
    setSubmitting(true);
    try {
      await submitContact({
        fullName: formData.fullName,
        workEmail: formData.workEmail,
        company: formData.company,
        phone: formData.phone,
        serviceInterest: `Pricing Inquiry: ${formData.engagementModel} (${formData.spendRange})`,
        message: formData.message
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "Why don't you publish fixed dollar prices?",
      a: "Scope drives cost, not a rate card. A single-cloud, mid-market environment and a multi-cloud enterprise estate aren't the same job — a published number would either overcharge one or undersell the other. We publish ranges and confirm the exact number after the free Cost X-Ray."
    },
    {
      q: "Is the free assessment really free?",
      a: "Yes. No minimum spend, no qualification call required, no dollar figures disclosed upfront. A real analyst reviews your environment and hands you a category-by-category savings breakdown — yours to keep either way."
    },
    {
      q: "What exactly do we get in the Cost X-Ray?",
      a: "A discovery call, a full billing and architecture review, a savings opportunity breakdown by category — compute, storage, reservations, AI spend — and an executive summary you keep whether or not you engage us further."
    },
    {
      q: "Do you bill hourly?",
      a: "No. Every engagement is fixed once scoped and written into the SOW before work starts. No time-and-materials billing, no surprise invoices."
    },
    {
      q: "How is the savings commitment structured?",
      a: "A savings range — typically 15–42% depending on environment and current maturity — is agreed and written into the SOW before any work begins."
    },
    {
      q: "What's included in the Recurring / Managed FinOps price?",
      a: "Continuous monitoring across every cloud and AI platform, monthly savings tracking and governance reporting, ongoing rightsizing and commitment management, and direct access to your FinOps team. Retainers start from $1,500/month and scale with environment size."
    },
    {
      q: "Can pricing span multiple clouds or just one?",
      a: "Either. Engagements are scoped to whatever you run — a single cloud, a multi-cloud estate, or cloud plus AI/GPU spend — and priced accordingly."
    },
    {
      q: "How fast can we get a quote?",
      a: "Usually within a day or two of the free Cost X-Ray call, once we've seen enough of your environment to scope the engagement accurately."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Pricing & Engagement Models | Flat-Fee FinOps — Nowazone"
        description="Nowazone pricing — free Cost X-Ray assessment, fixed-scope diagnostics from $750, and flat-fee retainers from $1,500/mo. Never a percentage of your savings."
        canonical="/pricing-models"
      />

      {/* HERO */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            Pricing & Engagement Models
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight tracking-tight">
            Free to Find Out. Your Call on What Happens Next.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every engagement starts with a free assessment — no qualification, no dollar figures disclosed upfront, no expiry on the findings. See the savings opportunity by category, then choose Fixed, Retainer or Project on your own terms.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Free Cost X-Ray Assessment
            </button>
            <Link
              to="/how-we-work"
              className="inline-flex items-center px-6 py-3.5 border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm rounded transition-all"
            >
              See How It Works
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-xs font-semibold text-base-content/85 dark:text-white/105 border border-base-300 dark:border-white/20 rounded-full px-3.5 py-1.5 bg-base-200/50 dark:bg-white/5">
              No Hourly Billing
            </span>
            <span className="text-xs font-semibold text-base-content/85 dark:text-white/105 border border-base-300 dark:border-white/20 rounded-full px-3.5 py-1.5 bg-base-200/50 dark:bg-white/5">
              Read-Only Access
            </span>
            <span className="text-xs font-semibold text-base-content/85 dark:text-white/105 border border-base-300 dark:border-white/20 rounded-full px-3.5 py-1.5 bg-base-200/50 dark:bg-white/5">
              15–42% Savings Commitment
            </span>
          </div>
        </div>
      </section>

      {/* PATH SELECTOR */}
      <section className="bg-primary/5 py-12 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-semibold text-xl sm:text-2xl text-center text-base-content dark:text-white mb-6">
            Which Path Fits You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('diagnose')}
              className={`p-6 rounded-xl border text-left transition-all ${
                activeTab === 'diagnose'
                  ? 'border-primary bg-base-100 dark:bg-navy shadow-md'
                  : 'border-base-300 dark:border-white/10 bg-base-100/60 dark:bg-white/5 hover:border-primary/50'
              }`}
            >
              <span className="text-2xl block mb-2">🔍</span>
              <span className="font-semibold text-base text-base-content dark:text-white block mb-1">
                I don't know where the waste is yet
              </span>
              <span className="text-xs text-primary font-medium">Take me to Diagnose →</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fix')}
              className={`p-6 rounded-xl border text-left transition-all ${
                activeTab === 'fix'
                  ? 'border-primary bg-base-100 dark:bg-navy shadow-md'
                  : 'border-base-300 dark:border-white/10 bg-base-100/60 dark:bg-white/5 hover:border-primary/50'
              }`}
            >
              <span className="text-2xl block mb-2">🛠</span>
              <span className="font-semibold text-base text-base-content dark:text-white block mb-1">
                I know the problem, I need it fixed
              </span>
              <span className="text-xs text-primary font-medium">Take me to Fix →</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('recurring')}
              className={`p-6 rounded-xl border text-left transition-all ${
                activeTab === 'recurring'
                  ? 'border-primary bg-base-100 dark:bg-navy shadow-md'
                  : 'border-base-300 dark:border-white/10 bg-base-100/60 dark:bg-white/5 hover:border-primary/50'
              }`}
            >
              <span className="text-2xl block mb-2">🔁</span>
              <span className="font-semibold text-base text-base-content dark:text-white block mb-1">
                I want ongoing help, not a one-time project
              </span>
              <span className="text-xs text-primary font-medium">Take me to Recurring →</span>
            </button>
          </div>
        </div>
      </section>

      {/* STEP 1: COST X-RAY (ALWAYS FREE) */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
            Step 1 — Always Free
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
            The Cost X-Ray. Free, No Strings, for Anyone.
          </h2>
          <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 max-w-xl mx-auto mb-8">
            No minimum spend, no qualification call required. A real analyst reviews your environment and hands you a category-by-category savings breakdown.
          </p>

          <div className="border border-base-300 dark:border-white/10 bg-base-200/40 dark:bg-navy rounded-2xl p-8 text-left shadow-sm">
            <h3 className="font-bold text-lg text-base-content dark:text-white mb-4">Cost X-Ray Assessment</h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-base-content/85 dark:text-white/100 mb-6">
              <div>✓ Discovery call, on your schedule</div>
              <div>✓ Full billing and architecture review</div>
              <div>✓ Savings opportunity by category — compute, storage, reservations, AI spend</div>
              <div>✓ Executive summary, yours to keep either way</div>
            </div>
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-6 py-3 bg-primary text-white font-bold text-xs sm:text-sm rounded shadow hover:bg-primary-focus transition-all"
            >
              <CornerMarkers />
              Book Free Assessment
            </button>
          </div>
        </div>
      </section>

      {/* STEP 2: DIAGNOSE & FIX */}
      <section className="bg-base-200/50 dark:bg-navy-950 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">
              Step 2 — Transparent Scoped Pricing
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-2">
              Pick the Level of Help You Need
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70">
              Fixed-scope engagements with published price ranges — scoped tighter once we see your environment, but never a mystery.
            </p>
          </div>

          {/* DIAGNOSE */}
          <div className="mb-12">
            <h3 className="font-bold text-lg text-base-content dark:text-white mb-4">1. Diagnose</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base text-base-content dark:text-white">Cloud Cost Leak Review</h4>
                    <span className="text-xs text-base-content/65 dark:text-white/60 font-medium">3–5 days</span>
                  </div>
                  <div className="font-bold text-2xl text-primary mb-4">$750–$1,250*</div>
                  <div className="space-y-2 text-xs text-base-content/85 dark:text-white/100 mb-4">
                    <div>✓ Full billing review across cloud accounts</div>
                    <div>✓ Line-item leak detection (idle/orphaned/oversized)</div>
                    <div>✓ Documented findings report with dollar impact</div>
                    <div>✓ Prioritized quick-win recommendations</div>
                    <div className="text-base-content/40 dark:text-white/40">✗ Implementing the fixes</div>
                    <div className="text-base-content/40 dark:text-white/40">✗ Ongoing monitoring after delivery</div>
                  </div>
                </div>
                <span className="text-[11px] text-base-content/50 dark:text-white/50 italic border-t border-base-300 dark:border-white/10 pt-3">
                  *Assumes a single-cloud environment under ~200 resources.
                </span>
              </div>

              <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base text-base-content dark:text-white">Full FinOps Assessment</h4>
                    <span className="text-xs text-base-content/65 dark:text-white/60 font-medium">~10 days</span>
                  </div>
                  <div className="font-bold text-2xl text-primary mb-4">$2,000–$3,500*</div>
                  <div className="space-y-2 text-xs text-base-content/85 dark:text-white/100 mb-4">
                    <div>✓ Governance and tagging maturity review</div>
                    <div>✓ Unit economics and cost allocation analysis</div>
                    <div>✓ Benchmarked against FinOps Framework practices</div>
                    <div>✓ Roadmap with prioritized next steps</div>
                    <div className="text-base-content/40 dark:text-white/40">✗ Implementation of the roadmap</div>
                    <div className="text-base-content/40 dark:text-white/40">✗ Governance tooling setup</div>
                  </div>
                </div>
                <span className="text-[11px] text-base-content/50 dark:text-white/50 italic border-t border-base-300 dark:border-white/10 pt-3">
                  *Scope depends on account count and current tagging maturity.
                </span>
              </div>
            </div>
          </div>

          {/* FIX */}
          <div>
            <h3 className="font-bold text-lg text-base-content dark:text-white mb-4">2. Fix (Hands-On Implementation)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">AI Cost Optimization</h4>
                    <span className="text-xs text-base-content/65 dark:text-white/60 font-medium">1–2 wks</span>
                  </div>
                  <div className="font-bold text-xl text-primary mb-4">$1,500–$3,500*</div>
                  <div className="space-y-2 text-xs text-base-content/85 dark:text-white/100 mb-4">
                    <div>✓ Token & model-spend usage analysis</div>
                    <div>✓ GPU utilization & idle-capacity review</div>
                    <div>✓ Prompt/inference efficiency recommendations</div>
                    <div>✓ Cost-per-outcome benchmarking</div>
                  </div>
                </div>
                <span className="text-[11px] text-base-content/50 dark:text-white/50 italic border-t border-base-300 dark:border-white/10 pt-3">
                  *Scope depends on model counts.
                </span>
              </div>

              <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">Deep Cloud Optimization</h4>
                    <span className="text-xs text-base-content/65 dark:text-white/60 font-medium">2–3 wks</span>
                  </div>
                  <div className="font-bold text-xl text-primary mb-4">$3,500–$6,000*</div>
                  <div className="space-y-2 text-xs text-base-content/85 dark:text-white/100 mb-4">
                    <div>✓ Hands-on rightsizing compute & storage</div>
                    <div>✓ Reserved Instance/Savings Plan strategy</div>
                    <div>✓ Architecture fixes implemented</div>
                    <div>✓ Before/after savings validation</div>
                  </div>
                </div>
                <span className="text-[11px] text-base-content/50 dark:text-white/50 italic border-t border-base-300 dark:border-white/10 pt-3">
                  *Scales with account and resource count.
                </span>
              </div>

              <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">FinOps Implementation</h4>
                    <span className="text-xs text-base-content/65 dark:text-white/60 font-medium">3–6 wks</span>
                  </div>
                  <div className="font-bold text-xl text-primary mb-4">$3,000–$8,000*</div>
                  <div className="space-y-2 text-xs text-base-content/85 dark:text-white/100 mb-4">
                    <div>✓ Tagging & allocation structure</div>
                    <div>✓ Showback/chargeback reporting</div>
                    <div>✓ FinOps tooling configured & operating</div>
                    <div>✓ Governance guardrails enforced</div>
                  </div>
                </div>
                <span className="text-[11px] text-base-content/50 dark:text-white/50 italic border-t border-base-300 dark:border-white/10 pt-3">
                  *Scope depends on cost center counts.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3: RECURRING (FINOPS PARTNER) */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="bg-base-100 dark:bg-navy-light border border-base-300 dark:border-white/20 rounded-2xl p-8 sm:p-10 relative shadow-xl">
            <span className="absolute -top-3 left-8 bg-primary text-white font-bold text-[11px] tracking-wider uppercase px-3.5 py-1 rounded-full shadow">
              Recommended
            </span>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs uppercase tracking-wider text-primary font-bold">Best for Growing to Enterprise</span>
              <div className="text-right">
                <span className="font-bold text-3xl text-base-content dark:text-white">From $1,500*</span>
                <span className="text-xs text-base-content/60 dark:text-white/60">/mo</span>
              </div>
            </div>
            <h3 className="font-bold text-2xl text-base-content dark:text-white mb-2">FinOps Partner</h3>
            <p className="text-sm text-base-content/70 dark:text-white/70 mb-6 leading-relaxed">
              Your extended FinOps team, ongoing — monitoring, governance and savings tracking every month.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-base-content/80 dark:text-white/100 mb-8 border-y border-base-300 dark:border-white/10 py-6">
              <div>✓ Continuous monitoring across every cloud and AI platform</div>
              <div>✓ Monthly savings tracking and governance reporting</div>
              <div>✓ Ongoing rightsizing and commitment management</div>
              <div>✓ Direct access to your dedicated FinOps team</div>
              <div>✓ Scales with your environment — enterprise scope quoted separately</div>
              <div className="text-base-content/40 dark:text-white/40">✗ One-time implementation work (scoped separately under Fix)</div>
              <div className="text-base-content/40 dark:text-white/40">✗ Third-party tool or cloud provider fees</div>
            </div>

            <button
              type="button"
              onClick={openAssessment}
              className="w-full py-3.5 bg-primary text-white font-bold text-sm rounded hover:bg-primary/90 transition-all text-center shadow"
            >
              Talk to a FinOps Expert
            </button>
            <p className="text-[11px] text-base-content/50 dark:text-white/40 text-center mt-3">
              *Starting price for a single-cloud, mid-market environment. Multi-cloud or enterprise scope quoted after the free assessment.
            </p>
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="bg-base-100 dark:bg-[#0a1830] py-10 px-6 sm:px-10 text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <span className="block font-bold text-3xl text-emerald-500 dark:text-emerald-400 mb-1">15–42%</span>
            <span className="text-xs text-base-content/60 dark:text-white/60">savings committed in the SOW, before work starts</span>
          </div>
          <div>
            <span className="block font-bold text-3xl text-emerald-500 dark:text-emerald-400 mb-1">0%</span>
            <span className="text-xs text-base-content/60 dark:text-white/60">of engagements billed hourly</span>
          </div>
          <div>
            <span className="block font-bold text-3xl text-emerald-500 dark:text-emerald-400 mb-1">100%</span>
            <span className="text-xs text-base-content/60 dark:text-white/60">free, no-obligation assessments</span>
          </div>
        </div>
      </section>

      {/* WHY WE QUOTE INSTEAD OF PUBLISHING A PRICE LIST */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-center text-base-content dark:text-white mb-8">
            Why We Quote Instead of Publishing a Price List.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-base-200/50 dark:bg-navy border border-base-300 dark:border-white/10 rounded-xl p-6 sm:p-7 flex flex-col gap-3 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg text-base-content dark:text-white">
                Scope Drives Cost, Not a Rate Card
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                A single-cloud, mid-market environment and a multi-cloud enterprise estate aren't the same job — a published number would either overcharge one or undersell the other.
              </p>
            </div>
            <div className="bg-base-200/50 dark:bg-navy border border-base-300 dark:border-white/10 rounded-xl p-6 sm:p-7 flex flex-col gap-3 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg text-base-content dark:text-white">
                The Cost X-Ray Comes First, Free, No Exceptions
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                You see the savings opportunity by category — shown as percentages, open to anyone regardless of size or spend — before you see a price.
              </p>
            </div>
            <div className="bg-base-200/50 dark:bg-navy border border-base-300 dark:border-white/10 rounded-xl p-6 sm:p-7 flex flex-col gap-3 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg text-base-content dark:text-white">
                Fixed Once Scoped, Never Hourly
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Whatever the number is, it's fixed in the SOW before work starts — no time-and-materials billing, no surprise invoices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-6">
            Questions We Get About How We Price.
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

      {/* CLOSING CTA */}
      <section className="bg-base-200/80 dark:bg-navy py-14 px-6 sm:px-10 text-base-content dark:text-white text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl mb-3 text-base-content dark:text-white">
            Get a Defined Price for Your Engagement.
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 mb-6 leading-relaxed">
            Free assessment first. No commitment. No charges.
          </p>
          <button
            type="button"
            onClick={openAssessment}
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all"
          >
            <CornerMarkers />
            Free Cost X-Ray Assessment
          </button>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
              Not Sure Which Tier Fits? We'll Tell You Straight.
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 mb-6 leading-relaxed">
              Send us a snapshot of your environment and current spend — we'll tell you whether Diagnose, Fix or a Retainer actually makes sense, even if that means recommending the smaller option.
            </p>
            <div className="space-y-4 text-xs sm:text-sm text-base-content/80 dark:text-white/100">
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-none">1</span>
                <span>We review what you send — no meeting required to get a first read.</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-none">2</span>
                <span>You get a direct recommendation and a price range — not a sales pitch.</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-none">3</span>
                <span>If it's a fit, we schedule the free Cost X-Ray next.</span>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="border border-base-300 dark:border-white/15 bg-base-200/50 dark:bg-navy-950 rounded-2xl p-8 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"></path></svg>
                </div>
                <h3 className="font-bold text-lg text-base-content dark:text-white mb-1">Inquiry Sent</h3>
                <p className="text-xs text-base-content/70 dark:text-white/70">A FinOps lead will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-base-300 dark:border-white/15 bg-base-200/50 dark:bg-navy-950 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/5 text-base-content dark:text-white rounded px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.workEmail}
                      onChange={e => handleEmailChange(e.target.value)}
                      className={`w-full border rounded px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary ${
                        emailError ? 'border-red-500 bg-red-500/5' : 'border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/5 text-base-content dark:text-white'
                      }`}
                    />
                    {emailError && (
                      <span className="text-[11px] text-red-500 block mt-1">Please use your company email address.</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/5 text-base-content dark:text-white rounded px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/5 text-base-content dark:text-white rounded px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Engagement Model</label>
                    <select
                      value={formData.engagementModel}
                      onChange={e => setFormData({ ...formData, engagementModel: e.target.value })}
                      className="w-full border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/5 text-base-content dark:text-white rounded px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                    >
                      <option>Fixed Assessment</option>
                      <option>Recurring — Managed FinOps</option>
                      <option>Project — Implementation</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Monthly Spend</label>
                    <select
                      value={formData.spendRange}
                      onChange={e => setFormData({ ...formData, spendRange: e.target.value })}
                      className="w-full border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/5 text-base-content dark:text-white rounded px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                    >
                      <option>Under $50K</option>
                      <option>$50K–$250K</option>
                      <option>$250K–$500K</option>
                      <option>$500K–$1M</option>
                      <option>$1M+</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-primary text-white font-bold text-xs sm:text-sm rounded hover:bg-primary-focus transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default PricingModelsPage;
