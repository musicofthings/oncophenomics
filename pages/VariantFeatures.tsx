
import React from 'react';
import GlobalHeader from '../components/GlobalHeader';

const VariantFeatures: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <GlobalHeader title="VariantGPT Features" />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Interpret Genomic Complexity with AI</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">description</span>
            <h3 className="text-xl font-bold mb-2">Automated Clinical Reporting</h3>
            <p className="text-slate-600 dark:text-slate-400">Generate high-fidelity clinical reports directly from VCF files. Our LLM parses literature and databases in real-time to provide the latest evidence-based classifications.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">psychology</span>
            <h3 className="text-xl font-bold mb-2">Advanced LLM Interpretation</h3>
            <p className="text-slate-600 dark:text-slate-400">Utilize domain-specific large language models trained on oncology literature. VariantGPT goes beyond scoring to explain the "why" behind every variant classification.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-indigo-500 text-4xl mb-4">hub</span>
            <h3 className="text-xl font-bold mb-2">Multi-Omics Integration</h3>
            <p className="text-slate-600 dark:text-slate-400">Contextualize DNA variants with RNA expression data and protein-level insights for a holistic understanding of the tumor microenvironment.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined text-emerald-500 text-4xl mb-4">verified</span>
            <h3 className="text-xl font-bold mb-2">ACMG/AMP Compliance</h3>
            <p className="text-slate-600 dark:text-slate-400">Standardized interpretation guidelines are baked into the core engine, ensuring every report meets stringent clinical standards for diagnostic validity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantFeatures;
