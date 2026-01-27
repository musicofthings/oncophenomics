
'use client'
import React from 'react'
import { Button } from './ui/button' 
import { cn } from '../lib/utils' 
import { Menu, X } from 'lucide-react'
import { useScroll, motion } from 'framer-motion' 
import { useNavigate, useLocation } from 'react-router-dom'

const menuItems = [
    { name: 'Features', path: '/variant-gpt/features' },
    { name: 'Integration', path: '/variant-gpt/integration' },
    { name: 'API Docs', path: 'https://github.com/musicofthings/VariantGPT-v2', external: true },
    { name: 'Security', path: '/variant-gpt/security' },
]

export const VariantGPTHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    const handleAction = (item: typeof menuItems[0]) => {
        if (item.external) {
            window.open(item.path, '_blank');
        } else {
            navigate(item.path);
        }
        setMenuState(false);
    }

    return (
        <header className="md:pl-64 w-full">
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-50 w-full md:w-[calc(100%-256px)] pt-2 pr-4 sm:pr-8">
                <div className={cn(
                    'mx-auto w-full max-w-7xl rounded-3xl px-4 transition-all duration-300 lg:px-8', 
                    scrolled ? 'bg-background/90 backdrop-blur-2xl shadow-sm border border-slate-200 dark:border-slate-800' : 'bg-transparent'
                )}>
                    <motion.div
                        className={cn('relative flex items-center justify-between gap-4 py-3 duration-200 lg:py-4')}>
                        <div className="flex items-center gap-8">
                            <button
                                onClick={() => navigate('/variant-gpt')}
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">V</div>
                                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">VariantGPT</span>
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-6 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => handleAction(item)}
                                                className={cn(
                                                    "hover:text-primary block duration-150 font-medium",
                                                    location.pathname === item.path ? "text-primary font-bold" : "text-slate-500 dark:text-slate-400"
                                                )}>
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate('/contact')}
                                    className="h-9 px-4 rounded-full border-slate-200 dark:border-slate-800 font-bold"
                                >
                                    <span>Request Access</span>
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => window.open('https://variantgpt.pages.dev/login', '_blank')}
                                    className="h-9 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold shadow-sm"
                                >
                                    <span>Launch App</span>
                                </Button>
                            </div>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                className="relative z-20 flex cursor-pointer p-2 lg:hidden text-slate-900 dark:text-white"
                            >
                                {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {menuState && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl lg:hidden flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
                                <ul className="space-y-4">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => handleAction(item)}
                                                className={cn(
                                                  "text-base block font-bold",
                                                  location.pathname === item.path ? "text-primary" : "text-slate-900 dark:text-white"
                                                )}>
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-col gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <Button variant="outline" onClick={() => navigate('/contact')} className="w-full h-11 rounded-xl">Request Access</Button>
                                    <Button onClick={() => window.open('https://variantgpt.pages.dev/login', '_blank')} className="w-full h-11 bg-primary text-white font-bold rounded-xl">Launch App</Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}
