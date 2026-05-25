"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { experimental as experimentalContent } from "@/lib/content"

export function Experimental() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 px-6 md:px-12 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Decorative shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-20 right-20 w-40 h-40 bg-[var(--mint)] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] hidden lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-40 left-10 w-24 h-24 bg-[var(--gold)] rounded-full hidden lg:block"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="tag-mint px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block"
          >
            {experimentalContent.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-pixel"
          >
            {experimentalContent.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-primary-foreground/70 max-w-xl leading-relaxed text-handwritten"
          >
            {experimentalContent.description}
          </motion.p>
        </motion.div>

        {/* Experimental videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experimentalContent.videoPlaceholders.map((label, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -8 }}
              className="relative aspect-[4/3] bg-primary-foreground/5 overflow-hidden cursor-pointer group"
            >
              {/* Selection frame */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                className="absolute inset-2 border-2 border-[var(--cyan)] pointer-events-none z-20"
              >
                <div className="selection-handle absolute -top-1 -left-1" />
                <div className="selection-handle absolute -top-1 -right-1" />
                <div className="selection-handle absolute -bottom-1 -left-1" />
                <div className="selection-handle absolute -bottom-1 -right-1" />
              </motion.div>

              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <div className="w-16 h-16 border border-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                    <motion.span
                      animate={{ 
                        color: hoveredIndex === index ? "var(--cyan)" : "var(--primary-foreground)",
                      }}
                      className="text-2xl font-black text-pixel"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                  </div>
                  <p className="text-sm text-primary-foreground/50 font-mono uppercase tracking-wider">
                    {label}
                  </p>
                </motion.div>
              </div>

              {/* Hover color overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(135deg, var(--mint) 0%, var(--cyan) 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-sm text-primary-foreground/50 text-center font-mono uppercase tracking-wider"
        >
          {experimentalContent.footerNote}
        </motion.p>
      </div>
    </section>
  )
}
