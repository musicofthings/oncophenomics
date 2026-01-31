import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../components/GlobalHeader';

const Platform: React.FC = () => {
  const navigate = useNavigate();
  const [openBenefit, setOpenBenefit] = useState<number | null>(null);

  const toggleBenefit = (index: number) => {
    setOpenBenefit(openBenefit === index ? null : index);
  };

  const solutions = [
    { icon: 'biotech', title: 'Virtual Biopsy', desc: 'Non-invasive imaging analysis.', color: 'text-primary', bg: 'bg-primary/10', path: '/diagnostics' },
    { icon: 'groups', title: 'Stratification', desc: 'Identify trial candidates.', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30', path: '/liquid-biopsy' },
    { icon: 'ads_click', title: 'Target ID', desc: 'Find new drug targets.', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30', path: '/cro' },
    { icon: 'medication', title: 'Drug Discovery', desc: 'Accelerate development.', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30', path: '/cro' },
  ];

  const benefits = [
    { 
      icon: 'rocket_launch', 
      title: 'Accelerated Drug Development', 
      content: 'Reduce the timeline from target identification to clinical trials by up to 40% using our predictive AI modeling and virtual screening pipelines.' 
    },
    { 
      icon: 'trending_up', 
      title: 'Higher Success Rates', 
      content: 'Significantly improve clinical trial outcomes by precisely stratifying patients based on comprehensive multi-omics profiles and predicted drug responses.' 
    },
    { 
      icon: 'medical_services', 
      title: 'Personalized Therapies', 
      content: 'Generate patient-specific treatment plans that account for unique tumor microenvironment characteristics, genomic mutations, and drug resistance markers.' 
    },
  ];

  return (
    <div className="flex flex-col h-full font-display text-slate-900 dark:text-white transition-colors duration-200">
      <GlobalHeader title="AI Platform" />

      <div className="w-full max-w-7xl mx-auto">
        
        {/* Hero Card - Home Screen Style */}
        <div className="p-4 md:p-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg h-[350px] md:h-[450px] w-full group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 bg-slate-900"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=2600&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-center px-6 md:px-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm self-start">
                <span className="material-symbols-outlined text-[16px]">neurology</span>
                Neural Genomics Engine
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-sm">
                Decoding Cancer <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">With Artificial Intelligence</span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-xl">
                Our platform integrates multi-omics data with deep learning neural networks to revolutionize precision oncology, identifying patterns invisible to the human eye.
              </p>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="px-4 md:px-6 py-6">
          <h2 className="text-slate-900 dark:text-white tracking-light text-[22px] md:text-2xl font-bold leading-tight text-left pb-4">How It Works</h2>
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
            <div className="flex min-w-min md:w-full md:grid md:grid-cols-3 flex-row items-start justify-start gap-4 md:gap-8">
              
              <div className="flex flex-col w-48 md:w-full shrink-0 group">
                <div className="w-48 md:w-full h-32 md:h-48 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold z-10 shadow-lg">1</div>
                  <img className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" alt="Microscope" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                </div>
                <h3 className="text-slate-900 dark:text-white text-sm md:text-lg font-bold">Data Ingestion</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 font-body">Aggregating genomics & imaging data.</p>
              </div>

              <div className="flex flex-col w-48 md:w-full shrink-0 group">
                <div className="w-48 md:w-full h-32 md:h-48 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold z-10 shadow-lg">2</div>
                  <img className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1559027615-cd7e2ca8e3b8?q=80&w=800&auto=format&fit=crop" alt="Brain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                </div>
                <h3 className="text-slate-900 dark:text-white text-sm md:text-lg font-bold">AI Analysis</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 font-body">Deep learning models process patterns.</p>
              </div>

              <div className="flex flex-col w-48 md:w-full shrink-0 group">
                <div className="w-48 md:w-full h-32 md:h-48 bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold z-10 shadow-lg">3</div>
                  <img className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1576091160732-f1a450c3a4e0?q=80&w=800&auto=format&fit=crop" alt="Doctor" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                </div>
                <h3 className="text-slate-900 dark:text-white text-sm md:text-lg font-bold">Insights</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 font-body">Actionable treatment recommendations.</p>
              </div>

            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="px-4 md:px-6 py-2 w-full overflow-hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
              {['#DeepLearning', '#Genomics', '#ComputerVision', '#Radiomics'].map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-secondary/10 text-secondary whitespace-nowrap border border-secondary/20 hover:bg-secondary/20 transition-colors cursor-default">
                      {tag}
                  </span>
              ))}
          </div>
        </div>

        {/* Solutions */}
        <div className="flex flex-col w-full px-4 md:px-6">
          <h2 className="text-slate-900 dark:text-white tracking-light text-[22px] md:text-2xl font-bold leading-tight text-left pb-4 pt-4">Solutions Ecosystem</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full">
              {solutions.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigate(item.path)}
                    className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-start gap-3 hover:border-secondary/50 transition-all cursor-pointer active:scale-[0.98] duration-200 hover:shadow-md group"
                  >
                      <div className={`size-10 rounded-lg ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                          <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-body">{item.desc}</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="flex flex-col w-full px-4 md:px-6 mt-6">
          <h2 className="text-slate-900 dark:text-white tracking-light text-[22px] md:text-2xl font-bold leading-tight text-left pb-3">Key Benefits</h2>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-2 md:gap-6">
              {benefits.map((item, i) => (
                  <div key={i} className="group flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30">
                      <button 
                        onClick={() => toggleBenefit(i)}
                        className="flex items-center justify-between p-4 w-full text-left focus:outline-none md:cursor-default"
                      >
                          <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">{item.icon}</span>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</span>
                          </div>
                          <span className={`md:hidden material-symbols-outlined text-slate-400 group-hover:text-secondary transition-transform duration-300 ${openBenefit === i ? 'rotate-180' : ''}`}>
                            keyboard_arrow_down
                          </span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openBenefit === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} md:max-h-none md:opacity-100`}>
                          <div className="px-4 pb-4 pt-0 text-xs text-slate-500 dark:text-slate-400 font-body leading-relaxed pl-11 md:pl-4 md:pt-0">
                              {item.content}
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="px-4 md:px-6 mt-8">
          <button 
            onClick={() => navigate('/contact')}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Contact Us</span>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="p-6 text-center">
          <p className="text-[10px] text-slate-400 font-body">For research use only. Not for use in diagnostic procedures without additional validation.</p>
        </div>

        <div className="pb-10"></div>
      </div>
    </div>
  );
};

export default Platform;