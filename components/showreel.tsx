"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import type { ShowreelSectionDTO } from "@/lib/cms/types/portfolio"
import { VideoEmbedFrame } from "@/components/video-embed-frame"
import { cn } from "@/lib/utils"

type ShowreelProps = {
  showreel: ShowreelSectionDTO
}

export function Showreel({ showreel: showreelContent }: ShowreelProps) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const videos = showreelContent.videos
  const hasVideos = videos.length > 0
  const multi = videos.length > 1

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2])

  return (
    <section
      ref={containerRef}
      id="showreel"
      className="overflow-x-clip py-24 md:py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="tag-gold px-3 py-1.5 text-xs font-mono uppercase tracking-wider sticky-note inline-block"
            >
              {showreelContent.label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-4xl md:text-5xl font-black tracking-tight text-pixel break-words"
            >
              {showreelContent.title}
            </motion.h2>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:block text-xs tracking-[0.2em] text-muted-foreground font-mono"
          >
            {showreelContent.period}
          </motion.span>
        </motion.div>

        {hasVideos ? (
          <div
            className={cn(
              multi &&
                "flex max-w-full gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:snap-none"
            )}
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                style={multi ? undefined : { scale, rotate }}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * index }}
                className={cn(
                  "relative shrink-0",
                  multi ? "w-[min(100%,42rem)] snap-center md:w-auto" : "w-full"
                )}
              >
                <VideoEmbedFrame
                  media={video.media}
                  title={video.title ?? "Video"}
                  placeholderCta={showreelContent.placeholderCta}
                  variant="light"
                  aspect="video"
                  isHovered={hoveredId === video.id}
                  onHoverChange={(hovered) => setHoveredId(hovered ? video.id : null)}
                />
                {(video.title || video.caption) && (
                  <p className="mt-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {video.title ?? video.caption}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            style={{ scale, rotate }}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VideoEmbedFrame
              media={{ type: "none" }}
              placeholderCta={showreelContent.placeholderCta}
              variant="light"
              isHovered={hoveredId === "empty"}
              onHoverChange={(hovered) => setHoveredId(hovered ? "empty" : null)}
            />
          </motion.div>
        )}

        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-start justify-between"
        >
          <p className="text-sm text-muted-foreground max-w-md text-handwritten break-words">
            {showreelContent.caption}
          </p>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="hidden md:block tag-mint px-3 py-1.5 text-xs font-mono uppercase sticky-note"
          >
            {showreelContent.reelTag}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
