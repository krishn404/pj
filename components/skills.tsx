"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import type { SkillsSectionDTO } from "@/lib/cms/types/portfolio"

type SkillsProps = {
  skills: SkillsSectionDTO
}

export function Skills({ skills: skillsContent }: SkillsProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={containerRef}
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
            className="tag-gold px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block"
          >
            {skillsContent.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-pixel"
          >
            {skillsContent.title}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {skillsContent.categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3
                className="text-sm font-mono tracking-wide mb-6 uppercase"
                style={{ color: category.color }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      type: "spring",
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: skillIndex % 2 === 0 ? -3 : 3,
                      backgroundColor: category.color,
                      color: category.color === "var(--pink)" ? "#ffffff" : "var(--foreground)",
                    }}
                    style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
                    className="px-4 py-2 text-sm border border-border hover:border-[rgba(0,0,0,0)] transition-[border-color] duration-300 cursor-default sticky-note"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 overflow-hidden"
        >
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[
              ...skillsContent.categories.flatMap((c) => c.skills),
              ...skillsContent.categories.flatMap((c) => c.skills),
            ].map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="text-6xl md:text-8xl font-black text-foreground/5 mx-8 text-pixel"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
