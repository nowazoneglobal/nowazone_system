import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, MapPin, Briefcase } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { submitJobApplication, submitGeneralProfile, uploadResume } from '../api/forms';
import { apiUrl } from '../api/base';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatType(type: string): string {
  const map: Record<string, string> = {
    full_time: 'Full-Time',
    part_time: 'Part-Time',
    contract: 'Contract',
    remote: 'Remote',
    hybrid: 'Hybrid',
    onsite: 'On-Site',
  };
  return map[type] ?? type;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CareersPage: React.FC = () => {
  // ── Jobs state ──────────────────────────────────────────────────────────────
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(apiUrl('/api/jobs/public'))
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        if (data.status === 'success') {
          setJobs(data.data.jobs ?? []);
        } else {
          setFetchError(data.message || 'Failed to load openings.');
        }
      })
      .catch(() => {
        if (!cancelled) setFetchError('Could not reach the server. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  // ── Derived departments ─────────────────────────────────────────────────────
  const departments = ['All', ...Array.from(new Set(jobs.map(j => j.department))).sort()];
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const filteredJobs = selectedDept === 'All' ? jobs : jobs.filter(j => j.department === selectedDept);

  // ── UI state ────────────────────────────────────────────────────────────────
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [applyModalRole, setApplyModalRole] = useState<string | null>(null);
  const [applicantData, setApplicantData] = useState({
    fullName: '', email: '', phone: '', linkedinUrl: '', coverNote: '', resumeFile: null as File | null
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'good' | 'honest' | 'looking'>('good');

  // Close on Escape and lock page scroll while the apply modal is open
  useEffect(() => {
    if (!applyModalRole) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setApplyModalRole(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [applyModalRole]);

  const tabs = [
    {
      key: 'good' as const,
      label: 'The Good Part',
      body: "You'll work directly on real client environments early, with visibility into how the business actually runs — pricing, positioning, delivery — not just your slice of it."
    },
    {
      key: 'honest' as const,
      label: 'The Honest Part',
      body: 'This is an early-stage team. Some things are still being figured out as we go, including process and tooling that a larger company would already have standardized.'
    },
    {
      key: 'looking' as const,
      label: "What We're Looking For",
      body: "People who are comfortable with some ambiguity, want direct client exposure, and are motivated by building a practice rather than joining a fully-built one."
    }
  ];

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const job = jobs.find(j => j._id === applyModalRole);

      // Upload resume first (PDF required by the form), then submit with its URL
      let resumeUrl: string | undefined;
      if (applicantData.resumeFile) {
        const uploadRes = await uploadResume(applicantData.resumeFile);
        if (uploadRes.status !== 'success' || !uploadRes.data?.url) {
          throw new Error(uploadRes.message || 'Resume upload failed. Please try again.');
        }
        resumeUrl = uploadRes.data.url;
      }

      const linkedinNote = applicantData.linkedinUrl
        ? `LinkedIn / Portfolio: ${applicantData.linkedinUrl}\n\n`
        : '';

      if (job) {
        const res = await submitJobApplication(job._id, {
          applicantName: applicantData.fullName,
          applicantEmail: applicantData.email,
          applicantPhone: applicantData.phone || undefined,
          resumeUrl,
          coverLetter: linkedinNote + applicantData.coverNote || undefined,
          source: 'direct',
        });
        if (res.status !== 'success') throw new Error(res.message || 'Failed to submit application.');
      } else {
        const res = await submitGeneralProfile({
          applicantName: applicantData.fullName,
          email: applicantData.email,
          phone: applicantData.phone || undefined,
          resumeUrl,
          notes: (linkedinNote + applicantData.coverNote) || undefined,
        });
        if (res.status !== 'success') throw new Error(res.message || 'Failed to submit application.');
      }
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Careers | Build the FinOps Practice of the Future — Nowazone"
        description="Join Nowazone — build the FinOps practice more companies will need. Open roles in FinOps, engineering and delivery, remote-first."
        canonical="https://www.nowazone.com/careers"
      />

      {/* HERO */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 text-center transition-colors">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            Careers at Nowazone
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight tracking-tight">
            Build the FinOps Practice More Companies Will Need.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto leading-relaxed">
            We're small, focused and growing — every hire shapes how this practice works, not just fills a seat. Open roles below are remote-first; apply directly and a real person reviews every application.
          </p>
        </div>
      </section>

      {/* CULTURE REALITY */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase text-blue-500 dark:text-blue-400 font-bold block mb-2">
              Why Join Now
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              What Joining Early Actually Means Here
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">Real Ownership</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                There isn't a rigid bureaucracy yet — you help build how things get done, not just execute someone else's playbook.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">Certified, Not Titled</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Every practitioner is supported toward official FinOps Foundation certifications (Professional, Engineer, AI Value).
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">Client-Facing Day One</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                No multi-year ladder before you talk to a client — direct access and clear accountability from day one.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">Remote-First</h3>
              <p className="text-xs text-base-content/75 dark:text-white/70 leading-relaxed">
                Work is structured around output and client delivery windows, not arbitrary desk hours in a physical office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT'S ACTUALLY LIKE (TABBED) */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs tracking-widest uppercase text-primary dark:text-blue-400 font-bold block mb-2">
              No sugar-coating
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              What It's Actually Like Right Now.
            </h2>
          </div>

          <div className="flex gap-2.5 justify-center flex-wrap mb-8">
            {tabs.map(t => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                  activeTab === t.key
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-base-100 dark:bg-transparent border-base-300 dark:border-white/25 text-base-content/75 dark:text-white/75 hover:border-primary/50 dark:hover:border-white/50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="border border-base-300 dark:border-white/15 rounded-2xl p-8 bg-base-100 dark:bg-white/5 shadow-sm">
            <p className="text-sm sm:text-base text-base-content/85 dark:text-white/90 leading-relaxed">
              {tabs.find(t => t.key === activeTab)?.body}
            </p>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Realistic, not polished
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-3">
              What Culture Actually Means Here, Right Now.
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
              We're not going to describe a culture bigger than what exists yet. Here's what's actually true about working at Nowazone today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Small Team, Direct Access</h3>
              <p className="text-xs text-base-content/70 dark:text-white/70 leading-relaxed">
                There's no layer of management between you and the decisions that matter. You'll talk to whoever needs to be in the conversation, including leadership, regularly.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Async-Friendly, Client-Timezone Aware</h3>
              <p className="text-xs text-base-content/70 dark:text-white/70 leading-relaxed">
                Work is structured around client delivery windows and outcomes, not fixed office hours — with the understanding that client-facing commitments come first.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Learning Happens on Real Engagements</h3>
              <p className="text-xs text-base-content/70 dark:text-white/70 leading-relaxed">
                Certification support and skill growth happen alongside real client work, not through a separate training track disconnected from what you're actually doing.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-200/50 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">Growing, Which Means Some Things Aren't Settled Yet</h3>
              <p className="text-xs text-base-content/70 dark:text-white/70 leading-relaxed">
                Compensation structure, internal tooling, and role definitions are still evolving as the team grows — that's the honest tradeoff of joining early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Opportunities
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-6">
              Current Openings
            </h2>

            {/* Department Filter Pills — dynamically derived from fetched data */}
            {!loading && !fetchError && jobs.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {departments.map(dept => (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                      selectedDept === dept
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-base-100 dark:bg-white/5 text-base-content/70 dark:text-white/70 border-base-300 dark:border-white/10 hover:border-primary/50'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-base-300 dark:border-white/10 rounded-2xl p-6 animate-pulse">
                  <div className="h-5 bg-base-300 dark:bg-white/10 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-base-300 dark:bg-white/10 rounded w-1/4" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && fetchError && (
            <div className="border border-error/30 bg-error/5 rounded-2xl p-8 text-center">
              <p className="text-sm text-error font-semibold mb-1">Couldn't load openings</p>
              <p className="text-xs text-base-content/60 dark:text-white/50">{fetchError}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && !fetchError && jobs.length === 0 && (
            <div className="border border-base-300 dark:border-white/10 rounded-2xl p-10 text-center">
              <p className="text-base font-semibold text-base-content dark:text-white mb-2">No open roles right now</p>
              <p className="text-xs sm:text-sm text-base-content/60 dark:text-white/50 mb-6">
                We're not always hiring publicly — send a general application and we'll keep your profile.
              </p>
              <button
                type="button"
                onClick={() => { setApplyModalRole('general'); setSubmitted(false); setSubmitError(null); }}
                className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded hover:bg-primary-focus transition-all"
              >
                Send a General Application →
              </button>
            </div>
          )}

          {/* Role Accordion List */}
          {!loading && !fetchError && filteredJobs.length > 0 && (
            <div className="space-y-4">
              {filteredJobs.map(r => (
                <div key={r._id} className="group border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl overflow-hidden shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
                  <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-base-content dark:text-white mb-1 group-hover:text-primary transition-colors">{r.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-base-content/60 dark:text-white/60">
                        <span>{r.department}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{r.location}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{formatType(r.type)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setExpandedRole(expandedRole === r._id ? null : r._id)}
                        aria-expanded={expandedRole === r._id}
                        className="flex-1 sm:flex-none px-4 py-2 border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 hover:border-primary/50 rounded text-xs font-semibold text-base-content dark:text-white transition-all inline-flex items-center justify-center gap-1.5"
                      >
                        {expandedRole === r._id ? 'Hide Details' : 'View Role'}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedRole === r._id ? 'rotate-180' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => { setApplyModalRole(r._id); setSubmitted(false); setSubmitError(null); }}
                        className="flex-1 sm:flex-none px-5 py-2 bg-primary text-white rounded text-xs font-bold hover:bg-primary-focus transition-all shadow-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {expandedRole === r._id && (
                    <div className="p-6 pt-0 border-t border-base-200 dark:border-white/10 mt-2 space-y-4 text-xs sm:text-sm text-base-content/80 dark:text-white/100">
                      <p className="leading-relaxed text-base-content dark:text-white font-medium">{r.description}</p>
                      {r.responsibilities?.length > 0 && (
                        <div>
                          <h4 className="font-bold text-base-content dark:text-white mb-2">What you'll do:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-xs">
                            {r.responsibilities.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {r.requirements?.length > 0 && (
                        <div>
                          <h4 className="font-bold text-base-content dark:text-white mb-2">What we're looking for:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-xs">
                            {r.requirements.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {r.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {r.skills.map((s, i) => (
                            <span key={i} className="text-[10px] px-2.5 py-1 bg-primary/10 text-primary rounded-full font-semibold">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && !fetchError && jobs.length > 0 && (
            <div className="text-center mt-10 text-xs sm:text-sm text-base-content/70 dark:text-white/70">
              Don't see a role that fits?{' '}
              <button
                type="button"
                onClick={() => { setApplyModalRole('general'); setSubmitted(false); setSubmitError(null); }}
                className="text-primary font-bold hover:underline"
              >
                Send a general application anyway →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="bg-base-200/80 dark:bg-navy-950 py-14 px-6 border-t border-base-300 dark:border-white/10 text-base-content dark:text-white transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-primary dark:text-blue-400 font-bold block mb-2 font-heading">
              Want more context first?
            </span>
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            <Link
              to="/how-we-work"
              className="flex-1 min-w-[260px] max-w-sm border border-base-300 dark:border-white/15 rounded-xl p-6 bg-base-100 dark:bg-navy-900/60 hover:border-primary transition-all group shadow-sm"
            >
              <span className="flex items-center justify-between font-heading font-semibold text-sm text-base-content dark:text-white group-hover:text-primary transition-colors">
                See how we work with clients <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/about-us"
              className="flex-1 min-w-[260px] max-w-sm border border-base-300 dark:border-white/15 rounded-xl p-6 bg-base-100 dark:bg-navy-900/60 hover:border-primary transition-all group shadow-sm"
            >
              <span className="flex items-center justify-between font-heading font-semibold text-sm text-base-content dark:text-white group-hover:text-primary transition-colors">
                Learn more about Nowazone <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* APPLICATION MODAL (z-40: sits below the fixed navbar so navigation stays visible) */}
      {applyModalRole && (
        <div
          className="fixed inset-0 z-40 bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 pt-24 pb-8 animate-fadeSlide"
          onClick={() => setApplyModalRole(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Job application form"
            className="bg-base-100 dark:bg-navy-light border border-base-300 dark:border-white/10 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative max-h-full overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setApplyModalRole(null)}
              aria-label="Close application form"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-base-content/60 dark:text-white/60 hover:text-base-content dark:hover:text-white hover:bg-base-200 dark:hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"></path></svg>
                </div>
                <h3 className="font-bold text-xl text-base-content dark:text-white mb-1">Application Received!</h3>
                <p className="text-xs text-base-content/70 dark:text-white/70 mb-6">
                  Thank you for applying. We will review your background and reach out within a week.
                </p>
                <button
                  type="button"
                  onClick={() => setApplyModalRole(null)}
                  className="px-6 py-2 bg-primary text-white rounded text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold block mb-1">Applying for</span>
                  <h3 className="font-bold text-lg text-base-content dark:text-white">
                    {jobs.find(j => j._id === applyModalRole)?.title || 'General Application'}
                  </h3>
                </div>

                {submitError && (
                  <div className="border border-error/30 bg-error/10 rounded px-3 py-2 text-xs text-error font-medium">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantData.fullName}
                    onChange={e => setApplicantData({ ...applicantData, fullName: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={applicantData.email}
                    onChange={e => setApplicantData({ ...applicantData, email: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    value={applicantData.phone}
                    onChange={e => setApplicantData({ ...applicantData, phone: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">LinkedIn / Portfolio URL (optional)</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={applicantData.linkedinUrl}
                    onChange={e => setApplicantData({ ...applicantData, linkedinUrl: e.target.value })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Resume (PDF) *</label>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    required
                    onChange={e => setApplicantData({ ...applicantData, resumeFile: e.target.files?.[0] ?? null })}
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded px-3 py-2 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:text-xs file:font-semibold file:cursor-pointer"
                  />
                  {applicantData.resumeFile && (
                    <p className="text-[11px] text-base-content/60 dark:text-white/50 mt-1">
                      Selected: {applicantData.resumeFile.name} ({Math.round(applicantData.resumeFile.size / 1024)} KB)
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-base-content dark:text-white block mb-1">Anything you'd like us to know? (optional)</label>
                  <textarea
                    rows={3}
                    value={applicantData.coverNote}
                    onChange={e => setApplicantData({ ...applicantData, coverNote: e.target.value })}
                    placeholder="Tell us what excites you about FinOps or cloud optimization..."
                    className="w-full border border-base-300 dark:border-white/15 bg-base-100 dark:bg-navy rounded p-3 text-xs sm:text-sm text-base-content dark:text-white outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-primary text-white font-bold text-xs sm:text-sm rounded hover:bg-primary-focus transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CareersPage;
