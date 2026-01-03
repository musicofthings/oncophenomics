import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      <GlobalHeader title="Our Mission" />

      <div className="flex-1 overflow-y-auto no-scrollbar pb-0">
        <div className="px-4 py-4">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg group ring-1 ring-slate-200 dark:ring-slate-800">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDi9xzL1HAEBcVRj6yoepZaLJoVVlZnLI73DXRBPQHPF3qGm4CGsaUWl5jOHt7IxPajBB6erF36Ah67MkBiFmLbxQ7x7g-FRg6B-N50GT-3ZnsglephrCSdxr_8y38W6jYy1DAPmnYvaFQmzCU7fW1RCROhKdltNvCNTOpd3vexPh-cGo7Hc-1X_9O8i5Ew8ojtjFML5KtlgIfeCYqV5UgLg3ai3K0WNcrXECJmnXDgijbzCTYH6Pin7cYBl4gnEOV7LPZ6H4xMSrUr")' }}
            >
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-white uppercase bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-primary/25">
                Vision
              </span>
              <h2 className="text-3xl font-bold leading-tight text-white tracking-tight drop-shadow-md">
                Pioneering Precision Oncology
              </h2>
            </div>
          </div>
        </div>

        <div className="px-5 py-2">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3">Decoding Cancer with AI</h3>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            To revolutionize cancer care by leveraging advanced artificial intelligence, transforming complex genomic data into actionable, personalized treatment plans that save lives.
          </p>
        </div>

        <div className="h-6"></div>

        {/* Core Values */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Core Values</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
                { icon: 'psychology', title: 'AI-Driven', desc: 'Accelerated analysis through neural networks' },
                { icon: 'monitor_heart', title: 'Patient-Centric', desc: 'Tailored therapy for individual needs' },
                { icon: 'database', title: 'Data-Backed', desc: 'Validated methods via large datasets' },
                { icon: 'verified_user', title: 'Integrity', desc: 'Transparent science & ethics first' }
            ].map((item, i) => (
                <div key={i} className="flex flex-col p-4 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-secondary/50 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                        <span className="material-symbols-outlined text-secondary">{item.icon}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>
                </div>
            ))}
          </div>
        </div>

        <div className="h-8"></div>

        {/* Our Approach */}
        <div className="px-5">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Our Approach</h3>
          <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-8">
            {[
                { title: 'Data Collection', desc: 'Aggregating multi-omics data from diverse clinical sources to build a comprehensive patient profile.' },
                { title: 'AI Analysis', desc: 'Our proprietary DeepGen™ engine identifies patterns invisible to the human eye.' },
                { title: 'Precision Recommendation', desc: "Delivering ranked therapeutic options tailored specifically to the tumor's genetic makeup." },
            ].map((step, i) => (
                <div key={i} className="relative">
                    <div className="absolute -left-[25px] top-0 h-6 w-6 rounded-full border-4 border-background-light dark:border-background-dark bg-secondary shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{step.desc}</p>
                </div>
            ))}
          </div>
        </div>

        <div className="h-8"></div>

        <div className="px-5 pb-8">
          <button onClick={() => navigate('/platform')} className="w-full bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <span>Explore Our Technology</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <footer className="bg-slate-50 dark:bg-surface-dark pt-10 pb-8 border-t border-slate-200 dark:border-slate-800 mt-4">
          <div className="px-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">O</div>
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Oncophenomics</span>
            </div>
            <address className="not-italic text-sm text-slate-500 dark:text-gray-400 mb-6 leading-relaxed max-w-[280px]">
              Suite 104, 1st Floor, Inspire Infra-Horizon,<br/>
              Future Kids School Road, Financial District,<br/>
              Nanakramguda, Hyderabad, Telangana-500032
            </address>
            <div className="flex flex-col gap-3 mb-8 w-full max-w-[280px]">
                <a className="group flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:border-secondary dark:hover:text-secondary transition-all shadow-sm" href="mailto:contact@oncophenomics.com">
                    <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">mail</span>
                    contact@oncophenomics.com
                </a>
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 w-full pt-6 border-t border-slate-200/60 dark:border-slate-700/60">
                © 2024 Oncophenomics. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;