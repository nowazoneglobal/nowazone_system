import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { howWeWorkSchema } from '../data/seoSchemas';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { useModal } from '../context/ModalContext';

export const HowWeWorkPage: React.FC = () => {
  const { openAssessment } = useModal();
  const [activeSpine, setActiveSpine] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpine((prev) => (prev + 1) % spineNodes.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const spineNodes = [
    {
      short: 'FinOps',
      title: 'FinOps & Cost Optimization',
      desc: 'Cost allocation, rate optimization and commitment management — the discipline that finds and holds savings across every cloud you run.',
      href: '/finops',
      linkLabel: 'See FinOps as a Service'
    },
    {
      short: 'Governance',
      title: 'Cloud Governance',
      desc: 'Policy, guardrails and compliance controls applied consistently across every environment — not a one-off audit.',
      href: '#governance',
      linkLabel: 'See governance approach'
    },
    {
      short: 'Architecture',
      title: 'Architecture Review',
      desc: 'Evaluating existing cloud architecture for cost, resilience and scalability before you build or scale further.',
      href: '#landing-zone-architecture',
      linkLabel: 'See architecture review'
    },
    {
      short: 'Landing Zone',
      title: 'Landing Zone Setup',
      desc: 'Foundational multi-account/subscription structure, networking and guardrails for teams migrating to or expanding in the cloud.',
      href: '#landing-zone-architecture',
      linkLabel: 'See landing zone setup'
    },
    {
      short: 'Cost Estimation',
      title: 'Cost Estimation',
      desc: 'Pre-migration and pre-project cost modeling so there are no surprises before a workload ships.',
      href: '/cost-estimator',
      linkLabel: 'Open the cost estimator'
    },
    {
      short: 'Optimization',
      title: 'Optimization',
      desc: 'Rightsizing, Reserved Instances, Savings Plans and architectural cost reduction across every workload.',
      href: '/finops',
      linkLabel: 'See optimization approach'
    },
    {
      short: 'Licensing',
      title: 'FinOps for SaaS & Licensing',
      desc: 'The same cost discipline applied to Microsoft and Google licensing spend, not just infrastructure.',
      href: '/solutions/microsoft-licensing-reselling',
      linkLabel: 'See licensing pages'
    },
    {
      short: 'AI Governance',
      title: 'Cloud AI Governance & Cost Control',
      desc: 'Responsible AI usage policy, token/GPU cost allocation and agent cost control.',
      href: '#governance',
      linkLabel: 'See AI governance approach'
    }
  ];

  const methodology = [
    {
      num: '01',
      name: 'Discover',
      desc: 'Read-only connection to billing, usage and architecture across every account you run.'
    },
    {
      num: '02',
      name: 'Assess',
      desc: 'Cost, architecture and governance findings, normalized to FOCUS and quantified.'
    },
    {
      num: '03',
      name: 'Prioritize',
      desc: 'Every finding ranked by savings, risk and effort, agreed with you before anything moves.'
    },
    {
      num: '04',
      name: 'Implement',
      desc: 'Changes executed against a signed statement of work, by us or your team.'
    },
    {
      num: '05',
      name: 'Operate',
      desc: 'Guardrails and reporting keep the environment on plan between reviews.'
    },
    {
      num: '06',
      name: 'Improve',
      desc: 'Every cycle feeds the next — forecasts, benchmarks and guardrails get sharper over time.'
    }
  ];

  const stakeholders = [
    {
      role: 'CFO & Finance',
      needs: 'predictable spend, accurate forecasts, audit-ready allocation.',
      theyGet: 'FOCUS-normalized reporting tied to cost centers, not raw cloud bills.'
    },
    {
      role: 'Engineering Lead',
      needs: "savings that don't cost velocity or reliability.",
      theyGet: 'rightsizing and architecture recommendations scoped with engineering, not imposed on it.'
    },
    {
      role: 'FinOps Practitioner',
      needs: 'a practice that scales past manual spreadsheets.',
      theyGet: 'a dedicated team running the Inform-Optimize-Operate lifecycle alongside them.'
    },
    {
      role: 'Cloud Architect',
      needs: "validation that today's design holds up at tomorrow's scale.",
      theyGet: 'an independent architecture review with no product to sell you.'
    },
    {
      role: 'Procurement & ITAM',
      needs: 'licensing and cloud spend under one coherent view.',
      theyGet: 'the same cost discipline applied to Microsoft and Google licensing as infrastructure.'
    },
    {
      role: 'Business Unit Owner',
      needs: 'to know what their workloads actually cost, without chasing finance.',
      theyGet: 'unit-level allocation they can see and act on directly.'
    }
  ];

  const faqs = [
    {
      q: 'How long does a typical assessment take?',
      a: 'The Free Cost X-Ray Assessment report is delivered within 24 working hours of read-only access. A paid Cloud Cost Leak Review takes 2–5 working days, depending on workload and environment complexity.'
    },
    {
      q: 'Do we have to implement every recommendation?',
      a: 'No. Every finding ships with an estimated saving and effort level — you choose what to action, in what order, and can implement yourself or have us execute it.'
    },
    {
      q: 'Who actually makes the changes — you or us?',
      a: 'Either. Assessments are read-only and advisory. If you move to implementation, we execute against a signed statement of work with elevated, scoped access.'
    },
    {
      q: 'What happens after the engagement ends?',
      a: 'You keep every finding, dashboard and document produced. Access is revoked and any elevated roles are removed as part of a formal handover.'
    },
    {
      q: 'What do you need from us during the engagement?',
      a: 'Read-only access to billing and account data, a signed NDA and MSA, and a point of contact for scoping questions — most of the work happens on our side.'
    },
    {
      q: 'Do you work across multiple clouds in a single engagement?',
      a: 'Yes. Multi-cloud environments are normalized to FOCUS so spend, waste and opportunities are comparable across AWS, Azure, Google Cloud, OCI and Alibaba Cloud in one engagement.'
    },
    {
      q: 'How do you report progress during a recurring engagement?',
      a: 'A standing cadence of reporting plus a live dashboard, with your dedicated account manager reachable for ad hoc questions between reviews.'
    },
    {
      q: 'Can we pause or end a recurring engagement early?',
      a: 'Yes. Recurring engagements run month-to-month with no long-term lock-in — you can pause, adjust scope or end with notice as your needs change.'
    },
    {
      q: 'Is automation mandatory, or can we keep some processes manual?',
      a: 'Automation is optional and scoped with you. Some teams automate guardrails and anomaly response fully; others keep human approval on every change — either is supported.'
    },
    {
      q: 'What\'s the difference between an architecture review and a cost assessment?',
      a: 'A cost assessment finds savings in what\'s already running. An architecture review evaluates whether the underlying design — topology, tiering, data movement — is sound before you build further or migrate more workloads onto it.'
    },
    {
      q: 'Do you help set up landing zones for new cloud environments, or only review existing ones?',
      a: 'Both. For teams starting fresh or expanding into a new region or platform, we design and implement the landing zone — accounts, networking, identity and guardrails. For existing environments, we review and remediate.'
    },
    {
      q: 'Is FinOps for SaaS and licensing part of the same engagement, or separate?',
      a: 'Same team, same governed process — licensing spend gets the same allocation, optimization and forecasting discipline as your infrastructure spend. See Microsoft Licensing and Google Licensing for platform-specific detail.'
    }
  ];

  return (
    <div className="min-h-screen bg-base-100 dark:bg-navy text-base-content dark:text-white transition-colors">
      <SEO
        title="How We Work | Cloud Governance, Architecture Review & FinOps Process — Nowazone"
        description="A proven cloud & FinOps engagement framework: cost, architecture, governance, landing zones and AI tokenomics. Read-only access, NDA first, certified practitioners."
        canonical="https://www.nowazone.com/how-we-work"
        jsonLd={howWeWorkSchema}
      />

      {/* SECTION 1: HERO */}
      <section className="py-20 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            How We Work
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-6 leading-tight tracking-tight">
            A Proven Cloud &amp; FinOps Engagement Framework — Not a One-Time Cleanup.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every engagement — a single assessment or an ongoing managed service — runs on the same governed process: cost, architecture, governance, landing zones and AI tokenomics.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Free Cost X-Ray Assessment
            </button>
            <button
              type="button"
              onClick={openAssessment}
              className="border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm px-6 py-3.5 rounded transition-all"
            >
              Talk to an Expert
            </button>
          </div>
          <div className="flex flex-wrap gap-8 justify-center items-center pt-6 border-t border-base-300 dark:border-white/10 text-xs text-base-content/60 dark:text-white/60">
            <div className="flex items-center gap-2">
              <img src="/assets/microsoft-partner-badge.png" alt="Microsoft Partner" className="h-6 w-auto" />
              <span>Microsoft AI Cloud Partner Program</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/assets/google-cloud-icon.png" alt="Google Cloud" className="h-6 w-6" />
              <span>Google Cloud Partner Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EIGHT DISCIPLINES. ONE ACCOUNTABLE TEAM */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              What We Cover, End to End
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Eight Disciplines. One Accountable Team.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-6">
            {spineNodes.map((node, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSpine(idx)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                  activeSpine === idx
                    ? 'border-primary bg-primary/15 text-primary font-bold shadow-sm'
                    : 'border-base-300 dark:border-white/10 bg-base-100 dark:bg-white/5 text-base-content/70 dark:text-white/70 hover:border-primary/50'
                }`}
              >
                <span className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${
                  activeSpine === idx ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                }`}>
                  0{idx + 1}
                </span>
                <span className="text-xs">{node.short}</span>
              </button>
            ))}
          </div>

          <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-xl text-base-content dark:text-white mb-2">
              {spineNodes[activeSpine].title}
            </h3>
            <p className="text-sm text-base-content/75 dark:text-white/70 max-w-2xl leading-relaxed mb-4">
              {spineNodes[activeSpine].desc}
            </p>
            <Link
              to={spineNodes[activeSpine].href}
              className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-primary hover:underline"
            >
              {spineNodes[activeSpine].linkLabel} →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: 6-STEP METHODOLOGY */}
      <section className="bg-base-200/50 dark:bg-[#0c1a2e] py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase text-blue-500 dark:text-blue-400 font-bold block mb-2">
              Our Methodology
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Discover → Assess → Prioritize → Implement → Operate → Improve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {methodology.map((m, idx) => (
              <div key={idx} className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
                <span className="font-bold text-xl text-blue-500 dark:text-blue-400 block mb-2">{m.num}</span>
                <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">{m.name}</h3>
                <p className="text-xs text-base-content/70 dark:text-white/70 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: GOVERNANCE THAT COVERS WHAT YOU'RE ACTUALLY RUNNING TODAY */}
      <section id="governance" className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Governance, Not Just One Layer
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Governance That Covers What You're Actually Running Today.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-3">Cloud Governance</h3>
              <p className="text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Policy, guardrails and compliance controls applied consistently across every account, subscription and project — not a one-off audit.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-3">AI Governance</h3>
              <p className="text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Responsible usage policy, token and GPU cost allocation, and agent workload controls, so AI spend is governed the same way as infrastructure spend.
              </p>
            </div>
          </div>
          <p className="text-center text-xs sm:text-sm text-base-content/60 dark:text-white/60">
            Governance isn't a separate track from the six-step framework — it's built into Implement and Operate.
          </p>
        </div>
      </section>

      {/* SECTION 5: LANDING ZONES & ARCHITECTURE REVIEWS */}
      <section id="landing-zone-architecture" className="bg-base-200/50 dark:bg-[#0c1a2e] py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Before You Build, or Before You Scale
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Landing Zones and Architecture Reviews — the Decisions That Set Your Cost Floor.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs tracking-wider uppercase text-primary font-bold block mb-3">
                Architecture Review
              </span>
              <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Most cost problems are architectural decisions made months before anyone looked at a bill. We review topology, data movement, tiering and service choice — the findings a resource-level scan never catches.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs tracking-wider uppercase text-primary font-bold block mb-3">
                Landing Zone Setup
              </span>
              <p className="text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                A landing zone — accounts, networking, identity and guardrails — is cheaper to build right the first time than to retrofit governance onto sprawl later, for teams migrating to or expanding in the cloud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: RECOMMENDATIONS DON'T HOLD. AUTOMATION DOES */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              We Automate Governance
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Recommendations Don't Hold. Automation Does.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-base-content dark:text-white mb-2">Policy as Code</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Guardrails enforced automatically at deploy time, not caught in a quarterly review.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-base-content dark:text-white mb-2">Drift &amp; Anomaly Detection</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Configuration drift and spend anomalies flagged and routed the same day they appear.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-base-content dark:text-white mb-2">Scheduled Remediation</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Idle resources, unattached volumes and expiring commitments handled on a schedule you approve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINOPS IS A TEAM SPORT. EVERYONE KEEPS THEIR OWN SCOREBOARD */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Who We Work With
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              FinOps Is a Team Sport. Everyone Keeps Their Own Scoreboard.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stakeholders.map((s, idx) => (
              <div key={idx} className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-base-content dark:text-white mb-3">{s.role}</h3>
                  <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 mb-3 leading-relaxed">
                    <strong className="text-base-content dark:text-white">Needs:</strong> {s.needs}
                  </p>
                </div>
                <div className="pt-3 border-t border-base-200 dark:border-white/10">
                  <p className="text-xs sm:text-sm text-primary font-medium leading-relaxed">
                    <strong className="text-base-content dark:text-white">They get:</strong> {s.theyGet}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOSE THE FINOPS MATURITY GAP — WITH CERTIFIED PRACTITIONERS */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              For Mid-Market &amp; Enterprise
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-2">
              Close the FinOps Maturity Gap — With Certified Practitioners.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-5 text-center shadow-sm">
              <h3 className="font-semibold text-sm text-base-content dark:text-white">FinOps Certified Professional</h3>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-5 text-center shadow-sm">
              <h3 className="font-semibold text-sm text-base-content dark:text-white">FinOps Certified Engineer</h3>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-5 text-center shadow-sm">
              <h3 className="font-semibold text-sm text-base-content dark:text-white">FinOps Certified: Technology Value</h3>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-5 text-center shadow-sm">
              <h3 className="font-semibold text-sm text-base-content dark:text-white">FinOps Certified: AI Value</h3>
            </div>
          </div>
          <p className="text-center text-xs text-base-content/60 dark:text-white/50">
            Individual FinOps Foundation practitioner certifications held by our team — not organizational membership.
          </p>
        </div>
      </section>

      {/* SECTION 9: YOU STAY IN CONTROL AT EVERY STEP */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              You Stay in Control at Every Step
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              You Stay in Control at Every Step.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">We Sign First</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                NDA, MSA and SOW signed before we ever touch access.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">Read-Only Access, Nothing More</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Reader-level roles for the assessment — elevated access only under a signed SOW.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">Dedicated Account Manager, 24/7</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                One accountable point of contact for the life of the engagement.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2">Full Handover &amp; Data Removal</h3>
              <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 leading-relaxed">
                Access revoked and data removed on request when the engagement ends — you keep the findings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: SAME PROCESS, WHICHEVER WAY YOU ENGAGE */}
      <section className="bg-base-200/50 dark:bg-navy-900 py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              What Stays Constant
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Same Process, Whichever Way You Engage.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-primary font-bold block mb-2">Fixed</span>
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-3">Assessment</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                One-time, defined-scope, defined-price review — free Cost X-Ray Assessment (report within 24 working hours) or a paid Cost Leak Review (2–5 working days).
              </p>
            </div>
            <div className="border-2 border-primary bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-primary font-bold block mb-2">Recurring</span>
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-3">Managed Service</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Ongoing FinOps, governance and optimization on a monthly retainer, month-to-month with no lock-in.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-2xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase tracking-wider text-primary font-bold block mb-2">Project</span>
              <h3 className="font-bold text-lg text-base-content dark:text-white mb-3">Engagement</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                A defined initiative — landing zone build, architecture review, migration cost planning — fixed-price start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: METRICS STRIP */}
      <section className="bg-base-200/80 dark:bg-navy py-12 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block mb-2">15–42%</span>
            <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">Average cost savings across engagements</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block mb-2">50%+</span>
            <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">Improvement in operational efficiency</p>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary block mb-2">100%</span>
            <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70">Secure, compliant engagements</p>
          </div>
        </div>
      </section>

      {/* SECTION 12: SEE IT APPLIED TO YOUR PLATFORM */}
      <section id="platforms" className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Same Process, Every Cloud
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              See It Applied to Your Platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/platforms/azure"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 hover:border-primary/50 transition-all block text-center"
            >
              <span className="font-semibold text-sm text-base-content dark:text-white block">Microsoft Azure</span>
            </Link>
            <Link
              to="/platforms/aws"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 hover:border-primary/50 transition-all block text-center"
            >
              <span className="font-semibold text-sm text-base-content dark:text-white block">AWS</span>
            </Link>
            <Link
              to="/platforms/gcp"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 hover:border-primary/50 transition-all block text-center"
            >
              <span className="font-semibold text-sm text-base-content dark:text-white block">Google Cloud</span>
            </Link>
            <Link
              to="/platforms/databricks-bigquery"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 hover:border-primary/50 transition-all block text-center"
            >
              <span className="font-semibold text-sm text-base-content dark:text-white block">Data Platform</span>
            </Link>
            <Link
              to="/solutions/ai-tokenomics"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 hover:border-primary/50 transition-all block text-center"
            >
              <span className="font-semibold text-sm text-base-content dark:text-white block">AI &amp; Agentic AI</span>
            </Link>
            <Link
              to="/solutions/microsoft-licensing-reselling"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 hover:border-primary/50 transition-all block text-center"
            >
              <span className="font-semibold text-sm text-base-content dark:text-white block">Microsoft Licensing (Reseller)</span>
            </Link>
            <Link
              to="/solutions/google-licensing-reselling"
              className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 hover:border-primary/50 transition-all block text-center"
            >
              <span className="font-semibold text-sm text-base-content dark:text-white block">Google Cloud Licensing (Reseller)</span>
            </Link>
            <Link
              to="/cost-estimator"
              className="border-2 border-primary bg-primary/10 rounded-xl p-5 hover:bg-primary/20 transition-all block text-center"
            >
              <span className="font-bold text-sm text-primary block">Cost Estimator →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 13: COMMON QUESTIONS */}
      <section className="py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              How We Work FAQ
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              Common Questions.
            </h2>
          </div>
          <div className="divide-y divide-base-300 dark:divide-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-semibold text-sm sm:text-base text-base-content dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 mt-2 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: FINAL CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-16 px-6 sm:px-10 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl mb-4 text-base-content dark:text-white">
            Ready to See the Process on Your Own Environment?
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
            Get an actionable 24-hour FinOps readout without touching your running workloads.
          </p>
          <button
            type="button"
            onClick={openAssessment}
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
          >
            <CornerMarkers />
            Free Cost X-Ray Assessment
          </button>
        </div>
      </section>
    </div>
  );
};

export default HowWeWorkPage;

