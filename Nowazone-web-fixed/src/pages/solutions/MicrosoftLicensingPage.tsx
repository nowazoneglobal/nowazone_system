import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';

export const MicrosoftLicensingPage: React.FC = () => {
  const { openAssessment } = useModal();
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [estSeats, setEstSeats] = useState<number>(50);
  const [estTier, setEstTier] = useState<string>('e3');

  const tierRates: Record<string, number> = {
    basic: 6.00,
    standard: 12.50,
    premium: 22.00,
    e3: 36.00,
    e5: 57.00,
    other: 30.00
  };

  const monthlySpend = estSeats * (tierRates[estTier] || 36.00);
  const estLow = Math.round(monthlySpend * 0.15);
  const estHigh = Math.round(monthlySpend * 0.35);

  const breakdownRows = [
    { isGroup: true, label: "Core Office Apps" },
    { isFeature: true, label: "Web & Mobile Apps (Word, Excel, PowerPoint)", basic: "✓", standard: "✓", premium: "✓", e3: "✓", e5: "✓" },
    { isFeature: true, label: "Desktop Apps (Mac & PC)", basic: "—", standard: "✓", premium: "✓", e3: "✓", e5: "✓" },
    { isFeature: true, label: "Install on up to 5 PCs/Macs per user", basic: "—", standard: "✓", premium: "✓", e3: "✓", e5: "✓" },
    { isGroup: true, label: "Email, Storage & Collaboration" },
    { isFeature: true, label: "Exchange Business Email (50 GB)", basic: "✓", standard: "✓", premium: "✓", e3: "✓", e5: "✓" },
    { isFeature: true, label: "Exchange Enterprise Email (100 GB + Archive)", basic: "—", standard: "—", premium: "—", e3: "✓", e5: "✓" },
    { isFeature: true, label: "OneDrive Cloud Storage", basic: "1 TB", standard: "1 TB", premium: "1 TB", e3: "1–5 TB", e5: "1–5 TB+" },
    { isFeature: true, label: "Microsoft Teams (Chat, Calls, Meetings)", basic: "✓", standard: "✓", premium: "✓", e3: "✓", e5: "✓" },
    { isGroup: true, label: "Security, Compliance & Identity" },
    { isFeature: true, label: "Microsoft Entra ID P1 (Conditional Access)", basic: "—", standard: "—", premium: "✓", e3: "✓", e5: "✓" },
    { isFeature: true, label: "Microsoft Entra ID P2 (Identity Protection)", basic: "—", standard: "—", premium: "—", e3: "—", e5: "✓" },
    { isFeature: true, label: "Microsoft Defender for Business / Endpoint", basic: "—", standard: "—", premium: "✓", e3: "Defender P1", e5: "Defender P2" },
    { isFeature: true, label: "Microsoft Intune (Mobile Device Management)", basic: "—", standard: "—", premium: "✓", e3: "✓", e5: "✓" },
    { isFeature: true, label: "Information Protection & DLP", basic: "Basic", basic_sub: true, standard: "Basic", premium: "Standard", e3: "Advanced", e5: "Comprehensive" },
    { isGroup: true, label: "Analytics & Voice" },
    { isFeature: true, label: "Power BI Pro", basic: "—", standard: "—", premium: "—", e3: "Add-on", e5: "Included" },
    { isFeature: true, label: "Teams Phone System", basic: "—", standard: "—", premium: "—", e3: "Add-on", e5: "Included" },
    { isFeature: true, label: "Audio Conferencing (Dial-in)", basic: "Add-on", standard: "Add-on", premium: "Add-on", e3: "Add-on", e5: "Included" }
  ];

  const faqs = [
    {
      q: "What is a Microsoft CSP indirect reseller?",
      a: "Under the Microsoft CSP program (Cloud Solution Provider), an indirect reseller buys licensing through an indirect provider (a distributor) rather than directly from Microsoft, then sells and supports it to end customers."
    },
    {
      q: "Is it safe to buy Microsoft 365 through a reseller?",
      a: "Yes. CSP is Microsoft's own licensing channel — licenses provision directly into your tenant, visible in your own Microsoft CSP portal, and you keep full admin control. The reseller manages billing, support and renewals."
    },
    {
      q: "Is Nowazone an authorized Microsoft reseller?",
      a: "Yes. Nowazone is an enrolled Microsoft Indirect Reseller, working through a Microsoft Indirect Provider distributor in each market we serve."
    },
    {
      q: "Can Nowazone help us move from an Enterprise Agreement to CSP?",
      a: "Yes. We handle EA-to-CSP transitions including license mapping, timing and renewal alignment."
    },
    {
      q: "What's the difference between Microsoft 365 E3 and E5?",
      a: "E5 adds advanced security, compliance and analytics features, plus Teams Phone, on top of E3. Most organizations don't use enough of the E5-only features to justify the price gap — we check usage before recommending it."
    },
    {
      q: "Can I switch Microsoft 365 providers mid-term?",
      a: "Yes, in most cases. Your tenant and data stay put — only the billing and support relationship changes. We handle the reassignment and time it to avoid disrupting a current term where possible."
    },
    {
      q: "Is there a minimum seat count?",
      a: "Minimums depend on the licensing program and your market. We'll confirm exact terms during your quote."
    },
    {
      q: "Which countries does Nowazone support for Microsoft licensing?",
      a: "India, UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait, the United Kingdom and the United States, with local billing currency and support hours in each."
    },
    {
      q: "What's included in Microsoft 365 E5 that E3 doesn't have?",
      a: "E5 adds advanced security and compliance tooling (Defender for Office 365 Plan 2, advanced eDiscovery, Customer Lockbox), Power BI Pro, and PSTN conferencing on top of E3. It's the same advanced threat protection and analytics layer most orgs never fully turn on — we check usage before recommending the upgrade."
    },
    {
      q: "Where is our Microsoft 365 data stored?",
      a: "Data residency follows Microsoft's own regional commitments for the Microsoft 365 datacenter geography tied to your tenant — see our regional coverage above for the markets we support. We confirm the specific residency terms for your tenant's region as part of onboarding."
    }
  ];

  const markets = [
    { country: "United States", currency: "USD ($)", tier: "CSP Tier 1 / Indirect", region: "North America" },
    { country: "United Kingdom", currency: "GBP (£)", tier: "CSP Indirect", region: "Europe" },
    { country: "United Arab Emirates", currency: "AED", tier: "CSP Indirect", region: "Middle East" },
    { country: "Saudi Arabia", currency: "SAR", tier: "CSP Indirect", region: "Middle East" },
    { country: "Qatar", currency: "QAR", tier: "CSP Indirect", region: "Middle East" },
    { country: "Oman", currency: "OMR", tier: "CSP Indirect", region: "Middle East" },
    { country: "Bahrain", currency: "BHD", tier: "CSP Indirect", region: "Middle East" },
    { country: "Kuwait", currency: "KWD", tier: "CSP Indirect", region: "Middle East" },
    { country: "India", currency: "INR (₹)", tier: "CSP Indirect", region: "Asia Pacific" }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Microsoft CSP Licensing & Cloud Reseller Services — Nowazone"
        description="Microsoft CSP licensing and cloud reseller services — Microsoft 365, Azure and Copilot procurement reviewed against your actual usage. Free Cost X-Ray to start."
        canonical="/solutions/microsoft-licensing"
      />

      {/* HERO */}
      <section className="bg-base-100 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            Authorized Microsoft Reseller
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight tracking-tight">
            Microsoft CSP Licensing &amp; Cloud Reseller Services
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Consolidated Microsoft licensing procurement and management — EA-to-CSP transitions, seat optimization and one invoice across your Microsoft estate. Sourced through an authorized CSP indirect-provider distributor.
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
          <div className="flex flex-wrap gap-6 justify-center text-xs sm:text-sm text-base-content/70 dark:text-white/60">
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
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              What We Resell
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Every Layer of the Microsoft Stack
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="blueprint border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Microsoft 365 &amp; Copilot</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Seat procurement across E3/E5, Business and Copilot add-ons. Sized to actual usage.
              </p>
            </div>
            <div className="blueprint border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Azure Consumption</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Pay-as-you-go and reserved instance procurement under CSP with governance.
              </p>
            </div>
            <div className="blueprint border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 relative shadow-sm">
              <CornerMarkers />
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">EA to CSP Transition</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                License mapping, timing and renewal alignment as Enterprise Agreements sunset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON CARDS */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Which License Do You Actually Need
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-2">
              Microsoft 365 Plan Comparison
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70">
              Relative positioning, not list pricing — your exact rate depends on region, term and volume and is confirmed at quote.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-base-100 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 flex flex-col gap-2.5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Entry</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Business Basic</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> web/mobile-only teams, no desktop apps needed.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> low — rarely the wrong choice for its use case.</p>
            </div>
            <div className="bg-base-100 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 flex flex-col gap-2.5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Most Common</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Business Standard</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> teams under 300 seats needing desktop Office apps.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> low, unless users only ever touch web apps.</p>
            </div>
            <div className="bg-base-100 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 flex flex-col gap-2.5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Add-On Heavy</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Business Premium</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> SMBs needing device management &amp; Defender.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> medium — Intune/Defender often unconfigured.</p>
            </div>
            <div className="bg-base-100 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 flex flex-col gap-2.5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Enterprise Standard</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Microsoft 365 E3</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> 300+ seats, no seat cap, standard compliance.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> low — the default enterprise floor.</p>
            </div>
            <div className="bg-primary/5 border-2 border-primary/40 rounded-xl p-5 flex flex-col gap-2.5 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Enterprise Premium</span>
              <h3 className="font-semibold text-base text-base-content dark:text-white">Microsoft 365 E5</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>For:</strong> orgs actively using advanced security, compliance or Teams Phone.</p>
              <p className="text-xs text-base-content/75 dark:text-white/70"><strong>Overpay risk:</strong> high — the single most common overspend we see.</p>
            </div>
          </div>

          <div className="mt-4 bg-base-200/70 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 text-base-content dark:text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-semibold text-sm block mb-1 text-base-content dark:text-white">Copilot add-on economics</span>
              <span className="text-xs text-base-content/75 dark:text-white/70">Copilot licenses layer on top of an existing E3/E5 or Business Standard/Premium seat. We size rollouts to actual adoption first — a pilot group, not a blanket buy.</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setBreakdownOpen(!breakdownOpen)}
              className="border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-primary font-semibold text-xs sm:text-sm px-5 py-2.5 rounded transition-all"
            >
              {breakdownOpen ? 'Hide Feature Breakdown ▲' : 'Show Full Plan Feature Breakdown ▼'}
            </button>
          </div>

          {breakdownOpen && (
            <div className="mt-6 overflow-x-auto border border-base-300 dark:border-white/10 rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm min-w-[700px]">
                <thead className="bg-base-200/50 dark:bg-white/5 border-b border-base-300 dark:border-white/10">
                  <tr>
                    <th className="p-3 text-base-content dark:text-white font-semibold">Feature</th>
                    <th className="p-3 text-center text-base-content dark:text-white font-semibold">Business Basic</th>
                    <th className="p-3 text-center text-base-content dark:text-white font-semibold">Business Standard</th>
                    <th className="p-3 text-center text-base-content dark:text-white font-semibold">Business Premium</th>
                    <th className="p-3 text-center text-base-content dark:text-white font-semibold">E3</th>
                    <th className="p-3 text-center text-base-content dark:text-white font-semibold">E5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-300 dark:divide-white/10">
                  {breakdownRows.map((row, idx) => {
                    if (row.isGroup) {
                      return (
                        <tr key={idx} className="bg-primary/10 font-bold">
                          <td colSpan={6} className="p-2.5 uppercase tracking-wider text-primary text-xs">
                            {row.label}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={idx} className="hover:bg-base-200/50 dark:hover:bg-white/5">
                        <td className="p-3 text-base-content dark:text-white">{row.label}</td>
                        <td className="p-3 text-center text-base-content/80 dark:text-white/100">{row.basic}</td>
                        <td className="p-3 text-center text-base-content/80 dark:text-white/100">{row.standard}</td>
                        <td className="p-3 text-center text-base-content/80 dark:text-white/100">{row.premium}</td>
                        <td className="p-3 text-center text-base-content/80 dark:text-white/100">{row.e3}</td>
                        <td className="p-3 text-center text-base-content/80 dark:text-white/100 font-medium text-primary">{row.e5}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
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
            &ldquo;Before we sell you E5, we check whether your usage justifies it.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/60 leading-relaxed max-w-2xl mx-auto">
            Most companies overpay for unused Copilot and E5 seats — we catch that before you buy, not after. It's the same discipline we apply to cloud cost optimization, extended to the licensing decision itself.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                <label className="text-xs text-base-content/70 dark:text-white/70 block mb-1.5 font-medium">License tier</label>
                <select
                  value={estTier}
                  onChange={e => setEstTier(e.target.value)}
                  className="w-full bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/20 text-base-content dark:text-white px-3 py-2.5 rounded text-sm outline-none focus:border-primary [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                >
                  <option value="basic">Microsoft 365 Business Basic (~$6/seat)</option>
                  <option value="standard">Microsoft 365 Business Standard (~$12.50/seat)</option>
                  <option value="premium">Microsoft 365 Business Premium (~$22/seat)</option>
                  <option value="e3">Microsoft 365 E3 (~$36/seat)</option>
                  <option value="e5">Microsoft 365 E5 (~$57/seat)</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>
            </div>

            <div className="text-center text-xs text-base-content/70 dark:text-white/60 mb-6">
              Estimated spend at current published rates: <strong className="text-base-content dark:text-white text-sm">${monthlySpend.toLocaleString()}</strong> / mo
            </div>

            <div className="bg-base-200/50 dark:bg-white/5 border border-base-300 dark:border-white/10 rounded-xl p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider text-base-content/60 dark:text-white/50 block mb-1">
                Illustrative Savings Range
              </span>
              <span className="font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 block mb-2">
                ${estLow.toLocaleString()} – ${estHigh.toLocaleString()} / mo
              </span>
              <span className="text-[11px] text-base-content/60 dark:text-white/50 block max-w-lg mx-auto">
                Illustrative estimate based on current published Microsoft list pricing — actual savings vary by usage, term and current contract. Confirmed at review, not guaranteed here.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT FOR BOTH VOLUME AND ADVISORY BUYING */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Built for Both Volume and Advisory Buying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 sm:p-7 flex flex-col gap-3 shadow-sm">
              <span className="text-xs tracking-wider uppercase text-primary font-bold">
                SMB &amp; Growing Teams
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
                Mid-Market &amp; Enterprise
              </span>
              <h3 className="font-semibold text-lg sm:text-xl text-base-content dark:text-white">
                Managed licensing with governance
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                EA-to-CSP transitions, multi-entity billing and a named account team.
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
      <section className="bg-base-200/50 dark:bg-navy-950 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Switching Providers
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
              Buying Direct or Through Another Reseller? Here's What Changes
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 max-w-2xl leading-relaxed">
              Your Microsoft 365 tenant, mailboxes and data don't move. What changes is the CSP reseller of record — the party that bills you and manages your licensing relationship with Microsoft.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <span className="font-bold text-2xl text-primary block mb-2">1</span>
              <h4 className="font-semibold text-sm sm:text-base text-base-content dark:text-white mb-2">
                Audit current licensing
              </h4>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                We review your tenant, seat mix and contract terms — no changes made yet.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <span className="font-bold text-2xl text-primary block mb-2">2</span>
              <h4 className="font-semibold text-sm sm:text-base text-base-content dark:text-white mb-2">
                Reseller-of-record transfer
              </h4>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                A Microsoft-managed relationship reassignment. No re-migration, no mailbox downtime.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <span className="font-bold text-2xl text-primary block mb-2">3</span>
              <h4 className="font-semibold text-sm sm:text-base text-base-content dark:text-white mb-2">
                Timed to your renewal
              </h4>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Typically completed in days, not weeks — we time it to avoid disrupting an active term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE MARKETS */}
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Coverage
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Licensed and Supported in 9 Markets
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 mt-2">
              English-language support across all markets. Compliance notes reflect regional requirements we design our process around.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((m, idx) => (
              <div key={idx} className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 rounded-xl p-4 flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-semibold text-sm text-base-content dark:text-white">{m.country}</h4>
                  <span className="text-xs text-base-content/60 dark:text-white/60">{m.region} · {m.tier}</span>
                </div>
                <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">
                  {m.currency}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center border-t border-base-300 dark:border-white/10 pt-8">
            <h4 className="font-semibold text-base text-base-content dark:text-white mb-2">
              Setting Up Microsoft 365 for the First Time?
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
      <section className="bg-base-100 py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-6">
            Microsoft Licensing Questions
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
      <section className="bg-base-100 dark:bg-navy py-14 px-6 sm:px-10 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl mb-4 text-base-content dark:text-white">
            Ready to Review Your Microsoft Licensing?
          </h2>
          <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 mb-6">
            Get an audit of your current seats, Copilot adoption, and EA-to-CSP transition timeline.
          </p>
          <button
            type="button"
            onClick={openAssessment}
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
          >
            <CornerMarkers />
            Book a Licensing Cost Review
          </button>
        </div>
      </section>
    </div>
  );
};
export default MicrosoftLicensingPage;
