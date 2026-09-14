import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { useModal } from '../../context/ModalContext';

export const TrustSecurityPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Trust & Security | Nowazone"
        description="How Nowazone protects client data — read-only access, certified practitioners, verified Microsoft and Google partner status, and honest disclosure of what we don't have yet."
      />

      {/* Hero */}
      <section className="bg-base-200/60 dark:bg-brand-obsidian py-14 sm:py-20 px-6 sm:px-10 text-center relative overflow-hidden transition-colors">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-blue-400 mb-3.5">
            Trust &amp; Security
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
            Trust &amp; Security — Built Into How We Work, Not Bolted On.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Everything here reflects what&apos;s actually true today — our access model, our certifications, our partner status, and what we don&apos;t have yet. Nothing on this page is aspirational.
          </p>
          <button
            type="button"
            onClick={openAssessmentModal}
            className="px-8 py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-brand-blue/30"
          >
            Free Cost X-Ray Assessment
          </button>
        </div>
      </section>

      {/* 4 Pillars: How engagements actually work */}
      <section className="py-14 sm:py-20 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">
            How engagements actually work
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            You Stay in Control at Every Step.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-navy shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">We Sign First</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              NDA, MCA and SOW executed before any access is granted.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-navy shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Read-Only Access, Nothing More</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              No modify/delete/provision capability in standard engagement access.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-navy shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Dedicated Account Manager</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              A named point of contact, not an anonymous support queue.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-navy shadow-sm">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Full Handover &amp; Data Removal</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60 leading-relaxed">
              Data deleted and access revoked at engagement end.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-base-200/50 dark:bg-brand-obsidian py-14 sm:py-20 px-6 sm:px-10 border-y border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">
              Who&apos;s actually doing the work
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Certified Practitioners, Not Just a Certified Company.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">FinOps Certified Professional</h3>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">FinOps Certified Engineer</h3>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">FinOps Certified: Technology Value</h3>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-center shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">FinOps Certified: AI Value</h3>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-white/50 mt-6">
            Individual FinOps Foundation practitioner certifications held by our team — not organizational membership.
          </p>
        </div>
      </section>

      {/* Partner Status */}
      <section className="py-14 sm:py-20 px-6 sm:px-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">
            Verified with Microsoft and Google
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Verified Partner Status.
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-navy flex items-center gap-4 min-w-[280px] shadow-sm">
            <img src="/assets/microsoft-partner-badge.png" alt="Microsoft Partner" className="h-10 w-auto" />
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Microsoft Partner</h3>
              <p className="text-xs text-gray-500 dark:text-white/60">Microsoft AI Cloud Partner Program</p>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-navy flex items-center gap-4 min-w-[280px] shadow-sm">
            <img src="/assets/google-cloud-icon.png" alt="Google Cloud Partner" className="h-9 w-9 object-contain" />
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Google Cloud Partner Network</h3>
              <p className="text-xs text-gray-500 dark:text-white/60">Co-sell Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Handle Your Data */}
      <section className="bg-base-200/50 dark:bg-brand-obsidian py-14 sm:py-20 px-6 sm:px-10 border-y border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">
              In plain language
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              How We Handle Your Data.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Read-only, least-privilege access only</h3>
              <Link to="/security-compliance" className="text-xs font-semibold text-brand-blue hover:underline">
                See the full policy →
              </Link>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">All personnel bound by confidentiality</h3>
              <Link to="/security-compliance" className="text-xs font-semibold text-brand-blue hover:underline">
                See the full policy →
              </Link>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Encrypted in transit where supported by the platform</h3>
              <Link to="/security-compliance" className="text-xs font-semibold text-brand-blue hover:underline">
                See the full policy →
              </Link>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Deleted within 30 days of engagement completion</h3>
              <Link to="/data-processing-agreement" className="text-xs font-semibold text-brand-blue hover:underline">
                See the full policy →
              </Link>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Breach notification within 72 hours, without undue delay</h3>
              <Link to="/data-processing-agreement" className="text-xs font-semibold text-brand-blue hover:underline">
                See the full policy →
              </Link>
            </div>
            <div className="p-6 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">A limited set of confidentiality-bound sub-processors (CRM, email, analytics)</h3>
              <Link to="/data-processing-agreement" className="text-xs font-semibold text-brand-blue hover:underline">
                See the full policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Don't Have Yet */}
      <section className="py-14 px-6 sm:px-10 max-w-4xl mx-auto">
        <div className="p-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-2">
            Said plainly, not buried in fine print
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            What We Don&apos;t Have Yet.
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Nowazone does not currently hold a formal third-party security certification such as SOC 2 or ISO 27001. Our security practices are built around the read-only access model, confidentiality obligations, and data handling terms described above. Clients with specific compliance or audit requirements should raise them during contracting so they can be addressed directly in the engagement agreement.
          </p>
        </div>
      </section>

      {/* Regional Alignments */}
      <section className="bg-base-200/50 dark:bg-brand-obsidian py-14 sm:py-20 px-6 sm:px-10 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">
            Across every market we serve
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Aligned to Regional Data Protection Principles.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Our data handling practices are built around the principles of India&apos;s DPDP Act, UK/EU GDPR, and UAE/Saudi PDPL frameworks across the markets we serve — consistent with the regional coverage already described on our Microsoft and Google Licensing pages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/solutions/microsoft-licensing-reselling"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-semibold text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              Microsoft Licensing — Regional Coverage →
            </Link>
            <Link
              to="/solutions/google-cloud-licensing-reselling"
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-semibold text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              Google Cloud Licensing — Regional Coverage →
            </Link>
          </div>
        </div>
      </section>

      {/* Binding Terms Links */}
      <section className="py-12 px-6 sm:px-10 border-b border-gray-200 dark:border-gray-800 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">
            The binding terms
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            The Actual Policies This Page Summarizes.
          </h2>
          <div className="flex flex-wrap justify-center gap-6 font-semibold text-sm">
            <Link to="/security-compliance" className="text-brand-blue hover:underline">
              Security &amp; Compliance
            </Link>
            <Link to="/data-processing-agreement" className="text-brand-blue hover:underline">
              Data Processing Agreement
            </Link>
            <Link to="/privacy-policy" className="text-brand-blue hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-brand-blue hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-base-200/80 dark:bg-navy-950 text-base-content dark:text-white py-14 px-6 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold font-heading mb-5 text-base-content dark:text-white">
            See What This Looks Like on Your Own Environment.
          </h2>
          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold shadow-lg"
          >
            Free Cost X-Ray Assessment
          </button>
        </div>
      </section>
    </div>
  );
};
export default TrustSecurityPage;
