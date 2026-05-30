"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import type { ExperimentalSectionDTO } from "@/lib/cms/types/portfolio"
import { VideoEmbedFrame } from "@/components/video-embed-frame"

type ExperimentalProps = {
  experimental: ExperimentalSectionDTO
}

export function Experimental({ experimental: experimentalContent }: ExperimentalProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 px-6 md:px-12 bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
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
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-pixel break-words"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experimentalContent.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="cursor-pointer"
            >
              <VideoEmbedFrame
                media={item.media}
                title={item.label}
                placeholderLabel={String(index + 1).padStart(2, "0")}
                placeholderCta={item.label}
                aspect="4/3"
                variant="dark"
                isHovered={hoveredIndex === index}
                onHoverChange={(hovered) => setHoveredIndex(hovered ? index : null)}
              />
            </motion.div>
          ))}
        </div>

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
