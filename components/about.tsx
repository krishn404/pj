"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { about as aboutContent } from "@/lib/content"

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const textVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  const wordReveal = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: i * 0.028,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  }

  const [intro, second, third, fourth] = aboutContent.paragraphs
  const introWords = intro.split(" ")

  return (
    <section
      ref={containerRef}
      id="about"
      className="hero-canvas relative py-32 md:py-48 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-glory text-lg md:text-xl text-[#1a1a1a] -rotate-3 inline-block mb-12 md:mb-16"
        >
          {aboutContent.cornerLabel}
        </motion.span>

        <motion.p
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-2xl md:text-4xl lg:text-[2.75rem] font-light leading-[1.25] tracking-tight text-[#0d0d0d]"
        >
          {introWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordReveal}
              className="inline-block mr-[0.32em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          custom={1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="mt-8 md:mt-10 text-xl md:text-3xl lg:text-[2.25rem] font-light leading-[1.3] tracking-tight text-[#0d0d0d]"
        >
          {second}
        </motion.p>

        <motion.div
          custom={2}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
          className="mt-8 md:mt-10 space-y-6 max-w-3xl"
        >
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">{third}</p>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">{fourth}</p>
        </motion.div>
      </div>
    </section>
  )
}
