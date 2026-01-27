
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  // Status state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    inquiryType: 'Patient Support',
    name: '',
    email: '',
    org: '',
    message: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const key = id === 'inquiry-type' ? 'inquiryType' : id;
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // In a real production environment on Cloudflare Pages, 
      // you would point this to a Cloudflare Worker at '/api/contact'
      // For now, we simulate the network request
      
      console.log('Submitting Contact Form:', { ...formData, hasFile: !!file });
      
      // Simulation delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // SUCCESS
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('Contact Form Error:', err);
      setErrorMsg('Failed to send message. Please try again later or contact us directly via email.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen font-display flex flex-col items-center justify-center p-6 text-center">
        <GlobalHeader title="Message Sent" />
        <div className="max-w-md w-full bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-300">
           <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-emerald-600 text-4xl">check_circle</span>
           </div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">We've got it!</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
             Thank you for reaching out, <strong>{formData.name}</strong>. Our oncology team will review your message and respond within 24 hours.
           </p>
           <button 
             onClick={() => navigate('/')}
             className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98]"
           >
             Return Home
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col font-display antialiased selection:bg-secondary selection:text-white overflow-x-hidden">
      
      <GlobalHeader title="Contact Us" />

      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col pb-10">
        <div className="px-4 pt-6 pb-2 flex justify-start">
          <div className="flex items-center">
            <span className="font-bold text-xl tracking-tight text-primary">ONCO</span>
            <span className="font-light text-xl tracking-tight text-secondary">PHENOMICS</span>
          </div>
        </div>

        <div className="px-4 pt-2 pb-2">
            <h2 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight text-left">
                Get in touch with our Oncology AI Team.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pt-3 max-w-2xl">
                We are here to assist with clinical inquiries, technical support, or partnership opportunities.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 px-4 mt-6">
          <div>
            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-3">
                <div 
                    onClick={scrollToForm}
                    className="group flex flex-col items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/50 dark:hover:border-primary/50 text-left cursor-pointer"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div className="w-full">
                        <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Email Support</h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block break-all">contact@oncophenomics.com</span>
                    </div>
                </div>

                <a 
                    href="https://wa.me/918886233344"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-start gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark p-4 shadow-sm transition-all hover:shadow-md hover:border-secondary/50 dark:hover:border-secondary/50 text-left cursor-pointer"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Call Center</h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">+91-8886233344</span>
                    </div>
                </a>
            </div>
          </div>

          <div ref={formRef} className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-6">Send us a message</h3>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="inquiry-type" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Inquiry Type</label>
                    <div className="relative">
                        <select 
                            id="inquiry-type" 
                            disabled={loading}
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow disabled:opacity-50"
                        >
                            <option>Patient Support</option>
                            <option>Clinical Inquiry</option>
                            <option>Partnership</option>
                            <option>Technical Issue</option>
                        </select>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                            <span className="material-symbols-outlined">expand_more</span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        disabled={loading}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Dr. Jane Doe" 
                        required
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow disabled:opacity-50" 
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        disabled={loading}
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane.doe@hospital.org" 
                        required
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow disabled:opacity-50" 
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                        <label htmlFor="org" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Organization / Hospital</label>
                        <span className="text-xs text-slate-400 font-normal pt-0.5">Optional</span>
                    </div>
                    <input 
                        type="text" 
                        id="org" 
                        disabled={loading}
                        value={formData.org}
                        onChange={handleInputChange}
                        placeholder="General Hospital" 
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow disabled:opacity-50" 
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="file-upload" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Upload Patient Reports (Optional)</label>
                    <div className="relative group">
                        <input 
                            type="file" 
                            id="file-upload" 
                            disabled={loading}
                            accept=".pdf,.jpg,.png" 
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-secondary hover:file:bg-cyan-100 dark:file:bg-cyan-900/30 dark:file:text-secondary dark:hover:file:bg-cyan-900/50 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-background-dark cursor-pointer transition-colors focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary disabled:opacity-50" 
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                    <textarea 
                        id="message" 
                        rows={4} 
                        disabled={loading}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?" 
                        required
                        className="w-full resize-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow disabled:opacity-50"
                    ></textarea>
                </div>

                <div className="rounded-lg bg-cyan-50 dark:bg-cyan-900/10 p-3 flex gap-3 items-start border border-cyan-100 dark:border-cyan-800/30">
                    <span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">info</span>
                    <p className="text-xs text-cyan-900 dark:text-cyan-100 leading-relaxed">
                        <strong>Security Note:</strong> This form uses enterprise-grade encryption. For HIPAA-compliant clinical data transfer, please request access to our secure provider portal.
                    </p>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-4 text-center text-base font-bold text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                      <>
                        <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span className="material-symbols-outlined text-sm">send</span>
                      </>
                    )}
                </button>
            </form>
          </div>
        </div>

        <div className="mt-12 px-6 text-center pb-8 border-t border-slate-200 dark:border-slate-800 pt-8 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-wide uppercase">Oncophenomics Global</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto mb-6">
                Suite 104, Inspire Infra-Horizon,<br/>
                Financial District, Nanakramguda,<br/>
                Hyderabad, Telangana-500032
            </p>
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm text-secondary">mail</span>
                    <a href="mailto:contact@oncophenomics.com" className="hover:text-primary transition-colors font-medium">contact@oncophenomics.com</a>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
