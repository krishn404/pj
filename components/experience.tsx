"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import type { ExperienceSectionDTO } from "@/lib/cms/types/portfolio"

type ExperienceProps = {
  experience: ExperienceSectionDTO
}

export function Experience({ experience: experienceContent }: ExperienceProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={containerRef}
      id="experience"
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="tag-cream px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block"
          >
            {experienceContent.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-pixel"
          >
            {experienceContent.title}
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-foreground origin-top"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {experienceContent.items.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2, type: "spring" }}
                  className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 rounded-full z-10"
                  style={{ backgroundColor: exp.color, border: "3px solid var(--background)" }}
                />

                <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-16" : "md:order-2 md:pl-16"}`}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-mono px-2 py-1 inline-block"
                    style={{
                      backgroundColor: exp.color,
                      color: exp.color === "var(--pink)" ? "white" : "var(--foreground)",
                    }}
                  >
                    {exp.period}
                  </motion.span>
                  <h3 className="mt-3 text-xl md:text-2xl font-light tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.company}</p>
                </div>

                <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pl-16" : "md:order-1 md:pr-16"}`}>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 pt-16 border-t border-border"
        >
          <p className="text-xs text-muted-foreground text-center mb-8 tracking-[0.2em] uppercase font-mono">
            {experienceContent.companiesTitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {experienceContent.companyLogos.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  color: company.accentColor,
                }}
                style={{ color: "var(--muted-foreground)" }}
                className="text-lg md:text-xl font-light transition-colors cursor-pointer"
              >
                {company.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
