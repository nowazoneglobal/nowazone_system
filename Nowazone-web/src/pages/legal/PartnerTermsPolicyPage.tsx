import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const PartnerTermsPolicyPage: React.FC = () => {
  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Partner Terms & Policy | Nowazone"
        description="Terms governing Nowazone's partner, reseller and white-label delivery relationships."
        canonical="/partner-terms-policy"
      />

      {/* Header */}
      <section className="bg-base-200/60 dark:bg-[#0E1F33] py-14 sm:py-16 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-2.5">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white mb-2">
          Partner Terms &amp; Policy
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50">
          Nowazone Global Systems Private Limited · Effective Date: 10 September 2026
        </p>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-4">
          This Partner Terms &amp; Policy (&ldquo;Policy&rdquo;) describes the general terms under which cloud service providers, MSPs, IT consultancies, systems integrators, ISVs and PaaS/SaaS companies (&ldquo;Partner,&rdquo; &ldquo;you&rdquo;) may partner with Nowazone Global Systems Private Limited (&ldquo;Nowazone,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) on Microsoft and Google Cloud licensing, FinOps and cloud consulting offerings, as described on our{' '}
          <Link to="/partner-program" className="text-brand-blue hover:underline font-semibold">
            Partner Program
          </Link>{' '}
          page.
        </p>

        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 mb-6">
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
            <strong>This Policy is informational, not a signed contract.</strong> It summarizes the terms we typically apply. Your actual rights and obligations as a partner are set out in a signed Partner Agreement or NDA specific to your engagement, which governs if it conflicts with this page.
          </p>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          1. Eligibility
        </h2>
        <p className="mb-6">
          The Partner Program is open to organizations — cloud service providers, managed service providers, IT service and consulting firms, systems integrators, solutions providers, ISVs, and PaaS/SaaS platform companies — with a company email domain and a legitimate business offering cloud, FinOps or platform services to customers. Applications must use a company email address; personal email domains are not accepted.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          2. Partner Tracks
        </h2>
        <p className="mb-3">
          <strong>White-Label Partner.</strong> Nowazone operates entirely behind your brand as your invisible back-office FinOps team. We do not co-brand, contact your customers directly, or disclose our involvement, except where you specifically request we join a call as part of your team.
        </p>
        <p className="mb-6">
          <strong>Delivery / Subcontract Partner.</strong> Nowazone supplies FinOps delivery capacity to your existing practice as a subcontractor. You retain the customer relationship and commercial terms with your end customer; our relationship with you is governed by an NDA and a subcontract agreement setting out scope, confidentiality and branding rules for that engagement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          3. Commercial Terms
        </h2>
        <p className="mb-6">
          Commercial terms — margin share, referral fee, or wholesale delivery pricing — are agreed per partner, in writing, before any delivery begins, and vary by track, platform scope and volume. Partner delivery work, like our direct client engagements, is priced on a fixed-scope basis and never billed hourly. Specific pricing and margin terms are confidential to each partner agreement and are not published on this website.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          4. Confidentiality &amp; Data Access
        </h2>
        <p className="mb-6">
          All partner engagements begin with a mutual NDA. Where Nowazone requires access to a partner&apos;s or end customer&apos;s cloud environment to deliver FinOps work, access follows our standard read-only access model described in{' '}
          <Link to="/security-compliance" className="text-brand-blue hover:underline font-semibold">
            Security &amp; Compliance
          </Link>{' '}
          — the same model used for direct client engagements.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          5. Branding &amp; Representation
        </h2>
        <p className="mb-3">
          Under the White-Label track, you may present FinOps deliverables (reports, dashboards, recommendations) to your customers under your own brand. You may not represent Nowazone&apos;s certifications, methodology or track record as your own independent credentials to third parties, or imply an exclusive or ownership relationship with Nowazone beyond what your signed agreement grants.
        </p>
        <p className="mb-6">
          Under the Delivery/Subcontract track, any co-branding, disclosure to end customers, or public reference to the partnership requires both parties&apos; written consent.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          6. Term, Exclusivity &amp; Termination
        </h2>
        <p className="mb-6">
          There is no minimum volume commitment and no exclusivity requirement to join the Partner Program — you may start with a single account and scale at your own pace, and may work with other FinOps providers concurrently unless your specific Partner Agreement states otherwise. Either party may terminate the partner relationship per the notice terms in the signed Partner Agreement; open engagements are completed or transitioned in an orderly manner on termination.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          7. Intellectual Property
        </h2>
        <p className="mb-6">
          Nowazone retains ownership of its FinOps methodology, tooling, templates and internal frameworks. Deliverables prepared for a specific partner engagement (reports, dashboards, findings) may be used and re-branded by the partner for that engagement as set out in the applicable agreement, but the underlying methodology and non-engagement-specific materials remain Nowazone&apos;s property.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          8. Liability
        </h2>
        <p className="mb-6">
          Recommendations are professional estimates based on the data and access provided; actual results depend on the partner&apos;s or end customer&apos;s environment and implementation choices. Liability, indemnification and limitation-of-liability terms are set out in the signed Partner Agreement and are not modified by this Policy.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          9. Compliance with Law
        </h2>
        <p className="mb-6">
          Partners agree to comply with applicable law, including any requirements specific to Microsoft CSP or Google Cloud Partner Network programs relevant to the partnership.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          10. Relationship to Other Policies
        </h2>
        <p className="mb-6">
          This Policy supplements, and does not replace, Nowazone&apos;s{' '}
          <Link to="/terms-of-service" className="text-brand-blue hover:underline font-semibold">
            Terms of Service
          </Link>
          ,{' '}
          <Link to="/privacy-policy" className="text-brand-blue hover:underline font-semibold">
            Privacy Policy
          </Link>
          , and{' '}
          <Link to="/data-processing-agreement" className="text-brand-blue hover:underline font-semibold">
            Data Processing Agreement
          </Link>
          , all of which continue to apply to partner use of our website and any data processed on our systems.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          11. Governing Law
        </h2>
        <p className="mb-6">
          These Partner Terms are governed by the laws of India, unless otherwise specified in a signed Partner Agreement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          12. Changes to This Policy
        </h2>
        <p className="mb-6">
          We may update this Policy from time to time. The &ldquo;Effective Date&rdquo; above reflects the most recent revision. Material changes affecting active partners will be communicated directly, in addition to being reflected on this page.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          13. Contact
        </h2>
        <p className="mb-8">
          Questions about the Partner Program or this Policy:{' '}
          <a href="mailto:support@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            support@nowazone.com
          </a>
          . General inquiries:{' '}
          <a href="mailto:info@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            info@nowazone.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};
export default PartnerTermsPolicyPage;
