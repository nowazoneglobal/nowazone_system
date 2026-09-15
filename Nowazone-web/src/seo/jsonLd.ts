/** JSON-LD ported from original *.dc.html helmets, keyed by React route path. */

type JsonLd = Record<string, unknown>;

const org = (description: string): JsonLd => ({
  '@type': 'Organization',
  name: 'Nowazone',
  url: 'https://www.nowazone.com',
  description,
});

const service = (serviceType: string, description: string): JsonLd => ({
  '@type': 'Service',
  serviceType,
  provider: { '@type': 'Organization', name: 'Nowazone' },
  areaServed: 'Worldwide',
  description,
});

const faq = (items: Array<{ q: string; a: string }>): JsonLd => ({
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const graph = (...nodes: JsonLd[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});

export const jsonLdByPath: Record<string, JsonLd> = {
  '/': graph(
    org(
      'Nowazone delivers FinOps as a Service — multi-cloud cost optimization, AI/GPU cost management and Microsoft & Google Cloud license optimization.'
    ),
    service(
      'FinOps as a Service',
      'Cloud financial management, multi-cloud cost optimization and AI/GPU cost governance across AWS, Azure and Google Cloud.'
    ),
    faq([
      {
        q: 'How much does FinOps as a Service cost?',
        a: "Nowazone's FinOps as a Service starts with a free Cost X-Ray Assessment, followed by a paid Cloud Cost Leak Review ($750–$1,250) or an ongoing FinOps Partner retainer starting from $1,500/month. Final pricing depends on your cloud footprint, account count and scope.",
      },
      {
        q: 'What is included in a cloud cost assessment?',
        a: 'A full billing and architecture review, a savings opportunity breakdown by category, and an executive summary you keep whether or not you continue with Nowazone.',
      },
      {
        q: 'Is my cloud data secure during the assessment?',
        a: 'Nowazone works under NDA, MCA and SOW agreements with read-only access to your environment.',
      },
      {
        q: 'Can I switch or cancel a FinOps Partner engagement?',
        a: 'FinOps Partner engagements run on a flat monthly retainer with no long-term lock-in.',
      },
    ])
  ),

  '/finops': graph(
    org('Vendor-neutral FinOps as a Service and cloud cost optimization partner.'),
    service(
      'FinOps as a Service',
      'Managed FinOps practice covering cost allocation, rate optimization, commitment management and AI/GPU cost governance across AWS, Azure, Google Cloud, OCI and Alibaba Cloud, normalized to FOCUS.'
    ),
    faq([
      {
        q: 'What is FinOps as a Service?',
        a: "FinOps as a Service is the ongoing delivery of the FinOps Foundation's Inform, Optimize, Operate lifecycle by a dedicated Nowazone team — cost allocation, rate optimization, commitment management, anomaly response, forecasting and governance — run for you, using FOCUS as the common cost language across every cloud you operate.",
      },
      {
        q: 'How is this different from a FinOps tool or dashboard?',
        a: 'A tool gives you a dashboard. FaaS gives you the people who read it, act on it, negotiate the commitments, fix broken tagging, and are accountable for the savings number at the end of the month.',
      },
      {
        q: 'Do you charge a percentage of the savings you find?',
        a: 'No. Nowazone prices every engagement as a flat fee or fixed retainer, agreed before work starts, with a committed savings range written into the SOW. You know the cost on day one.',
      },
      {
        q: 'Which clouds and tools do you work with?',
        a: "AWS, Azure, Google Cloud, OCI and Alibaba Cloud, normalized to FOCUS. We're vendor-neutral on tooling too — Cloudability, CloudHealth, Kubecost, CAST AI, Finout, Vantage, native cloud consoles, or no tool at all.",
      },
      {
        q: 'Does FinOps as a Service cover AI and GPU spend?',
        a: 'Yes. GPU utilization, token cost and inference efficiency get the same Inform-Optimize-Operate treatment as the rest of your cloud bill — see FinOps for AI (Tokenomics).',
      },
      {
        q: 'What happens in the free Cost X-Ray Assessment?',
        a: 'A FinOps-certified analyst reviews your environment under read-only, NDA-protected access and delivers a category-by-category savings breakdown within 24 working hours — no cost, no obligation.',
      },
      {
        q: 'How much does a FinOps Partner Retainer cost?',
        a: 'Retainers start from $1,500/month and scale with environment size and scope, always agreed as a flat fee before work begins — never a percentage of savings.',
      },
      {
        q: 'Do I need to replace my existing tools to work with Nowazone?',
        a: 'No. Nowazone works with whatever cost tooling you already have, or none at all — the engagement is the practice, not another piece of software.',
      },
    ])
  ),

  '/about-us': graph(
    org(
      'Vendor-independent FinOps as a Service and cloud cost optimization partner, Microsoft and Google Cloud partner.'
    )
  ),

  '/platforms/aws': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'AWS Cost Optimization',
      'AWS billing audits, Savings Plan and Reserved Instance strategy, EC2/EBS rightsizing and multi-account cost allocation.'
    ),
    faq([
      {
        q: 'How much can we save on AWS?',
        a: 'Typical AWS environments carry 15–35% in avoidable spend from idle EC2/EBS, un-rightsized RDS and uncommitted usage. Your free assessment gives you an exact figure.',
      },
      {
        q: 'Do you need root access to our AWS accounts?',
        a: 'No. A read-only IAM role with Cost Explorer and billing access is enough for the assessment. Elevated access is only requested if you move to implementation, under NDA.',
      },
      {
        q: 'Can you work across AWS Organizations with many linked accounts?',
        a: 'Yes. Multi-account cost allocation and consolidated billing analysis is a core part of the engagement.',
      },
      {
        q: 'Savings Plans or Reserved Instances — which do you recommend?',
        a: 'It depends on your workload mix. We model both against your actual usage and recommend the combination that gives the best coverage without over-committing.',
      },
    ])
  ),

  '/platforms/azure': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Azure Cost Optimization',
      'Azure billing audits, Reserved Instance and Savings Plan optimization, VM and SQL rightsizing, and Azure Hybrid Benefit review.'
    )
  ),

  '/platforms/google-cloud': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Google Cloud Cost Optimization',
      'GCP billing audits, Committed Use Discount strategy, BigQuery slot and query cost control, and GKE rightsizing.'
    )
  ),

  '/platforms/oracle-cloud': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Oracle Cloud Cost Optimization',
      'OCI Universal Credits optimization, compartment allocation, and Autonomous Database rightsizing.'
    )
  ),

  '/platforms/alibaba-cloud': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Alibaba Cloud Cost Optimization',
      'ECS and OSS rightsizing, regional cost governance and reserved instance strategy for APAC and cross-border workloads.'
    )
  ),

  '/platforms/databricks-bigquery': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Databricks & BigQuery Cost Optimization',
      'Cluster and DBU cost control, query and slot cost governance, storage lifecycle management for data platform teams.'
    )
  ),

  '/platforms/multi-cloud': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Multi-Cloud Cost Management',
      'Unified FinOps across AWS, Azure, Google Cloud and OCI, normalized to FOCUS.'
    )
  ),

  '/solutions/ai-tokenomics': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'AI Cost Optimization & Tokenomics',
      'GPU utilization, token cost governance and agentic workload economics.'
    )
  ),

  '/solutions/cloud-migration': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Migration',
      'Cost-aware migration strategy, FinOps-based cost estimation, phased execution and cutover.'
    )
  ),

  '/solutions/cloud-migration-strategy': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Migration Strategy & Planning',
      'Discovery, FinOps-based cost estimation, and wave planning before workloads move.'
    )
  ),

  '/solutions/cloud-migration-cutover': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Migration Execution & Cutover',
      'Phased waves, defined rollback points, and minimized downtime windows.'
    )
  ),

  '/solutions/cloud-architecture': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Architecture',
      'Landing zone design, migration architecture patterns, and cloud operating model design.'
    )
  ),

  '/solutions/cloud-architecture-landing-zone': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Landing Zone Design',
      'Account structure, networking, identity and guardrails built before workloads land.'
    )
  ),

  '/solutions/cloud-architecture-patterns': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Migration Architecture Patterns',
      'On-premises to cloud, virtualization to cloud, cloud-to-cloud, and hybrid migration architectures.'
    )
  ),

  '/solutions/cloud-architecture-operating-model': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Operating Model Design',
      'Governance, cost accountability and operational ownership defined before migration cutover.'
    )
  ),

  '/solutions/managed-service': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Managed Cloud Services',
      'L1/L2 operational support and dedicated engineers for ongoing cloud operations.'
    )
  ),

  '/solutions/managed-service-cloud-ops': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Cloud Operations Support',
      'L1 and L2 cloud operations support — monitoring, incident response, performance tuning and cost optimization.'
    )
  ),

  '/solutions/managed-service-dedicated-engineers': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Dedicated Cloud Engineers',
      'Dedicated cloud engineers staffed to your time zone or fully remote, including 24/7 coverage where required.'
    )
  ),

  '/solutions/microsoft-licensing': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Microsoft CSP Licensing & Reselling',
      'Microsoft 365, Azure and EA/CSP licensing procurement reviewed against actual usage.'
    )
  ),

  '/solutions/google-cloud-licensing': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Google Cloud Licensing & Reselling',
      'Google Workspace and Google Cloud licensing procured through Google reseller channels.'
    )
  ),

  '/how-we-work': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'How We Work',
      'Cloud governance, architecture review and FinOps delivery process.'
    )
  ),

  '/our-process': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Our Process',
      'From free assessment to committed savings — Nowazone engagement process.'
    )
  ),

  '/partner-program': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Partner Program',
      'Subcontract and white-label FinOps delivery for CSPs, MSPs and IT service companies.'
    )
  ),

  '/pricing-models': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    service(
      'Pricing & Engagement Models',
      'Flat-fee FinOps pricing — free Cost X-Ray, fixed-scope diagnostics, and retainers. Never a percentage of savings.'
    )
  ),

  '/careers': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    {
      '@type': 'WebPage',
      name: 'Careers | Nowazone',
      description:
        'Join Nowazone — open roles in FinOps, engineering and delivery, remote-first.',
    }
  ),

  '/contact-us': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    {
      '@type': 'ContactPage',
      name: 'Contact Us | Nowazone',
      description:
        'Contact Nowazone about cloud FinOps, cost optimization, licensing, partnerships or careers.',
    }
  ),

  '/blog': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    {
      '@type': 'Blog',
      name: 'Nowazone Blog',
      description:
        "Nowazone's blog on FinOps, cloud cost optimization, cloud migration, AI cost governance and Microsoft/Google licensing.",
    }
  ),

  '/cost-estimator': graph(
    org('FinOps as a Service and cloud cost optimization partner.'),
    {
      '@type': 'WebApplication',
      name: 'Azure Cost Estimator',
      description:
        'Estimate Azure cloud costs by resource, region and commitment level.',
      applicationCategory: 'BusinessApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }
  ),

  '/trust-and-security': graph(
    org(
      'Vendor-independent FinOps partner with read-only access practices and certified practitioners.'
    )
  ),
};
