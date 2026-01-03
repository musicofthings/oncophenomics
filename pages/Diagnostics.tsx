import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const Diagnostics: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col font-display animate-in fade-in duration-300">
      <GlobalHeader title="Tissue Biopsy" />

      <div className="w-full max-w-5xl mx-auto">
        {/* Content */}
        <div className="px-5 space-y-6 mt-6 pb-8">
          {/* Hero Image */}
          <div className="w-full relative overflow-hidden rounded-3xl min-h-[260px] md:h-[400px] shadow-glow transform transition-transform duration-500 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAI9GDVrspwHjLaoitaM_mjqPghkzmEJ8EsX26M0ePY-JM5EkyskLjWrriG7xMlm4KUfDGcvpkrxzDBME052s3nnHuBxjrHXj1hIPAofwPKNuMvD0aixcZx6_uND6oX_4JRfUZMbysGnI4MR4ruU10z8ZBXotx33-_meXKIeRlrfgdqz3mHs4o12OLCcIcHNjQFu5ZBuh3h400FuJYEthIjL__8h49jhQ__yxr5PHPzSTtziQ8P316HMrnm39ozh2NynAD8qeVCDgpA")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary/40 to-transparent mix-blend-multiply opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent"></div>
            
            <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10 min-h-[260px]">
              <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/10 backdrop-blur-md pl-2 pr-3 py-1 text-[11px] font-bold text-white border border-white/20 mb-3 shadow-sm">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                AI POWERED ANALYSIS
              </div>
              <h1 className="text-white text-[2rem] md:text-5xl font-bold leading-tight tracking-tight mb-1">Tissue Biopsy</h1>
              <p className="text-blue-50 text-sm md:text-lg font-medium opacity-90">Gold Standard • Cellular Level • Detailed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {/* Text */}
              <div className="mb-6">
                <h2 className="text-gray-900 dark:text-white tracking-tight text-xl font-bold leading-tight mb-3">
                  Comprehensive Tissue Analysis
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-[15px] font-normal leading-relaxed">
                  Our AI-driven tissue biopsy service analyzes physical tumor samples to identify specific mutations, providing the most detailed cellular architecture data available for targeted therapy.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-5 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 transition-colors hover:border-primary/20">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400">
                    <span className="material-symbols-outlined">biotech</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">High Precision</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-normal">Identifies genetic mutations with 99.9% accuracy using next-gen sequencing.</p>
                  </div>
                </div>
                <div className="flex items-start p-5 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 transition-colors hover:border-primary/20">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-900/20 text-secondary dark:text-cyan-400">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">Cellular Architecture</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-normal">Detailed visualization of tumor microenvironment and spatial biology.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Card */}
            <div className="rounded-3xl bg-gradient-to-br from-secondary to-primary-dark p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl group-hover:bg-white/30 transition-colors duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 text-white/90">
                  <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[18px]">medical_services</span>
                  </div>
                  <h3 className="text-[15px] font-bold uppercase tracking-wider">Role in Precision Oncology</h3>
                </div>
                <p className="text-white text-[15px] leading-relaxed mb-5 font-medium">
                  Tissue biopsy remains the cornerstone of precision medicine, allowing us to map the tumor's DNA signature and match patients with specific immunotherapies and targeted drugs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-lg bg-white/20 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm border border-white/10">Mutation Profiling</span>
                  <span className="inline-flex items-center rounded-lg bg-white/20 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm border border-white/10">Drug Matching</span>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-6">The Process</h3>
            <div className="md:grid md:grid-cols-3 md:gap-8 relative">
                {/* Horizontal line for desktop */}
                <div className="hidden md:block absolute top-[15px] left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>
                
                <div className="relative pl-6 md:pl-0 md:pt-8 md:text-center border-l-2 md:border-l-0 border-gray-100 dark:border-gray-800 pb-8 md:pb-0">
                  <div className="absolute -left-[9px] top-1.5 h-4 w-4 md:left-1/2 md:-translate-x-1/2 md:top-0 rounded-full border-[3px] border-primary bg-white dark:bg-background-dark shadow-[0_0_0_4px_rgba(59,130,246,0.15)] z-10"></div>
                  <p className="text-[15px] font-bold text-gray-900 dark:text-white">Sample Collection</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Surgical or needle biopsy procedure</p>
                </div>
                
                <div className="relative pl-6 md:pl-0 md:pt-8 md:text-center border-l-2 md:border-l-0 border-gray-100 dark:border-gray-800 pb-8 md:pb-0">
                  <div className="absolute -left-[9px] top-1.5 h-4 w-4 md:left-1/2 md:-translate-x-1/2 md:top-0 rounded-full border-[3px] border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark z-10"></div>
                  <p className="text-[15px] font-bold text-gray-900 dark:text-white">Lab Processing</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">DNA extraction and sequencing</p>
                </div>
                
                <div className="relative pl-6 md:pl-0 md:pt-8 md:text-center border-l-2 md:border-l-0 border-gray-100 dark:border-gray-800">
                  <div className="absolute -left-[9px] top-1.5 h-4 w-4 md:left-1/2 md:-translate-x-1/2 md:top-0 rounded-full border-[3px] border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark z-10"></div>
                  <p className="text-[15px] font-bold text-gray-900 dark:text-white">AI Analysis & Report</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Actionable insights generated within 48h</p>
                </div>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 z-50 md:static md:bg-transparent md:border-none md:p-0 md:mt-8 md:mb-12">
          <button 
            onClick={() => navigate('/contact')}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-dark to-secondary hover:brightness-110 text-white py-4 px-4 font-bold text-[16px] shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;