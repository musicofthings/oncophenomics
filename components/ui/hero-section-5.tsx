'use client'
import React from 'react'
// Link was unused and imported incorrectly. Removing it.
import { Button } from './button' // Relative import
import { InfiniteSlider } from './infinite-slider' // Relative import
import { ProgressiveBlur } from './progressive-blur' // Relative import
import { cn } from '../../lib/utils' // Relative import
import { Menu, X, ChevronRight } from 'lucide-react'
import { useScroll, motion } from 'framer-motion' // Changed from motion/react
import { useNavigate } from 'react-router-dom'

export function HeroSection() {
    const navigate = useNavigate();
    
    // Helper for navigation
    const handleNav = (path: string) => {
        navigate(path);
    };

    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden font-sans">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-36">
                        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <h1 className="mt-8 max-w-3xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    VariantGPT: <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Genomic Intelligence</span>
                                </h1>
                                <p className="mt-8 max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300">
                                    Accelerate variant interpretation with our LLM-powered engine. From VCF to clinical report in minutes with 99.9% accuracy.
                                </p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base bg-primary hover:bg-primary-dark text-white cursor-pointer"
                                        onClick={() => handleNav('/contact')}
                                    >
                                        <span className="text-nowrap">Analyze Sample</span>
                                        <ChevronRight className="ml-1" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        className="h-12 rounded-full px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5 cursor-pointer text-slate-900 dark:text-white"
                                        onClick={() => handleNav('/about')}
                                    >
                                        <span className="text-nowrap">Read Whitepaper</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5 mt-20 lg:mt-0">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="size-full object-cover opacity-50 invert dark:opacity-35 dark:invert-0 dark:lg:opacity-75"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video>
                        </div>
                    </div>
                </section>
                <section className="bg-background pb-12">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6 border-slate-200 dark:border-slate-800">
                                <p className="text-end text-sm text-slate-500 dark:text-slate-400">Trusted by leading research institutes</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    durationOnHover={20}
                                    duration={40}
                                    gap={112}>
                                    <div className="flex items-center justify-center grayscale opacity-70 hover:opacity-100 transition-opacity">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined">genetics</span>
                                            GenoLab
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center grayscale opacity-70 hover:opacity-100 transition-opacity">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined">biotech</span>
                                            BioX
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center grayscale opacity-70 hover:opacity-100 transition-opacity">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined">science</span>
                                            HelixAI
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center grayscale opacity-70 hover:opacity-100 transition-opacity">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined">medication</span>
                                            PharmaCo
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center grayscale opacity-70 hover:opacity-100 transition-opacity">
                                        <span className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <span className="material-symbols-outlined">hub</span>
                                            OmicsNet
                                        </span>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-gradient-to-r from-background to-transparent absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-gradient-to-l from-background to-transparent absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#' },
    { name: 'Integration', href: '#' },
    { name: 'API Docs', href: '#' },
    { name: 'Security', href: '#' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()
    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-20 w-full pt-2">
                <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-background/80 backdrop-blur-2xl shadow-sm')}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <button
                                onClick={() => navigate('/')}
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden md:block">VariantGPT</span>
                            </button>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-slate-900 dark:text-white"
                            >
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => navigate(item.href)}
                                                className="text-muted-foreground hover:text-primary block duration-150 font-medium">
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base text-slate-900 dark:text-white">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => {
                                                    navigate(item.href);
                                                    setMenuState(false);
                                                }}
                                                className="text-muted-foreground hover:text-primary block duration-150 font-medium">
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate('/contact')}
                                    className="cursor-pointer"
                                >
                                    <span>Request Access</span>
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => navigate('/platform')}
                                    className="bg-primary hover:bg-primary-dark text-white cursor-pointer"
                                >
                                    <span>Launch App</span>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold', className)}>
            V
        </div>
    )
}