"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import type { TestimonialsSectionDTO } from "@/lib/cms/types/portfolio"

type TestimonialsProps = {
  testimonials?: TestimonialsSectionDTO | null
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const section = testimonials ?? { label: "Testimonials", title: "KIND WORDS", items: [] }
  const items = Array.isArray(section.items) ? section.items : []
  if (items.length === 0) return null

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="py-32 md:py-48 px-6 md:px-12 bg-secondary relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="tag-pink px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block text-white"
          >
            {section.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-pixel"
          >
            {section.title}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-background border border-border p-8 md:p-10 relative overflow-hidden cursor-default"
            >
              <motion.div
                className="absolute inset-0 origin-left pointer-events-none"
                initial={false}
                animate={{
                  scaleX: hoveredIndex === index ? 1 : 0,
                  backgroundColor: "rgba(232, 90, 113, 0.08)",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <p className="text-lg md:text-xl font-light leading-relaxed text-foreground relative z-10 text-handwritten">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-6 relative z-10">
                <cite className="not-italic text-sm font-mono uppercase tracking-wider text-foreground">
                  {item.authorName}
                </cite>
                {(item.authorRole || item.company) && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {[item.authorRole, item.company].filter(Boolean).join(" · ")}
                  </p>
                )}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
