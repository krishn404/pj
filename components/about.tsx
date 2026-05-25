"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { about as aboutContent } from "@/lib/content"

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const wordReveal = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        delay: i * 0.03,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const [intro, second, third, fourth] = aboutContent.paragraphs
  const introWords = intro.split(" ")

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-32 md:py-48 px-6 md:px-12 relative"
    >
      <motion.div
        style={{ y }}
        className="absolute top-1/4 right-12 hidden lg:block"
      >
        <div className="w-16 h-16 bg-[var(--mint)] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-30" />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <span className="font-glory text-base text-[#1a1a1a] -rotate-3 inline-block">
              {aboutContent.cornerLabel}
            </span>
            <div className="mt-6 inline-block">
              <span className="tag-cream px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note">
                {aboutContent.whatsUpLabel}
              </span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 w-12 h-px bg-foreground/20 origin-left"
            />
          </motion.div>

          <div className="lg:col-span-9">
            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-tight text-editorial-body"
            >
              {introWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordReveal}
                  className="inline-block mr-[0.3em]"
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
              className="mt-8 text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-tight text-editorial-body"
            >
              {second}
            </motion.p>

            <motion.div
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
              className="mt-8 flex items-start gap-4"
            >
              <motion.div
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="hidden md:block w-24 h-28 bg-white p-2 shadow-lg flex-shrink-0 transform rotate-3"
              >
                <div className="w-full h-full bg-gradient-to-br from-[var(--mint)] to-[var(--cyan)] opacity-50 flex items-center justify-center">
                  <span className="font-glory text-sm text-[#333]">
                    {aboutContent.polaroidLeftCaption}
                  </span>
                </div>
              </motion.div>
              <div className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl space-y-4">
                <p>{third}</p>
                <p>{fourth}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
