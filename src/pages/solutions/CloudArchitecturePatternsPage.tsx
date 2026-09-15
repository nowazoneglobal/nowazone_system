import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/common/SEO';
import { cloudArchitecturePatternsSchema } from '../../data/seoSchemas';
import { CornerMarkers } from '../../components/common/CornerMarkers';
import { useModal } from '../../context/ModalContext';
import { ArrowLeft, ArrowRight, Server, Database, Globe, Layers } from 'lucide-react';

export const CloudArchitecturePatternsPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const faqs = [
    {
      q: "Which migration pattern is right for us?",
      a: "It depends on your current environment — a migration requirement review identifies the right pattern before any architecture is finalized."
    },
    {
      q: "Can a migration combine more than one pattern?",
      a: "Yes — many real-world migrations are hybrid by necessity, combining phased on-premises exit with cloud-to-cloud consolidation."
    },
    {
      q: "Do you handle identity and hybrid AD complexity?",
      a: "Yes — identity and hybrid systems are accounted for explicitly in every pattern, not treated as an afterthought."
    }
  ];

  return (
    <>
      <SEO
        title="Cloud Migration Architecture Patterns & Diagrams — Nowazone"
        description="Migration architecture patterns — on-premises to cloud, virtualization to cloud, cloud-to-cloud, and hybrid migration architectures."
        canonical="/solutions/cloud-architecture-migration-patterns"
        jsonLd={cloudArchitecturePatternsSchema}
      />

      <div className="bg-base-100 border-b border-base-300 py-3 px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/solutions/cloud-architecture"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary font-heading hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cloud Architecture Overview
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section className="bg-base-100 border-b border-base-300 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 font-heading">
            Cloud Architecture → Migration Patterns
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight mb-6 text-base-content leading-tight">
            Migration Architecture Patterns — On-Premises, Virtualized, Cloud-to-Cloud and Hybrid.
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Every environment is different. The architectural discipline behind moving it isn't. Explore our four production-tested migration topologies.
          </p>

          <button
            type="button"
            onClick={openAssessmentModal}
            className="btn btn-primary text-white font-heading font-bold shadow-lg"
          >
            Review Your Migration Architecture
          </button>
        </div>
      </section>

      {/* FOUR PATTERNS */}
      <section className="bg-base-200/50 dark:bg-navy-900 text-base-content dark:text-white py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center font-bold text-2xl sm:text-3xl text-base-content dark:text-white mb-10 font-heading">
            The Migration Paths We Design
          </h2>
          {/* Pattern 1 */}
          <div className="bg-base-100 dark:bg-navy-950 text-base-content dark:text-white p-8 rounded-2xl border border-base-300 dark:border-white/10 relative shadow-sm">
            <CornerMarkers />
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold font-heading text-base-content dark:text-white">1. On-Premises to Cloud Architecture</h3>
            </div>
            <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-4">
              Physical or data center workloads migrated to AWS, Azure, or GCP — networking, IP address space, firewall routing, and security groups re-architected for cloud-native infrastructure.
            </p>
            <div className="p-4 bg-base-200/60 dark:bg-navy-900 rounded-xl border border-base-300 dark:border-white/5 font-mono text-xs text-base-content/80 dark:text-slate-400 space-y-1">
              <div>• Physical Server Inventory → Cloud Compute Virtual Machines / Auto-Scaling Groups</div>
              <div>• On-Prem Core Switch / VLANs → VPC/VNet Subnets &amp; Cloud Network Security Groups</div>
              <div>• Local Active Directory → Cloud Identity Federation &amp; Zero-Trust SSO</div>
            </div>
          </div>

          {/* Pattern 2 */}
          <div className="bg-base-100 dark:bg-navy-950 text-base-content dark:text-white p-8 rounded-2xl border border-base-300 dark:border-white/10 relative shadow-sm">
            <CornerMarkers />
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold font-heading text-base-content dark:text-white">2. Virtualization (VMware/Hyper-V) to Native Cloud</h3>
            </div>
            <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-4">
              Decoupling from high VMware/Broadcom hypervisor licensing costs by transforming virtual appliances into native cloud compute instances or managed container clusters.
            </p>
            <div className="p-4 bg-base-200/60 dark:bg-navy-900 rounded-xl border border-base-300 dark:border-white/5 font-mono text-xs text-base-content/80 dark:text-slate-400 space-y-1">
              <div>• vSphere ESXi VMs → Native AWS EC2 / Azure VM SKU mapping with right-sizing</div>
              <div>• SAN / NAS Datastores → Cloud Managed Block &amp; File Storage (EFS / Azure Files)</div>
              <div>• Backup appliances → Cloud-native automated snapshot vaults &amp; disaster recovery</div>
            </div>
          </div>

          {/* Pattern 3 */}
          <div className="bg-base-100 dark:bg-navy-950 text-base-content dark:text-white p-8 rounded-2xl border border-base-300 dark:border-white/10 relative shadow-sm">
            <CornerMarkers />
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold font-heading text-base-content dark:text-white">3. Cloud-to-Cloud Consolidation</h3>
            </div>
            <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-4">
              Cross-cloud consolidation (e.g. AWS to Azure or GCP to AWS) following M&amp;A activity or strategic enterprise licensing agreements.
            </p>
            <div className="p-4 bg-base-200/60 dark:bg-navy-900 rounded-xl border border-base-300 dark:border-white/5 font-mono text-xs text-base-content/80 dark:text-slate-400 space-y-1">
              <div>• Automated S3 / Blob cross-cloud sync over high-speed backbone connections</div>
              <div>• Infrastructure-as-Code translation (Terraform provider transposition)</div>
              <div>• Database live replication &amp; minimal cutover synchronization</div>
            </div>
          </div>

          {/* Pattern 4 */}
          <div className="bg-base-100 dark:bg-navy-950 text-base-content dark:text-white p-8 rounded-2xl border border-base-300 dark:border-white/10 relative shadow-sm">
            <CornerMarkers />
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-7 h-7 text-primary" />
              <h3 className="text-2xl font-bold font-heading text-base-content dark:text-white">4. Hybrid &amp; Phased Migration Architecture</h3>
            </div>
            <p className="text-sm text-base-content/75 dark:text-slate-300 leading-relaxed mb-4">
              Workloads operating across on-premises data centers and the cloud indefinitely due to regulatory data residency mandates or latency constraints.
            </p>
            <div className="p-4 bg-base-200/60 dark:bg-navy-900 rounded-xl border border-base-300 dark:border-white/5 font-mono text-xs text-base-content/80 dark:text-slate-400 space-y-1">
              <div>• Dedicated Direct Connect / ExpressRoute redundant circuits with BGP routing</div>
              <div>• Split-brain DNS resolution &amp; hybrid service mesh connectivity</div>
              <div>• Unified FinOps monitoring across edge and cloud infrastructure</div>
            </div>
          </div>
        </div>
      </section>

      {/* PREREQUISITES / ACCOUNT FOR */}
      <section className="bg-base-200/50 dark:bg-[#0c1a2e] py-16 px-6 sm:px-10 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-bold text-2xl sm:text-3xl text-base-content dark:text-white mb-8 font-heading">
            What Every Migration Architecture Has to Account For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">
                Server &amp; Environment Inventory
              </h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">
                Critical Application &amp; Database Dependencies
              </h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">
                Network Topology &amp; Connectivity
              </h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">
                Firewall Rules &amp; Security Groups
              </h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">
                Identity &amp; Hybrid Identity Systems
              </h3>
            </div>
            <div className="border border-base-300 dark:border-white/10 bg-base-100 dark:bg-navy-light rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-sm sm:text-base text-base-content dark:text-white">
                Monitoring &amp; Observability Continuity
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CROSS-LINK */}
      <section className="bg-base-200/60 dark:bg-navy-900 py-8 px-6 text-center border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/solutions/cloud-architecture-landing-zone-design"
            className="inline-flex items-center gap-2 font-heading font-semibold text-sm md:text-base text-primary dark:text-blue-400 hover:underline transition-colors"
          >
            See how this connects to Landing Zone Design <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section id="faq" className="bg-base-100 py-16 px-6 border-b border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Common Questions
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-base-content dark:text-white">Migration Pattern Questions</h2>

          <div className="divide-y divide-base-300 dark:divide-white/10">
            {faqs.map((f, i) => (
              <details key={i} className="py-4 group">
                <summary className="font-heading font-semibold text-base cursor-pointer flex justify-between items-center text-base-content dark:text-white">
                  <span>{f.q}</span>
                  <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-sm text-base-content/75 dark:text-white/70 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA BANNER */}
      <section className="bg-base-200/80 dark:bg-navy-950 text-base-content dark:text-white py-12 px-6 text-center border-t border-base-300 dark:border-white/10 transition-colors">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/solutions/cloud-migration#requirement-form"
            className="inline-flex items-center gap-2 font-heading font-bold text-base md:text-lg text-primary dark:text-blue-400 hover:underline transition-colors"
          >
            Ready to scope your migration? <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

