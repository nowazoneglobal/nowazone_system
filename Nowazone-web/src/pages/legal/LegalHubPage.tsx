import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';

const LEGAL_DOCS = [
  {
    title: 'Privacy Policy',
    description: 'How we collect, use and protect personal data.',
    path: '/privacy-policy',
  },
  {
    title: 'Terms of Service',
    description: 'Terms governing use of our website and services.',
    path: '/terms-of-service',
  },
  {
    title: 'Security & Compliance',
    description: 'How we access, protect and handle your data.',
    path: '/security-compliance',
  },
  {
    title: 'Refund Policy',
    description: 'Our policy on refunds and engagement cancellations.',
    path: '/refund-policy',
  },
  {
    title: 'Data Processing Agreement',
    description: 'Contractual data processing terms for engagements.',
    path: '/data-processing-agreement',
  },
  {
    title: 'Partner Terms & Policy',
    description: 'Terms governing our reseller and partner relationships.',
    path: '/partner-terms-policy',
  },
  {
    title: 'Trust & Security',
    description: 'Our security architecture, read-only model, and candid disclosure.',
    path: '/trust-and-security',
  },
];

export const LegalHubPage: React.FC = () => {
  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Legal | Nowazone"
        description="Nowazone legal documents — privacy policy, terms of service, security & compliance, refund policy, data processing agreement and partner terms."
      />

      {/* Hero */}
      <section className="bg-base-200/60 dark:bg-[#0E1F33] py-14 sm:py-20 px-6 sm:px-10 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue mb-2.5">
          Legal
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content dark:text-white mb-2">
          Legal Documents
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 dark:text-white/60 max-w-xl mx-auto">
          Clear, honest, and binding documentation covering our services, data handling, and partnerships.
        </p>
      </section>

      {/* Documents List */}
      <section className="py-14 sm:py-20 px-6 sm:px-10 max-w-3xl mx-auto">
        <div className="flex flex-col gap-4">
          {LEGAL_DOCS.map((doc, idx) => (
            <Link
              key={idx}
              to={doc.path}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-navy hover:-translate-y-0.5 hover:shadow-md transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-blue transition-colors">
                  {doc.title}
                </span>
                <span className="text-brand-blue text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View →
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-white/60 mt-1">
                {doc.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default LegalHubPage;
