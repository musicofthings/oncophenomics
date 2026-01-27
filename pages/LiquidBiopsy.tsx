
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const LiquidBiopsy: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Process' | 'Benefits' | 'Applications'>('Process');

  return (
    <div className="flex flex-col font-display animate-in slide-in-from-right duration-300">
      <GlobalHeader title="Liquid Biopsy" />

      <div className="w-full max-w-7xl mx-auto">
        {/* Hero */}
        <div className="relative w-full">
          <div className="@container">
            <div className="@[480px]:px-4 @[480px]:py-3 pt-2 px-0">
              <div 
                className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-100 dark:bg-slate-800 @[480px]:rounded-2xl shadow-sm" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuArd1mQLjswykWSz20_ej4Q9PdmYHQjZsloh1li0Tw-nZpiUjWKBMwE6YoGvUgApgMd-loXeLnSJshGSuzAtFtAuF0ftr0HXfX8bQgezdRywyrcK3ixhjb32JdE5L0S-KWY0g2cY0dCxs5MNSaoJxdD2qkZ-Vshyll4WCvVPOMbbdV1EaLeUt_2E5l2F30A9IQC9cXRWpeCQBC1gajekslu9tRjkftO6aXRbKtgy6zZqUSVT-cgEkRVNz2wiC0CX8qIOsnH1rQaS2tt")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90"></div>
                <div className="relative z-10 p-6 md:p-10">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary backdrop-blur-md px-3 py-1 rounded-full mb-3 shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-white text-[16px]">science</span>
                    <span className="text-white text-xs font-bold uppercase tracking-wide">AI Enhanced</span>
                  </div>
                  <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">Liquid Biopsy</h1>
                  <p className="text-slate-200 text-sm md:text-lg mt-1 font-medium">Next-generation circulating tumor DNA analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="px-5 pt-6 pb-2">
          <div className="flex items-start justify-between">
            <h2 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">Diagnostic Overview</h2>
            <button className="text-primary hover:bg-primary/10 rounded-full p-2 transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed pt-3 max-w-3xl">
            Liquid biopsy offers a non-invasive alternative to tissue biopsies. By utilizing a simple blood draw, we capture circulating tumor DNA (ctDNA) for precise AI-driven analysis of cancer mutations and therapy response.
          </p>
        </div>

        {/* Tabs */}
        <div className="sticky top-[60px] z-40 bg-background-light dark:bg-background-dark pb-4 pt-2 px-4 mt-2 justify-center flex">
          <div className="flex h-12 w-full max-w-md items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800/80 p-1">
            <button 
              onClick={() => setActiveTab('Process')}
              className={`flex h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${activeTab === 'Process' ? 'bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 text-primary dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
            >
              <span className="truncate text-sm leading-normal">Process</span>
            </button>
            <button 
              onClick={() => setActiveTab('Benefits')}
              className={`flex h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${activeTab === 'Benefits' ? 'bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 text-primary dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
            >
              <span className="truncate text-sm leading-normal">Benefits</span>
            </button>
            <button 
              onClick={() => setActiveTab('Applications')}
              className={`flex h-full grow items-center justify-center overflow-hidden rounded-lg px-2 transition-all duration-200 ${activeTab === 'Applications' ? 'bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 text-primary dark:text-sky-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
            >
              <span className="truncate text-sm leading-normal">Applications</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-5 py-4 min-h-[400px]">
          {activeTab === 'Process' && (
            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 animate-in fade-in duration-300">
              <div className="flex md:flex-col gap-4 group md:items-start md:text-left">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30 text-primary shrink-0 ring-4 ring-white dark:ring-background-dark z-10">
                    <span className="material-symbols-outlined">hematology</span>
                  </div>
                </div>
                <div className="pb-6 pt-1 md:pt-4">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">Sample Collection</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                    Peripheral blood is drawn into specialized stabilization tubes to preserve circulating tumor DNA and prevent genomic DNA contamination.
                  </p>
                </div>
              </div>
              <div className="flex md:flex-col gap-4 group md:items-start md:text-left">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-secondary shrink-0 ring-4 ring-white dark:ring-background-dark z-10">
                    <span className="material-symbols-outlined">biotech</span>
                  </div>
                </div>
                <div className="pb-6 pt-1 md:pt-4">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">cfDNA Extraction</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Plasma is isolated via double-centrifugation. Cell-free DNA (cfDNA) is extracted and sequenced using high-depth NGS for maximum sensitivity.
                  </p>
                </div>
              </div>
              <div className="flex md:flex-col gap-4 group md:items-start md:text-left">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 shrink-0 ring-4 ring-white dark:ring-background-dark z-10">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                </div>
                <div className="pt-1 w-full md:pt-4">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">AI Analysis</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    Proprietary algorithms differentiate between somatic mutations and clonal hematopoiesis, providing actionable therapeutic recommendations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Benefits' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              <div className="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined">personal_injury</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Non-Invasive Nature</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avoids surgical risks, pain, and recovery time associated with traditional tissue biopsies, allowing for safer longitudinal monitoring.</p>
              </div>
              <div className="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined">query_stats</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Overcoming Heterogeneity</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Captures a more holistic view of tumor genomics compared to a localized tissue sample, which may miss mutations present in other metastatic sites.</p>
              </div>
              <div className="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 mb-4">
                  <span className="material-symbols-outlined">speed</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Real-Time Insight</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Enables rapid assessment of treatment efficacy within weeks, allowing clinicians to switch therapies faster if a patient is not responding.</p>
              </div>
              <div className="p-6 bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 mb-4">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">MRD Detection</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Highest sensitivity for Minimal Residual Disease (MRD), identifying molecular relapse months before clinical or radiographic evidence.</p>
              </div>
            </div>
          )}

          {activeTab === 'Applications' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 items-start">
                <span className="material-symbols-outlined text-primary bg-primary/10 p-3 rounded-xl">monitoring</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Therapy Selection</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Identifying specific targetable mutations (e.g., EGFR, KRAS, ALK) to match patients with FDA-approved targeted therapies or clinical trials.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 items-start">
                <span className="material-symbols-outlined text-secondary bg-secondary/10 p-3 rounded-xl">history</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Monitoring Resistance</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Detecting the emergence of resistance mutations early, providing a window for proactive therapy adjustment.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 items-start">
                <span className="material-symbols-outlined text-indigo-500 bg-indigo-500/10 p-3 rounded-xl">vaccines</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Immunotherapy Response</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Tracking ctDNA kinetics as a biomarker for checkpoint inhibitor response, differentiating between pseudoprogression and true disease growth.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 items-start">
                <span className="material-symbols-outlined text-rose-500 bg-rose-500/10 p-3 rounded-xl">clinical_notes</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Clinical Research</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Large-scale screening for drug development programs and real-world evidence gathering on tumor evolution.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-24 md:h-0"></div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto z-50 md:static md:bg-transparent md:border-none md:max-w-xs md:mb-12">
          <button onClick={() => navigate('/test-request')} className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span>Order a test</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiquidBiopsy;
