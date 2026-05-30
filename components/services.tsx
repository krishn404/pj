"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import type { ServicesSectionDTO } from "@/lib/cms/types/portfolio"

type ServicesProps = {
  services: ServicesSectionDTO
}

export function Services({ services: servicesContent }: ServicesProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 px-6 md:px-12 bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-4">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, type: "spring" }}
              className="tag-gold px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block"
            >
              {servicesContent.label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-pixel"
            >
              {servicesContent.title}
            </motion.h2>
          </div>
          <div className="lg:col-span-8 lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed text-handwritten"
            >
              {servicesContent.intro}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicesContent.items.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -8 }}
              className="bg-background p-8 md:p-12 cursor-pointer group relative overflow-hidden border border-border"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -top-12 -right-12 w-24 h-24 rounded-full"
                style={{ backgroundColor: service.color, opacity: 0.3 }}
              />

              <motion.span
                animate={{
                  color: hoveredIndex === index ? service.color : "var(--muted-foreground)",
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
                className="text-xs font-mono block"
              >
                {service.number}
              </motion.span>

              <motion.h3
                animate={{ x: hoveredIndex === index ? 8 : 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-2xl md:text-3xl font-light tracking-tight text-editorial"
              >
                {service.title}
              </motion.h3>

              <motion.p
                animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                className="mt-4 text-muted-foreground leading-relaxed"
              >
                {service.description}
              </motion.p>

              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag, tagIndex) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + tagIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-xs px-3 py-1 border border-border text-muted-foreground hover:border-foreground transition-colors"
                    style={{
                      borderColor: hoveredIndex === index ? service.color : undefined,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10, rotate: -45 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  x: hoveredIndex === index ? 0 : -10,
                  rotate: hoveredIndex === index ? 0 : -45,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-8 right-8 md:top-12 md:right-12"
              >
                <ArrowUpRight className="w-5 h-5" style={{ color: service.color }} />
              </motion.div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                style={{ backgroundColor: service.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
