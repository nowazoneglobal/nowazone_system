import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';

export const GoogleLicensingPage: React.FC = () => {
  const { openAssessment } = useModal();
  const [estSeats, setEstSeats] = useState<number>(50);
  const [estTier, setEstTier] = useState<string>('enterprise');
  const [estSpend, setEstSpend] = useState<number>(1500);

  const tierRates: Record<string, number> = {
    starter: 6.00,
    standard: 12.00,
    plus: 18.00,
    enterprise: 30.00
  };

  const calculatedSpend = estSpend > 0 ? estSpend : estSeats * (tierRates[estTier] || 18.00);
  const estLow = Math.round(calculatedSpend * 0.15);
  const estHigh = Math.round(calculatedSpend * 0.35);

  const faqs = [
    {
      q: "What is a Google Cloud indirect reseller?",
      a: "Under the Google Cloud Partner Network, an indirect reseller buys Workspace and Google Cloud licensing through a distributor rather than directly from Google, then sells and supports it to end customers."
    },
    {
      q: "Google Workspace vs Microsoft 365 — which is cheaper?",
      a: "It depends on tier and usage more than platform — both have entry, standard and premium tiers with overlapping list prices. We compare your actual usage against both stacks rather than assuming one is cheaper."
    },
    {
      q: "Is Nowazone an authorized Google Cloud reseller?",
      a: "Yes. Nowazone is enrolled in the Google Cloud Partner Network as an indirect reseller, working through a distributor in each market we serve."
    },
    {
      q: "Does Nowazone resell Google Workspace as well as Google Cloud?",
      a: "Yes. We procure and manage both Google Workspace seats and Google Cloud consumption under one relationship."
    },
    {
      q: "Can I move my Google Workspace domain to a new reseller?",
      a: "Yes. Your domain, mailboxes and data stay in place — only the billing and admin-support relationship transfers, via a Google-managed subscription transfer."
    },
    {
      q: "Is there a minimum seat count?",
      a: "Minimums depend on the Workspace tier and your market. We'll confirm exact terms during your quote."
    },
    {
      q: "Which countries does Nowazone support for Google licensing?",
      a: "India, UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait, the United Kingdom and the United States, with local billing currency and support hours in each."
    }
  ];

  const markets = [
    { country: "United States", currency: "USD ($)", tier: "GCP Reseller", region: "North America" },
    { country: "United Kingdom", currency: "GBP (£)", tier: "GCP Reseller", region: "Europe" },
    { country: "United Arab Emirates", currency: "AED", tier: "GCP Reseller", region: "Middle East" },
    { country: "Saudi Arabia", currency: "SAR", tier: "GCP Reseller", region: "Middle East" },
    { country: "Qatar", currency: "QAR", tier: "GCP Reseller", region: "Middle East" },
    { country: "Oman", currency: "OMR", tier: "GCP Reseller", region: "Middle East" },
    { country: "Bahrain", currency: "BHD", tier: "GCP Reseller", region: "Middle East" },
    { country: "Kuwait", currency: "KWD", tier: "GCP Reseller", region: "Middle East" },
    { country: "India", currency: "INR (₹)", tier: "GCP Reseller", region: "Asia Pacific" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Google Workspace & Google Cloud Licensing Reseller — Nowazone"
        description="Google Workspace and Google Cloud licensing — procured through Google's official reseller channel, matched to real usage. Free Cost X-Ray to start."
        canonical="/solutions/google-cloud-licensing"
      />

      {/* HERO */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            Google Cloud Partner Network Reseller
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight tracking-tight">
            Google Workspace & Google Cloud Licensing Reseller
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Consolidated Google licensing procurement and management — Workspace seats, committed use discounts and one invoice across your Google estate. Sourced through an authorized Google Cloud distributor.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Book a Licensing Cost Review
            </button>
            <button
              type="button"
              onClick={openAssessment}
              className="border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm px-6 py-3.5 rounded transition-all"
            >
              Talk to a FinOps Expert
            </button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center text-xs sm:text-sm text-base-content/65 dark:text-white/60">
            <span>✓ No long-term lock-in</span>
            <span>✓ Local billing in 9 markets</span>
            <span>✓ SMB to enterprise volume</span>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="bg-base-200/70 dark:bg-navy py-4 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-3 text-center text-sm">
          <span className="text-base-content/80 dark:text-white/100">Licensing is one input to your cloud bill, not the whole story.</span>
          <Link to="/finops" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Why we review licenses through a cost-optimization lens →
          </Link>
        </div>
      </section>

      {/* WHAT WE RESELL */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              What We Resell
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Every Layer of the Google Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="blueprint border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 relative">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Google Workspace Seats</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Business Starter through Enterprise Plus, procured, provisioned and aligned to usage.
              </p>
            </div>
            <div className="blueprint border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 relative">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Google Cloud Consumption</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Committed use discount strategy and project-level billing setup with FinOps monitoring.
              </p>
            </div>
            <div className="blueprint border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 relative">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Consolidated Billing</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Workspace and Cloud on one invoice, one renewal calendar, and one dedicated point of contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON CARDS */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Which License Do You Actually Need
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-2">
              Google Workspace Plan Comparison
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70">
              Relative positioning, not list pricing — your exact rate depends on region, term and volume and is confirmed at quote.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-base-100 dark:bg-navy-light border border-base-300 dark:border-white/10 rounded-xl p-5 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Entry</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Business Starter</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> small teams needing core mail, Meet and Drive with modest storage.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> low — rarely the wrong choice for its use case.</p>
            </div>
            <div className="bg-base-100 dark:bg-navy-light border border-base-300 dark:border-white/10 rounded-xl p-5 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Most Common</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Business Standard</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> growing teams needing more storage and recording features.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> low, unless storage per user goes largely unused.</p>
            </div>
            <div className="bg-base-100 dark:bg-navy-light border border-base-300 dark:border-white/10 rounded-xl p-5 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Add-On Heavy</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Business Plus</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> teams needing eDiscovery, retention and enhanced security controls.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> medium — compliance features often go unconfigured.</p>
            </div>
            <div className="bg-primary/5 border-2 border-primary/40 rounded-xl p-5 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Enterprise</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Enterprise Plus</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> orgs actively using advanced DLP, eDiscovery or S/MIME encryption.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> high — the single most common licensing overspend we see.</p>
            </div>
          </div>

          <div className="mt-4 bg-base-200/70 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 text-base-content dark:text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-semibold text-sm block mb-1 text-base-content dark:text-white">Gemini for Workspace &amp; Cloud committed-use economics</span>
              <span className="text-xs text-base-content/75 dark:text-white/70">Gemini add-ons layer on top of an existing Workspace seat, and Google Cloud committed-use discounts lock in savings against a usage baseline. We size both against actual adoption.</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE DIFFERENCE */}
      <section className="bg-base-200/60 dark:bg-navy py-14 px-6 sm:px-10 text-base-content dark:text-white text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-blue-500 dark:text-blue-400 font-bold block mb-3">
            The Difference
          </span>
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4">
            Licensing Sold Through a FinOps Lens
          </h2>
          <p className="text-base sm:text-lg text-base-content/90 dark:text-white/90 font-medium mb-3 italic">
            &ldquo;Before we size your Workspace rollout, we check whether Standard is enough — not push you to Enterprise.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
            Most teams overpay for Enterprise Plus tiers and undersized Cloud commitments — we catch that before you buy, not after. It's the same discipline we apply to cloud cost optimization, extended to the licensing decision itself.
          </p>
        </div>
      </section>

      {/* WASTE ESTIMATOR */}
      <section className="bg-base-100 dark:bg-[#060A12] py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              License Waste Estimator
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              See What You Might Be Overpaying
            </h2>
          </div>

          <div className="bg-base-100 dark:bg-navy rounded-2xl p-6 sm:p-8 text-base-content dark:text-white shadow-xl border border-base-300 dark:border-white/10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-xs uppercase tracking-wider text-base-content/80 dark:text-white/100">License Waste Estimator</span>
              <span className="text-[10px] tracking-wider uppercase border border-base-300 dark:border-white/20 text-base-content/70 dark:text-white/60 px-2 py-0.5 rounded">
                Illustrative Estimate
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-xs text-base-content/70 dark:text-white/70 block mb-1.5 font-medium">Number of seats</label>
                <input
                  type="number"
                  min="1"
                  value={estSeats}
                  onChange={e => setEstSeats(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-base-content/70 dark:text-white/70 block mb-1.5 font-medium">Current plan tier</label>
                <select
                  value={estTier}
                  onChange={e => setEstTier(e.target.value)}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm outline-none focus:border-primary [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                >
                  <option value="starter">Business Starter</option>
                  <option value="standard">Business Standard</option>
                  <option value="plus">Business Plus</option>
                  <option value="enterprise">Enterprise Plus</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-base-content/70 dark:text-white/70 block mb-1.5 font-medium">Monthly Google spend ($)</label>
                <input
                  type="number"
                  min="0"
                  value={estSpend}
                  onChange={e => setEstSpend(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-1">
                Illustrative Savings Range
              </span>
              <span className="font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 block mb-2">
                ${estLow.toLocaleString()} – ${estHigh.toLocaleString()} / mo
              </span>
              <span className="text-[11px] text-base-content/60 dark:text-white/50 block max-w-lg mx-auto">
                Illustrative estimate — actual savings vary by usage, term and current contract. Confirmed at review, not guaranteed here.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT FOR BOTH VOLUME AND ADVISORY BUYING */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Built for Both Volume and Advisory Buying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 sm:p-7 flex flex-col gap-3 shadow-sm">
              <span className="text-xs tracking-wider uppercase text-primary font-bold">
                SMB & Growing Teams
              </span>
              <h3 className="font-semibold text-lg sm:text-xl text-base-content dark:text-white">
                Self-serve pricing, fast provisioning
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Instant quotes and standard seat bundles for teams under a few hundred seats.
              </p>
              <button
                type="button"
                onClick={openAssessment}
                className="mt-auto font-semibold text-xs sm:text-sm text-primary hover:underline text-left inline-flex items-center gap-1"
              >
                Get instant pricing →
              </button>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 sm:p-7 flex flex-col gap-3 shadow-sm">
              <span className="text-xs tracking-wider uppercase text-primary font-bold">
                Mid-Market & Enterprise
              </span>
              <h3 className="font-semibold text-lg sm:text-xl text-base-content dark:text-white">
                Managed licensing with governance
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Committed Use Discount planning, multi-entity billing and a named account team.
              </p>
              <button
                type="button"
                onClick={openAssessment}
                className="mt-auto font-semibold text-xs sm:text-sm text-primary hover:underline text-left inline-flex items-center gap-1"
              >
                Book a consultation →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SWITCHING PROVIDERS */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Switching Providers
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
              Buying Direct or Through Another Reseller? Here's What Changes
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 max-w-2xl">
              Your Google Workspace domain, mailboxes and Drive data don't move. What changes is the reseller of record — the party that manages billing and admin support for your subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <span className="font-bold text-2xl text-primary block mb-2">1</span>
              <h4 className="font-semibold text-base text-base-content dark:text-white mb-2">Audit current licensing</h4>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                We review your admin console, seat mix and Cloud commitments — no changes made yet.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <span className="font-bold text-2xl text-primary block mb-2">2</span>
              <h4 className="font-semibold text-base text-base-content dark:text-white mb-2">Subscription transfer</h4>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                A Google-managed domain/admin transfer to our reseller account. No re-migration, no mail downtime.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <span className="font-bold text-2xl text-primary block mb-2">3</span>
              <h4 className="font-semibold text-base text-base-content dark:text-white mb-2">Timed to your renewal</h4>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Typically completed in days, not weeks — we time it to avoid disrupting an active term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE MARKETS */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Coverage
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Licensed and Supported in 9 Markets
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 mt-2">
              Local currency billing and dedicated support hours across our operating footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((m, idx) => (
              <div key={idx} className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-4 flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-semibold text-sm text-base-content dark:text-white">{m.country}</h4>
                  <span className="text-xs text-base-content/65 dark:text-white/60">{m.region} · {m.tier}</span>
                </div>
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">
                  {m.currency}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center border-t border-base-300 dark:border-white/10 pt-8">
            <h4 className="font-semibold text-base text-base-content dark:text-white mb-2">
              Setting Up Google Workspace for the First Time?
            </h4>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 max-w-lg mx-auto mb-4">
              No existing tenant to migrate — just new seats, priced for your market and billed in your local currency.
            </p>
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-6 py-3 bg-primary text-white font-bold text-xs sm:text-sm rounded shadow hover:bg-primary-focus transition-all"
            >
              <CornerMarkers />
              Get New License Pricing for My Region
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-base-200/50 dark:bg-navy py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-6">
            Google Cloud Licensing Questions
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

      {/* SECTION 11: MICROSOFT CROSS-LINK */}
      <section className="bg-base-200/60 dark:bg-navy-950 py-10 px-6 sm:px-10 border-t border-base-300 dark:border-white/10 text-center text-base-content dark:text-white transition-colors">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap text-center sm:text-left">
          <span className="text-sm text-base-content/85 dark:text-white/100 font-medium">
            Also looking for enterprise Microsoft volume licensing or CSP agreements?
          </span>
          <Link
            to="/solutions/microsoft-licensing-reselling"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-primary dark:text-blue-400 hover:underline transition-colors mx-auto sm:mx-0"
          >
            Also reselling Microsoft 365 &amp; Azure <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 12: CLOSING CTA */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl mb-3 text-base-content dark:text-white font-heading">
            Ready to Stop Overpaying for Seats You Don't Use?
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 mb-8 leading-relaxed">
            A Licensing Cost Review folds into the same FinOps discipline behind our cloud cost work — one team, one lens, across your whole Google estate.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Book a Licensing Cost Review
            </button>
            <Link
              to="/finops"
              className="inline-flex items-center px-6 py-3.5 border border-base-300 dark:border-white/20 text-base-content dark:text-white font-heading font-semibold text-sm rounded hover:bg-base-200 dark:hover:bg-white/5 transition-colors"
            >
              Explore FinOps as a Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default GoogleLicensingPage;
