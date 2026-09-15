import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const DataProcessingAgreementPage: React.FC = () => {
  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Data Processing Agreement | Nowazone"
        description="Contractual data processing terms for Nowazone client engagements, covering DPDP Act, GDPR SCCs, sub-processors and breach notification."
        canonical="/data-processing-agreement"
      />

      {/* Header */}
      <section className="bg-base-200/60 dark:bg-[#0E1F33] py-14 sm:py-16 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-2.5">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white mb-2">
          Data Processing Agreement
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50">
          Nowazone Global Systems Private Limited · Effective Date: 10 September 2026
        </p>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-6">
          This Data Processing Agreement (&ldquo;DPA&rdquo;) forms part of, and is incorporated by reference into, the Statement of Work (SOW) and/or Master Service Agreement (MSA) (&ldquo;Agreement&rdquo;) between Nowazone Global Systems Private Limited (&ldquo;Nowazone,&rdquo; &ldquo;Processor&rdquo;) and the client entering into that Agreement (&ldquo;Client,&rdquo; &ldquo;Controller&rdquo;). It applies wherever Nowazone processes personal data on the Client&apos;s behalf in the course of delivering cloud FinOps and cloud consulting engagements. Where this DPA conflicts with the Agreement on data protection matters, this DPA governs.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          1. Definitions
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Personal Data</strong> means any information relating to an identified or identifiable natural person that Nowazone processes on the Client&apos;s behalf under the Agreement.
          </li>
          <li>
            <strong>Processing</strong> means any operation performed on Personal Data, including collection, storage, analysis, transmission, and deletion.
          </li>
          <li>
            <strong>Data Subject</strong> means the individual to whom Personal Data relates.
          </li>
          <li>
            <strong>Controller</strong> means the Client, who determines the purposes and means of Processing.
          </li>
          <li>
            <strong>Processor</strong> means Nowazone, who processes Personal Data on the Controller&apos;s behalf and instructions.
          </li>
          <li>
            <strong>Sub-processor</strong> means any third party engaged by Nowazone to process Personal Data on the Controller&apos;s behalf.
          </li>
          <li>
            <strong>Applicable Data Protection Law</strong> means India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and, where applicable to the Client, the UK/EU General Data Protection Regulation (GDPR) and US state privacy laws (e.g., CCPA/CPRA).
          </li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          2. Roles of the Parties
        </h2>
        <p className="mb-6">
          For Personal Data processed under an engagement, the Client acts as Controller and Nowazone acts as Processor. Nowazone processes Personal Data only on the Client&apos;s documented instructions, including those set out in the Agreement, unless required to do otherwise by applicable law — in which case Nowazone will inform the Client of that legal requirement before processing, unless the law prohibits such notice.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          3. Scope and Purpose of Processing
        </h2>
        <p className="mb-3">Nowazone processes Personal Data solely to perform the services described in the Agreement, which may include:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Cloud cost, billing, and usage analysis across the Client&apos;s Azure, AWS, Google Cloud, OCI, Alibaba Cloud, or data platform accounts;</li>
          <li>Architecture review and FinOps assessment reporting;</li>
          <li>Communication with Client personnel in connection with the engagement (names, work emails, and similar business contact data).</li>
        </ul>
        <p className="mb-6">
          Nowazone does not process Personal Data for any purpose other than delivering the engagement, and does not sell or use it for its own marketing purposes.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          4. Nowazone&apos;s Obligations
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Process Personal Data only on the Client&apos;s documented instructions;</li>
          <li>Ensure personnel authorized to process Personal Data are bound by confidentiality obligations;</li>
          <li>
            Access cloud environments on a <strong>read-only, least-privilege</strong> basis, consistent with our Terms of Service — Nowazone does not request the ability to modify, delete, or provision resources as part of standard assessment access;
          </li>
          <li>Implement reasonable technical and organizational security measures appropriate to the risk, as described in Section 8;</li>
          <li>Assist the Client, at the Client&apos;s reasonable request, in responding to Data Subject rights requests and regulatory inquiries relating to Personal Data processed under the Agreement;</li>
          <li>Notify the Client of a Personal Data Breach as described in Section 7;</li>
          <li>Delete or return Personal Data on termination of the engagement, as described in Section 9.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          5. Sub-processors
        </h2>
        <p className="mb-4">
          The Client authorizes Nowazone to engage sub-processors to support delivery of the engagement, including CRM, email, and analytics tools such as Zoho, provided each sub-processor is bound by confidentiality and data protection obligations materially equivalent to those in this DPA. Nowazone remains responsible for each sub-processor&apos;s compliance with this DPA.
        </p>
        <p className="mb-6">
          Nowazone will notify the Client of any intended addition or replacement of a sub-processor with access to Personal Data, giving the Client a reasonable opportunity to object on legitimate data protection grounds before the change takes effect.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          6. International Data Transfers
        </h2>
        <p className="mb-6">
          Where Personal Data is transferred outside the country in which it was collected — including from the UK/EU or the United States to India — Nowazone relies on the <strong>Standard Contractual Clauses (SCCs)</strong> (or an equivalent lawful transfer mechanism recognized under Applicable Data Protection Law) to ensure the transfer is adequately protected. On request, Nowazone will execute the applicable SCC module with the Client.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          7. Data Breach Notification
        </h2>
        <p className="mb-6">
          If Nowazone becomes aware of a Personal Data Breach affecting Personal Data processed under the Agreement, Nowazone will notify the Client <strong>without undue delay, and in any event within 72 hours</strong> of becoming aware, providing the information reasonably available at the time (nature of the breach, categories and approximate number of Data Subjects and records affected, likely consequences, and measures taken or proposed). Nowazone will cooperate with the Client and provide reasonable further information as the investigation progresses.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          8. Security Measures
        </h2>
        <p className="mb-3">
          Nowazone maintains reasonable technical and organizational measures designed to protect Personal Data against unauthorized access, loss, alteration, or misuse, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Read-only, least-privilege access to Client cloud environments, scoped to the engagement;</li>
          <li>Access controls limiting Personal Data access to personnel who need it to perform the engagement;</li>
          <li>Confidentiality obligations binding all personnel and sub-processors with access to Personal Data;</li>
          <li>Encryption of data in transit where supported by the underlying platform, and secure storage of engagement data;</li>
          <li>Periodic review of access and security practices as the engagement evolves.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          9. Data Retention &amp; Deletion
        </h2>
        <p className="mb-6">
          Nowazone deletes Personal Data processed under the Agreement within <strong>30 days of the engagement&apos;s completion or termination</strong>, except where retention is required by applicable law, for the establishment or defense of legal claims, or where otherwise agreed in writing with the Client.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          10. Audits &amp; Compliance
        </h2>
        <p className="mb-6">
          This DPA, together with the representations in our{' '}
          <Link to="/privacy-policy" className="text-brand-blue hover:underline font-semibold">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms-of-service" className="text-brand-blue hover:underline font-semibold">
            Terms of Service
          </Link>
          , sets out how Nowazone processes and protects Personal Data. Nowazone does not offer a formal third-party audit right under this DPA; Clients with specific compliance or due-diligence requirements should raise them during contracting so they can be addressed in the Agreement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          11. Liability
        </h2>
        <p className="mb-6">
          Liability arising under this DPA is subject to the limitation of liability clause in the Client&apos;s signed MSA. Nothing in this DPA expands either party&apos;s liability beyond what is agreed in the Agreement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          12. Term &amp; Termination
        </h2>
        <p className="mb-6">
          This DPA remains in effect for as long as Nowazone processes Personal Data on the Client&apos;s behalf under the Agreement, and terminates automatically on completion of the deletion obligations in Section 9 following the end of the engagement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          13. Changes to This DPA
        </h2>
        <p className="mb-6">
          We may update this DPA from time to time to reflect changes in our practices or Applicable Data Protection Law. The &ldquo;Effective Date&rdquo; above reflects the most recent revision. Material changes will not apply retroactively to an engagement already governed by a signed SOW/MSA without the Client&apos;s agreement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          14. Governing Law &amp; Jurisdiction
        </h2>
        <p className="mb-6">
          This DPA is governed by the laws of India, and the courts at Hyderabad, India have exclusive jurisdiction over disputes arising from it, consistent with our Terms of Service.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          15. Contact Us
        </h2>
        <p className="mb-8">
          Questions about this DPA, or to request the applicable Standard Contractual Clauses module, contact{' '}
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
export default DataProcessingAgreementPage;
