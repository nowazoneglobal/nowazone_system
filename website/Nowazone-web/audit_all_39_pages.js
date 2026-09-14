const fs = require('fs');
const path = require('path');

const pageMapping = [
  { html: 'Nowazone Homepage.dc.html', tsx: 'src/pages/HomePage.tsx' },
  { html: 'Contact Us.dc.html', tsx: 'src/pages/ContactUsPage.tsx' },
  { html: 'Cost Estimator.dc.html', tsx: 'src/pages/CostEstimatorPage.tsx' },
  { html: 'FinOps.dc.html', tsx: 'src/pages/FinOpsPage.tsx' },
  { html: 'About Us.dc.html', tsx: 'src/pages/AboutUsPage.tsx' },
  { html: 'Our Process.dc.html', tsx: 'src/pages/OurProcessPage.tsx' },
  { html: 'How We Work.dc.html', tsx: 'src/pages/HowWeWorkPage.tsx' },
  { html: 'Pricing & Engagement Models.dc.html', tsx: 'src/pages/PricingModelsPage.tsx' },
  { html: 'Partner Program.dc.html', tsx: 'src/pages/PartnerProgramPage.tsx' },
  { html: 'Careers.dc.html', tsx: 'src/pages/CareersPage.tsx' },
  { html: 'Blog.dc.html', tsx: 'src/pages/BlogPage.tsx' },
  { html: 'Azure Cost Optimization.dc.html', tsx: 'src/pages/platforms/AzureCostPage.tsx' },
  { html: 'AWS Cost Optimization.dc.html', tsx: 'src/pages/platforms/AWSCostPage.tsx' },
  { html: 'Google Cloud Cost Optimization.dc.html', tsx: 'src/pages/platforms/GoogleCloudCostPage.tsx' },
  { html: 'Oracle Cloud Cost Optimization.dc.html', tsx: 'src/pages/platforms/OracleCloudCostPage.tsx' },
  { html: 'Alibaba Cloud Cost Optimization.dc.html', tsx: 'src/pages/platforms/AlibabaCloudCostPage.tsx' },
  { html: 'Databricks & BigQuery Cost Optimization.dc.html', tsx: 'src/pages/platforms/DatabricksBigQueryPage.tsx' },
  { html: 'Multi-Cloud Cost Management.dc.html', tsx: 'src/pages/platforms/MultiCloudPage.tsx' },
  { html: 'AI Cost Optimization & Tokenomics.dc.html', tsx: 'src/pages/solutions/AITokenomicsPage.tsx' },
  { html: 'Cloud Migration.dc.html', tsx: 'src/pages/solutions/CloudMigrationPage.tsx' },
  { html: 'Cloud Migration - Strategy & Planning.dc.html', tsx: 'src/pages/solutions/CloudMigrationStrategyPage.tsx' },
  { html: 'Cloud Migration - Execution & Cutover.dc.html', tsx: 'src/pages/solutions/CloudMigrationCutoverPage.tsx' },
  { html: 'Cloud Architecture.dc.html', tsx: 'src/pages/solutions/CloudArchitecturePage.tsx' },
  { html: 'Cloud Architecture - Landing Zone Design.dc.html', tsx: 'src/pages/solutions/CloudArchitectureLandingZonePage.tsx' },
  { html: 'Cloud Architecture - Migration Patterns.dc.html', tsx: 'src/pages/solutions/CloudArchitecturePatternsPage.tsx' },
  { html: 'Cloud Architecture - Operating Model.dc.html', tsx: 'src/pages/solutions/CloudArchitectureOperatingModelPage.tsx' },
  { html: 'Managed Service.dc.html', tsx: 'src/pages/solutions/ManagedServicePage.tsx' },
  { html: 'Managed Service - Cloud Ops Support.dc.html', tsx: 'src/pages/solutions/ManagedServiceCloudOpsPage.tsx' },
  { html: 'Managed Service - Dedicated Engineers.dc.html', tsx: 'src/pages/solutions/ManagedServiceDedicatedEngineersPage.tsx' },
  { html: 'Microsoft Licensing & Reselling.dc.html', tsx: 'src/pages/solutions/MicrosoftLicensingPage.tsx' },
  { html: 'Google Cloud Licensing & Reselling.dc.html', tsx: 'src/pages/solutions/GoogleLicensingPage.tsx' },
  { html: 'Trust & Security.dc.html', tsx: 'src/pages/legal/TrustSecurityPage.tsx' },
  { html: 'Security & Compliance.dc.html', tsx: 'src/pages/legal/SecurityCompliancePage.tsx' },
  { html: 'Privacy Policy.dc.html', tsx: 'src/pages/legal/PrivacyPolicyPage.tsx' },
  { html: 'Terms of Service.dc.html', tsx: 'src/pages/legal/TermsOfServicePage.tsx' },
  { html: 'Data Processing Agreement.dc.html', tsx: 'src/pages/legal/DataProcessingAgreementPage.tsx' },
  { html: 'Partner Terms & Policy.dc.html', tsx: 'src/pages/legal/PartnerTermsPolicyPage.tsx' },
  { html: 'Refund Policy.dc.html', tsx: 'src/pages/legal/RefundPolicyPage.tsx' },
  { html: 'Legal.dc.html', tsx: 'src/pages/legal/LegalHubPage.tsx' }
];

function cleanText(str) {
  return str.replace(/<[^>]+>/g, '').replace(/\{`.*?`\}/g, '').replace(/\s+/g, ' ').trim();
}

function extractH2s(content) {
  const matches = [...content.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)];
  return matches.map(m => cleanText(m[1])).filter(t => t.length > 0);
}

function extractFAQsFromHtml(content) {
  // Check Vue data or accordion items
  const faqs = [];
  // Method 1: faq data in script
  const scriptMatch = content.match(/faqs\s*:\s*(\[[\s\S]*?\])\s*,\s*[a-zA-Z]/);
  if (scriptMatch) {
    try {
      const parsed = eval(scriptMatch[1]);
      return parsed.map(f => f.q || f.question || f.title);
    } catch(e) {}
  }
  // Method 2: HTML buttons / faq items
  const buttonMatches = [...content.matchAll(/(?:faq-question|accordion-title|faq-item)[^>]*>[\s\S]*?<span[^>]*>(.*?)<\/span>/gi)];
  if (buttonMatches.length > 0) {
    return buttonMatches.map(m => cleanText(m[1]));
  }
  return [];
}

const auditResults = [];

for (const item of pageMapping) {
  const htmlPath = path.resolve(item.html);
  const tsxPath = path.resolve(item.tsx);

  if (!fs.existsSync(htmlPath)) {
    auditResults.push({ name: item.html, status: 'MISSING_HTML' });
    continue;
  }
  if (!fs.existsSync(tsxPath)) {
    auditResults.push({ name: item.tsx, status: 'MISSING_TSX' });
    continue;
  }

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  const tsxContent = fs.readFileSync(tsxPath, 'utf8');

  const htmlH2 = extractH2s(htmlContent);
  const tsxH2 = extractH2s(tsxContent);

  // Check section count
  const htmlSections = (htmlContent.match(/<section/gi) || []).length;
  const tsxSections = (tsxContent.match(/<section/gi) || []).length;

  auditResults.push({
    file: item.html,
    tsx: item.tsx,
    htmlSections,
    tsxSections,
    htmlH2Count: htmlH2.length,
    tsxH2Count: tsxH2.length,
    htmlH2,
    tsxH2
  });
}

console.log(JSON.stringify(auditResults, null, 2));
