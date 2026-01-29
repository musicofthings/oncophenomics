
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      // Save Inquiry to Firebase Firestore
      await addDoc(collection(db, "contact_inquiries"), {
        ...formData,
        status: "new",
        createdAt: serverTimestamp(),
        hasAttachment: !!file
      });
      
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error('Contact Form Error:', err);
      setErrorMsg(`Failed to secure message: ${err.message || 'Check connection'}`);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen font-display flex flex-col items-center justify-center p-6 text-center">
        <GlobalHeader title="Message Secured" />
        <div className="max-w-md w-full bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-300">
           <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-emerald-600 text-4xl">verified</span>
           </div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Request Logged</h2>
           <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
             Thank you, <strong>{formData.name}</strong>. Your inquiry has been encrypted and saved to our clinical cloud. A response will be issued within 24 hours.
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
      
      <GlobalHeader title="Contact Support" />

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
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-6">Secure Message Form</h3>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {errorMsg}
              </div>
            )}

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

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-4 text-center text-base font-bold text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {loading ? (
                      <>
                        <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Saving In Cloud...
                      </>
                    ) : (
                      <>
                        <span>Submit Secure Inquiry</span>
                        <span className="material-symbols-outlined text-sm">cloud_upload</span>
                      </>
                    )}
                </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
