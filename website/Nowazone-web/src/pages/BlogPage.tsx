import React, { useState, useMemo } from 'react';
import { SEO } from '../components/common/SEO';
import { useModal } from '../context/ModalContext';

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  tint: string;
  iconKey: 'cost' | 'finops' | 'ai' | 'migration' | 'licensing' | 'security';
  status: string;
}

const CATEGORIES = ['All', 'FinOps', 'Cloud Cost', 'Cloud Migration', 'AI & Tokenomics', 'Licensing', 'Security'];

const POSTS: BlogPost[] = [
  {
    title: 'Why Your Cloud Bill Doesn\u2019t Match Your Budget (And How to Fix the Gap)',
    excerpt: 'The most common reasons forecasted cloud spend and actual spend diverge \u2014 and the allocation fixes that close the gap.',
    category: 'Cloud Cost',
    tint: '#0a63ce',
    iconKey: 'cost',
    status: 'coming-soon'
  },
  {
    title: 'FinOps Maturity: What "Crawl, Walk, Run" Actually Looks Like in Practice',
    excerpt: 'A practical breakdown of the FinOps Foundation maturity model, mapped to what teams actually do at each stage.',
    category: 'FinOps',
    tint: '#10B981',
    iconKey: 'finops',
    status: 'coming-soon'
  },
  {
    title: 'GPU Idle Time Is the New Cloud Waste \u2014 Here\u2019s How to Find It',
    excerpt: 'Token cost gets the attention, but idle GPU utilization is often the bigger line item. A framework for finding it.',
    category: 'AI & Tokenomics',
    tint: '#a78bfa',
    iconKey: 'ai',
    status: 'coming-soon'
  },
  {
    title: 'Reserved Instances vs. Savings Plans: Choosing Without Guessing',
    excerpt: 'A decision framework for AWS commitment strategy based on workload volatility, not vendor sales pressure.',
    category: 'Cloud Cost',
    tint: '#0a63ce',
    iconKey: 'cost',
    status: 'coming-soon'
  },
  {
    title: 'Migration Cost Overruns: The Architecture Decisions That Cause Them',
    excerpt: 'Most migration budget overruns trace back to a handful of landing zone and network decisions made too late.',
    category: 'Cloud Migration',
    tint: '#f59e0b',
    iconKey: 'migration',
    status: 'coming-soon'
  },
  {
    title: 'CSP vs. EA: What Actually Changes When You Switch Microsoft Licensing Models',
    excerpt: 'A concrete comparison of Cloud Solution Provider and Enterprise Agreement licensing \u2014 cost, flexibility and support.',
    category: 'Licensing',
    tint: '#60a5fa',
    iconKey: 'licensing',
    status: 'coming-soon'
  },
  {
    title: 'Tagging Strategy That Survives Contact With a Real Organization',
    excerpt: 'Most tagging policies fail within a quarter. The governance structure that keeps allocation data usable.',
    category: 'FinOps',
    tint: '#10B981',
    iconKey: 'finops',
    status: 'coming-soon'
  },
  {
    title: 'What Read-Only Access Actually Means in a FinOps Engagement',
    excerpt: 'Breaking down the access model \u2014 what a reader role can and can\u2019t see \u2014 and why it matters for procurement sign-off.',
    category: 'Security',
    tint: '#0a63ce',
    iconKey: 'security',
    status: 'coming-soon'
  },
  {
    title: 'BigQuery Slot Reservations: When They Save Money and When They Don\u2019t',
    excerpt: 'On-demand vs. flat-rate BigQuery pricing, and the query volume threshold where reservations start paying off.',
    category: 'Cloud Cost',
    tint: '#0a63ce',
    iconKey: 'cost',
    status: 'coming-soon'
  },
];

export const BlogPage: React.FC = () => {
  const { openAssessmentModal } = useModal();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Newsletter state
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'otp' | 'subscribed'>('idle');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [otpValue, setOtpValue] = useState<string>('');

  const filtered = useMemo(() => {
    return POSTS.filter(p => {
      const catOk = activeCategory === 'All' || p.category === activeCategory;
      const term = searchTerm.trim().toLowerCase();
      const searchOk = !term || p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term);
      return catOk && searchOk;
    });
  }, [activeCategory, searchTerm]);

  const showFeatured = activeCategory === 'All' && !searchTerm.trim();
  const featured = POSTS[0];
  const listPosts = showFeatured ? filtered.slice(1) : filtered;
  const visiblePosts = listPosts.slice(0, visibleCount);
  const canLoadMore = listPosts.length > visibleCount;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterStatus('otp');
    }
  };

  const handleVerifyNewsletterOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('subscribed');
  };

  const renderIcon = (iconKey: string, tint: string) => {
    switch (iconKey) {
      case 'finops':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 12l1.8 1.8L15 10" />
          </svg>
        );
      case 'cost':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        );
      case 'migration':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="1.5">
            <path d="M4 12h11M11 6l5 6-5 6" />
            <path d="M15 6h5v12h-5" />
          </svg>
        );
      case 'ai':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        );
      case 'licensing':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="1.5">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        );
      case 'security':
      default:
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="1.5">
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );
    }
  };

  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Blog | FinOps, Cloud Cost & AI Governance Insights — Nowazone"
        description="Nowazone's blog on FinOps, cloud cost optimization, cloud migration, AI cost governance and Microsoft/Google licensing — practical guidance, not vendor fluff."
      />

      {/* Hero + Search */}
      <section className="bg-base-100 dark:bg-[#0E1F33] py-14 sm:py-20 px-6 sm:px-10 text-center relative overflow-hidden border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-blue-400 mb-3.5">
            Blog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content dark:text-white tracking-tight leading-tight mb-4">
            FinOps, Cloud Cost &amp; AI Governance — Without the Vendor Spin.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-3 leading-relaxed">
            Practical guidance on cloud cost optimization, migration, AI cost governance and licensing — written for the people who actually have to act on it.
          </p>
          <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/45 max-w-xl mx-auto mb-8">
            Articles below are in progress — check back soon, or subscribe to get notified the moment they publish.
          </p>

          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search articles..."
              className="w-full pl-11 pr-5 py-3 rounded-full border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/10 text-base-content dark:text-white placeholder-base-content/50 dark:placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-sm"
            />
            <svg
              className="w-4 h-4 text-base-content/50 dark:text-white/50 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <path d="M21 21l-4.3-4.3" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </section>

      {/* Category Pills (Sticky) */}
      <section className="bg-base-100 dark:bg-brand-dark py-4 px-6 sm:px-10 border-b border-base-300 dark:border-gray-800 sticky top-16 z-20 shadow-sm backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Post (Only shown when viewing 'All' and no search term) */}
      {showFeatured && featured && (
        <section className="bg-gray-50 dark:bg-brand-dark/40 py-10 sm:py-14 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-brand-navy">
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3">
                  Featured · {featured.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
                  {featured.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 dark:bg-brand-blue/20 px-3.5 py-1.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
              <div className="bg-blue-50/50 dark:bg-brand-obsidian flex items-center justify-center p-12">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#0F62FE" strokeWidth="1.3">
                  <path d="M4 19h16M4 19V7l8-4 8 4v12" />
                  <path d="M9 19v-6h6v6" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-6xl mx-auto">
        {filtered.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visiblePosts.map((post, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col bg-white dark:bg-brand-navy hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div
                    className="h-36 flex items-center justify-center"
                    style={{ backgroundColor: `${post.tint}12` }}
                  >
                    {renderIcon(post.iconKey, post.tint)}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2.5">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2.5">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="pt-2">
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 dark:bg-brand-blue/15 px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {canLoadMore && (
              <div className="text-center mt-10">
                <button
                  type="button"
                  onClick={() => setVisibleCount(c => c + 6)}
                  className="px-7 py-3 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-base">No articles match &ldquo;{searchTerm}&rdquo; — try a different search or category filter.</p>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-base-200/60 dark:bg-brand-obsidian py-14 sm:py-20 px-6 sm:px-10 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content dark:text-white mb-3">
            Get New Articles as They Publish.
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 mb-8">
            No spam — just FinOps and cloud cost insights, occasionally.
          </p>

          {newsletterStatus === 'otp' && (
            <div className="max-w-sm mx-auto">
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 mb-4">
                We sent a 6-digit code to <strong className="text-base-content dark:text-white">{newsletterEmail}</strong> to confirm it's really you.
              </p>
              <form onSubmit={handleVerifyNewsletterOtp} className="flex flex-col gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={otpValue}
                  onChange={e => setOtpValue(e.target.value)}
                  placeholder="123456"
                  className="w-full text-center tracking-[0.3em] text-lg px-4 py-3 rounded-lg border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/10 text-base-content dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-sm"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm rounded-lg transition-colors shadow-md"
                >
                  Verify &amp; Subscribe
                </button>
              </form>
            </div>
          )}

          {newsletterStatus === 'subscribed' && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                ✓ You&apos;re subscribed — verified and confirmed.
              </p>
            </div>
          )}

          {newsletterStatus === 'idle' && (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 px-4 py-3 rounded-lg border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/10 text-base-content dark:text-white placeholder-base-content/50 dark:placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm rounded-lg transition-colors whitespace-nowrap shadow-md"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
export default BlogPage;
