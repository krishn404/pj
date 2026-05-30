"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { unlockAdminSession } from "@/app/actions/admin-auth"

const STEPS = [
  { key: "ArrowUp", color: "blue" as const },
  { key: "ArrowUp", color: "blue" as const },
  { key: "ArrowDown", color: "green" as const },
  { key: "ArrowDown", color: "green" as const },
]

const COLORS = {
  blue: {
    empty: "rgba(0, 170, 255, 0.25)",
    fill: "#00aaff",
    glow: "rgba(0, 170, 255, 0.45)",
  },
  green: {
    empty: "rgba(76, 175, 80, 0.25)",
    fill: "#4caf50",
    glow: "rgba(76, 175, 80, 0.45)",
  },
}

function isArrowKey(e: KeyboardEvent): boolean {
  return (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.code === "ArrowUp" ||
    e.code === "ArrowDown"
  )
}

function keyMatchesStep(e: KeyboardEvent, expected: string): boolean {
  return e.key === expected || e.code === expected
}

function arrowFromKey(e: KeyboardEvent): "ArrowUp" | "ArrowDown" | null {
  if (e.key === "ArrowUp" || e.code === "ArrowUp") return "ArrowUp"
  if (e.key === "ArrowDown" || e.code === "ArrowDown") return "ArrowDown"
  return null
}

export function AdminGate() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [unlocking, setUnlocking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shake, setShake] = useState(false)

  const onUnlock = useCallback(async () => {
    if (unlocking) return
    setUnlocking(true)
    setError(null)
    try {
      await unlockAdminSession()
      router.replace("/admin")
      router.refresh()
    } catch {
      setError("Could not unlock. Check ADMIN_SESSION_SECRET in .env.local.")
      setUnlocking(false)
      setProgress(0)
    }
  }, [router, unlocking])

  const resetWithShake = useCallback(() => {
    setProgress(0)
    setShake(true)
    window.setTimeout(() => setShake(false), 450)
  }, [])

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (unlocking) return
      if (!isArrowKey(e)) return

      e.preventDefault()

      const expected = STEPS[progress].key
      const pressed = arrowFromKey(e)
      if (!pressed) return

      if (keyMatchesStep(e, expected)) {
        const next = progress + 1
        setProgress(next)
        if (next === STEPS.length) {
          setProgress(0)
          void onUnlock()
        }
        return
      }

      if (pressed === STEPS[0].key) {
        setProgress(1)
        return
      }

      resetWithShake()
    }

    window.addEventListener("keydown", onKeyDown, { capture: true })
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true })
  }, [onUnlock, progress, resetWithShake, unlocking])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6 outline-none select-none"
    >
      <p
        className="text-center font-black tracking-tight text-foreground text-pixel"
        style={{ fontSize: "clamp(2.5rem, 12vw, 6rem)" }}
      >
        GO AWAY
      </p>

      <motion.div
        animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-12 flex items-center justify-center gap-4 sm:gap-5"
        aria-label=""
      >
        {STEPS.map((step, index) => {
          const filled = progress > index
          const active = progress === index && !unlocking
          const palette = COLORS[step.color]
          const Icon = step.key === "ArrowUp" ? ChevronUp : ChevronDown

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.08 : filled ? 1 : 1,
                  boxShadow: filled
                    ? `0 0 20px ${palette.glow}`
                    : active
                      ? `0 0 12px ${palette.glow}`
                      : "0 0 0px transparent",
                }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: filled ? palette.fill : palette.empty,
                  backgroundColor: filled ? palette.fill : "transparent",
                }}
              >
                <AnimatePresence mode="wait">
                  {filled ? (
                    <motion.span
                      key="filled"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="text-white"
                    >
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: active ? 0.35 : 0.15 }}
                      className="block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: palette.fill }}
                    />
                  )}
                </AnimatePresence>

                {active && !filled && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: palette.fill }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.35em] text-muted-foreground/60">
        
      </p>

      {unlocking && (
        <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          …
        </p>
      )}
      {error && (
        <p className="mt-4 max-w-sm text-center text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
