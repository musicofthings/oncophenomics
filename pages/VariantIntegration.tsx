
import React from 'react';
import GlobalHeader from '../components/GlobalHeader';

const VariantIntegration: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <GlobalHeader title="System Integration" />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Seamlessly Connect to Your Workflow</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">VariantGPT is designed to be the central nervous system of your laboratory, connecting diverse data sources with enterprise-grade interoperability.</p>
        
        <div className="space-y-6">
          <div className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
            <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">api</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Robust REST API</h3>
              <p className="text-slate-600 dark:text-slate-400">Full CRUD operations on samples, reports, and knowledge bases. Programmatically trigger interpretations from your existing LIS or data lake.</p>
            </div>
          </div>
          <div className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
            <div className="size-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined">dataset</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">HL7 & FHIR Support</h3>
              <p className="text-slate-600 dark:text-slate-400">Standardized medical data exchange for effortless integration with Epic, Cerner, and other hospital health records systems.</p>
            </div>
          </div>
          <div className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
            <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 shrink-0">
              <span className="material-symbols-outlined">cloud_sync</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Webhooks & Notifications</h3>
              <p className="text-slate-600 dark:text-slate-400">Real-time alerts for interpretation completions or critical variant findings delivered via Slack, Email, or custom endpoint triggers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantIntegration;
