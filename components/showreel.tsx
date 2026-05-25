"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Play } from "lucide-react"
import { showreel as showreelContent } from "@/lib/content"

export function Showreel() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2])

  return (
    <section
      ref={containerRef}
      id="showreel"
      className="py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="tag-gold px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block"
            >
              {showreelContent.label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-pixel"
            >
              {showreelContent.title}
            </motion.h2>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground font-mono"
          >
            {showreelContent.period}
          </motion.span>
        </motion.div>

        {/* Video container with selection frame */}
        <motion.div
          ref={videoRef}
          style={{ scale, rotate }}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Selection frame */}
          <div className="absolute -inset-4 border-2 border-[var(--cyan)] pointer-events-none z-10">
            <div className="selection-handle absolute -top-1 -left-1" />
            <div className="selection-handle absolute -top-1 -right-1" />
            <div className="selection-handle absolute -bottom-1 -left-1" />
            <div className="selection-handle absolute -bottom-1 -right-1" />
            <div className="selection-handle absolute top-1/2 -left-1 -translate-y-1/2" />
            <div className="selection-handle absolute top-1/2 -right-1 -translate-y-1/2" />
          </div>

          <div
            className="relative aspect-video bg-primary overflow-hidden cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Placeholder background with cinematic bars */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.3) 100%)",
                }}
              />
              
              {/* Film grain effect on video */}
              <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Placeholder text */}
              <div className="text-center z-10">
                <motion.div
                  animate={isHovered ? { scale: 1.2, rotate: 90 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center mx-auto mb-6 group-hover:border-primary-foreground/60 transition-colors duration-500 bg-primary-foreground/5"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-primary-foreground stroke-none ml-1" />
                </motion.div>
                <motion.p
                  animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.7, y: 5 }}
                  className="text-sm text-primary-foreground/70 font-mono uppercase tracking-wider"
                >
                  {showreelContent.placeholderCta}
                </motion.p>
              </div>
            </div>

            {/* Hover distortion overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: isHovered ? 0.1 : 0,
                scale: isHovered ? 1 : 1.1,
              }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[var(--cyan)]"
            />
          </div>
        </motion.div>

        {/* Caption */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-start justify-between"
        >
          <p className="text-sm text-muted-foreground max-w-md text-handwritten">
            {showreelContent.caption}
          </p>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="hidden md:block tag-mint px-3 py-1.5 text-xs font-mono uppercase sticky-note"
          >
            {showreelContent.reelTag}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
