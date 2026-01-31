
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface GlobalHeaderProps {
  title?: string | React.ReactNode;
  transparent?: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title, transparent = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: '/', isHeader: false },
    { label: 'Platform', path: '/platform', isHeader: false },
    { label: 'VariantGPT', path: '#', isHeader: true },
    { label: 'Overview', path: '/variant-gpt', indent: true },
    { label: 'Features', path: '/variant-gpt/features', indent: true },
    { label: 'Integration', path: '/variant-gpt/integration', indent: true },
    { label: 'Security', path: '/variant-gpt/security', indent: true },
    { label: 'Services', path: '#', isHeader: true },
    { label: 'CRO Solutions', path: '/cro', indent: true },
    { label: 'Tissue Biopsy', path: '/diagnostics', indent: true },
    { label: 'Liquid Biopsy', path: '/liquid-biopsy', indent: true },
    { label: 'Contact', path: '/contact', isHeader: false },
    { label: 'About', path: '/about', isHeader: false },
  ];

  return (
    <>
      <header className={`sticky top-0 z-30 px-4 py-3 flex items-center justify-between transition-colors duration-300 w-full ${
        transparent ? 'bg-transparent' : 'bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'
      }`}>
        {/* Left Controls */}
        <div className="flex items-center gap-2 z-10">
           <button onClick={() => navigate('/')} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200" title="Home">
             <span className="material-symbols-outlined text-[20px]">home</span>
           </button>
           <button onClick={() => window.history.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200" title="Go Back">
             <span className="material-symbols-outlined text-[20px]">arrow_back</span>
           </button>
           <button onClick={() => window.history.forward()} className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200" title="Go Forward">
             <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
           </button>
        </div>

        {/* Center Title */}
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          {title ? (
            typeof title === 'string' ? (
              <span className="font-bold text-lg text-slate-900 dark:text-white truncate max-w-[200px] md:max-w-md">{title}</span>
            ) : title
          ) : null}
        </div>

        {/* Right Menu Trigger (Mobile Only) */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden relative z-10 flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        
        {/* Placeholder for desktop balance */}
        <div className="hidden md:block w-[100px]"></div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-surface-light/98 dark:bg-surface-dark/98 backdrop-blur-xl animate-in fade-in duration-200 md:hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
             <span className="font-bold text-xl tracking-tight text-primary px-2">MENU</span>
             <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors text-slate-900 dark:text-white"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          <div className="flex-1 flex flex-col items-start px-8 py-6 overflow-y-auto space-y-4">
             {menuItems.map((item, idx) => {
               if (item.isHeader) {
                 return (
                   <div key={idx} className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-4 pb-1 border-b border-slate-200 dark:border-slate-700 w-full">
                     {item.label}
                   </div>
                 )
               }
               return (
                 <button
                   key={idx}
                   onClick={() => {
                     navigate(item.path);
                     setIsMenuOpen(false);
                   }}
                   className={`text-xl font-bold transition-all w-full text-left ${item.indent ? 'pl-4 text-lg font-medium' : ''} ${
                     location.pathname === item.path 
                       ? 'text-primary' 
                       : 'text-slate-900 dark:text-white hover:text-primary/70'
                   }`}
                 >
                   {item.label}
                 </button>
               )
             })}
          </div>
          <div className="p-8 text-center text-slate-400 text-xs border-t border-slate-100 dark:border-slate-800">
            © 2024 Oncophenomics
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalHeader;
