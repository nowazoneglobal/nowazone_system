import React from 'react';
import { SEO } from '../../components/common/SEO';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Refund Policy | Nowazone"
        description="Our policy on refunds and engagement cancellations across assessments, retainers, and licensing transactions."
      />

      {/* Header */}
      <section className="bg-base-200/60 dark:bg-[#0E1F33] py-14 sm:py-16 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-2.5">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-base-content dark:text-white mb-2">
          Refund Policy
        </h1>
        <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50">
          Nowazone Global Systems Private Limited · Effective Date: 10 September 2026
        </p>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <p className="mb-6">
          This Refund Policy explains how refunds and cancellations are handled across the different types of engagements Nowazone Global Systems Private Limited (&ldquo;Nowazone,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) delivers to clients (&ldquo;you,&rdquo; &ldquo;client&rdquo;). It applies alongside, and does not override, the specific commercial terms of a signed Statement of Work (SOW) and/or Master Service Agreement (MSA). By engaging Nowazone&apos;s services, you agree to the terms below.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          1. Scope
        </h2>
        <p className="mb-6">
          This policy covers three categories of engagement: one-time assessment/diagnostic work, ongoing FinOps or managed service retainers, and Microsoft/Google Cloud licensing or reselling transactions. Each is handled differently, as described below. Nowazone&apos;s pricing is fixed-scope or flat-fee — we do not price engagements as a percentage of savings, and this policy does not tie refunds to a savings outcome.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          2. Assessment &amp; Diagnostic Engagements
        </h2>
        <p className="mb-6">
          Fees for a scoped assessment, cost estimate, or requirement review are earned once the deliverable has been provided and are non-refundable at that point. If you cancel before work has begun, the fee is refunded in full; if work is already underway, any refund reflects the work already performed, at Nowazone&apos;s discretion.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          3. Ongoing FinOps &amp; Managed Service Retainers
        </h2>
        <p className="mb-6">
          Retainer and managed service (AMC) engagements are billed on the cycle set out in the signed agreement. Fees already invoiced for a billing period that has started are not refunded. If you cancel ahead of the notice period in your agreement, unbilled future periods are simply not invoiced — there is nothing further to refund. Notice periods and cancellation mechanics are set out in the governing SOW/MSA.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          4. Cancellation or Non-Delivery by Nowazone
        </h2>
        <p className="mb-6">
          If Nowazone is unable to complete an engagement for reasons within our control, you will receive a <strong>full refund</strong> for any undelivered portion of the work.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          5. Licensing &amp; Reselling Transactions
        </h2>
        <p className="mb-6">
          Microsoft and Google Cloud licensing purchased or resold through Nowazone is subject to the refund, cancellation and proration terms of the underlying vendor program (e.g., Microsoft CSP, Google Cloud Partner Network), which take precedence over this policy for that transaction.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          6. Non-Refundable Items
        </h2>
        <p className="mb-3">The following are non-refundable under any circumstances:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Fees for a completed and delivered assessment or diagnostic phase;</li>
          <li>Any third-party platform or licensing costs already incurred on your behalf during the engagement.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          7. Refund Timeline
        </h2>
        <p className="mb-6">
          Approved refunds are processed within <strong>15–30 business days</strong> of the refund determination being finalized, using the original payment method where possible.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          8. Requesting a Refund
        </h2>
        <p className="mb-6">
          To request a refund or raise a billing dispute, contact us at{' '}
          <a href="mailto:info@nowazone.com" className="text-brand-blue hover:underline font-semibold">
            info@nowazone.com
          </a>{' '}
          with your SOW reference number and any relevant supporting documentation. We will review the request against the terms of the specific signed agreement and respond within a reasonable timeframe.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          9. Disputes
        </h2>
        <p className="mb-6">
          If you disagree with a refund determination, disputes will be handled per the dispute resolution clause in your governing MSA, where one is in place. Where no MSA governs the engagement, disputes will be handled through good-faith negotiation in the first instance.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          10. Governing Law
        </h2>
        <p className="mb-6">
          This Refund Policy is governed by the laws of India.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          11. Changes to This Policy
        </h2>
        <p className="mb-6">
          We may update this Refund Policy from time to time. The &ldquo;Effective Date&rdquo; above reflects the last update. Material changes will not apply retroactively to engagements already under a signed SOW.
        </p>

        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
          12. Contact Us
        </h2>
        <p className="mb-8">
          Billing and refund questions:{' '}
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
export default RefundPolicyPage;
