// Schema.org Structured Data for Nowazone Pages
// Auto-generated from production-grade JSON-LD schemas

export const careersSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."}
]};

export const managedServiceCloudOpsSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Cloud Ops Support L1/L2","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"L1 and L2 cloud operations support tiers — monitoring, incident response, performance tuning and cost optimization."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Can we start with L1 and move to L2 later?","acceptedAnswer":{"@type":"Answer","text":"Yes — support tiers are matched to what your environment needs at the time, and can move from L1 to L2 as criticality or complexity changes."}},
{"@type":"Question","name":"Does L2 include cost optimization, or is that separate?","acceptedAnswer":{"@type":"Answer","text":"L2 includes periodic cost optimization reviews. For deeper, ongoing optimization work, see FinOps as a Service."}},
{"@type":"Question","name":"What counts as an incident requiring L2 escalation?","acceptedAnswer":{"@type":"Answer","text":"Anything beyond routine monitoring and first response — configuration changes, performance issues or complex incidents that need deeper ownership."}}
]}
]};

export const cloudMigrationStrategySchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Cloud Migration Strategy & Planning","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Discovery, FinOps-based cost estimation, and migration wave planning before a single workload moves."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What's included in a migration cost estimate?","acceptedAnswer":{"@type":"Answer","text":"Target-state compute and storage sizing, data egress during and after migration, temporary parallel-environment costs during cutover, licensing impact, Reserved Instance/Savings Plan strategy for the target state, and a 90-day post-migration optimization forecast."}},
{"@type":"Question","name":"How do you account for costs during the cutover period itself?","acceptedAnswer":{"@type":"Answer","text":"We model the temporary cost of running old and new environments in parallel during cutover windows — one of the most commonly underestimated line items in a migration budget."}},
{"@type":"Question","name":"Do you plan for licensing changes as part of the cost model?","acceptedAnswer":{"@type":"Answer","text":"Yes. Licensing impact is modeled alongside compute and storage, and connects directly into our Microsoft and Google Cloud licensing and reselling services where relevant."}}
]}
]};

export const homeSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"Nowazone delivers FinOps as a Service — multi-cloud cost optimization, AI/GPU cost management and Microsoft & Google Cloud license optimization."},
{"@type":"Service","serviceType":"FinOps as a Service","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Cloud financial management, multi-cloud cost optimization and AI/GPU cost governance across AWS, Azure and Google Cloud."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How much does FinOps as a Service cost?","acceptedAnswer":{"@type":"Answer","text":"Nowazone's FinOps as a Service starts with a free Cost X-Ray Assessment, followed by a paid Cloud Cost Leak Review ($750–$1,250) or an ongoing FinOps Partner retainer starting from $1,500/month. Final pricing depends on your cloud footprint, account count and scope."}},
{"@type":"Question","name":"What is included in a cloud cost assessment?","acceptedAnswer":{"@type":"Answer","text":"A full billing and architecture review, a savings opportunity breakdown by category, and an executive summary you keep whether or not you continue with Nowazone."}},
{"@type":"Question","name":"Is my cloud data secure during the assessment?","acceptedAnswer":{"@type":"Answer","text":"Nowazone works under NDA, MCA and SOW agreements with read-only access to your environment."}},
{"@type":"Question","name":"Can I switch or cancel a FinOps Partner engagement?","acceptedAnswer":{"@type":"Answer","text":"FinOps Partner engagements run on a flat monthly retainer with no long-term lock-in."}}
]}
]};

export const cloudArchitectureOperatingModelSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Cloud Operating Model Design","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Governance, cost accountability and operational ownership defined before migration cutover."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What's the difference between the operating model and managed service support?","acceptedAnswer":{"@type":"Answer","text":"The operating model defines who owns what. Managed Service is how that ownership is actually staffed and delivered day-to-day — see the Managed Service pillar."}},
{"@type":"Question","name":"Do you help design showback/chargeback reporting?","acceptedAnswer":{"@type":"Answer","text":"Yes — cost accountability structure is one of the three pillars we define before cutover."}},
{"@type":"Question","name":"Can you review an existing operating model instead of designing a new one?","acceptedAnswer":{"@type":"Answer","text":"Yes. A review applies the same three-pillar framework — governance, cost accountability and operational ownership — to what's already in place and identifies the gaps."}}
]}
]};

export const multiCloudSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Multi-Cloud Cost Management","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Unified multi-cloud cost visibility, FOCUS-normalized reporting and cross-cloud governance across AWS, Azure, Google Cloud and more."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is FOCUS and why does it matter for multi-cloud cost?","acceptedAnswer":{"@type":"Answer","text":"FOCUS (FinOps Open Cost and Usage Specification) is a vendor-neutral billing data format. Normalizing every cloud's billing export to FOCUS lets you compare spend, usage and commitments in one consistent language instead of three different billing formats."}},
{"@type":"Question","name":"How much can we save managing multiple clouds together?","acceptedAnswer":{"@type":"Answer","text":"Beyond per-cloud savings, most multi-cloud organizations find 5–15% more by removing duplicated tooling, redundant workloads and inconsistent governance across clouds."}},
{"@type":"Question","name":"Do we need to consolidate onto fewer clouds to benefit?","acceptedAnswer":{"@type":"Answer","text":"No. Multi-cloud cost management works alongside a deliberate multi-cloud strategy — the goal is one consistent view and governance model, not fewer providers."}},
{"@type":"Question","name":"Can you support clouds beyond AWS, Azure and Google Cloud?","acceptedAnswer":{"@type":"Answer","text":"Yes. Oracle Cloud, Alibaba Cloud, and data platforms like Databricks and BigQuery all normalize into the same unified view."}}
]}
]};

export const managedServiceSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Managed Cloud Service","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"L1/L2 operational support and dedicated engineers for ongoing cloud operations."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Do we need to have migrated with Nowazone to use Managed Service?","acceptedAnswer":{"@type":"Answer","text":"No — this support model works for any existing cloud environment, not only migrations we've delivered."}},
{"@type":"Question","name":"What's the difference between L1 and L2 support?","acceptedAnswer":{"@type":"Answer","text":"L1 covers monitoring, first-response incident handling and routine patching. L2 adds performance tuning, cost optimization reviews and escalation ownership for complex incidents — see the Cloud Ops Support page for the full breakdown."}},
{"@type":"Question","name":"Can you staff a dedicated engineer in our specific time zone?","acceptedAnswer":{"@type":"Answer","text":"Yes — staffing can be aligned to your time zone, fully remote alongside your in-house team, or 24/7 where the environment requires it. See the Dedicated Engineers page for staffing options."}},
{"@type":"Question","name":"How is Managed Service priced?","acceptedAnswer":{"@type":"Answer","text":"Scoped to your environment during a support conversation — see Pricing for our standard engagement structure."}}
]}
]};

export const contactUsSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."}
]};

export const cloudMigrationSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Cloud Migration","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Cloud migration strategy, FinOps-based cost estimation, phased execution and cutover."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How is a migration cost estimate different from a general cloud cost assessment?","acceptedAnswer":{"@type":"Answer","text":"A general cost assessment looks at what you're already running. A migration cost estimate models a future state that doesn't exist yet — target-state compute and storage, egress during and after the move, temporary parallel-environment costs during cutover, and licensing changes — before you commit to an architecture."}},
{"@type":"Question","name":"Do you handle execution, or just plan the migration?","acceptedAnswer":{"@type":"Answer","text":"Both. Strategy and planning produce the cost model and wave plan; execution and cutover carry that plan through to go-live, with defined rollback points at every wave."}},
{"@type":"Question","name":"What if we're only partially moving to the cloud?","acceptedAnswer":{"@type":"Answer","text":"Hybrid and partial migrations are scoped the same way — discovery, wave planning and cost modeling account for what stays on-prem and what moves, including the ongoing cost of running both."}},
{"@type":"Question","name":"Is the requirement review free?","acceptedAnswer":{"@type":"Answer","text":"No — migration scoping requires more depth than our free Cost X-Ray Assessment."}},
{"@type":"Question","name":"What happens after the migration is done?","acceptedAnswer":{"@type":"Answer","text":"Most migration engagements end at go-live. Ours transitions into ongoing operations through our Managed Service pillar — Cloud Ops support and dedicated engineers for what happens after cutover."}}
]}
]};

export const cloudArchitecturePatternsSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Migration Architecture Patterns","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"On-premises to cloud, virtualization to cloud, cloud-to-cloud, and hybrid migration architecture design."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Which migration pattern is right for us?","acceptedAnswer":{"@type":"Answer","text":"It depends on your current environment — a migration requirement review identifies the right pattern before any architecture is finalized."}},
{"@type":"Question","name":"Can a migration combine more than one pattern?","acceptedAnswer":{"@type":"Answer","text":"Yes — many real-world migrations are hybrid by necessity, combining phased on-premises exit with cloud-to-cloud consolidation."}},
{"@type":"Question","name":"Do you handle identity and hybrid AD complexity?","acceptedAnswer":{"@type":"Answer","text":"Yes — identity and hybrid systems are accounted for explicitly in every pattern, not treated as an afterthought."}}
]}
]};

export const howWeWorkSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How long does a typical assessment take?","acceptedAnswer":{"@type":"Answer","text":"The Free Cost X-Ray Assessment report is delivered within 24 working hours of read-only access. A paid Cloud Cost Leak Review takes 2–5 working days, depending on workload and environment complexity."}},
{"@type":"Question","name":"Do we have to implement every recommendation?","acceptedAnswer":{"@type":"Answer","text":"No. Every finding ships with an estimated saving and effort level — you choose what to action, in what order, and can implement yourself or have us execute it."}},
{"@type":"Question","name":"Who actually makes the changes — you or us?","acceptedAnswer":{"@type":"Answer","text":"Either. Assessments are read-only and advisory. If you move to implementation, we execute against a signed statement of work with elevated, scoped access."}},
{"@type":"Question","name":"What happens after the engagement ends?","acceptedAnswer":{"@type":"Answer","text":"You keep every finding, dashboard and document produced. Access is revoked and any elevated roles are removed as part of a formal handover."}},
{"@type":"Question","name":"What do you need from us during the engagement?","acceptedAnswer":{"@type":"Answer","text":"Read-only access to billing and account data, a signed NDA and MSA, and a point of contact for scoping questions — most of the work happens on our side."}},
{"@type":"Question","name":"Do you work across multiple clouds in a single engagement?","acceptedAnswer":{"@type":"Answer","text":"Yes. Multi-cloud environments are normalized to FOCUS so spend, waste and opportunities are comparable across AWS, Azure, Google Cloud, OCI and Alibaba Cloud in one engagement."}},
{"@type":"Question","name":"How do you report progress during a recurring engagement?","acceptedAnswer":{"@type":"Answer","text":"A standing cadence of reporting plus a live dashboard, with your dedicated account manager reachable for ad hoc questions between reviews."}},
{"@type":"Question","name":"Can we pause or end a recurring engagement early?","acceptedAnswer":{"@type":"Answer","text":"Yes. Recurring engagements run month-to-month with no long-term lock-in — you can pause, adjust scope or end with notice as your needs change."}},
{"@type":"Question","name":"Is automation mandatory, or can we keep some processes manual?","acceptedAnswer":{"@type":"Answer","text":"Automation is optional and scoped with you. Some teams automate guardrails and anomaly response fully; others keep human approval on every change — either is supported."}},
{"@type":"Question","name":"What's the difference between an architecture review and a cost assessment?","acceptedAnswer":{"@type":"Answer","text":"A cost assessment finds savings in what's already running. An architecture review evaluates whether the underlying design — topology, tiering, data movement — is sound before you build further or migrate more workloads onto it."}},
{"@type":"Question","name":"Do you help set up landing zones for new cloud environments, or only review existing ones?","acceptedAnswer":{"@type":"Answer","text":"Both. For teams starting fresh or expanding into a new region or platform, we design and implement the landing zone — accounts, networking, identity and guardrails. For existing environments, we review and remediate."}},
{"@type":"Question","name":"Is FinOps for SaaS and licensing part of the same engagement, or separate?","acceptedAnswer":{"@type":"Answer","text":"Same team, same governed process — licensing spend gets the same allocation, optimization and forecasting discipline as your infrastructure spend. See Microsoft Licensing and Google Licensing for platform-specific detail."}}
]}
]};

export const blogSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Blog","name":"Nowazone Blog","url":"https://www.nowazone.com/blog"}
]};

export const microsoftLicensingSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"Authorized Microsoft Indirect Reseller and cloud procurement partner."},
{"@type":"Service","serviceType":"Microsoft Licensing & Reselling","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":["India","United Arab Emirates","Saudi Arabia","Qatar","Oman","Bahrain","Kuwait","United Kingdom","United States"],"description":"Microsoft 365, Azure and EA/CSP licensing procurement, consolidation and management."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Is Nowazone an authorized Microsoft reseller?","acceptedAnswer":{"@type":"Answer","text":"Yes. Nowazone is an enrolled Microsoft Indirect Reseller, working through a Microsoft Indirect Provider distributor in each market we serve."}},
{"@type":"Question","name":"Can Nowazone help us move from an Enterprise Agreement to CSP?","acceptedAnswer":{"@type":"Answer","text":"Yes. We handle EA-to-CSP transitions including license mapping, timing and renewal alignment."}},
{"@type":"Question","name":"Is there a minimum seat count?","acceptedAnswer":{"@type":"Answer","text":"Minimums depend on the licensing program and your market. We'll confirm exact terms during your quote."}},
{"@type":"Question","name":"Which countries does Nowazone support for Microsoft licensing?","acceptedAnswer":{"@type":"Answer","text":"India, UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait, the United Kingdom and the United States, with local billing currency and support hours in each."}},
{"@type":"Question","name":"What is a Microsoft CSP indirect reseller?","acceptedAnswer":{"@type":"Answer","text":"Under the Microsoft CSP program (Cloud Solution Provider), an indirect reseller buys licensing through an indirect provider (a distributor) rather than directly from Microsoft, then sells and supports it to end customers like you."}},
{"@type":"Question","name":"Is it safe to buy Microsoft 365 through a reseller?","acceptedAnswer":{"@type":"Answer","text":"Yes. CSP is Microsoft's own licensing channel — licenses are provisioned directly into your tenant, visible in your own Microsoft CSP portal alongside your admin center, and you retain full admin control. The reseller manages billing, support and renewals."}},
{"@type":"Question","name":"What's the difference between Microsoft 365 E3 and E5?","acceptedAnswer":{"@type":"Answer","text":"E5 adds advanced security, compliance and analytics features (and Teams Phone) on top of E3. Most organizations don't use enough of the E5-only features to justify the price gap — we check usage before recommending it."}},
{"@type":"Question","name":"Can I switch Microsoft 365 providers mid-term?","acceptedAnswer":{"@type":"Answer","text":"Yes, in most cases. Your tenant and data stay put — only the billing and support relationship (the reseller of record) changes. We handle the reassignment and time it to avoid disrupting a current term where possible."}},
{"@type":"Question","name":"What's included in Microsoft 365 E5 that E3 doesn't have?","acceptedAnswer":{"@type":"Answer","text":"E5 adds advanced security and compliance tooling, Power BI Pro, and PSTN conferencing on top of E3, plus advanced threat protection most orgs never fully turn on."}},
{"@type":"Question","name":"Where is our Microsoft 365 data stored?","acceptedAnswer":{"@type":"Answer","text":"Data residency follows Microsoft's own regional commitments for the Microsoft 365 datacenter geography tied to your tenant, matched to the markets we support."}}
]}
]};

export const aiTokenomicsSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"AI Cost Optimization","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"GPU utilization tracking, token cost allocation, inference cost benchmarking and agentic workload cost governance."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is AI cost optimization?","acceptedAnswer":{"@type":"Answer","text":"AI cost optimization applies FinOps discipline to AI infrastructure — GPU utilization, token consumption, inference efficiency and agentic workflow costs — so AI spend is visible, allocated and managed instead of running unchecked."}},
{"@type":"Question","name":"What is tokenomics?","acceptedAnswer":{"@type":"Answer","text":"Tokenomics, in this context, is the economics of token-based AI usage — what each model call costs, how token volume scales with usage, and how to allocate that cost by team, product or feature."}},
{"@type":"Question","name":"How is AI cost optimization different from regular cloud FinOps?","acceptedAnswer":{"@type":"Answer","text":"Same Inform-Optimize-Operate discipline, different cost drivers. Instead of instance types and storage tiers, you're managing GPU utilization, token cost per model call, inference latency-cost tradeoffs and the compounding cost of autonomous agents making many calls per task."}},
{"@type":"Question","name":"Is the Cost Estimator on this page accurate?","acceptedAnswer":{"@type":"Answer","text":"It's an illustrative benchmark based on public GPU pricing, not a quote. A Free Cost X-Ray Assessment gives you an exact number based on your actual environment."}},
{"@type":"Question","name":"Do you help with agentic AI cost control specifically?","acceptedAnswer":{"@type":"Answer","text":"Yes. Agentic workflows make many API calls per task without a human in the loop, which can compound cost quickly. We build governance and budgets specifically for that pattern."}},
{"@type":"Question","name":"Is your team certified for AI cost governance?","acceptedAnswer":{"@type":"Answer","text":"Yes. Our team holds FinOps Certified: AI Value alongside FinOps Certified Professional, FinOps Certified Engineer and FinOps Certified: Technology Value — individual practitioner certifications, not organizational membership."}}
]}
]};

export const googleLicensingSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"Google Cloud Partner Network reseller and cloud procurement partner."},
{"@type":"Service","serviceType":"Google Cloud Licensing & Reselling","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":["India","United Arab Emirates","Saudi Arabia","Qatar","Oman","Bahrain","Kuwait","United Kingdom","United States"],"description":"Google Workspace and Google Cloud licensing procurement, consolidation and management."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Is Nowazone an authorized Google Cloud reseller?","acceptedAnswer":{"@type":"Answer","text":"Yes. Nowazone is enrolled in the Google Cloud Partner Network as an indirect reseller, working through a distributor in each market we serve."}},
{"@type":"Question","name":"Does Nowazone resell Google Workspace as well as Google Cloud?","acceptedAnswer":{"@type":"Answer","text":"Yes. We procure and manage both Google Workspace seats and Google Cloud consumption under one relationship."}},
{"@type":"Question","name":"Is there a minimum seat count?","acceptedAnswer":{"@type":"Answer","text":"Minimums depend on the Workspace tier and your market. We'll confirm exact terms during your quote."}},
{"@type":"Question","name":"Which countries does Nowazone support for Google licensing?","acceptedAnswer":{"@type":"Answer","text":"India, UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait, the United Kingdom and the United States, with local billing currency and support hours in each."}},
{"@type":"Question","name":"What is a Google Cloud indirect reseller?","acceptedAnswer":{"@type":"Answer","text":"Under the Google Cloud Partner Network, an indirect reseller buys Workspace and Google Cloud licensing through a distributor rather than directly from Google, then sells and supports it to end customers like you."}},
{"@type":"Question","name":"Google Workspace vs Microsoft 365 — which is cheaper?","acceptedAnswer":{"@type":"Answer","text":"It depends on tier and usage more than platform — both have entry, standard and premium tiers with overlapping list prices. We compare your actual usage against both stacks rather than assuming one is cheaper."}},
{"@type":"Question","name":"Can I move my Google Workspace domain to a new reseller?","acceptedAnswer":{"@type":"Answer","text":"Yes. Your domain, mailboxes and data stay in place — only the billing and admin-support relationship transfers, via a Google-managed subscription transfer."}}
]}
]};

export const pricingModelsSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"Vendor-neutral FinOps consulting partner."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Why don't you publish fixed dollar prices?","acceptedAnswer":{"@type":"Answer","text":"Scope drives cost, not a rate card. A single-cloud, mid-market environment and a multi-cloud enterprise estate aren't the same job — a published number would either overcharge one or undersell the other. We publish ranges and confirm the exact number after the free Cost X-Ray."}},
{"@type":"Question","name":"Is the free assessment really free?","acceptedAnswer":{"@type":"Answer","text":"Yes. No minimum spend, no qualification call required, no dollar figures disclosed upfront. A real analyst reviews your environment and hands you a category-by-category savings breakdown — yours to keep either way."}},
{"@type":"Question","name":"What exactly do we get in the Cost X-Ray?","acceptedAnswer":{"@type":"Answer","text":"A discovery call, a full billing and architecture review, a savings opportunity breakdown by category — compute, storage, reservations, AI spend — and an executive summary you keep whether or not you engage us further."}},
{"@type":"Question","name":"Do you bill hourly?","acceptedAnswer":{"@type":"Answer","text":"No. Every engagement is fixed once scoped and written into the SOW before work starts. No time-and-materials billing, no surprise invoices."}},
{"@type":"Question","name":"How is the savings commitment structured?","acceptedAnswer":{"@type":"Answer","text":"A savings range — typically 15–42% depending on environment and current maturity — is agreed and written into the SOW before any work begins."}},
{"@type":"Question","name":"What's included in the Recurring / Managed FinOps price?","acceptedAnswer":{"@type":"Answer","text":"Continuous monitoring across every cloud and AI platform, monthly savings tracking and governance reporting, ongoing rightsizing and commitment management, and direct access to your FinOps team. Retainers start from $1,500/month and scale with environment size."}},
{"@type":"Question","name":"Can pricing span multiple clouds or just one?","acceptedAnswer":{"@type":"Answer","text":"Either. Engagements are scoped to whatever you run — a single cloud, a multi-cloud estate, or cloud plus AI/GPU spend — and priced accordingly."}},
{"@type":"Question","name":"How fast can we get a quote?","acceptedAnswer":{"@type":"Answer","text":"Usually within a day or two of the free Cost X-Ray call, once we've seen enough of your environment to scope the engagement accurately."}}
]}
]};

export const aboutUsSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"Vendor-independent FinOps as a Service and cloud cost optimization partner, Microsoft and Google Cloud partner."}
]}
]};

export const finOpsSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"Vendor-neutral FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"FinOps as a Service","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Managed FinOps practice covering cost allocation, rate optimization, commitment management and AI/GPU cost governance across AWS, Azure, Google Cloud, OCI and Alibaba Cloud, normalized to FOCUS."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is FinOps as a Service?","acceptedAnswer":{"@type":"Answer","text":"FinOps as a Service is the ongoing delivery of the FinOps Foundation's Inform, Optimize, Operate lifecycle by a dedicated Nowazone team — cost allocation, rate optimization, commitment management, anomaly response, forecasting and governance — run for you, using FOCUS as the common cost language across every cloud you operate."}},
{"@type":"Question","name":"How is this different from a FinOps tool or dashboard?","acceptedAnswer":{"@type":"Answer","text":"A tool gives you a dashboard. FaaS gives you the people who read it, act on it, negotiate the commitments, fix broken tagging, and are accountable for the savings number at the end of the month."}},
{"@type":"Question","name":"Do you charge a percentage of the savings you find?","acceptedAnswer":{"@type":"Answer","text":"No. Nowazone prices every engagement as a flat fee or fixed retainer, agreed before work starts, with a committed savings range written into the SOW. You know the cost on day one."}},
{"@type":"Question","name":"Is Nowazone a FinOps Foundation member organization?","acceptedAnswer":{"@type":"Answer","text":"Nowazone's team holds individual FinOps Foundation certifications — FinOps Certified Professional, FinOps Certified Engineer and FinOps Certified: Technology Value. This is not the same as organizational Foundation membership, and we don't represent it as such."}},
{"@type":"Question","name":"Which clouds and tools do you work with?","acceptedAnswer":{"@type":"Answer","text":"AWS, Azure, Google Cloud, OCI and Alibaba Cloud, normalized to FOCUS. We're vendor-neutral on tooling too — Cloudability, CloudHealth, Kubecost, CAST AI, Finout, Vantage, native cloud consoles, or no tool at all."}},
{"@type":"Question","name":"Does FinOps as a Service cover AI and GPU spend?","acceptedAnswer":{"@type":"Answer","text":"Yes. GPU utilization, token cost and inference efficiency get the same Inform-Optimize-Operate treatment as the rest of your cloud bill — see FinOps for AI (Tokenomics)."}},
{"@type":"Question","name":"What happens in the free Cost X-Ray Assessment?","acceptedAnswer":{"@type":"Answer","text":"A FinOps-certified analyst reviews your environment under read-only, NDA-protected access and delivers a category-by-category savings breakdown within 24 working hours — no cost, no obligation."}},
{"@type":"Question","name":"How much does a FinOps Partner Retainer cost?","acceptedAnswer":{"@type":"Answer","text":"Retainers start from $1,500/month and scale with environment size and scope, always agreed as a flat fee before work begins — never a percentage of savings."}},
{"@type":"Question","name":"Do I need to replace my existing tools to work with Nowazone?","acceptedAnswer":{"@type":"Answer","text":"No. Nowazone works with whatever cost tooling you already have, or none at all — the engagement is the practice, not another piece of software."}}
]}
]};

export const alibabaCloudCostSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Alibaba Cloud Cost Optimization","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Alibaba Cloud ECS and OSS rightsizing, regional cost governance and reserved instance strategy."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How much can we save on Alibaba Cloud?","acceptedAnswer":{"@type":"Answer","text":"Environments we review typically carry 10–25% in avoidable spend from idle ECS instances, unoptimized OSS storage tiers and uncommitted usage."}},
{"@type":"Question","name":"Do you support Alibaba Cloud accounts outside mainland China?","acceptedAnswer":{"@type":"Answer","text":"Yes. We work with Alibaba Cloud International accounts serving APAC, Middle East and cross-border workloads."}},
{"@type":"Question","name":"Do you need Owner access to our Alibaba Cloud account?","acceptedAnswer":{"@type":"Answer","text":"No. A read-only RAM role with billing and BSS OpenAPI access is enough for the assessment."}},
{"@type":"Question","name":"Can you help with resource plans and reserved instances?","acceptedAnswer":{"@type":"Answer","text":"Yes. We model resource plan and reserved instance commitments against your actual ECS usage before recommending a term."}}
]}
]};

export const managedServiceDedicatedEngineersSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Dedicated Cloud Engineers","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Dedicated cloud engineers staffed to a client's time zone, fully remote, or 24/7 where required."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Can we get a dedicated engineer in a specific country or time zone?","acceptedAnswer":{"@type":"Answer","text":"Yes — staffing is aligned to your location where needed, or delivered remotely, depending on what your environment requires."}},
{"@type":"Question","name":"Is 24/7 coverage available for smaller environments, or only enterprise scale?","acceptedAnswer":{"@type":"Answer","text":"Coverage is scoped to what your environment actually needs — talk to us about your specific situation rather than assuming a minimum size requirement."}},
{"@type":"Question","name":"Do dedicated engineers work with our existing in-house team, or replace them?","acceptedAnswer":{"@type":"Answer","text":"Alongside — the model is built to fill gaps and add context, not replace the team you already have."}}
]}
]};

export const oracleCloudCostSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Oracle Cloud Infrastructure Cost Optimization","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"OCI Universal Credits utilization, compute and Autonomous Database rightsizing, tenancy cost governance."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How much can we save on Oracle Cloud Infrastructure?","acceptedAnswer":{"@type":"Answer","text":"Most OCI tenancies carry 10–25% in avoidable spend from unused Universal Credits allocation, oversized compute shapes and idle Autonomous Database instances."}},
{"@type":"Question","name":"Do you need Administrator access to our OCI tenancy?","acceptedAnswer":{"@type":"Answer","text":"No. A read-only group with cost and usage report access is enough for the assessment."}},
{"@type":"Question","name":"What are Universal Credits and why do they matter for cost?","acceptedAnswer":{"@type":"Answer","text":"Universal Credits are OCI's flexible prepaid commitment. Unused or misallocated credits at the end of a term are effectively wasted spend — we check utilization against your actual burn rate."}},
{"@type":"Question","name":"Can you review our Autonomous Database costs?","acceptedAnswer":{"@type":"Answer","text":"Yes. OCPU and storage allocation for Autonomous Database is a common source of overspend, especially when auto-scaling limits are set too high."}}
]}
]};

export const partnerProgramSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."}
]};

export const costEstimatorSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."}
]};

export const cloudArchitectureSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Cloud Architecture","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Landing zone design, migration architecture patterns, and cloud operating model design."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Do you design the architecture, or just the migration plan?","acceptedAnswer":{"@type":"Answer","text":"Both, and they're built together. Architecture — landing zone, migration patterns and operating model — is designed alongside the migration strategy, since cost, timeline and architecture decisions all depend on each other."}},
{"@type":"Question","name":"Can you review an existing architecture instead of designing a new one?","acceptedAnswer":{"@type":"Answer","text":"Yes. An architecture review follows the same discipline — landing zone structure, migration readiness and operating model ownership — applied to what you already have instead of a blank slate."}},
{"@type":"Question","name":"How does landing zone design relate to cost optimization?","acceptedAnswer":{"@type":"Answer","text":"Landing zone structure sets the ceiling on what later cost optimization can achieve. Tagging, account structure and network topology decided here determine whether cost allocation and rightsizing are even possible down the line."}}
]}
]};

export const cloudMigrationCutoverSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Cloud Migration Execution & Cutover","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Phased migration execution with defined rollback points and minimized cutover downtime."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How do you minimize downtime during cutover?","acceptedAnswer":{"@type":"Answer","text":"Defined cutover windows communicated in advance, data synchronization validation before the switch, and rollback criteria set before execution begins — so downtime is a planned window, not an open-ended risk."}},
{"@type":"Question","name":"What happens if something doesn't work after cutover?","acceptedAnswer":{"@type":"Answer","text":"If something doesn't validate against the criteria set before execution, we roll back to the previous state rather than pushing forward and hoping — the rollback point exists for exactly that scenario."}},
{"@type":"Question","name":"How long does the post-cutover stabilization period last?","acceptedAnswer":{"@type":"Answer","text":"Immediate post-cutover monitoring and validation runs through the first 30 days after go-live, followed by a defined handoff into ongoing operations."}}
]}
]};

export const databricksBigQuerySchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Databricks and BigQuery Cost Optimization","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Databricks cluster and DBU cost control, BigQuery slot and query cost governance, data platform storage lifecycle management."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How much can we save on Databricks and BigQuery?","acceptedAnswer":{"@type":"Answer","text":"Data platform environments typically carry 20–40% in avoidable spend from idle clusters, inefficient queries and unmanaged storage lifecycle."}},
{"@type":"Question","name":"Do you need admin access to our workspace?","acceptedAnswer":{"@type":"Answer","text":"No. Read-only access to billing, cluster logs and query history is enough for the assessment."}},
{"@type":"Question","name":"Can you optimize our Databricks cluster configuration?","acceptedAnswer":{"@type":"Answer","text":"Yes. We review cluster sizing, autoscaling policies, job vs. all-purpose cluster usage and DBU consumption patterns."}},
{"@type":"Question","name":"What's the biggest BigQuery cost mistake you see?","acceptedAnswer":{"@type":"Answer","text":"Repeatedly querying unpartitioned tables with SELECT * — a single fix here often has more impact than any compute optimization."}}
]}
]};

export const cloudArchitectureLandingZoneSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"Service","serviceType":"Landing Zone Design","provider":{"@type":"Organization","name":"Nowazone"},"areaServed":"Worldwide","description":"Account structure, networking, identity and guardrails, designed before workloads land, for AWS, Azure and Google Cloud."},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Do you design landing zones for AWS, Azure and Google Cloud?","acceptedAnswer":{"@type":"Answer","text":"Yes — landing zone design follows the same discipline across AWS, Azure and Google Cloud, adapted to each platform's account/subscription and identity model."}},
{"@type":"Question","name":"Can you review or fix an existing landing zone instead of building a new one?","acceptedAnswer":{"@type":"Answer","text":"Yes. A landing zone review applies the same checklist — account structure, network segmentation, identity and guardrails — to what already exists, and identifies what to restructure."}},
{"@type":"Question","name":"How long does landing zone design take before migration can start?","acceptedAnswer":{"@type":"Answer","text":"It depends on scope and current environment complexity — timing is confirmed as part of the migration requirement review, alongside the cost model and wave plan."}}
]}
]};

export const ourProcessSchema = {"@context":"https://schema.org","@graph":[
{"@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."},
{"@type":"HowTo","name":"How Nowazone's Cost Optimization Process Works","step":[
{"@type":"HowToStep","name":"Free Cost X-Ray Assessment","text":"Read-only review of your cloud environment with a category-by-category savings breakdown, delivered within 24 working hours."},
{"@type":"HowToStep","name":"Cost Leak Review","text":"A fixed-price, documented diagnostic with ranked findings, delivered in 2–5 business days, depending on workload and environment."},
{"@type":"HowToStep","name":"Implementation","text":"Agreed fixes are implemented with your team's sign-off, tracked against the savings identified."},
{"@type":"HowToStep","name":"FinOps Partner Retainer","text":"Ongoing monthly optimization and governance to keep savings from eroding over time."}
]}
]};

export const trustSecuritySchema = {"@context":"https://schema.org","@type":"Organization","name":"Nowazone","url":"https://www.nowazone.com","description":"FinOps as a Service and cloud cost optimization partner."};

export const allSchemasByRoute: Record<string, Record<string, any>> = {
  '/careers': careersSchema,
  '/solutions/managed-service-cloud-ops': managedServiceCloudOpsSchema,
  '/solutions/cloud-migration-strategy': cloudMigrationStrategySchema,
  '/': homeSchema,
  '/solutions/cloud-architecture-operating-model': cloudArchitectureOperatingModelSchema,
  '/platforms/multi-cloud': multiCloudSchema,
  '/solutions/managed-service': managedServiceSchema,
  '/contact-us': contactUsSchema,
  '/solutions/cloud-migration': cloudMigrationSchema,
  '/solutions/cloud-architecture-patterns': cloudArchitecturePatternsSchema,
  '/how-we-work': howWeWorkSchema,
  '/blog': blogSchema,
  '/solutions/microsoft-licensing': microsoftLicensingSchema,
  '/solutions/ai-tokenomics': aiTokenomicsSchema,
  '/solutions/google-cloud-licensing': googleLicensingSchema,
  '/pricing-models': pricingModelsSchema,
  '/about-us': aboutUsSchema,
  '/finops': finOpsSchema,
  '/platforms/alibaba-cloud': alibabaCloudCostSchema,
  '/solutions/managed-service-dedicated-engineers': managedServiceDedicatedEngineersSchema,
  '/platforms/oracle-cloud': oracleCloudCostSchema,
  '/partner-program': partnerProgramSchema,
  '/cost-estimator': costEstimatorSchema,
  '/solutions/cloud-architecture': cloudArchitectureSchema,
  '/solutions/cloud-migration-cutover': cloudMigrationCutoverSchema,
  '/platforms/databricks-bigquery': databricksBigQuerySchema,
  '/solutions/cloud-architecture-landing-zone': cloudArchitectureLandingZoneSchema,
  '/our-process': ourProcessSchema,
  '/trust-and-security': trustSecuritySchema,
};

