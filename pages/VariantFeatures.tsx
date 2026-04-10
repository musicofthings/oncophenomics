import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VariantGPTHeader } from '../components/VariantGPTHeader';

const VGPT_TABS = [
  { label: 'Overview',    path: '/variant-gpt' },
  { label: 'Features',    path: '/variant-gpt/features' },
  { label: 'Integration', path: '/variant-gpt/integration' },
  { label: 'Security',    path: '/variant-gpt/security' },
];

const VariantFeatures: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <VariantGPTHeader />

      {/* ── Mobile/Desktop tab bar ── */}
      <div className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 flex overflow-x-auto scrollbar-hide">
          {VGPT_TABS.map(tab => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`shrink-0 px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap
                ${pathname === tab.path
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Interpret Genomic Complexity with AI</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">description</span>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Automated Clinical Reporting</h3>
            <p className="text-slate-600 dark:text-slate-400">Generate high-fidelity clinical reports directly from VCF files. Our LLM parses literature and databases in real-time to provide the latest evidence-based classifications.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">psychology</span>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Advanced LLM Interpretation</h3>
            <p className="text-slate-600 dark:text-slate-400">Utilize domain-specific large language models trained on oncology literature. VariantGPT goes beyond scoring to explain the "why" behind every variant classification.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="material-symbols-outlined text-indigo-500 text-4xl mb-4">hub</span>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Multi-Omics Integration</h3>
            <p className="text-slate-600 dark:text-slate-400">Contextualize DNA variants with RNA expression data and protein-level insights for a holistic understanding of the tumor microenvironment.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="material-symbols-outlined text-emerald-500 text-4xl mb-4">verified</span>
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">ACMG/AMP Compliance</h3>
            <p className="text-slate-600 dark:text-slate-400">Standardized interpretation guidelines are baked into the core engine, ensuring every report meets stringent clinical standards for diagnostic validity.</p>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.open('https://variantgpt.pages.dev/login', '_blank')}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">play_circle</span>
            Start Interpreting Variants
          </button>
          <button
            onClick={() => navigate('/contact?service=variantgpt&type=Partnership')}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary text-slate-700 dark:text-slate-300 font-bold text-base transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
            Contact Us About VariantGPT
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">No credit card required · Free trial available for verified labs</p>
      </div>
    </div>
  );
};

export default VariantFeatures;
