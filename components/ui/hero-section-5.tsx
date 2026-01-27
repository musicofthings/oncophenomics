
'use client'
import React from 'react'
import { Button } from './button' 
import { InfiniteSlider } from './infinite-slider' 
import { ProgressiveBlur } from './progressive-blur' 
import { cn } from '../../lib/utils' 
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { VariantGPTHeader } from '../VariantGPTHeader'

export function HeroSection() {
    const navigate = useNavigate();
    
    return (
        <>
            <VariantGPTHeader />
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
                                        onClick={() => window.open('https://variantgpt.pages.dev/login', '_blank')}
                                    >
                                        <span className="text-nowrap">Analyze Sample</span>
                                        <ChevronRight className="ml-1" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        className="h-12 rounded-full px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5 cursor-pointer text-slate-900 dark:text-white"
                                        onClick={() => window.open('https://variantgpt-onboarding.pages.dev/', '_blank')}
                                    >
                                        <span className="text-nowrap">Read Whitepaper</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5 mt-20 lg:mt-0">
                            {/* DNA Line Art / Model Image with grayscale effect */}
                            <div className="absolute inset-0 z-0">
                              <img 
                                src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2000&auto=format&fit=crop" 
                                className="size-full object-cover grayscale opacity-30 dark:opacity-20 mix-blend-overlay"
                                alt="DNA Background"
                              />
                            </div>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="size-full object-cover opacity-50 invert dark:opacity-35 dark:invert-0 dark:lg:opacity-75 relative z-10"
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
