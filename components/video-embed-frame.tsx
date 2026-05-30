"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import type { MediaEmbedDTO } from "@/lib/cms/types/media"
import { MediaRenderer } from "@/components/media/media-renderer"
import { cn } from "@/lib/utils"

function hasPlayableEmbed(media: MediaEmbedDTO) {
  return media.type === "youtube" || media.type === "instagram" || media.type === "image"
}

type VideoEmbedFrameProps = {
  media: MediaEmbedDTO
  title?: string
  placeholderLabel?: string
  placeholderCta?: string
  aspect?: "video" | "4/3"
  variant?: "light" | "dark"
  isHovered?: boolean
  onHoverChange?: (hovered: boolean) => void
  className?: string
}

export function VideoEmbedFrame({
  media,
  title = "Video",
  placeholderLabel,
  placeholderCta = "Add embed URL",
  aspect = "video",
  variant = "light",
  isHovered = false,
  onHoverChange,
  className,
}: VideoEmbedFrameProps) {
  const embed = hasPlayableEmbed(media)
  const isDark = variant === "dark"

  return (
    <div
      className={cn("relative isolate w-full max-w-full", className)}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div
        className={cn(
          "relative overflow-hidden border-2 border-[var(--cyan)]",
          aspect === "video" ? "aspect-video" : "aspect-[4/3]",
          isDark ? "bg-primary-foreground/5" : "bg-primary"
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="selection-handle absolute top-0 left-0" />
          <div className="selection-handle absolute top-0 right-0" />
          <div className="selection-handle absolute bottom-0 left-0" />
          <div className="selection-handle absolute bottom-0 right-0" />
          <div className="selection-handle absolute top-1/2 left-0 -translate-y-1/2" />
          <div className="selection-handle absolute top-1/2 right-0 -translate-y-1/2" />
        </div>

        {embed ? (
          <MediaRenderer
            media={media}
            title={title}
            contained
            className="absolute inset-0 h-full w-full"
            imageClassName="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {!isDark && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.3) 100%)",
                }}
              />
            )}
            <div className="text-center z-10 px-4">
              <motion.div
                animate={isHovered ? { scale: 1.15, rotate: isDark ? 5 : 90 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex items-center justify-center mx-auto mb-4 transition-colors duration-500",
                  isDark
                    ? "w-16 h-16 border border-primary-foreground/20"
                    : "w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-primary-foreground/30 group-hover:border-primary-foreground/60 bg-primary-foreground/5"
                )}
              >
                {isDark ? (
                  <span className="text-2xl font-black text-pixel text-primary-foreground">
                    {placeholderLabel}
                  </span>
                ) : (
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-primary-foreground stroke-none ml-1" />
                )}
              </motion.div>
              <p
                className={cn(
                  "text-sm font-mono uppercase tracking-wider break-words",
                  isDark ? "text-primary-foreground/50" : "text-primary-foreground/70"
                )}
              >
                {placeholderCta}
              </p>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !embed ? 0.1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: isDark
              ? "linear-gradient(135deg, var(--mint) 0%, var(--cyan) 100%)"
              : "var(--cyan)",
          }}
        />
      </div>
    </div>
  )
}
