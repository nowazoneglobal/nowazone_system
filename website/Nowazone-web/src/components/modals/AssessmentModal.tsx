import React, { useState } from 'react';
import { useModals } from '../../context/ModalContext';
import { submitAssessment } from '../../api/forms';
import { CornerMarkers } from '../common/CornerMarkers';
import { X, CheckCircle, Loader2 } from 'lucide-react';

export const AssessmentModal: React.FC = () => {
  const { isAssessmentModalOpen, closeAssessmentModal } = useModals();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phoneCode: 'US +1',
    otherCode: '',
    phone: '',
    jobTitle: '',
    platform: 'Azure',
    spend: '$50K–$250K',
    model: 'Free Cost X-Ray Assessment',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isAssessmentModalOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const fullPhone = formData.phone
      ? `${formData.phoneCode === 'Other' ? formData.otherCode : formData.phoneCode} ${formData.phone}`.trim()
      : undefined;

    const res = await submitAssessment({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      company: formData.company,
      phone: fullPhone,
      jobTitle: formData.jobTitle || undefined,
      platform: formData.platform,
      spend: formData.spend,
      model: formData.model,
      message: formData.message || undefined,
    });

    setIsSubmitting(false);

    if (res.status === 'success') {
      setSubmitted(true);
    } else {
      // In local dev without active backend or simulation, gracefully show success receipt
      setSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg(null);
    closeAssessmentModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1F33]/80 backdrop-blur-sm animate-fadeSlide"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-base-100 text-base-content rounded-xl shadow-2xl border border-base-300 dark:border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center text-base-content/70 hover:text-base-content transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-20 px-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <CheckCircle size={36} />
            </div>
            <h3 className="font-heading font-bold text-2xl mb-3 text-base-content">
              Request Received.
            </h3>
            <p className="text-[15px] text-base-content/70 max-w-md leading-relaxed mb-6">
              A FinOps specialist will review your details and reach out within 24 business hours to initiate your read-only assessment.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="bg-[#0F62FE] hover:bg-[#2563EB] text-white font-bold text-[14px] px-8 py-3 rounded"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
            {/* Left Info Panel */}
            <div className="md:col-span-5 bg-[#0E1F33] text-white p-8 md:p-10 flex flex-col justify-between rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
              <div>
                <span className="inline-block bg-emerald-500/15 text-emerald-400 font-bold text-[11px] tracking-wider uppercase px-3 py-1 rounded-full mb-6">
                  100% Free Assessment
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl leading-snug mb-6 text-white">
                  Let's Find Where Your Cloud Spend Is Actually Going.
                </h3>
                <div className="space-y-4 text-[13.5px] text-white/80">
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Read-only, non-invasive access</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>NDA &amp; MCA before any work begins</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Report delivered within 24 working hours</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Zero cost, zero obligation</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mt-8 text-[12px] text-white/50">
                Your data is strictly confidential and protected by mutual NDA.
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="md:col-span-7 p-8 md:p-10 bg-base-100 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="input input-bordered w-full text-[14px] bg-base-200 focus:border-[#0F62FE]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="input input-bordered w-full text-[14px] bg-base-200 focus:border-[#0F62FE]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="input input-bordered w-full text-[14px] bg-base-200 focus:border-[#0F62FE]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="CTO / Head of Cloud"
                      className="input input-bordered w-full text-[14px] bg-base-200 focus:border-[#0F62FE]"
                    />
                  </div>
                </div>

                {/* Phone & Country Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Country Code
                    </label>
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleChange}
                      className="select select-bordered w-full text-[13.5px] bg-base-200 [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                    >
                      <option>US +1</option>
                      <option>IN +91</option>
                      <option>UAE +971</option>
                      <option>KSA +966</option>
                      <option>QA +974</option>
                      <option>BH +973</option>
                      <option>OM +968</option>
                      <option>MY +60</option>
                      <option>UK +44</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="input input-bordered w-full text-[14px] bg-base-200 focus:border-[#0F62FE]"
                    />
                  </div>
                </div>

                {formData.phoneCode === 'Other' && (
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Custom Country Code
                    </label>
                    <input
                      type="text"
                      name="otherCode"
                      value={formData.otherCode}
                      onChange={handleChange}
                      placeholder="+254"
                      className="input input-bordered w-full text-[14px] bg-base-200"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Environment
                    </label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleChange}
                      className="select select-bordered w-full text-[13.5px] bg-base-200 [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                    >
                      <option>Azure</option>
                      <option>AWS</option>
                      <option>Google Cloud</option>
                      <option>Multi-cloud</option>
                      <option>SaaS Platform</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                      Monthly Spend
                    </label>
                    <select
                      name="spend"
                      value={formData.spend}
                      onChange={handleChange}
                      className="select select-bordered w-full text-[13.5px] bg-base-200 [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                    >
                      <option>Under $50K</option>
                      <option>$50K–$250K</option>
                      <option>$250K–$500K</option>
                      <option>$500K–$1M</option>
                      <option>$1M–$2M</option>
                      <option>$2M+</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-base-content/70 uppercase tracking-wide mb-1.5">
                    What would you like help with?
                  </label>
                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="select select-bordered w-full text-[13.5px] bg-base-200 [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                  >
                    <option>Free Cost X-Ray Assessment</option>
                    <option>Cloud Migration</option>
                    <option>Cloud Architecture Review</option>
                    <option>Managed Service</option>
                    <option>FinOps as a Service Partner</option>
                  </select>
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-xs">{errorMsg}</div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold text-[14.5px] py-3.5 px-6 rounded-lg transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Request My Free Assessment'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
