import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { cloudArchitectureSchema } from '../../data/seoSchemas';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { Layers, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export const CloudArchitecturePage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "Do you design the architecture, or just the migration plan?",
      a: "Both, and they're built together. Architecture — landing zone, migration patterns and operating model — is designed alongside the migration strategy, since cost, timeline and architecture decisions all depend on each other."
    },
    {
      q: "Can you review an existing architecture instead of designing a new one?",
      a: "Yes. An architecture review follows the same discipline — landing zone structure, migration readiness and operating model ownership — applied to what you already have instead of a blank slate."
    },
    {
      q: "How does landing zone design relate to cost optimization?",
      a: "Landing zone structure sets the ceiling on what later cost optimization can achieve. Tagging, account structure and network topology decided here determine whether cost allocation and rightsizing are even possible down the line."
    }
  ];

  return (
    <>
      <SEO
        title="Cloud Architecture Services | Landing Zones & Operating Models — Nowazone"
        description="Landing zones, migration patterns and cloud operating models built to last. Design your cloud architecture for cost efficiency and governance."
        canonical="/solutions/cloud-architecture"
        jsonLd={cloudArchitectureSchema}
      />

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Cloud Architecture Services
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Cloud Architecture — Landing Zones, Migration Patterns and Operating Models Built to Last.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Decisions made before migration are cheaper to get right than governance retrofitted onto sprawl later. Nowazone designs the landing zone, the migration path, and operational ownership — before workloads move.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/solutions/cloud-migration"
              className="btn btn-primary text-white font-heading font-bold shadow-lg relative group"
            >
              <CornerMarkers />
              Explore Migration Services
            </Link>
            <button
              type="button"
              onClick={openAssessmentModal}
              className="btn btn-outline border-base-300 font-heading font-semibold"
            >
              Talk to a FinOps Architect
            </button>
          </div>
        </div>
      </section>

      {/* WHY ARCHITECTURE FIRST */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 text-center transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold font-heading mb-2 block">
            Why It Comes First
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4 text-base-content dark:text-white">
            The Decisions That Set Your Cost Floor
          </h2>
          <p className="text-sm md:text-base text-base-content/75 dark:text-slate-300 leading-relaxed">
            Most overspend traces back to architectural choices made before the first VM launched. Hub-spoke networking, transit gateways, VPC peering, and identity silos set the ceiling on what a well-run environment can achieve.
          </p>
        </div>
      </section>

      {/* SECTION 2: LANDING ZONE DESIGN */}
      <section id="landing-zone" className="py-16 sm:py-20 px-6 sm:px-10 bg-base-100 dark:bg-[#070D18] text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          <div>
            <span className="block text-xs uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] font-bold font-heading mb-3">
              Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading mb-4 text-base-content dark:text-white">
              Landing Zone Design
            </h2>
            <p className="text-[15px] text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
              Multi-account hierarchy, network segmentation, zero-trust identity, and security baselines — built as reusable code before workloads land.
            </p>
            <Link
              to="/solutions/cloud-architecture-landing-zone"
              className="inline-flex items-center gap-2 text-[14.5px] font-bold text-[#0F62FE] dark:text-[#60A5FA] font-heading hover:underline"
            >
              See Landing Zone Design details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="border border-base-300 dark:border-white/15 rounded-xl p-6 bg-base-200/50 dark:bg-white/5 space-y-3">
            <div className="p-3.5 bg-base-100 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold mr-2 font-heading">01</span> Account &amp; subscription hierarchy
            </div>
            <div className="p-3.5 bg-base-100 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold mr-2 font-heading">02</span> Network topology, hub-spoke &amp; identity federation
            </div>
            <div className="p-3.5 bg-base-100 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold mr-2 font-heading">03</span> Security guardrails and automated policy baselines
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MIGRATION ARCHITECTURE PATTERNS */}
      <section id="migration-patterns" className="py-16 sm:py-20 px-6 sm:px-10 bg-base-200/50 dark:bg-[#070D18] text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          <div className="order-2 md:order-1 border border-base-300 dark:border-white/15 rounded-xl p-6 bg-base-100 dark:bg-white/5 space-y-3 shadow-sm">
            <div className="p-3.5 bg-base-200/60 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-primary dark:text-[#60a5fa] font-bold mr-2 font-heading">01</span> On-premises to cloud
            </div>
            <div className="p-3.5 bg-base-200/60 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-primary dark:text-[#60a5fa] font-bold mr-2 font-heading">02</span> Virtualization to cloud
            </div>
            <div className="p-3.5 bg-base-200/60 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-primary dark:text-[#60a5fa] font-bold mr-2 font-heading">03</span> Cloud-to-cloud migration
            </div>
            <div className="p-3.5 bg-base-200/60 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-primary dark:text-[#60a5fa] font-bold mr-2 font-heading">04</span> Hybrid &amp; phased migration
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="block text-xs uppercase tracking-widest text-primary dark:text-[#60a5fa] font-bold font-heading mb-3">
              Four Paths
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading mb-4 text-base-content dark:text-white leading-tight">
              Migration Architecture Patterns
            </h2>
            <p className="text-[15px] text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
              On-premises to cloud, virtualization to cloud, cloud-to-cloud, and hybrid — four distinct architecture patterns, each planned differently.
            </p>
            <Link
              to="/solutions/cloud-architecture-patterns"
              className="inline-flex items-center gap-2 text-[14.5px] font-bold text-primary dark:text-[#60a5fa] font-heading hover:underline"
            >
              See all migration architecture patterns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: CLOUD OPERATING MODEL */}
      <section id="operating-model" className="py-16 sm:py-20 px-6 sm:px-10 bg-base-100 dark:bg-[#070D18] text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-center">
          <div>
            <span className="block text-xs uppercase tracking-widest text-[#0F62FE] dark:text-[#60A5FA] font-bold font-heading mb-3">
              Ownership
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-heading mb-4 text-base-content dark:text-white leading-tight">
              Cloud Operating Model
            </h2>
            <p className="text-[15px] text-base-content/75 dark:text-white/70 leading-relaxed mb-6">
              Who owns governance, cost accountability, and incident response after go-live — defined before cutover, not scrambled together after.
            </p>
            <Link
              to="/solutions/cloud-architecture-operating-model"
              className="inline-flex items-center gap-2 text-[14.5px] font-bold text-[#0F62FE] dark:text-[#60A5FA] font-heading hover:underline"
            >
              See the full Cloud Operating Model <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="border border-base-300 dark:border-white/15 rounded-xl p-6 bg-base-200/50 dark:bg-white/5 space-y-3">
            <div className="p-3.5 bg-base-100 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold mr-2 font-heading">01</span> Governance &amp; guardrails
            </div>
            <div className="p-3.5 bg-base-100 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold mr-2 font-heading">02</span> Cost accountability
            </div>
            <div className="p-3.5 bg-base-100 dark:bg-[#0A1830] rounded-lg border border-base-300 dark:border-white/10 text-sm font-semibold">
              <span className="text-[#0F62FE] dark:text-[#60A5FA] font-bold mr-2 font-heading">03</span> Operational ownership
            </div>
          </div>
        </div>
      </section>

      {/* BEYOND ARCHITECTURE: CONNECTS TO MIGRATION & ONGOING OPERATIONS */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2 font-heading">
              Beyond Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-base-content dark:text-white">
              Architecture Connects to Migration and Ongoing Operations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/solutions/cloud-migration"
              className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 hover:border-primary transition-all block shadow-sm"
            >
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Cloud Migration →</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Strategy, cost estimation and execution built on this architecture.
              </p>
            </Link>
            <Link
              to="/solutions/managed-service"
              className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 hover:border-primary transition-all block shadow-sm"
            >
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">Managed Service →</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                AMC support tiers that operate the architecture we design.
              </p>
            </Link>
            <Link
              to="/how-we-work"
              className="border border-base-300 dark:border-white/15 bg-base-100 dark:bg-white/5 rounded-xl p-6 hover:border-primary transition-all block shadow-sm"
            >
              <h3 className="font-bold text-base text-base-content dark:text-white mb-2 font-heading">How We Work →</h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                See architecture review as part of our full engagement framework.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8">Cloud Architecture Questions, Answered.</h2>

          <div className="divide-y divide-base-300">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-heading font-semibold text-base cursor-pointer flex justify-between items-center text-base-content">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-base-content/70 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-14 px-6 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-base-content dark:text-[#f2f2f3] mb-4">
            Design the Architecture Before You Move a Single Workload.
          </h2>
          <Link
            to="/solutions/cloud-migration#requirement-form"
            className="btn btn-primary text-white font-heading font-bold shadow-lg px-8 py-3.5 inline-flex items-center"
          >
            Get a Migration Requirement Review
          </Link>
        </div>
      </section>
    </>
  );
};

