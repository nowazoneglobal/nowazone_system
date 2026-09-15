import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Core Pages
import { HomePage } from './pages/HomePage';
import { ContactUsPage } from './pages/ContactUsPage';
import { CostEstimatorPage } from './pages/CostEstimatorPage';
import { FinOpsPage } from './pages/FinOpsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { OurProcessPage } from './pages/OurProcessPage';
import { HowWeWorkPage } from './pages/HowWeWorkPage';
import { PricingModelsPage } from './pages/PricingModelsPage';
import { PartnerProgramPage } from './pages/PartnerProgramPage';
import { CareersPage } from './pages/CareersPage';
import { BlogPage } from './pages/BlogPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

// Portal Pages
import { PortalLayout } from './pages/portal/PortalLayout';
import { PortalOverviewPage } from './pages/portal/PortalOverviewPage';
import { PortalSubmissionsPage } from './pages/portal/PortalSubmissionsPage';
import { PortalTicketsPage } from './pages/portal/PortalTicketsPage';
import { PortalProfilePage } from './pages/portal/PortalProfilePage';

// Platform Pages
import { AzureCostPage } from './pages/platforms/AzureCostPage';
import { AWSCostPage } from './pages/platforms/AWSCostPage';
import { GoogleCloudCostPage } from './pages/platforms/GoogleCloudCostPage';
import { OracleCloudCostPage } from './pages/platforms/OracleCloudCostPage';
import { AlibabaCloudCostPage } from './pages/platforms/AlibabaCloudCostPage';
import { DatabricksBigQueryPage } from './pages/platforms/DatabricksBigQueryPage';
import { MultiCloudPage } from './pages/platforms/MultiCloudPage';

// Solution Pages
import { AITokenomicsPage } from './pages/solutions/AITokenomicsPage';
import { CloudMigrationPage } from './pages/solutions/CloudMigrationPage';
import { CloudMigrationStrategyPage } from './pages/solutions/CloudMigrationStrategyPage';
import { CloudMigrationCutoverPage } from './pages/solutions/CloudMigrationCutoverPage';
import { CloudArchitecturePage } from './pages/solutions/CloudArchitecturePage';
import { CloudArchitectureLandingZonePage } from './pages/solutions/CloudArchitectureLandingZonePage';
import { CloudArchitecturePatternsPage } from './pages/solutions/CloudArchitecturePatternsPage';
import { CloudArchitectureOperatingModelPage } from './pages/solutions/CloudArchitectureOperatingModelPage';
import { ManagedServicePage } from './pages/solutions/ManagedServicePage';
import { ManagedServiceCloudOpsPage } from './pages/solutions/ManagedServiceCloudOpsPage';
import { ManagedServiceDedicatedEngineersPage } from './pages/solutions/ManagedServiceDedicatedEngineersPage';
import { MicrosoftLicensingPage } from './pages/solutions/MicrosoftLicensingPage';
import { GoogleLicensingPage } from './pages/solutions/GoogleLicensingPage';

// Legal Pages
import { TrustSecurityPage } from './pages/legal/TrustSecurityPage';
import { SecurityCompliancePage } from './pages/legal/SecurityCompliancePage';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/legal/TermsOfServicePage';
import { DataProcessingAgreementPage } from './pages/legal/DataProcessingAgreementPage';
import { PartnerTermsPolicyPage } from './pages/legal/PartnerTermsPolicyPage';
import { RefundPolicyPage } from './pages/legal/RefundPolicyPage';
import { LegalHubPage } from './pages/legal/LegalHubPage';

/**
 * Automatically scrolls window to top on route navigation
 */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <Routes>
                  {/* Core Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/Nowazone Homepage.dc.html" element={<HomePage />} />

                  <Route path="/contact-us" element={<ContactUsPage />} />
                  <Route path="/Contact Us.dc.html" element={<ContactUsPage />} />

                  <Route path="/cost-estimator" element={<CostEstimatorPage />} />
                  <Route path="/Cost Estimator.dc.html" element={<CostEstimatorPage />} />

                  <Route path="/finops" element={<FinOpsPage />} />
                  <Route path="/FinOps.dc.html" element={<FinOpsPage />} />

                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/About Us.dc.html" element={<AboutUsPage />} />

                  <Route path="/our-process" element={<OurProcessPage />} />
                  <Route path="/Our Process.dc.html" element={<OurProcessPage />} />

                  <Route path="/how-we-work" element={<HowWeWorkPage />} />
                  <Route path="/How We Work.dc.html" element={<HowWeWorkPage />} />

                  <Route path="/pricing-models" element={<PricingModelsPage />} />
                  <Route path="/Pricing Models.dc.html" element={<PricingModelsPage />} />

                  <Route path="/partner-program" element={<PartnerProgramPage />} />
                  <Route path="/Partner Program.dc.html" element={<PartnerProgramPage />} />

                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/Careers.dc.html" element={<CareersPage />} />

                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/Blog.dc.html" element={<BlogPage />} />

                  {/* Password Reset Routes */}
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

                  {/* Client Portal Routes */}
                  <Route
                    path="/portal"
                    element={
                      <ProtectedRoute>
                        <PortalLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<PortalOverviewPage />} />
                    <Route path="submissions" element={<PortalSubmissionsPage />} />
                    <Route path="tickets" element={<PortalTicketsPage />} />
                    <Route path="profile" element={<PortalProfilePage />} />
                  </Route>

                  {/* Platform Cost Pages */}
                  <Route path="/platforms/azure" element={<AzureCostPage />} />
                  <Route path="/platforms/azure-cost" element={<AzureCostPage />} />
                  <Route path="/Azure Cost Optimization.dc.html" element={<AzureCostPage />} />

                  <Route path="/platforms/aws" element={<AWSCostPage />} />
                  <Route path="/platforms/aws-cost" element={<AWSCostPage />} />
                  <Route path="/AWS Cost Optimization.dc.html" element={<AWSCostPage />} />

                  <Route path="/platforms/google-cloud" element={<GoogleCloudCostPage />} />
                  <Route path="/platforms/google-cloud-cost" element={<GoogleCloudCostPage />} />
                  <Route path="/Google Cloud Cost Optimization.dc.html" element={<GoogleCloudCostPage />} />

                  <Route path="/platforms/oracle-cloud" element={<OracleCloudCostPage />} />
                  <Route path="/platforms/oracle-cloud-cost" element={<OracleCloudCostPage />} />
                  <Route path="/Oracle Cloud Cost Optimization.dc.html" element={<OracleCloudCostPage />} />

                  <Route path="/platforms/alibaba-cloud" element={<AlibabaCloudCostPage />} />
                  <Route path="/platforms/alibaba-cloud-cost" element={<AlibabaCloudCostPage />} />
                  <Route path="/Alibaba Cloud Cost Optimization.dc.html" element={<AlibabaCloudCostPage />} />

                  <Route path="/platforms/databricks-bigquery" element={<DatabricksBigQueryPage />} />
                  <Route path="/Databricks & BigQuery Cost.dc.html" element={<DatabricksBigQueryPage />} />

                  <Route path="/platforms/multi-cloud" element={<MultiCloudPage />} />
                  <Route path="/Multi-Cloud Cost Governance.dc.html" element={<MultiCloudPage />} />

                  {/* Solution Pages */}
                  <Route path="/solutions/ai-tokenomics" element={<AITokenomicsPage />} />
                  <Route path="/AI Tokenomics & LLM Cost Architecture.dc.html" element={<AITokenomicsPage />} />

                  <Route path="/cloud-migration" element={<CloudMigrationPage />} />
                  <Route path="/solutions/cloud-migration" element={<CloudMigrationPage />} />
                  <Route path="/Cloud Migration & Modernization.dc.html" element={<CloudMigrationPage />} />

                  <Route path="/cloud-migration-strategy" element={<CloudMigrationStrategyPage />} />
                  <Route path="/solutions/cloud-migration-strategy" element={<CloudMigrationStrategyPage />} />
                  <Route path="/Cloud Migration Strategy & Planning.dc.html" element={<CloudMigrationStrategyPage />} />

                  <Route path="/cloud-migration-cutover" element={<CloudMigrationCutoverPage />} />
                  <Route path="/solutions/cloud-migration-cutover" element={<CloudMigrationCutoverPage />} />
                  <Route path="/Cloud Migration Execution & Cutover.dc.html" element={<CloudMigrationCutoverPage />} />

                  <Route path="/cloud-architecture" element={<CloudArchitecturePage />} />
                  <Route path="/solutions/cloud-architecture" element={<CloudArchitecturePage />} />
                  <Route path="/Cloud Architecture & Infrastructure Design.dc.html" element={<CloudArchitecturePage />} />

                  <Route path="/cloud-architecture-landing-zone" element={<CloudArchitectureLandingZonePage />} />
                  <Route path="/solutions/cloud-architecture-landing-zone" element={<CloudArchitectureLandingZonePage />} />
                  <Route path="/Enterprise Cloud Landing Zone Architecture.dc.html" element={<CloudArchitectureLandingZonePage />} />

                  <Route path="/cloud-architecture-patterns" element={<CloudArchitecturePatternsPage />} />
                  <Route path="/solutions/cloud-architecture-patterns" element={<CloudArchitecturePatternsPage />} />
                  <Route path="/Production-Ready Cloud Architecture Patterns.dc.html" element={<CloudArchitecturePatternsPage />} />

                  <Route path="/cloud-architecture-operating-model" element={<CloudArchitectureOperatingModelPage />} />
                  <Route path="/solutions/cloud-architecture-operating-model" element={<CloudArchitectureOperatingModelPage />} />
                  <Route path="/Cloud Operating Model & Landing Zone Operations.dc.html" element={<CloudArchitectureOperatingModelPage />} />

                  <Route path="/managed-service" element={<ManagedServicePage />} />
                  <Route path="/solutions/managed-service" element={<ManagedServicePage />} />
                  <Route path="/Managed Service - Overview.dc.html" element={<ManagedServicePage />} />

                  <Route path="/managed-service-cloud-ops" element={<ManagedServiceCloudOpsPage />} />
                  <Route path="/solutions/managed-service-cloud-ops" element={<ManagedServiceCloudOpsPage />} />
                  <Route path="/Managed Service - Cloud Ops Support.dc.html" element={<ManagedServiceCloudOpsPage />} />

                  <Route path="/managed-service-dedicated-engineers" element={<ManagedServiceDedicatedEngineersPage />} />
                  <Route path="/solutions/managed-service-dedicated-engineers" element={<ManagedServiceDedicatedEngineersPage />} />
                  <Route path="/Managed Service - Dedicated Engineers.dc.html" element={<ManagedServiceDedicatedEngineersPage />} />

                  <Route path="/microsoft-licensing" element={<MicrosoftLicensingPage />} />
                  <Route path="/solutions/microsoft-licensing" element={<MicrosoftLicensingPage />} />
                  <Route path="/solutions/microsoft-licensing-reselling" element={<MicrosoftLicensingPage />} />
                  <Route path="/Microsoft Licensing & Reselling.dc.html" element={<MicrosoftLicensingPage />} />

                  <Route path="/google-cloud-licensing" element={<GoogleLicensingPage />} />
                  <Route path="/solutions/google-cloud-licensing" element={<GoogleLicensingPage />} />
                  <Route path="/solutions/google-cloud-licensing-reselling" element={<GoogleLicensingPage />} />
                  <Route path="/Google Cloud Licensing & Reselling.dc.html" element={<GoogleLicensingPage />} />

                  {/* Legal Routes */}
                  <Route path="/trust-and-security" element={<TrustSecurityPage />} />
                  <Route path="/trust-security" element={<TrustSecurityPage />} />
                  <Route path="/Trust & Security.dc.html" element={<TrustSecurityPage />} />

                  <Route path="/security-compliance" element={<SecurityCompliancePage />} />
                  <Route path="/Security & Compliance.dc.html" element={<SecurityCompliancePage />} />

                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/Privacy Policy.dc.html" element={<PrivacyPolicyPage />} />

                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/Terms of Service.dc.html" element={<TermsOfServicePage />} />

                  <Route path="/data-processing-agreement" element={<DataProcessingAgreementPage />} />
                  <Route path="/Data Processing Agreement.dc.html" element={<DataProcessingAgreementPage />} />

                  <Route path="/partner-terms-policy" element={<PartnerTermsPolicyPage />} />
                  <Route path="/Partner Terms & Policy.dc.html" element={<PartnerTermsPolicyPage />} />

                  <Route path="/refund-policy" element={<RefundPolicyPage />} />
                  <Route path="/Refund Policy.dc.html" element={<RefundPolicyPage />} />

                  <Route path="/legal" element={<LegalHubPage />} />
                  <Route path="/Legal.dc.html" element={<LegalHubPage />} />

                  {/* 404 Fallback to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};
export default App;
