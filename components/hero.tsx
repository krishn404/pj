"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { hero as heroContent, site } from "@/lib/content"

function SelectionHandles({ isHovered }: { isHovered: boolean }) {
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
    <motion.div
      className="absolute inset-0 hero-selection-frame pointer-events-none"
      animate={{
        scale: isHovered ? 1.01 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {positions.map((pos) => (
        <span key={pos} className={`hero-selection-handle ${pos}`} />
      ))}
    </motion.div>
  )
}

function ScribbleUnderline({ color = "#1a1a1a" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const w = Math.max(1, canvas.clientWidth)
      const h = Math.max(1, canvas.clientHeight)

      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Deterministic "hand scribble" using sine waves.
      const yMid = h * 0.6
      const amp = h * 0.35
      const points = 14

      ctx.beginPath()
      for (let i = 0; i <= points; i++) {
        const t = i / points
        const x = t * w
        const y =
          yMid +
          amp * Math.sin(t * Math.PI * 2.15) +
          (amp * 0.35) * Math.sin(t * Math.PI * 5.1 + 0.7)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.strokeStyle = color
      ctx.lineWidth = Math.max(1.5, h * 0.22)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()
    }

    draw()

    // Redraw on resize so it stays proportional.
    const ro = new ResizeObserver(() => draw())
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="block mx-auto mt-1.5 w-[5.5rem] h-[10px]"
    />
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [nameHovered, setNameHovered] = useState(false)

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
    <section
      id="home"
      className="hero-canvas relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 overflow-x-hidden"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center py-16 md:py-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[11px] md:text-xs font-mono text-neutral-500 mb-8 md:mb-12 tracking-wide tabular-nums"
          suppressHydrationWarning
        >
          {mounted ? currentTime : "00:00:00 AM"}
        </motion.p>

        <div className="relative w-full flex flex-col items-center">
          {/* Sticky notes */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, y: 8 }}
            animate={{ opacity: 1, rotate: -7, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="absolute -top-2 sm:top-0 left-[0%] sm:left-[6%] md:left-[10%] z-20"
          >
            <div className="hero-sticky-note hero-sticky-mint px-3 py-1.5 text-[11px] md:text-xs font-medium -rotate-[7deg] whitespace-nowrap">
              {heroContent.currentRole}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 10, y: 8 }}
            animate={{ opacity: 1, rotate: 5, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="absolute -top-2 sm:top-0 right-[0%] sm:right-[6%] md:right-[10%] z-20"
          >
            <div className="hero-sticky-note hero-sticky-cream px-3 py-1.5 text-[11px] md:text-xs font-medium rotate-[5deg] whitespace-nowrap">
              {heroContent.previousRole}
            </div>
          </motion.div>

          {/* "my name is" — CSS underline only */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-center mb-3 z-10"
          >
            <span className="font-glory text-[18px] md:text-xl text-[#1a1a1a]">
              {heroContent.introLabel}
            </span>
            <ScribbleUnderline />
          </motion.div>

          {/* Name + selection — full width so nothing clips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 w-full max-w-[min(100%,920px)]"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
          >
            <div className="relative px-3 sm:px-6 md:px-8 py-2 sm:py-3 overflow-visible">
              <SelectionHandles isHovered={nameHovered} />
              <div className="hero-name-box overflow-visible px-2 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
                <h1 className="hero-name-text font-boldonse text-center leading-[1.3] tracking-[0.04em] whitespace-nowrap text-[clamp(2.25rem,min(8.5vw,7.5rem),7.5rem)]">
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
            className="flex items-center justify-center gap-2.5 mt-6 md:mt-8 z-10"
          >
            <span
              className="hero-availability-dot w-2 h-2 rounded-full shrink-0 bg-[#4caf50]"
              aria-hidden
            />
            <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.35em] text-neutral-500">
              {heroContent.availabilityLine}
            </span>
          </motion.div>

          {/* Presence badges — desktop */}
          <div className="hidden sm:block absolute w-full left-0 right-0 top-[calc(100%-0.5rem)] pointer-events-none z-20">
            <div className="relative max-w-4xl mx-auto px-2 h-0">
              <div className="absolute left-0 sm:left-[2%] md:left-[6%] -translate-y-1/2 hero-float">
                <div className="hero-pill-wrap pointer-events-auto">
                  <span className="text-[#1a1a1a] text-xs font-bold" aria-hidden>
                    ▶
                  </span>
                  <span className="hero-pill-badge hero-pill-yellow">
                    {heroContent.roleBadge}
                    <span className="hero-pill-tail-right" aria-hidden />
                  </span>
                </div>
              </div>
              <div className="absolute right-0 sm:right-[2%] md:right-[6%] -translate-y-1/2 hero-float-delay">
                <div className="hero-pill-wrap pointer-events-auto">
                  <span className="hero-pill-badge hero-pill-pink">
                    <span className="hero-pill-tail-left" aria-hidden />
                    {site.locationShort}
                  </span>
                  <span className="text-white text-xs font-bold" aria-hidden>
                    ◆
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile badges */}
          <div className="flex sm:hidden flex-col items-center gap-3 mt-10 z-20 w-full">
            <div className="hero-float">
              <div className="hero-pill-wrap">
                <span className="text-[#1a1a1a] text-xs font-bold">▶</span>
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
              </div>
            </div>
          </div>
        </div>

        {/* Tagline — typography only, no icons */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center text-lg sm:text-xl md:text-2xl font-light tracking-tight text-[#1a1a1a] mt-20 sm:mt-24 md:mt-28 max-w-2xl leading-relaxed px-4"
        >
          {heroContent.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.55 }}
          className="mt-8 md:mt-10"
        >
          <a href="#contact" className="hero-contact-btn">
            <span className="flex items-center justify-center min-w-[44px] px-3 font-mono text-sm font-bold text-white bg-[#00aaff]">
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
