import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

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
    // Map kebab-case ids to camelCase state keys where necessary
    const key = id === 'inquiry-type' ? 'inquiryType' : id;
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the email body
    const subject = `[${formData.inquiryType}] Inquiry from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Organization: ${formData.org}
Inquiry Type: ${formData.inquiryType}

Message:
${formData.message}

------------------------------------------------
Sent via Oncophenomics Web App
    `.trim();

    const mailtoLink = `mailto:contact@oncophenomics.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Inform user about file attachment (mailto limitation)
    if (file) {
      alert(`Please note: Due to browser security restrictions, the file "${file.name}" cannot be attached automatically.\n\nPlease manually attach it in the email window that opens next.`);
    }

    window.location.href = mailtoLink;
  };

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
                {/* Email Support Blurb - Scrolls to Form */}
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

                {/* Call Center Blurb - WhatsApp */}
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

            {/* Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="inquiry-type" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Inquiry Type</label>
                    <div className="relative">
                        <select 
                            id="inquiry-type" 
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            className="w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow"
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
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Dr. Jane Doe" 
                        required
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow" 
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane.doe@hospital.org" 
                        required
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow" 
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
                        value={formData.org}
                        onChange={handleInputChange}
                        placeholder="General Hospital" 
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow" 
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="file-upload" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Upload Patient Reports</label>
                    <div className="relative group">
                        <input 
                            type="file" 
                            id="file-upload" 
                            accept=".pdf" 
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-secondary hover:file:bg-cyan-100 dark:file:bg-cyan-900/30 dark:file:text-secondary dark:hover:file:bg-cyan-900/50 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-background-dark cursor-pointer transition-colors focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" 
                        />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                        Scanned PDF files are accepted.
                    </p>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                    <textarea 
                        id="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="How can we help you?" 
                        required
                        className="w-full resize-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-background-dark px-4 py-3 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary transition-shadow"
                    ></textarea>
                </div>

                <div className="rounded-lg bg-cyan-50 dark:bg-cyan-900/10 p-3 flex gap-3 items-start border border-cyan-100 dark:border-cyan-800/30">
                    <span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">info</span>
                    <p className="text-xs text-cyan-900 dark:text-cyan-100 leading-relaxed">
                        <strong>Note:</strong> Please do not share sensitive patient health information (PHI) via this form. Use our secure portal for clinical data.
                    </p>
                </div>

                <button type="submit" className="mt-2 w-full rounded-lg bg-gradient-to-r from-primary to-secondary py-3.5 text-center text-base font-bold text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200">
                    Send Message
                </button>
            </form>
          </div>
        </div>

        <div className="mt-12 px-6 text-center pb-8 border-t border-slate-200 dark:border-slate-800 pt-8 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-sm font-bold text-slate-900 dark:text-white mb-3 tracking-wide">ONCOPHENOMICS</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto mb-6">
                Suite 104, 1st Floor, Inspire Infra-Horizon,<br/>
                Future Kids School Road, Financial District,<br/>
                Nanakramguda, Hyderabad, Telangana-500032
            </p>
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm text-secondary">mail</span>
                    <a href="mailto:contact@oncophenomics.com" className="hover:text-primary transition-colors font-medium">contact@oncophenomics.com</a>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="material-symbols-outlined text-sm text-secondary">call</span>
                    <a href="https://wa.me/918886233344" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">+91-8886233344</a>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;