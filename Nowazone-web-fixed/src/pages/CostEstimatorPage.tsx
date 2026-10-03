import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { useModal } from '../context/ModalContext';
import { Server, HardDrive, Database, Layers, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert, AlertCircle, Loader2 } from 'lucide-react';
import { submitAssessment } from '../api/forms';

interface ProgressDot {
  bg: string;
}

const REGIONS = ['East US', 'West Europe', 'UK South', 'UAE North', 'Central India', 'Southeast Asia'];
const REGION_MULT: Record<string, number> = {
  'East US': 1,
  'West Europe': 1.05,
  'UK South': 1.08,
  'UAE North': 1.15,
  'Central India': 0.85,
  'Southeast Asia': 0.95,
};

const VM_OPTIONS = [
  { id: 'B2s', label: 'B2s — Burstable, 2 vCPU, 4GB RAM', base: 30 },
  { id: 'D2s_v5', label: 'D2s_v5 — General Purpose, 2 vCPU, 8GB RAM', base: 70 },
  { id: 'D4s_v5', label: 'D4s_v5 — General Purpose, 4 vCPU, 16GB RAM', base: 140 },
  { id: 'D8s_v5', label: 'D8s_v5 — General Purpose, 8 vCPU, 32GB RAM', base: 280 },
];

const STORAGE_OPTIONS = [
  { id: 'std_hdd', label: 'Standard HDD (Low-tier cold)', perGb: 0.02 },
  { id: 'std_ssd', label: 'Standard SSD (Balanced general purpose)', perGb: 0.05 },
  { id: 'prem_ssd', label: 'Premium SSD (High IOPs / low latency)', perGb: 0.12 },
];

const DB_TIER_OPTIONS = [
  { id: 'basic', label: 'Basic (Dev / Test workloads)', base: 25 },
  { id: 'standard', label: 'Standard (Production general purpose)', base: 120 },
  { id: 'premium', label: 'Premium (High throughput / low latency)', base: 400 },
];

const DB_SIZE_OPTIONS = [
  { id: 'small', label: 'Small (2 vCore, 8GB)', mult: 1 },
  { id: 'medium', label: 'Medium (4 vCore, 16GB)', mult: 1.5 },
  { id: 'large', label: 'Large (8 vCore, 32GB)', mult: 2 },
];

const PAAS_SERVICES = [
  { id: 'app_service', label: 'App Service (Linux / Windows Web Apps)' },
  { id: 'functions', label: 'Azure Functions (Consumption / Serverless)' },
  { id: 'aks', label: 'Azure Kubernetes Service (AKS Managed)' },
];

const PAAS_TIERS: Record<string, Array<{ id: string; label: string; base: number }>> = {
  app_service: [
    { id: 'b1', label: 'Basic B1 — 1 Core, 1.75GB', base: 13 },
    { id: 's1', label: 'Standard S1 — 1 Core, 1.75GB (Autoscale)', base: 70 },
    { id: 'p1v3', label: 'Premium P1v3 — 2 Core, 8GB', base: 150 },
  ],
  functions: [
    { id: 'consumption', label: 'Consumption (pay-per-execution)', base: 20 },
    { id: 'premium_ep1', label: 'Premium EP1 (Always ready, VNet)', base: 175 },
  ],
  aks: [
    { id: 'standard_2node', label: 'Standard tier, 2-node D2s_v5 pool', base: 155 },
    { id: 'standard_4node', label: 'Standard tier, 4-node D4s_v5 pool', base: 560 },
  ],
};

const COMMITMENTS = [
  { id: 'ondemand', label: 'Pay-as-you-go (On-Demand)', factor: 1 },
  { id: 'y1', label: '1-Year Reserved Instance', factor: 0.7 },
  { id: 'y3', label: '3-Year Reserved Instance', factor: 0.45 },
];

function roundNice(n: number): number {
  return Math.round(n / 5) * 5;
}

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

export const CostEstimatorPage: React.FC = () => {
  const { openAssessmentModal } = useModal();

  const [step, setStep] = useState<number>(1);
  const [resourceType, setResourceType] = useState<'compute' | 'storage' | 'database' | 'paas'>('compute');

  const [region, setRegion] = useState<string>('East US');
  const [vmSize, setVmSize] = useState<string>('D2s_v5');
  const [storageType, setStorageType] = useState<string>('std_ssd');
  const [capacityGb, setCapacityGb] = useState<number>(500);
  const [dbTier, setDbTier] = useState<string>('standard');
  const [dbSize, setDbSize] = useState<string>('small');
  const [paasService, setPaasService] = useState<string>('app_service');
  const [paasTier, setPaasTier] = useState<string>('s1');

  const [quantity, setQuantity] = useState<number>(1);
  const [commitment, setCommitment] = useState<string>('ondemand');

  const [emailEstStatus, setEmailEstStatus] = useState<'idle' | 'input' | 'submitting' | 'sent' | 'error'>('idle');
  const [emailEstEmail, setEmailEstEmail] = useState<string>('');
  const [emailEstName, setEmailEstName] = useState<string>('');
  const [emailEstError, setEmailEstError] = useState<string | null>(null);

  const regionMult = REGION_MULT[region] || 1;

  const calcMonthly = (commitmentId: string) => {
    const factor = COMMITMENTS.find((c) => c.id === commitmentId)?.factor || 1;
    if (resourceType === 'compute') {
      const vm = VM_OPTIONS.find((v) => v.id === vmSize) || VM_OPTIONS[1];
      return roundNice(vm.base * regionMult * quantity * factor);
    }
    if (resourceType === 'storage') {
      const st = STORAGE_OPTIONS.find((x) => x.id === storageType) || STORAGE_OPTIONS[1];
      return roundNice(st.perGb * capacityGb * regionMult * factor);
    }
    if (resourceType === 'database') {
      const tier = DB_TIER_OPTIONS.find((t) => t.id === dbTier) || DB_TIER_OPTIONS[1];
      const size = DB_SIZE_OPTIONS.find((sz) => sz.id === dbSize) || DB_SIZE_OPTIONS[0];
      return roundNice(tier.base * regionMult * size.mult * quantity * factor);
    }
    const tiers = PAAS_TIERS[paasService] || PAAS_TIERS.app_service;
    const tier2 = tiers.find((t) => t.id === paasTier) || tiers[0];
    return roundNice(tier2.base * regionMult * quantity * factor);
  };

  const monthly = calcMonthly(commitment);
  const altId = commitment === 'ondemand' ? 'y1' : 'ondemand';
  const altMonthly = calcMonthly(altId);
  const diff = Math.abs(monthly - altMonthly);
  const pct = monthly > 0 ? Math.round((diff / monthly) * 100) : 0;
  const isSavingByReserving = commitment === 'ondemand';

  const handleSendEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailEstEmail || emailEstStatus === 'submitting') return;
    setEmailEstStatus('submitting');
    setEmailEstError(null);
    try {
      const res = await submitAssessment({
        name: emailEstName.trim() || 'Estimator Visitor',
        email: emailEstEmail.trim(),
        platform: 'Azure',
        spend: `$${monthly}/mo`,
        model: 'Self-Service Cost Estimator',
        message: `Estimated configuration: ${resourceType} in ${region}, qty ${quantity}, commitment: ${commitment}. List estimate: ${fmt(monthly)}/mo.`,
        listEstimate: monthly,
        page: '/cost-estimator',
      });
      if (res.status === 'success') {
        setEmailEstStatus('sent');
      } else {
        setEmailEstStatus('error');
        setEmailEstError(res.message || 'Failed to dispatch estimate. Please check your email and try again.');
      }
    } catch (err: any) {
      setEmailEstStatus('error');
      setEmailEstError(err.message || 'Network error. Please try again later.');
    }
  };


  return (
    <>
      <SEO
        title="Azure Cost Estimator | Cloud Pricing Calculator — Nowazone"
        description="Estimate your Azure cloud costs by resource, region and commitment level — then see what a negotiated rate could look like."
        canonical="/cost-estimator"
      />

      {/* SIMULATION DISCLOSURE */}
      <div className="bg-amber-400 text-amber-950 px-6 py-3.5 text-center text-xs md:text-sm font-semibold border-b-2 border-amber-600 sticky top-16 z-30 flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 flex-none" />
        <span>
          <strong>SIMULATED PRICING</strong> — This estimator provides illustrative baseline calculations across representative Azure SKUs. Connect with our FinOps team for live API contract audit and negotiated enterprise discounts.
        </span>
      </div>

      {/* HERO */}
      <section className="bg-base-200/50 dark:bg-navy-900 border-b border-base-300 dark:border-white/10 px-6 py-12 md:py-16 text-center transition-colors">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs uppercase tracking-widest text-primary font-bold mb-3 font-heading">
            Interactive Cost Model
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-base-content dark:text-white font-heading tracking-tight mb-4">
            Estimate Your Real Azure Cloud Costs — Then See What You Could Save.
          </h1>
          <p className="text-base md:text-lg text-base-content/75 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select your resource profile, target datacenter region, and commitment duration. Compare on-demand list pricing against reserved multi-year enterprise models.
          </p>
        </div>
      </section>

      {/* PROVIDER TABS */}
      <section className="bg-base-100 border-b border-base-300 py-6 px-6">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <button
            type="button"
            className="px-6 py-2.5 rounded text-sm font-bold bg-primary text-white shadow-md font-heading cursor-default"
          >
            Microsoft Azure
          </button>
          <button
            type="button"
            disabled
            className="px-5 py-2.5 rounded text-sm font-semibold border border-base-300 text-base-content/40 bg-base-200 cursor-not-allowed flex items-center gap-2"
          >
            AWS <span className="text-[10px] uppercase tracking-wider bg-base-300 px-2 py-0.5 rounded-full">Coming Soon</span>
          </button>
          <button
            type="button"
            disabled
            className="px-5 py-2.5 rounded text-sm font-semibold border border-base-300 text-base-content/40 bg-base-200 cursor-not-allowed flex items-center gap-2"
          >
            Google Cloud <span className="text-[10px] uppercase tracking-wider bg-base-300 px-2 py-0.5 rounded-full">Coming Soon</span>
          </button>
        </div>
      </section>

      {/* WIZARD CONTAINER */}
      <section className="bg-base-100 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex gap-2 justify-center mb-10">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`h-2 flex-1 max-w-[120px] rounded-full transition-all duration-300 ${
                  num <= step ? 'bg-primary' : 'bg-base-300'
                }`}
              />
            ))}
          </div>

          {/* STEP 1: Resource Selection */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-center mb-3">
                1. What Resource Are You Estimating?
              </h2>
              <p className="text-sm text-center text-base-content/70 mb-8">
                Choose the primary infrastructure layer you want to benchmark.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setResourceType('compute')}
                  className={`relative p-6 rounded-lg text-center cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    resourceType === 'compute'
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-base-300 bg-base-200/50'
                  }`}
                >
                  <CornerMarkers />
                  <Server className="w-9 h-9 mx-auto mb-4 text-primary" />
                  <span className="block font-heading font-semibold text-sm">
                    Virtual Machines / Compute
                  </span>
                </div>

                <div
                  onClick={() => setResourceType('storage')}
                  className={`relative p-6 rounded-lg text-center cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    resourceType === 'storage'
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-base-300 bg-base-200/50'
                  }`}
                >
                  <CornerMarkers />
                  <HardDrive className="w-9 h-9 mx-auto mb-4 text-primary" />
                  <span className="block font-heading font-semibold text-sm">
                    Block &amp; Blob Storage
                  </span>
                </div>

                <div
                  onClick={() => setResourceType('database')}
                  className={`relative p-6 rounded-lg text-center cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    resourceType === 'database'
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-base-300 bg-base-200/50'
                  }`}
                >
                  <CornerMarkers />
                  <Database className="w-9 h-9 mx-auto mb-4 text-primary" />
                  <span className="block font-heading font-semibold text-sm">
                    Managed SQL / Cosmos
                  </span>
                </div>

                <div
                  onClick={() => setResourceType('paas')}
                  className={`relative p-6 rounded-lg text-center cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    resourceType === 'paas'
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-base-300 bg-base-200/50'
                  }`}
                >
                  <CornerMarkers />
                  <Layers className="w-9 h-9 mx-auto mb-4 text-primary" />
                  <span className="block font-heading font-semibold text-sm">
                    PaaS (App Service / AKS)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Configure Resource */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-center mb-3">
                2. Configure Your Resource Parameters
              </h2>
              <p className="text-sm text-center text-base-content/70 mb-8">
                Specify geographic region and sizing specs to calculate pricing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200/40 p-6 md:p-8 rounded-lg border border-base-300 relative">
                <CornerMarkers />
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                    Azure Datacenter Region
                  </label>
                  <select
                    className="select select-bordered w-full font-body"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r} {REGION_MULT[r] !== 1 ? `(Regional Index: ${REGION_MULT[r]}x)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {resourceType === 'compute' && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                      Virtual Machine Tier &amp; Family
                    </label>
                    <select
                      className="select select-bordered w-full font-body"
                      value={vmSize}
                      onChange={(e) => setVmSize(e.target.value)}
                    >
                      {VM_OPTIONS.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.label} (Base: ${v.base}/mo)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {resourceType === 'storage' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                        Storage Disk Performance
                      </label>
                      <select
                        className="select select-bordered w-full font-body"
                        value={storageType}
                        onChange={(e) => setStorageType(e.target.value)}
                      >
                        {STORAGE_OPTIONS.map((st) => (
                          <option key={st.id} value={st.id}>
                            {st.label} (${st.perGb}/GB)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                        Allocated Capacity (GB)
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="input input-bordered w-full font-body"
                        value={capacityGb}
                        onChange={(e) => setCapacityGb(Math.max(1, Number(e.target.value) || 1))}
                      />
                    </div>
                  </>
                )}

                {resourceType === 'database' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                        Database Tier
                      </label>
                      <select
                        className="select select-bordered w-full font-body"
                        value={dbTier}
                        onChange={(e) => setDbTier(e.target.value)}
                      >
                        {DB_TIER_OPTIONS.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                        Compute Core Size
                      </label>
                      <select
                        className="select select-bordered w-full font-body"
                        value={dbSize}
                        onChange={(e) => setDbSize(e.target.value)}
                      >
                        {DB_SIZE_OPTIONS.map((sz) => (
                          <option key={sz.id} value={sz.id}>
                            {sz.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {resourceType === 'paas' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                        Target Cloud Service
                      </label>
                      <select
                        className="select select-bordered w-full font-body"
                        value={paasService}
                        onChange={(e) => {
                          const svc = e.target.value;
                          const firstTier = (PAAS_TIERS[svc] || PAAS_TIERS.app_service)[0].id;
                          setPaasService(svc);
                          setPaasTier(firstTier);
                        }}
                      >
                        {PAAS_SERVICES.map((ps) => (
                          <option key={ps.id} value={ps.id}>
                            {ps.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                        Service Plan / Node SKU
                      </label>
                      <select
                        className="select select-bordered w-full font-body"
                        value={paasTier}
                        onChange={(e) => setPaasTier(e.target.value)}
                      >
                        {(PAAS_TIERS[paasService] || PAAS_TIERS.app_service).map((pt) => (
                          <option key={pt.id} value={pt.id}>
                            {pt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Usage & Quantity */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-center mb-3">
                3. Deployment Scale &amp; Term Commitment
              </h2>
              <p className="text-sm text-center text-base-content/70 mb-8">
                How many instances do you run, and what is your reservation horizon?
              </p>

              <div className="max-w-md mx-auto space-y-6 bg-base-200/40 p-6 md:p-8 rounded-lg border border-base-300 relative">
                <CornerMarkers />
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                    Instance Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="input input-bordered w-full font-body text-lg font-semibold"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-base-content/70 mb-2 font-heading">
                    Commitment Model
                  </label>
                  <div className="flex flex-col gap-2">
                    {COMMITMENTS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCommitment(c.id)}
                        className={`text-left px-4 py-3 rounded-lg border text-sm font-semibold transition-all flex items-center justify-between ${
                          commitment === c.id
                            ? 'border-primary bg-primary text-white shadow-sm'
                            : 'border-base-300 bg-base-100 text-base-content hover:bg-base-200'
                        }`}
                      >
                        <span>{c.label}</span>
                        <span className="text-xs opacity-80">
                          {c.factor === 1 ? 'Standard list' : `${Math.round((1 - c.factor) * 100)}% discount`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Results & Lead Capture */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-center mb-2">
                4. Your Estimated Monthly Cost
              </h2>
              <p className="text-sm text-center text-base-content/70 mb-6">
                Estimated Azure baseline for {quantity} unit(s) in {region}.
              </p>

              <div className="text-center mb-8">
                <span className="font-heading font-extrabold text-5xl md:text-6xl text-primary tracking-tight">
                  {fmt(monthly)}
                </span>
                <span className="block text-sm text-base-content/70 mt-2 font-semibold">
                  per month · {COMMITMENTS.find((c) => c.id === commitment)?.label}
                </span>
              </div>

              {/* Comparison Callout */}
              <div className="border border-base-300 bg-base-200/50 rounded-xl p-6 mb-8 flex items-center justify-between gap-6 flex-wrap relative">
                <CornerMarkers />
                <div>
                  <span className="block font-heading font-bold text-base text-base-content mb-1">
                    {isSavingByReserving
                      ? 'Potential Savings with a 1-Year Reserved Instance'
                      : 'On-Demand Premium Comparison'}
                  </span>
                  <span className="block text-xs text-base-content/60">
                    Same architecture and volume, alternative commitment strategy.
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-heading font-extrabold text-2xl text-emerald-600 dark:text-emerald-400">
                    {isSavingByReserving ? '−' : '+'}{fmt(diff)}/mo ({pct}%)
                  </span>
                  <span className="block text-xs text-base-content/60">
                    {fmt(altMonthly)}/mo at {COMMITMENTS.find((c) => c.id === altId)?.label}
                  </span>
                </div>
              </div>

              {/* Personalized Quote Banner */}
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-8 text-center relative">
                <CornerMarkers />
                <h3 className="font-heading font-bold text-xl mb-2 text-base-content">
                  Want to unlock enterprise pricing below standard list?
                </h3>
                <p className="text-sm text-base-content/70 max-w-xl mx-auto mb-6 leading-relaxed">
                  Enterprise agreements (EA), CSP direct tiers, and hybrid benefit stacking frequently reduce these costs by an additional 15% to 38%. Let us evaluate your current commitments.
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    type="button"
                    onClick={openAssessmentModal}
                    className="btn btn-primary font-heading font-bold shadow-lg text-white"
                  >
                    Get My Free Cost X-Ray
                  </button>
                  {(emailEstStatus === 'idle' || emailEstStatus === 'error') && (
                    <button
                      type="button"
                      onClick={() => setEmailEstStatus('input')}
                      className="btn btn-outline border-base-300 font-heading font-semibold"
                    >
                      Email Me This Estimate
                    </button>
                  )}
                </div>

                {emailEstStatus === 'error' && emailEstError && (
                  <div className="max-w-md mx-auto mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{emailEstError}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailEstStatus('input')}
                      className="underline font-semibold hover:text-red-700 shrink-0"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {emailEstStatus === 'input' && (
                  <form onSubmit={handleSendEstimate} className="max-w-md mx-auto mt-6 flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={emailEstName}
                      onChange={(e) => setEmailEstName(e.target.value)}
                      className="input input-bordered w-full text-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your corporate email"
                      value={emailEstEmail}
                      onChange={(e) => setEmailEstEmail(e.target.value)}
                      className="input input-bordered w-full text-sm"
                    />
                    <button type="submit" className="btn btn-primary w-full text-white font-heading font-bold">
                      Send Estimate Summary
                    </button>
                  </form>
                )}

                {emailEstStatus === 'submitting' && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-primary">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Dispatching estimate summary...</span>
                  </div>
                )}

                {emailEstStatus === 'sent' && (
                  <div className="mt-6 flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Estimate dispatched to {emailEstEmail}. Our FinOps architect will follow up!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailEstStatus('idle');
                        setEmailEstEmail('');
                        setEmailEstName('');
                      }}
                      className="text-xs text-base-content/60 hover:underline"
                    >
                      Send to another email
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-base-300">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="btn btn-ghost gap-2 font-heading font-semibold"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                className="btn btn-primary gap-2 font-heading font-bold text-white shadow"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-ghost text-xs text-base-content/60 font-heading"
              >
                Reset Calculator
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
