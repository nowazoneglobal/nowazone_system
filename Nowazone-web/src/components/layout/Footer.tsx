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
                alt="Nowazone"
                className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-200"
              />
            </Link>
            <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-white/60 mb-6 max-w-[32ch]">
              We help businesses optimize cloud and AI investments with FinOps discipline, cloud governance and expert engineering.
            </p>
            <div className="flex items-center gap-4 flex-wrap mt-auto">
              <img
                src="/assets/microsoft-partner-badge.png"
                alt="Microsoft Partner"
                className="h-8 w-auto object-contain"
              />
              <div className="flex items-center gap-2">
                <img
                  src="/assets/google-cloud-icon.png"
                  alt="Google Cloud"
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
              <li><Link to="/how-we-work" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud Cost Optimization</Link></li>
              <li><Link to="/cloud-architecture" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud Architecture Review</Link></li>
              <li><Link to="/managed-service" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud Operations</Link></li>
              <li><Link to="/cloud-migration" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cloud Migration Services</Link></li>
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
              <li><Link to="/microsoft-licensing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Microsoft Licensing</Link></li>
              <li><Link to="/google-cloud-licensing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Google Cloud Reselling</Link></li>
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

          {/* Column 6: Direct Contact */}
          <div>
            <span className="block font-bold text-[12px] tracking-wider uppercase text-slate-900 dark:text-white/90 mb-4">
              Contact
            </span>
            <div className="space-y-2.5 text-[13.5px] text-slate-600 dark:text-white/65">
              <a href="mailto:info@nowazone.com" className="block hover:text-slate-900 dark:hover:text-white transition-colors">
                info@nowazone.com
              </a>
              <a href="mailto:partners@nowazone.com" className="block hover:text-slate-900 dark:hover:text-white transition-colors">
                partners@nowazone.com
              </a>
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
