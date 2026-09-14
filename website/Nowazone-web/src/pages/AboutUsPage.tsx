import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { useModal } from '../context/ModalContext';

export const AboutUsPage: React.FC = () => {
  const { openAssessment } = useModal();

  return (
    <div className="min-h-screen">
      <SEO
        title="About Us | Our Mission, Vision & Values — Nowazone"
        description="Nowazone is a vendor-independent FinOps and cloud cost optimization partner, and a Microsoft and Google Cloud partner. Our mission, vision and values behind cloud financial management done right."
        canonical="https://www.nowazone.com/about-us"
      />

      {/* HERO */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-primary font-bold bg-primary/10 border border-primary/30 px-3.5 py-1.5 rounded-full mb-6">
            About Nowazone
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-base-content dark:text-white mb-5 leading-tight tracking-tight">
            A Cloud Partner That Isn't Paid to Push a Cloud.
          </h1>
          <p className="text-base sm:text-lg text-base-content/75 dark:text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Nowazone is a FinOps as a Service and cloud cost optimization partner — and an authorized Microsoft and Google Cloud partner — built on one idea: your cloud bill should reflect what your business actually needs, not what's easiest to sell you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={openAssessment}
              className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
            >
              <CornerMarkers />
              Free Cost X-Ray Assessment
            </button>
            <Link
              to="/our-process"
              className="inline-flex items-center px-6 py-3.5 border border-base-300 dark:border-white/20 hover:bg-base-200 dark:hover:bg-white/5 text-base-content dark:text-white font-semibold text-sm rounded transition-all"
            >
              See Our Process
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-base-100 dark:bg-navy py-14 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-8 shadow-sm">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3">
              Our Mission
            </span>
            <p className="text-base sm:text-lg font-medium leading-relaxed text-base-content dark:text-white">
              To make cloud and AI spend as intentional as any other business investment — giving every organization the FinOps discipline usually reserved for the largest tech companies.
            </p>
          </div>
          <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-8 shadow-sm">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-3">
              Our Vision
            </span>
            <p className="text-base sm:text-lg font-medium leading-relaxed text-base-content dark:text-white">
              A future where no organization overpays for cloud or AI capacity by default — where cost visibility and governance are built in from day one, across every platform.
            </p>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="bg-base-200/50 dark:bg-navy py-16 px-6 sm:px-10 text-base-content dark:text-white border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs tracking-widest uppercase text-blue-500 dark:text-blue-400 font-bold block mb-3">
              Why We Exist
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white mb-4 leading-tight">
              Most Cloud Bills Are Wrong by 15–42%.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-base-content/75 dark:text-white/70 mb-4">
              Resellers are incentivized to sell more licenses. Cloud providers are incentivized to sell more capacity. Internal teams are busy shipping products, not auditing bills. Nobody in that chain is specifically incentivized to help you spend less.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-base-content/75 dark:text-white/70">
              Nowazone exists to be that missing incentive — a partner whose success is measured by your savings, not your spend.
            </p>
          </div>

          <div className="bg-base-100 dark:bg-navy-light border border-base-300 dark:border-white/10 rounded-2xl p-6 sm:p-8 divide-y divide-base-300 dark:divide-white/10 shadow-sm">
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-sm text-base-content/80 dark:text-white/80">Average savings identified</span>
              <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">15–42%</span>
            </div>
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-sm text-base-content/80 dark:text-white/80">Platforms covered</span>
              <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">7+</span>
            </div>
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-sm text-base-content/80 dark:text-white/80">Time to first findings</span>
              <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">24 hrs</span>
            </div>
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-sm text-base-content/80 dark:text-white/80">Cloud partnerships</span>
              <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">Microsoft &amp; Google Cloud</span>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-base-100 dark:bg-navy py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-widest uppercase text-primary font-bold block mb-2">
              Our Values
            </span>
            <h2 className="font-semibold text-2xl sm:text-3xl text-base-content dark:text-white">
              What We Won't Compromise On.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">
                Vendor Independence
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                We recommend what's right for you — even if that means recommending a competitor's platform.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">
                Radical Transparency
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                Every finding is documented with the exact dollar impact and how we calculated it.
              </p>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-base text-base-content dark:text-white mb-2">
                Outcome Over Hours
              </h3>
              <p className="text-xs sm:text-sm text-base-content/75 dark:text-white/70 leading-relaxed">
                We bill on outcomes, retainers, and value delivered — not on running up the billable clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-base-200/80 dark:bg-[#0a1830] py-14 px-6 sm:px-10 text-center text-base-content dark:text-white border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-xl mx-auto">
          <h2 className="font-semibold text-2xl sm:text-3xl mb-4 text-base-content dark:text-white">
            See What We Can Find In Your Environment.
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 dark:text-white/70 mb-6">
            No disruption, zero invasive access, and complete NDA protection.
          </p>
          <button
            type="button"
            onClick={openAssessment}
            className="relative inline-flex items-center px-7 py-3.5 bg-primary text-white font-bold text-sm rounded shadow-lg hover:bg-primary-focus transition-all animate-ctaGlow"
          >
            <CornerMarkers />
            Start My Free Assessment
          </button>
        </div>
      </section>
    </div>
  );
};
export default AboutUsPage;
