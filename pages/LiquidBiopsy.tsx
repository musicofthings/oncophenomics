import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const LiquidBiopsy: React.FC = () => {
  const navigate = useNavigate();

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
                  <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">Precision Oncology</h1>
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
            Liquid biopsy offers a non-invasive alternative to tissue biopsies. By utilizing a simple blood draw into a specialized Streck tube, we capture circulating tumor DNA (ctDNA) for precise AI-driven analysis.
          </p>
        </div>

        {/* Tabs */}
        <div className="sticky top-[60px] z-40 bg-background-light dark:bg-background-dark pb-4 pt-2 px-4 mt-2 justify-center flex">
          <div className="flex h-12 w-full max-w-md items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800/80 p-1">
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 bg-white dark:bg-slate-700 shadow-sm transition-all duration-200 border border-slate-100 dark:border-slate-600">
              <span className="truncate text-primary dark:text-sky-400 text-sm font-bold leading-normal">Process</span>
              <input defaultChecked className="hidden" name="view-mode" type="radio" value="Process" />
            </label>
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200">
              <span className="truncate text-sm font-medium leading-normal">Benefits</span>
              <input className="hidden" name="view-mode" type="radio" value="Benefits" />
            </label>
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-200">
              <span className="truncate text-sm font-medium leading-normal">Applications</span>
              <input className="hidden" name="view-mode" type="radio" value="Applications" />
            </label>
          </div>
        </div>

        {/* Steps List */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 px-5 py-4">
          
          {/* Step 1 */}
          <div className="flex md:flex-col gap-4 group md:items-start md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30 text-primary shrink-0 ring-4 ring-white dark:ring-background-dark z-10">
                <span className="material-symbols-outlined">hematology</span>
              </div>
              <div className="h-full w-0.5 md:w-full md:h-0.5 bg-gradient-to-b md:bg-gradient-to-r from-sky-200 to-slate-200 dark:from-sky-900 dark:to-slate-800 -my-2 md:my-0 md:-mx-2 rounded-full md:hidden"></div>
            </div>
            <div className="pb-6 pt-1 md:pt-4">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">Sample Collection</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                10ml of peripheral blood is drawn into a Streck Cell-Free DNA BCT. This specialized tube stabilizes nucleated blood cells, preventing genomic DNA release.
              </p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">Non-invasive</span>
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">Painless</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex md:flex-col gap-4 group md:items-start md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-secondary shrink-0 ring-4 ring-white dark:ring-background-dark z-10">
                <span className="material-symbols-outlined">biotech</span>
              </div>
              <div className="h-full w-0.5 md:w-full md:h-0.5 bg-gradient-to-b md:bg-gradient-to-r from-cyan-200 to-slate-200 dark:from-cyan-900 dark:to-slate-800 -my-2 md:my-0 md:-mx-2 rounded-full md:hidden"></div>
            </div>
            <div className="pb-6 pt-1 md:pt-4">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">cfDNA Extraction</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Plasma is isolated via centrifugation. Cell-free DNA (cfDNA) is then extracted and prepared for next-generation sequencing (NGS).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex md:flex-col gap-4 group md:items-start md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 shrink-0 ring-4 ring-white dark:ring-background-dark z-10">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
            </div>
            <div className="pt-1 w-full md:pt-4">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">AI Analysis</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                Our proprietary AI algorithms scan the sequenced data for somatic mutations, analyzing tumor fraction and resistance mechanisms in real-time.
              </p>
              <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full -mr-4 -mt-4"></div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-50 dark:ring-emerald-900/40">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">High Accuracy Detection</div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-[94.8%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>Sensitivity</span>
                  <span className="font-mono text-slate-900 dark:text-white font-bold">94.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="px-5 pb-8 mt-4">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Why choose Liquid Biopsy?</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50 dark:bg-sky-900/10 rounded-2xl border border-sky-100 dark:border-sky-800/50 relative overflow-hidden group hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full -mr-4 -mt-4"></div>
              <div className="font-bold text-primary dark:text-sky-400 mb-3 flex items-center gap-2">
                <div className="bg-white dark:bg-sky-950 p-1.5 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">water_drop</span>
                </div>
                Liquid
              </div>
              <ul className="space-y-2.5">
                {['Minimal risk', 'Repeatable', 'Fast results'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <span className="material-symbols-outlined text-emerald-500 text-[16px] shrink-0 font-bold">check</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                <div className="bg-slate-50 dark:bg-slate-800 p-1.5 rounded-lg">
                  <span className="material-symbols-outlined text-[20px]">content_cut</span>
                </div>
                Tissue
              </div>
              <ul className="space-y-2.5">
                {['Invasive', 'Painful', 'Slow turnover'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-rose-400 text-[16px] shrink-0 font-bold">close</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="h-24 md:h-0"></div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto z-50 md:static md:bg-transparent md:border-none md:max-w-xs md:mb-12">
          <button onClick={() => navigate('/contact')} className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>Request Consultation</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiquidBiopsy;