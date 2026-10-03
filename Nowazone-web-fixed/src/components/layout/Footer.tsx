import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-slate-100 dark:bg-[#0A1830] text-slate-800 dark:text-white pt-16 pb-8 border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12">
          {/* Column 1: Brand & Credibility */}
          <div className="lg:col-span-1.5 flex flex-col">
            <Link to="/" className="inline-block mb-5" aria-label="Nowazone Home">
              <img
                src={theme === 'dark' ? '/nowazone_white.svg' : '/nowazone_black.svg'}
                alt="Nowazone - FinOps & Cloud Cost Optimization"
                width="160"
                height="36"
                loading="lazy"
                className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200"
              />
            </Link>
            <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-white/60 mb-6 max-w-[32ch]">
              We help businesses optimize multi-cloud and AI investments with FinOps discipline, cloud governance and expert engineering.
            </p>
            <div className="flex items-center gap-4 flex-wrap mt-auto">
              <img
                src="/assets/microsoft-partner-badge.png"
                alt="Microsoft Partner"
                width="120"
                height="32"
                loading="lazy"
                className="h-8 w-auto object-contain"
              />
              <div className="flex items-center gap-2">
                <img
                  src="/assets/google-cloud-icon.png"
                  alt="Google Cloud Partner"
                  width="32"
                  height="32"
                  loading="lazy"
                  className="h-8 w-8 object-contain"
                />
                <div className="flex flex-col text-[12px] leading-none font-semibold text-slate-800 dark:text-white/100">
                  <span>Google Cloud</span>
                  <span className="text-slate-500 dark:text-white/50 text-[11px]">Partner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <span className="block font-bold text-[12px] tracking-wider uppercase text-slate-900 dark:text-white/90 mb-4">
              Services
            </span>
            <ul className="space-y-2.5 text-[13.5px] text-slate-600 dark:text-white/65">
              <li><Link to="/finops" className="hover:text-slate-900 dark:hover:text-white transition-colors">FinOps Services</Link></li>
              <li><Link to="/solutions/ai-tokenomics" className="hover:text-slate-900 dark:hover:text-white transition-colors">AI FinOps (Tokenomics)</Link></li>
              <li><Link to="/how-we-work" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cost Optimization</Link></li>
              <li><Link to="/solutions/cloud-architecture" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud Architecture Review</Link></li>
              <li><Link to="/solutions/managed-service" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud Operations</Link></li>
              <li><Link to="/solutions/cloud-migration" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud Migration Services</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <span className="block font-bold text-[12px] tracking-wider uppercase text-slate-900 dark:text-white/90 mb-4">
              Solutions
            </span>
            <ul className="space-y-2.5 text-[13.5px] text-slate-600 dark:text-white/65">
              <li><Link to="/finops" className="hover:text-slate-900 dark:hover:text-white transition-colors">FinOps for Cloud</Link></li>
              <li><Link to="/solutions/ai-tokenomics" className="hover:text-slate-900 dark:hover:text-white transition-colors">FinOps for AI</Link></li>
              <li><Link to="/platforms/databricks-bigquery" className="hover:text-slate-900 dark:hover:text-white transition-colors">FinOps on Databricks</Link></li>
              <li><Link to="/solutions/microsoft-licensing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Microsoft Licensing</Link></li>
              <li><Link to="/solutions/google-cloud-licensing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Google Cloud Reselling</Link></li>
            </ul>
          </div>

          {/* Column 4: Platforms */}
          <div>
            <span className="block font-bold text-[12px] tracking-wider uppercase text-slate-900 dark:text-white/90 mb-4">
              Platforms
            </span>
            <ul className="space-y-2.5 text-[13.5px] text-slate-600 dark:text-white/65">
              <li><Link to="/platforms/azure" className="hover:text-slate-900 dark:hover:text-white transition-colors">Microsoft Azure</Link></li>
              <li><Link to="/platforms/aws" className="hover:text-slate-900 dark:hover:text-white transition-colors">AWS</Link></li>
              <li><Link to="/platforms/google-cloud" className="hover:text-slate-900 dark:hover:text-white transition-colors">Google Cloud</Link></li>
              <li><Link to="/platforms/oracle-cloud" className="hover:text-slate-900 dark:hover:text-white transition-colors">Oracle Cloud (OCI)</Link></li>
              <li><Link to="/platforms/alibaba-cloud" className="hover:text-slate-900 dark:hover:text-white transition-colors">Alibaba Cloud</Link></li>
              <li><Link to="/platforms/multi-cloud" className="hover:text-slate-900 dark:hover:text-white transition-colors">Multi-Cloud &amp; FOCUS</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <span className="block font-bold text-[12px] tracking-wider uppercase text-slate-900 dark:text-white/90 mb-4">
              Company
            </span>
            <ul className="space-y-2.5 text-[13.5px] text-slate-600 dark:text-white/65">
              <li><Link to="/about-us" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/our-process" className="hover:text-slate-900 dark:hover:text-white transition-colors">Our Process</Link></li>
              <li><Link to="/pricing-models" className="hover:text-slate-900 dark:hover:text-white transition-colors leading-tight">FinOps Pricing &amp; Models</Link></li>
              <li><Link to="/partner-program" className="hover:text-slate-900 dark:hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-slate-900 dark:hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact-us" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 6: Direct Contact & Social Profiles */}
          <div>
            <span className="block font-bold text-[12px] tracking-wider uppercase text-slate-900 dark:text-white/90 mb-4">
              Contact &amp; Connect
            </span>
            <div className="space-y-2.5 text-[13.5px] text-slate-600 dark:text-white/65">
              <a href="mailto:info@nowazone.com" className="block hover:text-slate-900 dark:hover:text-white transition-colors">
                info@nowazone.com
              </a>
              <a href="mailto:partners@nowazone.com" className="block hover:text-slate-900 dark:hover:text-white transition-colors">
                partners@nowazone.com
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10">
              <span className="block font-semibold text-[11px] tracking-wider uppercase text-slate-500 dark:text-white/50 mb-2.5">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/nowazone"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nowazone on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-white/10 hover:bg-[#0F62FE] hover:text-white dark:hover:bg-[#0F62FE] text-slate-700 dark:text-white/80 flex items-center justify-center transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.66 1.66 0 0 0-1.67 1.66 1.66 1.66 0 0 0 1.67 1.67 1.66 1.66 0 0 0 1.67-1.67A1.66 1.66 0 0 0 7.83 6.2Z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/nowazone"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nowazone on X / Twitter"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-white/10 hover:bg-[#0F62FE] hover:text-white dark:hover:bg-[#0F62FE] text-slate-700 dark:text-white/80 flex items-center justify-center transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/nowazone"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nowazone on GitHub"
                  className="w-8 h-8 rounded-lg bg-slate-200/80 dark:bg-white/10 hover:bg-[#0F62FE] hover:text-white dark:hover:bg-[#0F62FE] text-slate-700 dark:text-white/80 flex items-center justify-center transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12.5px] text-slate-500 dark:text-white/45">
          <span>&copy; {new Date().getFullYear()} Nowazone Global Systems. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link to="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/data-processing-agreement" className="hover:text-slate-900 dark:hover:text-white transition-colors">Data Processing Agreement</Link>
            <Link to="/partner-terms-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Partner Terms &amp; Policy</Link>
            <Link to="/security-compliance" className="hover:text-slate-900 dark:hover:text-white transition-colors">Security &amp; Compliance</Link>
            <Link to="/trust-and-security" className="hover:text-slate-900 dark:hover:text-white transition-colors">Trust &amp; Security</Link>
            <Link to="/refund-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
