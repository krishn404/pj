"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Brand Campaign",
    category: "Commercial",
    year: "2025",
    description: "Full campaign edit for lifestyle brand launch",
    color: "var(--gold)",
  },
  {
    title: "Creator Series",
    category: "YouTube",
    year: "2025",
    description: "Long-form content editing for digital creators",
    color: "var(--mint)",
  },
  {
    title: "Product Launch",
    category: "Social",
    year: "2024",
    description: "Reels and short-form content for e-commerce",
    color: "var(--pink)",
  },
  {
    title: "Motion Studies",
    category: "Experimental",
    year: "2024",
    description: "Visual experiments and audio-reactive work",
    color: "var(--cream)",
  },
]

export function Work() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      ref={containerRef}
      id="work"
      className="py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
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
            className="tag-pink px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block text-white"
          >
            Case Study
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-pixel"
          >
            PROJECTS
          </motion.h2>
        </motion.div>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group border-t border-border py-8 md:py-12 cursor-pointer relative overflow-hidden"
            >
              {/* Hover background fill */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 origin-left"
                style={{ backgroundColor: project.color, opacity: 0.1 }}
              />

              <div className="grid grid-cols-12 gap-4 items-center relative z-10">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <motion.span
                    animate={{ 
                      scale: hoveredIndex === index ? 1.2 : 1,
                      color: hoveredIndex === index ? project.color : "var(--muted-foreground)",
                    }}
                    className="text-xs font-mono"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-4">
                  <motion.h3
                    animate={{ 
                      x: hoveredIndex === index ? 16 : 0,
                      color: "var(--foreground)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-xl md:text-2xl font-light tracking-tight"
                  >
                    {project.title}
                  </motion.h3>
                </div>

                {/* Category tag */}
                <div className="hidden md:block md:col-span-2">
                  <motion.span
                    animate={{ 
                      backgroundColor: hoveredIndex === index ? project.color : "rgba(0, 0, 0, 0)",
                      color: hoveredIndex === index ? (project.color === "var(--pink)" ? "#ffffff" : "var(--foreground)") : "var(--muted-foreground)",
                    }}
                    className="text-xs px-2 py-1 transition-colors"
                  >
                    {project.category}
                  </motion.span>
                </div>

                {/* Description */}
                <div className="hidden md:block md:col-span-4">
                  <motion.p
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0.5,
                      x: hoveredIndex === index ? 8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground"
                  >
                    {project.description}
                  </motion.p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex md:col-span-1 justify-end">
                  <motion.div
                    initial={{ x: -20, opacity: 0, rotate: -45 }}
                    animate={{
                      x: hoveredIndex === index ? 0 : -20,
                      opacity: hoveredIndex === index ? 1 : 0,
                      rotate: hoveredIndex === index ? 0 : -45,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-5 h-5" style={{ color: project.color }} />
                  </motion.div>
                </div>
              </div>

              {/* Mobile description */}
              <motion.div 
                animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                className="md:hidden mt-2 ml-[16.666%]"
              >
                <span className="text-xs text-muted-foreground">
                  {project.category} · {project.year}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-border origin-left"
        />
      </div>
    </section>
  )
}
