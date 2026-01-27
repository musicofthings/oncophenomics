
import React from 'react';
import GlobalHeader from '../components/GlobalHeader';

const VariantSecurity: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <GlobalHeader title="Security & Compliance" />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Enterprise-Grade Patient Privacy</h1>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl mb-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-20">
             <span className="material-symbols-outlined text-[120px]">verified_user</span>
           </div>
           <div className="relative z-10 max-w-2xl">
             <h2 className="text-2xl font-bold mb-4">HIPAA & GDPR Ready</h2>
             <p className="text-slate-300 leading-relaxed mb-6">Patient data is encrypted at rest and in transit using AES-256 and TLS 1.3. We maintain zero-knowledge infrastructure for sensitive genomic markers, ensuring your lab remains fully compliant with international privacy laws.</p>
             <div className="flex flex-wrap gap-4">
               <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold border border-white/20">SOC2 Type II</span>
               <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold border border-white/20">ISO 27001</span>
               <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold border border-white/20">Data Sovereignty</span>
             </div>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Private Cloud Deployment</h3>
             <p className="text-slate-600 dark:text-slate-400">For institutions with strict data residency requirements, VariantGPT can be deployed within your own AWS, Azure, or GCP Virtual Private Cloud (VPC).</p>
           </div>
           <div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Audit Logs & Access Control</h3>
             <p className="text-slate-600 dark:text-slate-400">Detailed RBAC (Role Based Access Control) and comprehensive immutable audit trails for every report generated and every variant classified.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VariantSecurity;
