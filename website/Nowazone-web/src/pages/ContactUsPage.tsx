import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { submitContact } from '../api/forms';
import { CornerMarkers } from '../components/common/CornerMarkers';
import { Mail, Clock, CheckCircle, ArrowRight, Loader2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Free Cost Assessment',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await submitContact(formData);
    setLoading(false);
    if (res.status === 'success') {
      setSubmitted(true);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      <SEO
        title="Contact Us | Nowazone"
        description="Contact Nowazone about cloud FinOps, cost optimization, licensing, partnerships or careers. A real person replies within one business day."
        canonical="https://www.nowazone.com/contact-us"
      />

      {/* Hero Header */}
      <section className="py-16 md:py-20 px-6 sm:px-10 bg-base-100 border-b border-base-300 text-center">
        <div className="max-w-[800px] mx-auto">
          <span className="block text-[12px] tracking-widest uppercase text-[#0F62FE] font-bold mb-3">
            Contact Us
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-base-content tracking-tight mb-4">
            Talk to Us About Your Cloud, FinOps or AI Cost Questions.
          </h1>
          <p className="text-[16px] text-base-content/75 leading-relaxed max-w-xl mx-auto">
            Whatever the question — a quick inquiry or a comprehensive enterprise engagement — a real person reads every message. We reply within one business day.
          </p>
        </div>
      </section>

      {/* Main Contact Card Container */}
      <section className="py-16 px-6 sm:px-10 bg-base-200">
        <div className="max-w-[1050px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-base-300 dark:border-white/10 grid grid-cols-1 md:grid-cols-12">
          {/* Left Info Panel */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#0A1830] to-[#0E1F33] text-white p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h2 className="font-heading font-bold text-2xl mb-2 text-white">Get in Touch</h2>
              <p className="text-[14px] text-white/70 leading-relaxed mb-8">
                Personal or corporate email — this contact route is open to founders, finance leaders and cloud engineers.
              </p>

              <div className="space-y-4 text-[14px]">
                <a
                  href="mailto:info@nowazone.com"
                  className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                >
                  <Mail size={18} className="text-[#60A5FA]" />
                  <span>info@nowazone.com</span>
                </a>

                <a
                  href="mailto:partners@nowazone.com"
                  className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                >
                  <Mail size={18} className="text-[#60A5FA]" />
                  <span>partners@nowazone.com</span>
                </a>

                <div className="flex items-center gap-3 text-white/70">
                  <Clock size={18} className="text-[#60A5FA]" />
                  <span>Reply within one business day</span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mt-12">
              <span className="block text-[12px] font-bold text-white/50 uppercase tracking-wider mb-3">
                Looking for something specific?
              </span>
              <div className="space-y-2 text-[13.5px]">
                <Link to="/#hero" className="block text-[#60A5FA] hover:underline font-semibold">
                  → Book a free cost assessment
                </Link>
                <Link to="/partner-program" className="block text-[#60A5FA] hover:underline font-semibold">
                  → Apply to the Partner Program
                </Link>
                <Link to="/careers" className="block text-[#60A5FA] hover:underline font-semibold">
                  → View open roles
                </Link>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="md:col-span-7 p-8 md:p-10 bg-base-100 flex flex-col justify-center">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={36} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-base-content mb-2">Message Sent</h3>
                <p className="text-[14.5px] text-base-content/70 leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. A FinOps specialist will review your inquiry and reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-wider text-base-content/70 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="input input-bordered w-full text-[14px] bg-base-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-wider text-base-content/70 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="input input-bordered w-full text-[14px] bg-base-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wider text-base-content/70 mb-1.5">
                    Company <span className="text-base-content/50 normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="input input-bordered w-full text-[14px] bg-base-200"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wider text-base-content/70 mb-1.5">
                    What's this about? *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="select select-bordered w-full text-[14px] bg-base-200 [&>option]:bg-base-100 dark:[&>option]:bg-navy [&>option]:text-base-content dark:[&>option]:text-white"
                  >
                    <option>Free Cost Assessment</option>
                    <option>FinOps as a Service</option>
                    <option>Cloud Cost Optimization</option>
                    <option>Partner Program</option>
                    <option>Careers</option>
                    <option>Media or Press</option>
                    <option>Something else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold uppercase tracking-wider text-base-content/70 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your cloud setup, monthly spend, or specific questions..."
                    className="textarea textarea-bordered w-full text-[14px] bg-base-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F62FE] hover:bg-[#084EA3] text-white font-semibold text-[14.5px] py-3.5 rounded-lg transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                <p className="flex items-center gap-2 text-[12px] text-base-content/60 pt-1">
                  <Shield size={14} className="text-[#0F62FE] flex-none" />
                  <span>Your information stays confidential under mutual NDA and is never shared.</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
