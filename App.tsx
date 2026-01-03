import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Platform from './pages/Platform';
import CRO from './pages/CRO';
import Diagnostics from './pages/Diagnostics';
import LiquidBiopsy from './pages/LiquidBiopsy';
import Contact from './pages/Contact';
import VariantGPT from './pages/VariantGPT';
import TestRequestForm from './pages/TestRequestForm';

// --- Shared Layout Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Routes where we show the bottom nav
  const showBottomNav = ['/', '/cro', '/diagnostics', '/platform', '/liquid-biopsy', '/variant-gpt', '/test-request'].includes(location.pathname);
  
  // Routes where we use the CRO specific theme (pink/dark)
  const isCRO = location.pathname === '/cro';

  if (!showBottomNav) return null;

  const navItems = [
    { icon: 'home_repair_service', label: 'Services', path: '/cro' },
    { icon: 'biotech', label: 'Platform', path: '/platform' },
    { icon: 'home', label: 'Home', path: '/' },
    { icon: 'medical_services', label: 'Tissue', path: '/diagnostics' },
    { icon: 'smart_toy', label: 'VariantGPT', path: '/variant-gpt' },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 w-full z-40 border-t pb-[env(safe-area-inset-bottom)] transition-colors duration-300
      ${isCRO ? 'bg-surface-light/95 dark:bg-surface-dark/95 border-slate-200 dark:border-slate-800' : 'bg-surface-light/95 dark:bg-surface-dark/95 border-slate-200 dark:border-slate-800'}
    `}>
      <div className="flex justify-around items-center h-16 w-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full group transition-colors
                ${isActive 
                  ? (isCRO ? 'text-cro-primary' : 'text-primary') 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}
              `}
            >
              <span className={`material-symbols-outlined text-2xl group-hover:scale-110 transition-transform ${isActive ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandServices, setExpandServices] = useState(true);
  const [expandDiagnostics, setExpandDiagnostics] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-64 h-full border-r border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark shrink-0 z-50 font-display">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 cursor-pointer" onClick={() => navigate('/')}>
         <span className="font-bold text-xl tracking-tight text-primary">ONCO</span>
         <span className="font-light text-xl tracking-tight text-secondary">PHENOMICS</span>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
        
        {/* Home */}
        <button 
          onClick={() => navigate('/')} 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm text-left
            ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}
          `}
        >
          <span className={`material-symbols-outlined text-[22px] ${isActive('/') ? 'filled' : ''}`}>home</span>
          <span>Home</span>
        </button>

        {/* Platform */}
        <button 
          onClick={() => navigate('/platform')} 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm text-left
            ${isActive('/platform') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}
          `}
        >
           <span className={`material-symbols-outlined text-[22px] ${isActive('/platform') ? 'filled' : ''}`}>biotech</span>
           <span>Platform</span>
        </button>

        {/* VariantGPT - New Link */}
        <button 
          onClick={() => navigate('/variant-gpt')} 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm text-left
            ${isActive('/variant-gpt') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}
          `}
        >
           <span className={`material-symbols-outlined text-[22px] ${isActive('/variant-gpt') ? 'filled' : ''}`}>smart_toy</span>
           <span>VariantGPT</span>
           <span className="ml-auto text-[10px] font-bold text-white bg-gradient-to-r from-primary to-secondary px-1.5 py-0.5 rounded">NEW</span>
        </button>

        {/* Services Group */}
        <div className="mt-2">
           <button 
             onClick={() => setExpandServices(!expandServices)} 
             className="flex items-center justify-between w-full px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
           >
              <span>Services</span>
              <span 
                className="material-symbols-outlined text-[16px] transition-transform duration-200" 
                style={{ transform: expandServices ? 'rotate(0deg)' : 'rotate(-90deg)' }}
              >
                expand_more
              </span>
           </button>
           
           <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${expandServices ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              
              {/* CRO */}
              <button 
                onClick={() => navigate('/cro')} 
                className={`flex items-center gap-3 px-4 py-2.5 ml-2 rounded-xl transition-all duration-200 font-medium text-sm text-left border-l-2
                  ${isActive('/cro') 
                    ? 'border-cro-primary text-cro-primary bg-pink-50 dark:bg-pink-900/10' 
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                `}
              >
                  <span className={`material-symbols-outlined text-[20px] ${isActive('/cro') ? 'filled' : ''}`}>home_repair_service</span>
                  <span>CRO Services</span>
              </button>

              {/* Cancer Diagnostics Group */}
              <div>
                 <button 
                   onClick={() => setExpandDiagnostics(!expandDiagnostics)} 
                   className="flex items-center gap-2 px-4 py-2.5 ml-2 w-full text-left text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                 >
                    <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">medical_services</span>
                    <span className="flex-1 text-sm font-medium">Cancer Diagnostics</span>
                    <span className="material-symbols-outlined text-[18px] opacity-50">{expandDiagnostics ? 'expand_less' : 'expand_more'}</span>
                 </button>

                 {expandDiagnostics && (
                   <div className="flex flex-col gap-1 ml-6 pl-3 border-l border-slate-200 dark:border-slate-700 mt-1">
                      {/* Tissue Biopsy */}
                      <button 
                        onClick={() => navigate('/diagnostics')} 
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm text-left
                          ${isActive('/diagnostics') 
                            ? 'text-primary bg-primary/10' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                        `}
                      >
                          <span>Tissue Biopsy</span>
                      </button>
                      
                      {/* Liquid Biopsy */}
                       <button 
                         onClick={() => navigate('/liquid-biopsy')} 
                         className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm text-left
                           ${isActive('/liquid-biopsy') 
                             ? 'text-secondary bg-secondary/10' 
                             : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                         `}
                       >
                          <span>Liquid Biopsy</span>
                      </button>

                      {/* Test Request Form */}
                      <button 
                         onClick={() => navigate('/test-request')} 
                         className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm text-left
                           ${isActive('/test-request') 
                             ? 'text-primary bg-blue-50 dark:bg-blue-900/10' 
                             : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                         `}
                       >
                          <span>Test Request Form</span>
                      </button>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* Contact */}
         <button 
           onClick={() => navigate('/contact')} 
           className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm text-left
             ${isActive('/contact') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}
           `}
         >
           <span className={`material-symbols-outlined text-[22px] ${isActive('/contact') ? 'filled' : ''}`}>person</span>
           <span>Contact</span>
        </button>

      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
         <button onClick={() => navigate('/about')} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
            <span className="material-symbols-outlined">info</span>
            <span>About & Mission</span>
         </button>
      </div>
    </aside>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-[100dvh] w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden pb-24 md:pb-0 scrollbar-hide w-full">
          {children}
        </main>
        <Navigation />
      </div>
    </div>
  );
};

// --- App Component ---

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/cro" element={<CRO />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/liquid-biopsy" element={<LiquidBiopsy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/variant-gpt" element={<VariantGPT />} />
          <Route path="/test-request" element={<TestRequestForm />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;