import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeroSection } from '../components/ui/hero-section-5';

const VGPT_TABS = [
  { label: 'Overview',    path: '/variant-gpt' },
  { label: 'Features',    path: '/variant-gpt/features' },
  { label: 'Integration', path: '/variant-gpt/integration' },
  { label: 'Security',    path: '/variant-gpt/security' },
];

const VariantGPT: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="bg-background min-h-screen">
      {/* HeroSection renders VariantGPTHeader internally */}
      <HeroSection />

      {/* Tab bar sits below the hero for sub-page navigation */}
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
    </div>
  );
};

export default VariantGPT;
