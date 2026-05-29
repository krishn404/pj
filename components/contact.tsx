"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Mail, Phone, Instagram } from "lucide-react"
import { contact as contactContent, site } from "@/lib/content"

const iconMap = {
  Email: Mail,
  Phone: Phone,
  Instagram: Instagram,
} as const

export function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const currentYear = new Date().getFullYear()

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-32 md:py-48 px-6 md:px-12 bg-primary text-primary-foreground relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-handwritten text-lg text-primary-foreground/60">
            {contactContent.connectLabel}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute inset-0 border-2 border-[var(--cyan)] -m-4 pointer-events-none">
              <div className="selection-handle absolute -top-1 -left-1" />
              <div className="selection-handle absolute -top-1 -right-1" />
              <div className="selection-handle absolute -bottom-1 -left-1" />
              <div className="selection-handle absolute -bottom-1 -right-1" />
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-pixel leading-tight max-w-4xl">
              {contactContent.heading}
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {contactContent.links.map((link, index) => {
            const Icon = iconMap[link.label as keyof typeof iconMap]
            const isExternal = "external" in link && link.external

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                className="group block p-6 md:p-8 border border-primary-foreground/20 hover:border-primary-foreground/40 transition-colors duration-300 relative"
              >
                <div className="flex items-start justify-between mb-8">
                  <Icon className="w-5 h-5 text-primary-foreground/60" />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredLink === link.label ? 1 : 0,
                      x: hoveredLink === link.label ? 0 : -10,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </div>
                <span className="text-xs text-primary-foreground/50 uppercase tracking-[0.2em]">
                  {link.label}
                </span>
                <p className="mt-2 text-lg md:text-xl font-light break-all">
                  {link.value}
                </p>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary-foreground/60">
            <path d="M5 12h8M10 9l3 3-3 3" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M13 12h3M13 9l3 3-3 3" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-handwritten text-lg text-primary-foreground/70">
            {contactContent.availabilityNote}
          </span>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-primary-foreground/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-primary-foreground/50">
              {contactContent.footer.copyright(currentYear)}
            </p>

            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors uppercase tracking-wider"
            >
              Instagram
            </a>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground/30 text-xs">
            <span>{contactContent.footer.location}</span>
            <span>{contactContent.footer.remote}</span>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
