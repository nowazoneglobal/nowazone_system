import React from 'react';
import { SEO } from '../../components/common/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Privacy Policy | Nowazone"
        description="Nowazone Privacy Policy — How we collect, use and protect personal data under DPDP, GDPR, and CCPA."
        canonical="/privacy-policy"
      />

      {/* Header */}
      <section className="bg-base-200/60 dark:bg-[#0E1F33] py-14 sm:py-16 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-2.5">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50">
          Nowazone Global Systems Private Limited · Effective Date: 10 September 2026
        </p>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-6">
          Nowazone Global Systems Private Limited (&ldquo;Nowazone,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains what personal data we collect through our website and lead/assessment forms, how we use it, and the rights you have over it. It applies to visitors and clients located in India, the Gulf region, the United States, the United Kingdom and elsewhere.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          1. Who This Policy Covers
        </h2>
        <p className="mb-6">
          This policy applies to anyone who visits nowazone.com (or successor domains), submits a contact or assessment form, or otherwise shares personal data with us in connection with our cloud FinOps and cloud consulting services.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          2. What Data We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Contact/assessment form data:</strong> name, work email, company name, phone number (if provided), and any details you share about your cloud environment or business needs.
          </li>
          <li>
            <strong>Website usage data:</strong> pages visited, browser/device type, IP address, and similar data collected via cookies and analytics tools.
          </li>
          <li>
            <strong>Engagement-related data:</strong> once you become a client, data exchanged under a signed NDA/MSA/SOW is governed by that agreement, not this public policy — this policy covers our public website and lead-generation activity.
          </li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          3. How We Use Your Data
        </h2>
        <p className="mb-3">We use the data we collect to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Respond to your inquiries and prepare quotes or assessments;</li>
          <li>Deliver and improve our services and website;</li>
          <li>Send you marketing communications, but <strong>only if you&apos;ve opted in</strong>; you can opt out at any time;</li>
          <li>Meet our legal and regulatory obligations.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          4. Legal Basis for Processing
        </h2>
        <p className="mb-3">
          Our primary legal basis for processing personal data is <strong>India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>. Because we also serve visitors and clients based in the UK/EU and the United States, we additionally align our practices with:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-3">
          <li>
            <strong>UK/EU General Data Protection Regulation (GDPR)</strong> principles — including lawful basis for processing, data minimization, and the rights described in Section 8, for visitors located in the UK or EU; and
          </li>
          <li>
            <strong>US state privacy laws</strong> (e.g., the California Consumer Privacy Act (CCPA)/CPRA) for visitors located in applicable US states, including the right to know, delete, and opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information — <strong>we do not sell your personal data.</strong>
          </li>
        </ul>
        <p className="mb-6">Where these frameworks set a higher standard than the DPDP Act for a given visitor, we aim to honor the higher standard.</p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          5. Cookies &amp; Tracking
        </h2>
        <p className="mb-6">
          Our website uses cookies and similar technologies for essential site functionality and analytics (e.g., to understand which pages are most useful), including Google Analytics and other tools. Where required by applicable law, we present a cookie consent mechanism allowing you to accept or decline non-essential cookies.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          6. How We Share Your Data
        </h2>
        <p className="mb-6">
          We do <strong>not sell</strong> your personal data. We may share it with trusted third-party service providers who support our operations (e.g., CRM, email and analytics tools such as Zoho) bound by confidentiality obligations, and with authorities where required by law.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          7. Data Retention
        </h2>
        <p className="mb-6">
          We retain personal data collected through forms and website use for as long as reasonably necessary to fulfill the purposes above, or as required by applicable law, after which it is deleted or anonymized.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          8. Your Rights
        </h2>
        <p className="mb-3">Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Access the personal data we hold about you;</li>
          <li>Correct inaccurate data;</li>
          <li>Request deletion of your data;</li>
          <li>Withdraw consent to marketing communications at any time;</li>
          <li>(UK/EU visitors) Object to or restrict certain processing, and lodge a complaint with your local data protection authority;</li>
          <li>(US state residents) Know what personal data we&apos;ve collected, request deletion, and opt out of &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; — noting again that we do not sell personal data.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          9. Security
        </h2>
        <p className="mb-6">
          We use reasonable technical and organizational measures to protect personal data against unauthorized access, loss, or misuse. No method of transmission or storage is completely secure, but we work to protect your data appropriately.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          10. Children&apos;s Privacy
        </h2>
        <p className="mb-6">
          Our website is intended for business audiences and is not directed at children. We do not knowingly collect personal data from children.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          11. Grievance Officer / Contact
        </h2>
        <p className="mb-6">
          In accordance with the DPDP Act, privacy-related complaints and rights requests can be sent to{' '}
          <a href="mailto:support@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            support@nowazone.com
          </a>
          . General questions:{' '}
          <a href="mailto:info@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            info@nowazone.com
          </a>
          .
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          12. Changes to This Policy
        </h2>
        <p className="mb-8">
          We may update this Privacy Policy from time to time. The &ldquo;Effective Date&rdquo; above reflects the most recent revision. Material changes will be reflected on this page.
        </p>
      </section>
    </div>
  );
};
export default PrivacyPolicyPage;
