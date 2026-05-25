"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Send, MousePointer2 } from "lucide-react"
import { hero as heroContent, site } from "@/lib/content"

function ConcentricCirclesIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="inline-block align-middle mx-1.5 -mt-0.5"
      aria-hidden
    >
      <circle cx="14" cy="14" r="11" fill="none" stroke="#4CAF50" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="7" fill="none" stroke="#4CAF50" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="3.5" fill="#4CAF50" />
    </svg>
  )
}

function FlowerIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="inline-block align-middle mx-1.5 -mt-0.5"
      aria-hidden
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="14"
          cy="14"
          rx="3.5"
          ry="8"
          fill="#F06292"
          transform={`rotate(${angle} 14 14)`}
        />
      ))}
      <circle cx="14" cy="14" r="3" fill="#F06292" />
    </svg>
  )
}

function SelectionHandles() {
  const positions = [
    "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  ]

  return (
    <div className="absolute inset-0 hero-selection-frame">
      {positions.map((pos) => (
        <span key={pos} className={`hero-selection-handle ${pos}`} />
      ))}
    </div>
  )
}

function SpeechBubbleAvatar({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`relative w-[58px] md:w-[64px] ${
        side === "left" ? "hero-float-slow" : "hero-float-slow-delay"
      }`}
    >
    </div>
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-canvas relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center py-16 md:py-20">
        {/* Live timestamp */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[11px] md:text-xs font-mono text-neutral-500 mb-8 md:mb-12 tracking-wide tabular-nums"
          suppressHydrationWarning
        >
          {mounted ? currentTime : "00:00:00 AM"}
        </motion.p>

        {/* Center stage: labels, name, badges, avatars */}
        <div className="relative w-full flex flex-col items-center min-h-[280px] sm:min-h-[320px] md:min-h-[360px]">
          {/* Avatars — mid sides */}
          <div className="absolute top-[42%] -translate-y-1/2 left-0 sm:left-[2%] md:left-[4%] hidden sm:block z-10">
            <SpeechBubbleAvatar side="left" />
          </div>
          <div className="absolute top-[48%] -translate-y-1/2 right-0 sm:right-[2%] md:right-[4%] hidden sm:block z-10">
            <SpeechBubbleAvatar side="right" />
          </div>

          {/* Sticky note — currently */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: 8 }}
            animate={{ opacity: 1, rotate: -7, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="absolute -top-1 sm:top-0 left-[2%] sm:left-[8%] md:left-[14%] z-20"
          >
            <div className="hero-sticky-note hero-sticky-mint px-3 py-1.5 text-[11px] md:text-xs font-medium -rotate-[7deg] whitespace-nowrap">
              {heroContent.currentRole}
            </div>
          </motion.div>

          {/* Sticky note — previously */}
          <motion.div
            initial={{ opacity: 0, rotate: 10, y: 8 }}
            animate={{ opacity: 1, rotate: 5, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="absolute -top-1 sm:top-0 right-[2%] sm:right-[8%] md:right-[14%] z-20"
          >
            <div className="hero-sticky-note hero-sticky-cream px-3 py-1.5 text-[11px] md:text-xs font-medium rotate-[5deg] whitespace-nowrap">
              {heroContent.previousRole}
            </div>
          </motion.div>

          {/* "my name is" */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-center mb-2 z-10"
          >
            <span
              className="font-glory text-[18px] md:text-xl"
              style={{ color: "#1a1a1a" }}
            >
              {heroContent.introLabel}
            </span>
            <svg
              className="mx-auto mt-1 block"
              width="96"
              height="10"
              viewBox="0 0 96 10"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 6.5C14 4 26 8.5 40 5.5S62 3 78 6.5 90 7.5 93 6"
                stroke="#1a1a1a"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Name box + Figma selection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 w-full max-w-[min(100%,720px)] px-2 sm:px-4"
          >
            <div className="relative px-1 sm:px-2 py-1">
              <SelectionHandles />
              <div className="hero-name-box px-4 sm:px-8 md:px-12 py-5 sm:py-6 md:py-8">
                <h1 className="hero-name-text font-foldit text-center leading-[0.92] text-[clamp(2.75rem,11vw,8.75rem)]">
                  {heroContent.nameLine1}
                  <br />
                  {heroContent.nameLine2}
                </h1>
              </div>
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex items-center justify-center gap-2.5 mt-5 md:mt-6 z-10"
          >
            <span
              className="hero-availability-dot w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: "#4caf50" }}
            />
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500">
              {heroContent.availabilityLine}
            </span>
          </motion.div>

          {/* Floating presence badges — desktop */}
          <div className="hidden sm:block absolute w-full left-0 right-0 top-[72%] md:top-[68%] pointer-events-none z-20">
            <div className="relative max-w-3xl mx-auto px-2 h-0">
              <div className="absolute left-0 sm:left-[4%] md:left-[8%] -translate-y-1/2 hero-float">
                <div className="hero-pill-wrap pointer-events-auto">
                  <Send className="w-3.5 h-3.5 text-[#1a1a1a] shrink-0" strokeWidth={2.5} />
                  <span className="hero-pill-badge hero-pill-yellow">
                    {heroContent.roleBadge}
                    <span className="hero-pill-tail-right" aria-hidden />
                  </span>
                </div>
              </div>
              <div className="absolute right-0 sm:right-[4%] md:right-[8%] -translate-y-1/2 hero-float-delay">
                <div className="hero-pill-wrap pointer-events-auto">
                  <span className="hero-pill-badge hero-pill-pink">
                    <span className="hero-pill-tail-left" aria-hidden />
                    {site.locationShort}
                  </span>
                  <MousePointer2
                    className="w-3.5 h-3.5 text-white shrink-0"
                    fill="white"
                    strokeWidth={0}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: stacked badges below availability */}
          <div className="flex sm:hidden flex-col items-center gap-3 mt-8 z-20 w-full">
            <div className="hero-float">
              <div className="hero-pill-wrap">
                <Send className="w-3.5 h-3.5 text-[#1a1a1a]" strokeWidth={2.5} />
                <span className="hero-pill-badge hero-pill-yellow">
                  {heroContent.roleBadge}
                  <span className="hero-pill-tail-right" aria-hidden />
                </span>
              </div>
            </div>
            <div className="hero-float-delay">
              <div className="hero-pill-wrap">
                <span className="hero-pill-badge hero-pill-pink">
                  <span className="hero-pill-tail-left" aria-hidden />
                  {site.locationShort}
                </span>
                <MousePointer2 className="w-3.5 h-3.5 text-white" fill="white" strokeWidth={0} />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center text-xl sm:text-2xl md:text-[2rem] lg:text-[2.25rem] font-light tracking-tight text-[#1a1a1a] mt-16 sm:mt-20 md:mt-24 max-w-3xl leading-snug px-2"
        >
          {heroContent.tagline} <ConcentricCirclesIcon /> <FlowerIcon />
        </motion.p>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="mt-8 md:mt-10"
        >
          <a href="#contact" className="hero-contact-btn">
            <span
              className="flex items-center justify-center min-w-[44px] px-3 font-mono text-sm font-bold text-white"
              style={{ backgroundColor: "#00aaff" }}
            >
              {">>"}
            </span>
            <span className="flex items-center px-5 md:px-6 py-3 text-[11px] md:text-xs font-mono font-semibold uppercase tracking-[0.2em] text-white bg-[#0a0a0a]">
              {heroContent.contactCta}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
