import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VariantGPTHeader } from '../components/VariantGPTHeader';

const VGPT_TABS = [
  { label: 'Overview',    path: '/variant-gpt' },
  { label: 'Features',    path: '/variant-gpt/features' },
  { label: 'Integration', path: '/variant-gpt/integration' },
  { label: 'Security',    path: '/variant-gpt/security' },
];

const VariantIntegration: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <VariantGPTHeader />

      {/* Tab bar */}
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
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Seamlessly Connect to Your Workflow</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">VariantGPT is designed to be the central nervous system of your laboratory, connecting diverse data sources with enterprise-grade interoperability.</p>

        <div className="space-y-6">
          {[
            {
              icon: 'api', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20',
              title: 'Robust REST API',
              body: 'Full CRUD operations on samples, reports, and knowledge bases. Programmatically trigger interpretations from your existing LIS or data lake.',
            },
            {
              icon: 'dataset', color: 'text-secondary', bg: 'bg-cyan-50 dark:bg-cyan-900/20',
              title: 'HL7 & FHIR Support',
              body: 'Standardized medical data exchange for effortless integration with Epic, Cerner, and other hospital health records systems.',
            },
            {
              icon: 'cloud_sync', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20',
              title: 'Webhooks & Notifications',
              body: 'Real-time alerts for interpretation completions or critical variant findings delivered via Slack, Email, or custom endpoint triggers.',
            },
            {
              icon: 'table_chart', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20',
              title: 'VCF / BAM / FASTQ Support',
              body: 'Native ingestion of all major genomic file formats. No pre-processing scripts required — upload directly and VariantGPT handles the rest.',
            },
            {
              icon: 'settings_suggest', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20',
              title: 'Custom Knowledge Bases',
              body: 'Extend the interpretation engine with your own institutional databases, internal variant classifications, and proprietary drug response profiles.',
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
              <div className={`size-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shrink-0`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* API quick-start snippet */}
        <div className="mt-10 rounded-2xl bg-slate-900 p-6 border border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick start — submit a VCF for interpretation</p>
          <pre className="text-sm text-emerald-400 overflow-x-auto leading-relaxed font-mono whitespace-pre">{`curl -X POST https://api.variantgpt.oncophenomics.com/v1/interpret \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sample_id": "PAT-20240101",
    "vcf_url": "https://your-bucket.s3.amazonaws.com/sample.vcf.gz",
    "cancer_type": "NSCLC",
    "report_format": "pdf"
  }'`}</pre>
        </div>

        {/* CTA strip */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.open('https://variantgpt.pages.dev/login', '_blank')}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-primary hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">play_circle</span>
            Start Interpreting Variants
          </button>
          <button
            onClick={() => navigate('/contact?service=variantgpt&type=Technical Issue')}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-primary text-slate-700 dark:text-slate-300 font-bold text-base transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            Talk to an Integration Engineer
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">Full API documentation available after sign-up · Sandbox environment included</p>
      </div>
    </div>
  );
};

export default VariantIntegration;
