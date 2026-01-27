
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
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="relative flex flex-col items-start justify-end px-5 py-8 md:px-10 md:py-12 h-full">
              <span className="mb-3 inline-flex items-center rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-sm border border-secondary/30">
                <span className="material-symbols-outlined text-[16px] mr-1">auto_awesome</span>
                New Version 2.0
              </span>
              <h2 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3 max-w-[90%] md:max-w-2xl">Precision Oncology Powered by AI</h2>
              <p className="text-slate-200 text-sm md:text-lg font-medium leading-relaxed mb-6 max-w-[95%] md:max-w-xl">
                Personalized cancer treatment plans derived from advanced genomic analysis and global clinical data.
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

        {/* Advantage Section (Carousel) */}
        <div>
          <div className="flex items-center justify-between px-4 md:px-6 pt-4 pb-2">
            <h3 className="text-slate-900 dark:text-white text-lg md:text-xl font-bold leading-tight tracking-tight">The AI Advantage</h3>
            <button onClick={() => navigate('/platform')} className="text-primary text-sm font-medium hover:underline">Learn more</button>
          </div>
          <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 pb-4 px-4 md:px-6 gap-4 scrollbar-hide snap-x snap-mandatory no-scrollbar">
            
            <div className="snap-center shrink-0 w-64 md:w-auto flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxlGA0HuE-H_dxff1Mhg8oUGQ7sNABIwTYep0Arlyb4FmK9uqeTtWBrSbeQCvVd9a8r-fT275-q21NMEkHFpA-ksYMTUgSEAwfa8czQalsqVDmSP4-0_jjX4G3jQzceSNDJbCvvIn0woEaPVSjN1DJbcEhhkScMCcLtTl-_cy2jvrl48yvVHA-RPQvJ8KRYD-wCMEBkaX8QgFj1IGHIVTyyVqbqI5CZVLBKFFvJ_n7L3fEqg5klcSjaKWC6L8qV4AykTlfCnkto0E_")' }}></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Speed</span>
                </div>
                <h4 className="text-slate-900 dark:text-white text-base font-bold mb-1">Rapid Diagnosis</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">Processing complex genomic data in seconds.</p>
              </div>
            </div>

            <div className="snap-center shrink-0 w-64 md:w-auto flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlN59I7j1Sa_GPfT2ze3zxwLIY_eXrC_6tq-4QX7iOM3RTiDQ7DHyQAF2Fcc8xZWHU-jafDDZaV5f_YaytkIPDKzuN6K5sdWC-KNyDpI7PLt77mhFyn7L3S3-eM7i0U0dlJlHvkpLR7dP1qyli2Es8bAFIOckItHoCFmFMEo-rz7GTkNEt2JBEFpCVthXxEDikm76mx3tZGC-943diVJoZ9aNjslyO9lqAto6VrY1-ejoK4sKyolsFMJwTEjI8Xii6cdw6cmZX0Mpw")' }}></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-secondary">
                  <span className="material-symbols-outlined text-[20px]">medication</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Therapy</span>
                </div>
                <h4 className="text-slate-900 dark:text-white text-base font-bold mb-1">Tailored Therapy</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">Matching mutations to specific drugs with 99% accuracy.</p>
              </div>
            </div>

            <div className="snap-center shrink-0 w-64 md:w-auto flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCftsmXmkhXheRtVhwtmOiWiFjHCW6V6ytwSLnP5UsAz9GnRO8Ls6z5vmgbRNIhkrtfIbTl6y9kiEtGPcjVXejtgFUI42KLq6IzVtkZmzU57QG3m7yLGs9yNs3B0lYnVcI6p6LOOOaK0eW-0pqAFcpuqoem40l2KjNZnMRqfUE7R281eP4PWAStvv8yuTJWKKkUtDLxYjEdFgsQT5_gt9UZQbkrlKcO5ryyv64og5GZBeMqiUnk8K9_1U7De6H0TjrCRI56f2eHbd8w")' }}></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-indigo-500">
                  <span className="material-symbols-outlined text-[20px]">hub</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Integration</span>
                </div>
                <h4 className="text-slate-900 dark:text-white text-base font-bold mb-1">Multi-Omics</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">Unifying DNA, RNA, and protein signatures.</p>
              </div>
            </div>

            <div className="snap-center shrink-0 w-64 md:w-auto flex flex-col rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBkeTYnn2qja3pP4xzTb61BAxYKGsa6w2Zp4dZCqyYf2aD52Y8qlXiNxmeq1LVAX8G1kRkcI5IyxNPEuiqy3b-FUIIKwmoetkpa16GAvKEXxMpIspOFnuLyQen7GM_blPOcX2EdfLX4yXw6HM74HaJyk7Bzcx21UH85gKuEnqBLtQpv3h1drIkGwYKHrQTe23oWbd6OmqIdVfMrIYKORmhDtMnk2mOx0h3d26y32kSjb8B2C2mUcEnIuVizDD170_McuHgVfXyElb7")' }}></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-emerald-500">
                  <span className="material-symbols-outlined text-[20px]">timeline</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Future</span>
                </div>
                <h4 className="text-slate-900 dark:text-white text-base font-bold mb-1">Predictive AI</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal">Forecasting resistance before it occurs.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Core Tools */}
        <div className="px-4 md:px-6 mb-10">
          <h3 className="text-slate-900 dark:text-white text-lg md:text-xl font-bold leading-tight tracking-tight pt-2 pb-4">Core Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <button onClick={() => navigate('/contact')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-primary/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[28px]">upload_file</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">Upload Reports</span>
            </button>
            
            <button onClick={() => navigate('/platform')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-secondary/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[28px]">science</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">Find Trials</span>
            </button>

            <button onClick={() => navigate('/cro')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-sky-500/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center text-sky-500">
                <span className="material-symbols-outlined text-[28px]">analytics</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">My Analysis</span>
            </button>

            <button onClick={() => navigate('/about')} className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-700 shadow-sm hover:border-indigo-500/50 transition-all active:scale-[0.98] hover:shadow-md">
              <div className="size-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500">
                <span className="material-symbols-outlined text-[28px]">smart_toy</span>
              </div>
              <span className="text-slate-900 dark:text-white font-semibold text-sm">Consult AI</span>
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
              Partnered with leading oncology research centers
            </span>
            <span>© 2024 Oncophenomics. All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
