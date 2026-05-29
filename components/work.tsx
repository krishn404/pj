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
    accent: "#E8B84A",
    hoverBg: "rgba(232, 184, 74, 0.14)",
    tagText: "#1a1a1a",
  },
  {
    title: "Creator Series",
    category: "YouTube",
    year: "2025",
    description: "Long-form content editing for digital creators",
    accent: "#8DD8C5",
    hoverBg: "rgba(141, 216, 197, 0.18)",
    tagText: "#1a1a1a",
  },
  {
    title: "Product Launch",
    category: "Social",
    year: "2024",
    description: "Reels and short-form content for e-commerce",
    accent: "#E85A71",
    hoverBg: "rgba(232, 90, 113, 0.14)",
    tagText: "#ffffff",
  },
  {
    title: "Motion Studies",
    category: "Experimental",
    year: "2024",
    description: "Visual experiments and audio-reactive work",
    accent: "#4AC3E8",
    hoverBg: "rgba(74, 195, 232, 0.16)",
    tagText: "#1a1a1a",
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

        <div className="space-y-0">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group border-t border-border py-8 md:py-12 cursor-pointer relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 origin-left pointer-events-none"
                  initial={false}
                  animate={{
                    scaleX: isHovered ? 1 : 0,
                    backgroundColor: project.hoverBg,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="grid grid-cols-12 gap-4 items-center relative z-10">
                  <div className="col-span-2 md:col-span-1">
                    <motion.span
                      animate={{
                        scale: isHovered ? 1.2 : 1,
                        color: isHovered ? project.accent : "#737373",
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-xs font-mono inline-block"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.span>
                  </div>

                  <div className="col-span-10 md:col-span-4">
                    <motion.h3
                      animate={{ x: isHovered ? 16 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl md:text-2xl font-light tracking-tight text-foreground"
                    >
                      {project.title}
                    </motion.h3>
                  </div>

                  <div className="hidden md:block md:col-span-2">
                    <motion.span
                      animate={{
                        backgroundColor: isHovered ? project.accent : "rgba(0,0,0,0)",
                        color: isHovered ? project.tagText : "#737373",
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-xs px-2 py-1 inline-block"
                    >
                      {project.category}
                    </motion.span>
                  </div>

                  <div className="hidden md:block md:col-span-4">
                    <motion.p
                      animate={{
                        opacity: isHovered ? 1 : 0.55,
                        x: isHovered ? 8 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-muted-foreground"
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  <div className="hidden md:flex md:col-span-1 justify-end">
                    <motion.div
                      animate={{
                        x: isHovered ? 0 : -20,
                        opacity: isHovered ? 1 : 0,
                        rotate: isHovered ? 0 : -45,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight
                        className="w-5 h-5"
                        style={{ color: project.accent }}
                      />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0.75 }}
                  className="md:hidden mt-3 ml-[16.666%] relative z-10"
                >
                  <span className="text-xs text-muted-foreground">
                    {project.category} · {project.year}
                  </span>
                </motion.div>
              </motion.article>
            )
          })}
        </div>

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
