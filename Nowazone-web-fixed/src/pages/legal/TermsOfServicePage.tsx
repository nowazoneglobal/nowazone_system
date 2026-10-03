import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Terms of Service | Nowazone"
        description="Terms governing your access to and use of the Nowazone website, read-only data access principles, and engagement agreements."
        canonical="/terms-of-service"
      />

      {/* Header */}
      <section className="bg-base-200/60 dark:bg-[#0E1F33] py-14 sm:py-16 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-2.5">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white mb-2">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50">
          Nowazone Global Systems Private Limited · Effective Date: 10 September 2026
        </p>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-4">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website operated by Nowazone Global Systems Private Limited (&ldquo;Nowazone,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), a private limited company incorporated under the Companies Act, 2013, including its content, service descriptions, and lead/assessment forms (the &ldquo;Site&rdquo;). By using the Site, you agree to these Terms.
        </p>
        <p className="mb-6">
          Nowazone is a <strong>cloud FinOps and cloud consulting service provider</strong>. Where a client&apos;s engagement requires it, we may also sell or facilitate third-party software licenses, tools, or platform subscriptions, either directly or through a third-party marketplace. Every client relationship is built on a scoped, signed engagement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          1. Relationship Between These Terms and Your Engagement Agreement
        </h2>
        <p className="mb-4">
          These Terms govern use of the <strong>Site only</strong> — browsing, submitting inquiry/assessment forms, and reading published content. They are <strong>not</strong> the contract under which we deliver consulting services.
        </p>
        <p className="mb-6">
          Once you engage us, the actual services — scope, deliverables, timeline, fees and cloud access — are governed exclusively by your signed <strong>Statement of Work (SOW)</strong> and/or <strong>Master Service Agreement (MSA)</strong>, together with our <strong>NDA</strong> where applicable. If anything in these Terms conflicts with your signed SOW/MSA, <strong>the SOW/MSA governs</strong> for that engagement. These Terms never modify or override an executed agreement.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          2. Read-Only Access &amp; Data Ownership
        </h2>
        <p className="mb-3">Trust in how we access your cloud environment is core to how we work, so we state it here plainly:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            Where an engagement requires cloud access, Nowazone uses <strong>read-only, least-privilege access</strong> to your cloud accounts (Azure, AWS, Google Cloud, OCI, or other platforms as applicable) to perform cost analysis, architecture review, and FinOps assessment work. We do not obtain, and do not request, the ability to modify, delete, or provision resources in your environment as part of standard assessment access.
          </li>
          <li>
            <strong>We claim no ownership over your data.</strong> Your cloud billing data, architecture information, cost data, and any other information you share with us remains yours. These Terms do not grant Nowazone any license or rights to your data beyond what is needed to deliver the engagement described in your SOW.
          </li>
          <li>
            Any reports, dashboards, or analysis we generate specifically for your environment are yours as set out in your SOW&apos;s intellectual property clause. Nowazone retains ownership of its own pre-existing methodology, automation scripts, and tooling used to produce that work.
          </li>
          <li>
            Access is provisioned and revoked as agreed in your SOW/MSA — you retain the right to revoke our access at any time.
          </li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          3. Use of the Site
        </h2>
        <p className="mb-3">You agree to use the Site only for lawful purposes and in a way that does not restrict or interfere with anyone else&apos;s use of it. You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Attempt to gain unauthorized access to the Site or our systems;</li>
          <li>Submit false or misleading information through our contact or assessment forms;</li>
          <li>Use automated tools (bots, scrapers) to extract content from the Site without our prior written consent;</li>
          <li>Upload or transmit anything containing viruses, malware, or other harmful code;</li>
          <li>Use our name, logo, or any content from the Site to imply an endorsement, partnership, or affiliation that does not exist.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          4. Content, Intellectual Property &amp; Brand
        </h2>
        <p className="mb-4">
          All content on the Site — including text, graphics, service descriptions, methodology summaries, logos, and design — is owned by or licensed to Nowazone and protected by applicable intellectual property law. You may view Site content for personal, non-commercial reference. You may not reproduce, distribute, modify, or create derivative works from it without our prior written permission.
        </p>
        <p className="mb-4">
          <strong>Trademarks:</strong> &ldquo;Nowazone,&rdquo; our logo, and related marks are the property of Nowazone Global Systems Private Limited. You may not use them in advertising, publicity, or elsewhere without our prior written consent.
        </p>
        <p className="mb-6">
          <strong>Third-party marks:</strong> References to Microsoft, Azure, AWS, Google Cloud, OCI, Databricks, or other third-party platforms and partner programs are used to describe our service scope and verified partner status; they do not imply those companies endorse Nowazone beyond any partnership actually held, and remain the property of their respective owners.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          5. Contact and Assessment Forms
        </h2>
        <p className="mb-6">
          Information submitted through our contact or assessment forms is handled per our{' '}
          <Link to="/privacy-policy" className="text-brand-blue hover:underline font-semibold">
            Privacy Policy
          </Link>
          . Submitting a form does not create a client engagement, a contractual obligation, or any commitment on either side. An engagement begins only once a signed SOW and/or MSA is executed by both parties.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          6. No Professional Advice via the Site
        </h2>
        <p className="mb-6">
          Content on the Site — blog posts, service descriptions, methodology explanations, or general commentary on cloud cost optimization — is for general informational purposes only and is not specific advice for your organization&apos;s environment. Specific, actionable recommendations and deliverables are only provided as part of a formal, scoped engagement under a signed SOW.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          7. Third-Party Links
        </h2>
        <p className="mb-6">
          The Site may link to third-party websites (e.g., cloud provider documentation, partner resources). We don&apos;t control, and aren&apos;t responsible for, the content, accuracy, or practices of any third-party site you access from a link on our Site.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          8. Disclaimer of Warranties
        </h2>
        <p className="mb-6">
          The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or secure. This disclaimer applies to the <strong>website only</strong> — warranties and service-level commitments for an actual engagement are set out in your SOW/MSA, not here.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          9. Limitation of Liability
        </h2>
        <p className="mb-6">
          To the maximum extent permitted by applicable law, Nowazone is not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site. This limitation applies only to Site use — liability for a live consulting engagement is governed by the limitation-of-liability clause in your signed MSA, which is negotiated separately.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          10. Indemnification (Site Use)
        </h2>
        <p className="mb-6">
          You agree to indemnify and hold Nowazone harmless from claims arising out of your misuse of the Site or violation of these Terms. Indemnification obligations related to an actual engagement (e.g., breach of confidentiality, IP infringement) are addressed separately in your MSA.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          11. Force Majeure
        </h2>
        <p className="mb-6">
          Neither Nowazone nor you will be responsible for delays or failures in performance caused by events beyond reasonable control, including natural disasters, acts of government, war, civil unrest, labor disputes, or failures of third-party infrastructure (including cloud provider outages).
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          12. Publicity
        </h2>
        <p className="mb-6">
          Neither party will publicly announce or advertise the existence of a client relationship with the other without prior written consent — this protects your confidentiality as a client and is addressed further in your NDA/MSA where applicable.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          13. Representations
        </h2>
        <p className="mb-6">
          By using this Site on behalf of an organization, you represent that you are authorized to do so and to submit inquiries or assessment requests on that organization&apos;s behalf.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          14. General
        </h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>
            <strong>Severability:</strong> If any provision of these Terms is found invalid or unenforceable, that provision will be struck and the remaining provisions will remain in effect.
          </li>
          <li>
            <strong>No Waiver:</strong> Our failure to enforce any provision does not waive our right to enforce it later.
          </li>
          <li>
            <strong>Assignment:</strong> We may assign these Terms in connection with a merger, acquisition, or sale of assets; you may not assign your rights under these Terms without our consent.
          </li>
          <li>
            <strong>Entire Agreement:</strong> For Site use, these Terms are the entire agreement between you and Nowazone regarding the Site, superseding any prior understanding on that subject. They do not replace or amend any signed SOW, MSA, or NDA governing an actual engagement.
          </li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          15. Changes to These Terms
        </h2>
        <p className="mb-6">
          We may update these Terms from time to time. The &ldquo;Effective Date&rdquo; above reflects the most recent revision. Material changes will not apply retroactively to an engagement already governed by a signed SOW/MSA.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          16. Governing Law &amp; Jurisdiction
        </h2>
        <p className="mb-6">
          These Terms are governed by the laws of India, and the courts at Hyderabad, India have exclusive jurisdiction over disputes arising from Site use.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          17. Contact Us
        </h2>
        <p className="mb-8">
          Questions about these Terms:{' '}
          <a href="mailto:info@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            info@nowazone.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};
export default TermsOfServicePage;
