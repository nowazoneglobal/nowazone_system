import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const SecurityCompliancePage: React.FC = () => {
  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Security & Compliance | Nowazone"
        description="How Nowazone accesses your cloud environment: NDA, MCA and SOW before any access, read-only by default, scoped and revocable permissions, breach notification and data retention."
        canonical="/security-compliance"
      />

      {/* Header */}
      <section className="bg-base-200/60 dark:bg-[#0E1F33] py-14 sm:py-16 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-2.5">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white mb-2">
          Security &amp; Compliance Policy
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50">
          Nowazone Global Systems Private Limited · Effective Date: 10 September 2026
        </p>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-6">
          This page describes how Nowazone accesses, protects and handles data in the course of delivering cloud FinOps and cloud consulting engagements. It supplements, and should be read alongside, our{' '}
          <Link to="/data-processing-agreement" className="text-brand-blue hover:underline font-semibold">
            Data Processing Agreement
          </Link>
          , which governs data processing terms contractually.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          1. Paperwork Before Permissions
        </h2>
        <p className="mb-3">The same sequence applies to every client, regardless of engagement size:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>NDA signed</strong> — confidentiality is in place before any conversation about your environment goes deeper than a scoping call.
          </li>
          <li>
            <strong>MCA in place</strong> — the Master Client Agreement sets the terms, liabilities and data-handling obligations that govern every SOW under it.
          </li>
          <li>
            <strong>SOW defines scope</strong> — the Statement of Work states exactly which accounts, subscriptions and datasets the engagement touches, and for how long.
          </li>
          <li>
            <strong>Access granted</strong> — only then do we request the specific, scoped permissions the SOW calls for, read-only unless the SOW says otherwise.
          </li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          2. Read-Only by Default
        </h2>
        <p className="mb-6">
          For assessment and analysis work — the majority of engagements — we request read-only permissions on cost management, billing exports and architecture/configuration metadata. We cannot change, delete or provision anything under this access. Nowazone does not request, and does not hold, the ability to modify, delete, or provision resources in a client&apos;s environment as part of standard assessment access.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          3. Write Access, By Exception Only
        </h2>
        <p className="mb-6">
          If your SOW includes implementation — applying rightsizing changes, configuring Savings Plans or reservations, adjusting governance policies — we request write access scoped strictly to that phase and those resources, and only after you provide it. The exact scope of write access is written into the SOW before access is granted, never assumed or expanded mid-engagement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          4. What We Access, and What We Never Touch
        </h2>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">What we access:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Cloud architecture and configuration metadata, for environment reviews and FinOps assessments;</li>
          <li>Cost management dashboards and billing data across the accounts/subscriptions named in the SOW;</li>
          <li>Usage and cost exports (CSV) for offline analysis of utilization, rightsizing and savings opportunities;</li>
          <li>Any additional system access you choose to provide for the specific activity requested.</li>
        </ul>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">What we never touch:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Delete, change or provisioning rights on any resource — unless a signed SOW phase explicitly grants write access for implementation work;</li>
          <li>Accounts, subscriptions or datasets outside what the SOW names;</li>
          <li>Any system or data you have not explicitly granted access to for the activity in question.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          5. Confidentiality &amp; Personnel
        </h2>
        <p className="mb-6">
          All Nowazone personnel and sub-processors with access to client data are bound by confidentiality obligations. Access to client data is limited to personnel who need it to perform the specific engagement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          6. Data in Transit &amp; Storage
        </h2>
        <p className="mb-6">
          Data is encrypted in transit where supported by the underlying platform, and engagement data is stored securely. Access controls and security practices are reviewed periodically as an engagement evolves.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          7. Sub-processors
        </h2>
        <p className="mb-6">
          Nowazone uses a limited set of sub-processors (e.g., CRM, email and analytics tools such as Zoho) to support operations, each bound by confidentiality and data protection obligations materially equivalent to our own. See our{' '}
          <Link to="/data-processing-agreement" className="text-brand-blue hover:underline font-semibold">
            Data Processing Agreement
          </Link>{' '}
          for the full sub-processor framework.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          8. Breach Notification
        </h2>
        <p className="mb-6">
          If Nowazone becomes aware of a data breach affecting personal data processed under an engagement, affected clients are notified without undue delay, and in any event within <strong>72 hours</strong> of becoming aware — consistent with the notification obligations in our Data Processing Agreement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          9. Data Retention &amp; Deletion
        </h2>
        <p className="mb-6">
          Engagement data is deleted within <strong>30 days</strong> of an engagement&apos;s completion or termination, except where retention is required by law, for the establishment or defense of legal claims, or otherwise agreed in writing with the client.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          10. Certifications &amp; Independent Audits
        </h2>
        <p className="mb-6">
          Nowazone does not currently hold a formal third-party security certification such as SOC 2 or ISO 27001. Our security practices are built around the read-only access model, confidentiality obligations, and data handling terms described above and in our Data Processing Agreement. Clients with specific compliance or audit requirements should raise them during contracting so they can be addressed directly in the engagement agreement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          11. How This Relates to Our Other Policies
        </h2>
        <p className="mb-6">
          This page works alongside our{' '}
          <Link to="/data-processing-agreement" className="text-brand-blue hover:underline font-semibold">
            Data Processing Agreement
          </Link>{' '}
          (contractual data processing terms),{' '}
          <Link to="/privacy-policy" className="text-brand-blue hover:underline font-semibold">
            Privacy Policy
          </Link>{' '}
          (website and lead data) and{' '}
          <Link to="/terms-of-service" className="text-brand-blue hover:underline font-semibold">
            Terms of Service
          </Link>{' '}
          (site use terms).
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          12. Questions
        </h2>
        <p className="mb-8">
          Questions about our security and access practices:{' '}
          <a href="mailto:info@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            info@nowazone.com
          </a>{' '}
          or{' '}
          <a href="mailto:support@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            support@nowazone.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};
export default SecurityCompliancePage;
