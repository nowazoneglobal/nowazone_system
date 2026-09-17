import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AssessmentModal } from '../modals/AssessmentModal';
import { AuthModal } from '../modals/AuthModal';
import { OAuthCallback } from '../auth/OAuthCallback';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isPortal = pathname.startsWith('/portal');

  if (isPortal) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content">
        <OAuthCallback />
        {children}
        <AssessmentModal />
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content selection:bg-[#0F62FE]/20 selection:text-[#0F62FE]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-[#0F62FE] focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow pt-[72px]">
        {children}
      </main>
      <Footer />
      <OAuthCallback />
      <AssessmentModal />
      <AuthModal />
    </div>
  );
};
