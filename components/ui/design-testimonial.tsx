import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

const testimonials = [
  {
    quote: "VariantGPT has transformed our clinical interpretation process, reducing turn-around time by 70%.",
    author: "Dr. Aris Thanasas",
    role: "Global Oncology Lead",
    company: "Genentech",
  },
  {
    quote: "The most elegant solution for multi-omics integration we've ever implemented in our research pipeline.",
    author: "Dr. Elena Rodriguez",
    role: "Senior Pathologist",
    company: "Mayo Clinic",
  },
  {
    quote: "Pure craftsmanship in data visualization and genomic accuracy. It's a paradigm shift for patient care.",
    author: "Michael Chang",
    role: "Clinical Research Director",
    company: "Novartis",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 8000)
    return () => clearInterval(timer)
  }, [goNext])

  const current = testimonials[activeIndex]

  return (
    <div className="flex items-center justify-center py-24 bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-300">
      <div ref={containerRef} className="relative w-full max-w-5xl px-6" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="absolute -left-12 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-bold text-primary/[0.05] dark:text-primary/[0.03] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content - asymmetric layout */}
        <div className="relative flex">
          {/* Left column - vertical text */}
          <div className="hidden md:flex flex-col items-center justify-center pr-12 border-r border-slate-200 dark:border-slate-800">
            <motion.span
              className="text-xs font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Expert Opinions
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-slate-200 dark:bg-slate-800 mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 md:pl-16 py-8 md:py-12">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-mono text-primary dark:text-blue-400 border border-primary/20 bg-primary/5 rounded-full px-3 py-1 uppercase tracking-wider font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[160px] md:min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-2xl md:text-4xl lg:text-5xl font-display font-medium text-slate-900 dark:text-white leading-[1.2] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="w-8 h-px bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-bold text-slate-900 dark:text-white">{current.author}</p>
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4 self-end md:self-auto">
                <motion.button
                  onClick={goPrev}
                  className="group relative w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden hover:border-primary/50 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="material-symbols-outlined relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                    chevron_left
                  </span>
                </motion.button>

                <motion.button
                  onClick={goNext}
                  className="group relative w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden hover:border-primary/50 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="material-symbols-outlined relative z-10 text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker - subtle repeating company names */}
        <div className="absolute -bottom-10 left-0 right-0 overflow-hidden opacity-[0.05] dark:opacity-[0.03] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-4xl md:text-6xl font-bold tracking-tight uppercase"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
