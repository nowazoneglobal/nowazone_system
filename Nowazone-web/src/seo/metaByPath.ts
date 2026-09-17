/** Per-route title/description for prerender + crawlable HTML shells. */
export const metaByPath: Record<
  string,
  { title: string; description: string; robots?: string }
> = {
  '/': {
    title: 'FinOps & Cloud Cost Optimization | Nowazone',
    description:
      'Nowazone delivers multi-cloud FinOps and cost optimization across AWS, Azure, and Google Cloud with transparent flat fees. Claim your free Cost X-Ray.',
  },
  '/finops': {
    title: 'Cloud Cost Optimization | Managed FinOps Service — Nowazone',
    description:
      'Vendor-neutral FinOps as a service — cloud cost optimization, rate management and AI/GPU cost governance across AWS, Azure and Google Cloud. Flat fee, never a percentage of savings.',
  },
  '/cost-estimator': {
    title: 'Azure Cost Estimator | Cloud Pricing Calculator — Nowazone',
    description:
      'Estimate your Azure cloud costs by resource, region and commitment level — then see what a negotiated rate could look like.',
  },
  '/pricing-models': {
    title: 'Pricing & Engagement Models | Flat-Fee FinOps — Nowazone',
    description:
      'Nowazone pricing — free Cost X-Ray assessment, fixed-scope diagnostics from $750, and flat-fee retainers from $1,500/mo. Never a percentage of your savings.',
  },
  '/our-process': {
    title: 'Our Process | From Free Assessment to Committed Savings — Nowazone',
    description:
      'From free Cost X-Ray to committed savings — how Nowazone scopes, delivers and measures FinOps engagements.',
  },
  '/how-we-work': {
    title: 'How We Work | Cloud Governance, Architecture Review & FinOps Process — Nowazone',
    description:
      'How Nowazone runs cloud governance, architecture review and FinOps delivery — process, roles and cadence.',
  },
  '/partner-program': {
    title: 'Partner Program | Subcontract & White-Label FinOps Delivery — Nowazone',
    description:
      "Nowazone's Partner Program for CSPs, MSPs and IT service companies — subcontract certified FinOps capacity or offer FinOps as a Service fully white-labeled under your own brand.",
  },
  '/about-us': {
    title: 'About Us | Our Mission, Vision & Values — Nowazone',
    description:
      'Nowazone is a vendor-independent FinOps and cloud cost optimization partner, and a Microsoft and Google Cloud partner. Our mission, vision and values behind cloud financial management done right.',
  },
  '/careers': {
    title: 'Careers | Build the FinOps Practice of the Future — Nowazone',
    description:
      'Join Nowazone — build the FinOps practice more companies will need. Open roles in FinOps, engineering and delivery, remote-first.',
  },
  '/blog': {
    title: 'Blog | FinOps, Cloud Cost & AI Governance Insights — Nowazone',
    description:
      "Nowazone's blog on FinOps, cloud cost optimization, cloud migration, AI cost governance and Microsoft/Google licensing — practical guidance, not vendor fluff.",
  },
  '/contact-us': {
    title: 'Contact Us | Nowazone',
    description:
      'Contact Nowazone about cloud FinOps, cost optimization, licensing, partnerships or careers. A real person replies within one business day.',
  },
  '/platforms/azure': {
    title: 'Azure Cost Management & Optimization Services — Nowazone',
    description:
      'Azure cost management and optimization services — Reserved Instance gaps, oversized VMs, Azure Hybrid Benefit review. Free Azure Cost Assessment.',
  },
  '/platforms/aws': {
    title: 'AWS Cost Optimization & Cost Management Services — Nowazone',
    description:
      'AWS cost management and optimization services — Savings Plans, rightsizing, unattached EBS volumes, and multi-account FinOps. Free AWS Cost Assessment.',
  },
  '/platforms/google-cloud': {
    title: 'Google Cloud Cost Optimization Services — Nowazone',
    description:
      'Google Cloud cost optimization and FinOps — CUD commitments, GKE cluster rightsizing, and BigQuery query governance. Free GCP Cost Assessment.',
  },
  '/platforms/oracle-cloud': {
    title: 'Oracle Cloud (OCI) Cost Optimization Services — Nowazone',
    description:
      'Oracle Cloud Infrastructure (OCI) cost management — Universal Credits burn-down, compartment allocation, and Autonomous Database rightsizing. Free OCI Cost Assessment.',
  },
  '/platforms/alibaba-cloud': {
    title: 'Alibaba Cloud Cost Optimization Services — Nowazone',
    description:
      'Alibaba Cloud cost governance — ECS rightsizing, OSS storage tiering, and regional commitment planning for APAC & cross-border workloads. Free Assessment.',
  },
  '/platforms/databricks-bigquery': {
    title: 'Databricks & BigQuery Cost Optimization Services — Nowazone',
    description:
      'Optimize data platform costs — Databricks DBU rightsizing, Photon engine tuning, and BigQuery query governance. Free Data Platform Cost Assessment.',
  },
  '/platforms/multi-cloud': {
    title: 'Multi-Cloud Cost Management & Governance — Nowazone',
    description:
      'Unified multi-cloud FinOps across AWS, Azure, Google Cloud, and OCI. Normalized to the FOCUS 1.4 standard for cross-cloud financial clarity.',
  },
  '/solutions/ai-tokenomics': {
    title: 'AI Cost Optimization & Tokenomics | GPU & LLM Cost Governance — Nowazone',
    description:
      'FinOps for AI: GPU utilization audits, token cost allocation, model rightsizing, inference cost benchmarking and agentic workload governance.',
  },
  '/solutions/cloud-migration': {
    title: 'Cloud Migration Services | FinOps-Planned Execution — Nowazone',
    description:
      'Cloud migration services planned around cost, not just execution. FinOps-first discovery, zero-downtime cutover waves, and post-migration operations.',
  },
  '/solutions/cloud-migration-strategy': {
    title: 'Cloud Migration Strategy & Planning | FinOps-First Cost Estimation — Nowazone',
    description:
      'Cloud migration strategy and planning — discovery, FinOps-based cost estimation, and wave planning before a single workload moves.',
  },
  '/solutions/cloud-migration-cutover': {
    title: 'Cloud Migration Execution & Cutover Services — Nowazone',
    description:
      'Cloud migration execution and cutover — phased waves, defined rollback points, and minimized downtime windows.',
  },
  '/solutions/cloud-architecture': {
    title: 'Cloud Architecture Services | Landing Zones & Operating Models — Nowazone',
    description:
      'Landing zones, migration patterns and cloud operating models built to last. Design your cloud architecture for cost efficiency and governance.',
  },
  '/solutions/cloud-architecture-landing-zone': {
    title: 'Cloud Landing Zone Design Services — Nowazone',
    description:
      'Landing zone design — account structure, networking, identity and guardrails, built before workloads land. For AWS, Azure and Google Cloud.',
  },
  '/solutions/cloud-architecture-patterns': {
    title: 'Cloud Migration Architecture Patterns & Diagrams — Nowazone',
    description:
      'Migration architecture patterns — on-premises to cloud, virtualization to cloud, cloud-to-cloud, and hybrid migration architectures.',
  },
  '/solutions/cloud-architecture-operating-model': {
    title: 'Cloud Operating Model Design Services — Nowazone',
    description:
      'Cloud operating model design — governance, cost accountability and operational ownership, defined before migration cutover.',
  },
  '/solutions/managed-service': {
    title: 'Managed Cloud Services | AMC Support & Dedicated Engineers — Nowazone',
    description:
      'Managed cloud services — L1/L2 operational support and dedicated engineers, sized to your environment after migration or for ongoing cloud operations.',
  },
  '/solutions/managed-service-cloud-ops': {
    title: 'Cloud Operations Support (L1/L2) | Managed Cloud Ops — Nowazone',
    description:
      'L1 and L2 cloud operations support — monitoring, incident response, performance tuning and cost optimization, sized to how critical your environment is.',
  },
  '/solutions/managed-service-dedicated-engineers': {
    title: 'Dedicated Cloud Engineers | 24/7 & Time-Zone Aligned Staffing — Nowazone',
    description:
      'Dedicated cloud engineers — staffed to your time zone or fully remote, including 24/7 coverage where your environment requires it.',
  },
  '/solutions/microsoft-licensing': {
    title: 'Microsoft CSP Licensing & Cloud Reseller Services — Nowazone',
    description:
      'Microsoft CSP licensing and cloud reseller services — Microsoft 365, Azure and Copilot procurement reviewed against your actual usage. Free Cost X-Ray to start.',
  },
  '/solutions/google-cloud-licensing': {
    title: 'Google Workspace & Google Cloud Licensing Reseller — Nowazone',
    description:
      "Google Workspace and Google Cloud licensing — procured through Google's official reseller channel, matched to real usage. Free Cost X-Ray to start.",
  },
  '/trust-and-security': {
    title: 'Trust & Security | Nowazone',
    description:
      'How Nowazone protects client data — read-only access, certified practitioners, verified Microsoft and Google partner status, and honest disclosure of what we don\'t have yet.',
  },
  '/security-compliance': {
    title: 'Security & Compliance | Nowazone',
    description:
      'How Nowazone accesses your cloud environment: NDA, MCA and SOW before any access, read-only by default, scoped and revocable permissions, breach notification and data retention.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Nowazone',
    description:
      'Nowazone Privacy Policy — How we collect, use and protect personal data under DPDP, GDPR, and CCPA.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Nowazone',
    description:
      'Terms governing your access to and use of the Nowazone website, read-only data access principles, and engagement agreements.',
  },
  '/data-processing-agreement': {
    title: 'Data Processing Agreement | Nowazone',
    description:
      'Contractual data processing terms for Nowazone client engagements, covering DPDP Act, GDPR SCCs, sub-processors and breach notification.',
  },
  '/partner-terms-policy': {
    title: 'Partner Terms & Policy | Nowazone',
    description:
      "Terms governing Nowazone's partner, reseller and white-label delivery relationships.",
  },
  '/refund-policy': {
    title: 'Refund Policy | Nowazone',
    description:
      'Our policy on refunds and engagement cancellations across assessments, retainers, and licensing transactions.',
  },
  '/legal': {
    title: 'Legal | Nowazone',
    description:
      'Nowazone legal documents — privacy policy, terms of service, security & compliance, refund policy, data processing agreement and partner terms.',
  },
};
