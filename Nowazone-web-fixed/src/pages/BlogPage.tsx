import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SEO } from '../components/common/SEO';
import { useModal } from '../context/ModalContext';
import { subscribeNewsletter } from '../api/forms';
import { apiUrl } from '../api/base';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt?: string;
  author?: { name: string };
  categories?: BlogCategory[];
  tags?: { name: string; slug: string }[];
  views?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ─── Icon helpers ───────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  'FinOps': '#10B981',
  'Cloud Cost': '#0a63ce',
  'Cloud Migration': '#f59e0b',
  'AI & Tokenomics': '#a78bfa',
  'Licensing': '#60a5fa',
  'Security': '#0a63ce',
};

function getCategoryColor(name: string): string {
  return CATEGORY_COLORS[name] || '#0F62FE';
}

function PostIcon({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M4 19h16M4 19V7l8-4 8 4v12" />
      <path d="M9 19v-6h6v6" />
    </svg>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

const STATIC_CATEGORIES = ['All', 'FinOps', 'Cloud Cost', 'Cloud Migration', 'AI & Tokenomics', 'Licensing', 'Security'];

export const BlogPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  // ── Server data state ────────────────────────────────────────────────────────
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ── Filter / search state ────────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState(1);

  // ── Newsletter state ─────────────────────────────────────────────────────────
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  // ── Fetch posts ──────────────────────────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '9' });
      if (searchTerm.trim()) params.set('search', searchTerm.trim());
      const res = await fetch(apiUrl(`/api/posts/public?${params.toString()}`));
      const json = await res.json();
      if (json.status === 'success') {
        setPosts(json.data ?? []);
        setPagination(json.pagination ?? null);
      } else {
        setFetchError(json.message || 'Failed to load articles.');
      }
    } catch {
      setFetchError('Could not reach the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ── Client-side category filter (categories come from post metadata) ─────────
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter(p =>
      p.categories?.some(c => c.name === activeCategory)
    );
  }, [posts, activeCategory]);

  const featured = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);
  const showFeatured = activeCategory === 'All' && !searchTerm.trim() && filteredPosts.length > 0;

  // ── Newsletter handler ───────────────────────────────────────────────────────
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    try {
      const res = await subscribeNewsletter({ email: newsletterEmail });
      if (res.status === 'success') {
        setNewsletterStatus('success');
        setNewsletterMessage(res.message || 'You\'re subscribed!');
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterMessage('Could not connect. Please try again later.');
    }
  };

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const firstCategoryName = (post: BlogPost) => post.categories?.[0]?.name || 'Article';

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="font-montserrat text-brand-dark dark:text-gray-100 min-h-screen">
      <SEO
        title="Blog | FinOps, Cloud Cost & AI Governance Insights — Nowazone"
        description="Nowazone's blog on FinOps, cloud cost optimization, cloud migration, AI cost governance and Microsoft/Google licensing — practical guidance, not vendor fluff."
        canonical="/blog"
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
          {posts.length === 0 && !loading && (
            <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/45 max-w-xl mx-auto mb-8">
              Articles are being prepared — check back soon, or subscribe below to get notified the moment they publish.
            </p>
          )}

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
          {STATIC_CATEGORIES.map(cat => {
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

      {/* Loading state */}
      {loading && (
        <section className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm text-base-content/60 dark:text-white/50">Loading articles...</p>
        </section>
      )}

      {/* Error state */}
      {!loading && fetchError && (
        <section className="py-24 text-center max-w-lg mx-auto px-6">
          <p className="text-red-500 dark:text-red-400 font-medium mb-3">{fetchError}</p>
          <button
            type="button"
            onClick={fetchPosts}
            className="px-5 py-2.5 rounded-lg border border-brand-blue text-brand-blue text-sm font-semibold hover:bg-brand-blue hover:text-white transition-colors"
          >
            Try Again
          </button>
        </section>
      )}

      {/* Featured Post */}
      {!loading && !fetchError && showFeatured && featured && (
        <section className="bg-gray-50 dark:bg-brand-dark/40 py-10 sm:py-14 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-brand-navy">
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-3">
                  Featured · {firstCategoryName(featured)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4">
                  <a
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
                  >
                    Read Article →
                  </a>
                  {featured.publishedAt && (
                    <span className="text-xs text-gray-400">{formatDate(featured.publishedAt)}</span>
                  )}
                </div>
              </div>
              <div
                className="flex items-center justify-center p-12 min-h-[200px]"
                style={{ backgroundColor: `${getCategoryColor(firstCategoryName(featured))}12` }}
              >
                {featured.featuredImage ? (
                  <img
                    src={featured.featuredImage}
                    alt={featured.title}
                    width="400"
                    height="192"
                    loading="lazy"
                    className="max-h-48 object-contain rounded-lg"
                  />
                ) : (
                  <PostIcon color={getCategoryColor(firstCategoryName(featured))} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      {!loading && !fetchError && (
        <section className="py-12 sm:py-16 px-6 sm:px-10 max-w-6xl mx-auto">
          {filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {(showFeatured ? gridPosts : filteredPosts).map((post) => {
                  const color = getCategoryColor(firstCategoryName(post));
                  return (
                    <div
                      key={post._id}
                      className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col bg-white dark:bg-brand-navy hover:-translate-y-1 hover:shadow-lg transition-all"
                    >
                      <div
                        className="h-36 flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: `${color}12` }}
                      >
                        {post.featuredImage ? (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            width="360"
                            height="144"
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <PostIcon color={color} />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2.5">
                          {firstCategoryName(post)}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2.5">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed mb-4 flex-grow">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="pt-2 flex items-center justify-between">
                          <a
                            href={`/blog/${post.slug}`}
                            className="inline-block text-xs font-bold uppercase tracking-wider text-brand-blue hover:underline"
                          >
                            Read More →
                          </a>
                          {post.publishedAt && (
                            <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= pagination.pages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty state — no posts yet */
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-brand-blue/20 mb-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0F62FE" strokeWidth="1.5">
                  <path d="M4 19h16M4 19V7l8-4 8 4v12" />
                  <path d="M9 19v-6h6v6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {searchTerm ? `No articles matching "${searchTerm}"` : 'Articles Coming Soon'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                {searchTerm
                  ? 'Try a different search term or browse by category.'
                  : 'Our team is writing in-depth guides on FinOps, cloud cost optimization, and AI governance. Subscribe below to be notified first.'}
              </p>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => { setSearchTerm(''); setPage(1); }}
                  className="mt-5 px-5 py-2.5 rounded-lg border border-brand-blue text-brand-blue text-sm font-semibold hover:bg-brand-blue hover:text-white transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-base-200/60 dark:bg-brand-obsidian py-14 sm:py-20 px-6 sm:px-10 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content dark:text-white mb-3">
            Get New Articles as They Publish.
          </h2>
          <p className="text-sm sm:text-base text-base-content/75 dark:text-white/70 mb-8">
            No spam — just FinOps and cloud cost insights, occasionally.
          </p>

          {newsletterStatus === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                ✓ {newsletterMessage || "You're subscribed — we'll notify you when new articles publish."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={newsletterStatus === 'loading'}
                className="flex-1 px-4 py-3 rounded-lg border border-base-300 dark:border-white/20 bg-base-100 dark:bg-white/10 text-base-content dark:text-white placeholder-base-content/50 dark:placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-sm disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm rounded-lg transition-colors whitespace-nowrap shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
              >
                {newsletterStatus === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : 'Subscribe'}
              </button>
            </form>
          )}

          {newsletterStatus === 'error' && (
            <p className="mt-3 text-sm text-red-500 dark:text-red-400">{newsletterMessage}</p>
          )}
        </div>
      </section>
    </div>
  );
};
export default BlogPage;
