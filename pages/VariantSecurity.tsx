import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VariantGPTHeader } from '../components/VariantGPTHeader';

const VGPT_TABS = [
  { label: 'Overview',    path: '/variant-gpt' },
  { label: 'Features',    path: '/variant-gpt/features' },
  { label: 'Integration', path: '/variant-gpt/integration' },
  { label: 'Security',    path: '/variant-gpt/security' },
];

const VariantSecurity: React.FC = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Enterprise-Grade Patient Privacy</h1>

        {/* Hero compliance card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <span className="material-symbols-outlined text-[120px]">verified_user</span>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">HIPAA, DISHA & GDPR Ready</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Patient data is encrypted at rest and in transit using AES-256 and TLS 1.3. We maintain zero-knowledge infrastructure for sensitive genomic markers, ensuring your lab remains fully compliant with Indian DISHA regulations and international privacy laws.
            </p>
            <div className="flex flex-wrap gap-3">
              {['HIPAA', 'DISHA', 'GDPR', 'SOC2 Type II', 'ISO 27001', 'Data Sovereignty'].map(badge => (
                <span key={badge} className="px-4 py-2 bg-white/10 rounded-full text-sm font-bold border border-white/20">{badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Security feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            {
              icon: 'cloud_lock', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20',
              title: 'Private Cloud Deployment',
              body: 'For institutions with strict data residency requirements, VariantGPT can be deployed within your own AWS, Azure, or GCP Virtual Private Cloud (VPC) — including Indian data centres.',
            },
            {
              icon: 'admin_panel_settings', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20',
              title: 'Audit Logs & RBAC',
              body: 'Detailed Role Based Access Control and immutable audit trails for every report generated and every variant classified. Full traceability for regulatory submissions.',
            },
            {
              icon: 'key', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20',
              title: 'AES-256 Encryption',
              body: 'All genomic data encrypted at rest with AES-256-GCM. TLS 1.3 enforced for all data in transit. Keys are customer-managed via AWS KMS or Azure Key Vault.',
            },
            {
              icon: 'gpp_maybe', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20',
              title: 'Penetration Tested',
              body: 'Annual third-party penetration testing and quarterly vulnerability assessments. CVE patching SLA of 24 hours for critical issues.',
            },
            {
              icon: 'diversity_3', color: 'text-secondary', bg: 'bg-cyan-50 dark:bg-cyan-900/20',
              title: 'Zero-Knowledge Genomics',
              body: 'Sensitive variant data is processed in isolated compute environments. Our engineers cannot access patient-level data without a formal break-glass procedure.',
            },
            {
              icon: 'location_on', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/20',
              title: 'Indian Data Residency',
              body: 'All data for Indian customers is stored and processed exclusively within MEITY-approved Indian data centres, satisfying DISHA and PDPB requirements.',
            },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
              <div className={`size-11 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-4`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Trust statement */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 mb-10">
          <span className="material-symbols-outlined text-emerald-600 text-[28px] shrink-0 mt-0.5">shield</span>
          <div>
            <p className="font-bold text-slate-900 dark:text-white mb-1">Security-first by design, not by policy</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Our security architecture is reviewed by an independent advisory board each quarter. A full Security Whitepaper is available to enterprise customers under NDA.</p>
          </div>
        </div>

        {/* CTA strip */}
        <div className="flex flex-col sm:flex-row gap-4">
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
            <span className="material-symbols-outlined text-[20px]">description</span>
            Request Security Whitepaper
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-4">Whitepaper available under NDA for enterprise institutions</p>
      </div>
    </div>
  );
};

export default VariantSecurity;
