import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';
import { Testimonial } from '../components/ui/design-testimonial';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full font-display w-full">
      <GlobalHeader
        title={
          <div className="flex items-center">
            <span className="font-bold text-xl tracking-tight text-primary">ONCO</span>
            <span className="font-light text-xl tracking-tight text-secondary">PHENOMICS</span>
          </div>
        }
      />

      <div className="w-full max-w-7xl mx-auto">

        {/* Hero Card */}
        <div className="p-4 md:p-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg group h-[400px] md:h-[500px] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: 'url("/images/hero-home.png")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="relative flex flex-col items-start justify-end px-5 py-8 md:px-10 md:py-12 h-full">
              <span className="mb-3 inline-flex items-center rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-sm border border-secondary/30">
                <span className="material-symbols-outlined text-[16px] mr-1">auto_awesome</span>
                New Version 2.0
              </span>
              <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3 max-w-[90%] md:max-w-2xl">Precision Oncology Powered by AI</h2>
              <p className="text-slate-200 text-sm md:text-lg font-medium leading-relaxed mb-6 max-w-[95%] md:max-w-xl">
                Personalized cancer treatment plans derived from advanced genomic analysis and Indian clinical data.
              </p>
              <button
                onClick={() => window.open('https://variantgpt.pages.dev/login', '_blank')}
                className="w-full md:w-auto md:px-8 flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-blue-600 active:bg-blue-700 text-white font-bold h-12 transition-all shadow-lg shadow-blue-900/20"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Start New Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Audience Split ──────────────────────────────────────────────── */}
        <div className="px-4 md:px-6 mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Who are you?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Clinician card */}
            <button
              onClick={() => navigate('/diagnostics')}
              className="group text-left flex items-start gap-4 p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-100 dark:border-blue-800/40 hover:border-primary hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[26px]">stethoscope</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Clinician / Hospital</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-snug">Order tissue &amp; liquid biopsy tests, submit samples, receive AI-powered reports.</p>
                <span className="inline-flex items-center gap-1 mt-2 text-primary text-xs font-bold">
                  Order a Test <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </button>

            {/* Pharma / CRO card */}
            <button
              onClick={() => navigate('/cro')}
              className="group text-left flex items-start gap-4 p-5 rounded-2xl bg-pink-50 dark:bg-pink-900/20 border-2 border-pink-100 dark:border-pink-800/40 hover:border-cro-primary hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="size-12 rounded-xl bg-cro-primary/10 flex items-center justify-center text-cro-primary shrink-0 group-hover:bg-cro-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[26px]">science</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">Biopharma / Researcher</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-snug">CRO services, AI pipelines, VariantGPT, drug discovery, and R&amp;D partnerships.</p>
                <span className="inline-flex items-center gap-1 mt-2 text-cro-primary text-xs font-bold">
                  Explore CRO Services <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Advantage Section (Carousel) */}
        <div>
          <div className="flex items-center justify-between px-4 md:px-6 pt-2 pb-2">
            <h3 className="text-slate-900 dark:text-white text-lg md:text-xl font-bold leading-tight tracking-tight">The AI Advantage</h3>
            <button onClick={() => navigate('/platform')} className="text-primary text-sm font-medium hover:underline">See platform</button>
          </div>
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 pb-4 px-4 md:px-6 gap-4 scrollbar-hide snap-x snap-mandatory">

            {[
              { img: 'card-rapid-diagnosis.png',  color: 'text-primary',    icon: 'bolt',     cat: 'Speed',       title: 'Rapid Diagnosis',  desc: 'Processing complex genomic data in seconds.',               path: '/platform' },
              { img: 'card-tailored-therapy.png', color: 'text-secondary',  icon: 'medication', cat: 'Therapy',   title: 'Tailored Therapy', desc: 'Matching mutations to specific drugs with 99% accuracy.',   path: '/diagnostics' },
              { img: 'card-multi-omics.png',      color: 'text-indigo-500', icon: 'hub',      cat: 'Integration', title: 'Multi-Omics',      desc: 'Unifying DNA, RNA, and protein signatures.',                path: '/platform' },
              { img: 'card-predictive-ai.png',    color: 'text-emerald-500',icon: 'timeline', cat: 'Future',      title: 'Predictive AI',    desc: 'Forecasting resistance before it occurs.',                  path: '/variant-gpt' },
            ].map(card => (
              <button
                key={card.title}
                onClick={() => navigate(card.path)}
                className="snap-center shrink-0 w-64 md:w-auto flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md hover:border-primary/30 transition-all active:scale-[0.98] text-left"
              >
                <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url("/images/${card.img}")` }}></div>
                <div className="p-4 flex flex-col flex-1">
                  <div className={`flex items-center gap-2 mb-2 ${card.color}`}>
                    <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{card.cat}</span>
                  </div>
                  <h4 className="text-slate-900 dark:text-white text-base font-bold mb-1">{card.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">{card.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions — labels now match destinations */}
        <div className="px-4 md:px-6 mb-10">
          <h3 className="text-slate-900 dark:text-white text-lg md:text-xl font-bold leading-tight tracking-tight pt-2 pb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">

            <button onClick={() => navigate('/test-request')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[28px]">clinical_notes</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">Order a Test</span>
            </button>

            <button onClick={() => navigate('/platform')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-secondary/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[28px]">biotech</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">Our Platform</span>
            </button>

            <button onClick={() => navigate('/cro')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-sky-500/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-500">
                <span className="material-symbols-outlined text-[28px]">hub</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">CRO Services</span>
            </button>

            <button onClick={() => window.open('https://variantgpt.pages.dev/login', '_blank')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-indigo-500/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                <span className="material-symbols-outlined text-[28px]">smart_toy</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">VariantGPT</span>
            </button>

          </div>
        </div>

        {/* Testimonial Section */}
        <Testimonial />

        {/* Footer / Trust Badge */}
        <div className="mt-8 px-6 py-10 bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-4 text-secondary dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1.5 rounded-full border border-cyan-100 dark:border-cyan-900/50">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="text-xs font-bold uppercase tracking-widest">HIPAA Compliant</span>
          </div>
          <div className="w-full max-w-sm space-y-5 text-slate-600 dark:text-slate-300 text-sm">
            <div className="flex flex-col items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700/50 w-full">
              <a href="mailto:contact@oncophenomics.com" className="flex items-center gap-2 hover:text-primary transition-colors font-medium p-1">
                <span className="material-symbols-outlined text-[20px] text-secondary">mail</span>
                <span>contact@oncophenomics.com</span>
              </a>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 w-full flex flex-col gap-2 items-center">
            <span className="flex items-center gap-1 opacity-70">
              <span className="size-1.5 rounded-full bg-primary"></span>
              Partnered with leading Indian oncology research centres
            </span>
            <span>© 2025 Oncophenomics. All rights reserved.</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
