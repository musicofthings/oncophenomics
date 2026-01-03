import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const CRO: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      
      <GlobalHeader 
        title={
          <div className="flex items-center">
            <span className="font-bold text-xl tracking-tight text-cro-primary">ONCO</span>
            <span className="font-light text-xl tracking-tight text-secondary">PHENOMICS</span>
          </div>
        }
      />

      <main className="pt-8 pb-28 px-4 md:px-8 relative overflow-hidden w-full max-w-7xl mx-auto">
        {/* Background Effects */}
        <div className="absolute top-20 right-[-100px] w-64 h-64 bg-cro-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-40 left-[-50px] w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10"></div>

        <div className="mb-8 mt-2 text-center md:text-left">
          <span className="text-cro-primary font-semibold text-xs tracking-wider uppercase mb-2 block">Enterprise Solutions</span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3 text-slate-900 dark:text-white">
            CRO Services: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cro-primary to-primary">R&D & AI</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
            Accelerate your precision oncology pipelines with our state-of-the-art CRO services, powered by multi-omics analysis and agentic AI.
          </p>
        </div>

        {/* Hero Card */}
        <div className="mb-10 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cro-primary to-primary rounded-2xl opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
          <div className="relative bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-10 shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row gap-6 md:items-center">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-cro-primary/20 to-transparent rounded-full blur-xl"></div>
            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cro-primary to-primary flex items-center justify-center mb-4 shadow-glow-pink text-white">
                <span className="material-symbols-outlined">science</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-slate-900 dark:text-white">R&D Services</h2>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                Our liquid biopsy tests enable early detection. We analyze circulating tumor DNA to identify genetic alterations and monitor treatment response in real-time.
              </p>
              <ul className="space-y-3 mb-6">
                {['Revolutionizing Cancer Diagnostics', 'Minimal Residual Disease Detection'].map((item) => (
                    <li key={item} className="flex items-start text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <span className="material-symbols-outlined text-cro-primary text-[18px] mr-2 leading-none">check_circle</span>
                        {item}
                    </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full md:w-auto md:px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                Start Collaboration
              </button>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-cro-primary">auto_awesome</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">AI & Bioinformatics Suite</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Service Items */}
            {[
                { 
                    icon: 'genetics', color: 'text-primary', bg: 'bg-blue-50 dark:bg-blue-900/20', 
                    title: 'Custom Bioinformatics Pipelines', 
                    desc: 'Tailored genomic profiling workflows designed to identify novel biomarkers and therapeutic targets specific to your study cohorts.' 
                },
                { 
                    icon: 'analytics', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', 
                    title: 'Data Analysis Services', 
                    desc: 'Comprehensive multi-omics data interpretation. We turn raw sequencing data into actionable clinical insights for precision medicine.' 
                },
                { 
                    icon: 'hub', color: 'text-cro-primary', bg: 'bg-pink-50 dark:bg-pink-900/20', 
                    title: 'Building AI Agent Pipelines', 
                    desc: 'Deploy autonomous AI agents capable of orchestrating complex research tasks, from literature review to hypothesis generation.' 
                },
                { 
                    icon: 'fact_check', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
                    title: 'Agentic AI for Biopharma QC', 
                    desc: 'Automated quality control processes using vision-language models to ensure compliance and reduce human error in manufacturing.' 
                },
                { 
                    icon: 'medication_liquid', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', 
                    title: 'AI for Drug Discovery', 
                    desc: 'Accelerate hit-to-lead optimization with generative AI models that predict molecule properties and binding affinities.' 
                }
            ].map((service, idx) => (
                <div key={idx} className="bg-white/70 dark:bg-surface-dark/70 backdrop-blur-md border border-white/30 dark:border-white/5 rounded-xl p-5 hover:border-cro-primary/50 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-3">
                        <div className={`p-2.5 rounded-lg ${service.bg} ${service.color}`}>
                            <span className="material-symbols-outlined">{service.icon}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-cro-primary transition-colors">arrow_forward</span>
                    </div>
                    <h4 className="font-semibold text-base mb-1 group-hover:text-cro-primary transition-colors text-slate-900 dark:text-white">{service.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{service.desc}</p>
                </div>
            ))}
        </div>

        {/* CTA */}
        <div onClick={() => navigate('/contact')} className="mt-8 rounded-2xl overflow-hidden relative shadow-lg group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-0"></div>
          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl mb-2">Have a custom project?</h3>
              <p className="text-indigo-100/80 text-xs md:text-sm mb-4 md:mb-0 leading-relaxed max-w-lg">
                Leverage our multi-omics multi-analyte liquid biopsy technology. We support multiple use cases from discovery to clinical stage.
              </p>
            </div>
            <button className="bg-cro-primary hover:bg-pink-500 text-white text-xs md:text-sm font-bold py-3 px-6 rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
              GET STARTED
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 pb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Contact Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 flex justify-start pt-0.5">
                        <span className="material-symbols-outlined text-cro-primary text-xl group-hover:scale-110 transition-transform">location_on</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Suite 104, 1st Floor, Inspire Infra-Horizon, Future Kids School Road, Financial District, Nanakramguda, Hyderabad, Telangana-500032
                    </p>
                </div>
                <div className="flex items-center group">
                    <div className="flex-shrink-0 w-8 flex justify-start">
                        <span className="material-symbols-outlined text-cro-primary text-xl group-hover:scale-110 transition-transform">email</span>
                    </div>
                    <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-cro-primary transition-colors underline-offset-4 hover:underline" href="mailto:contact@oncophenomics.com">
                        contact@oncophenomics.com
                    </a>
                </div>
                <div className="flex items-center group">
                    <div className="flex-shrink-0 w-8 flex justify-start">
                        <span className="material-symbols-outlined text-cro-primary text-xl group-hover:scale-110 transition-transform">phone</span>
                    </div>
                    <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-cro-primary transition-colors underline-offset-4 hover:underline" href="tel:+918886233344">
                        +91-8886233344
                    </a>
                </div>
            </div>
            <div className="mt-8 text-center text-[10px] text-slate-400 uppercase tracking-widest">
                © 2024 Oncophenomics
            </div>
        </div>
      </main>
    </div>
  );
};

export default CRO;