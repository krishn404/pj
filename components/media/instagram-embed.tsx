"use client"

import { useEffect } from "react"
import type { InstagramEmbedDTO } from "@/lib/cms/types/media"
import { cn } from "@/lib/utils"

type InstagramEmbedProps = {
  media: InstagramEmbedDTO
  className?: string
  /** Fit inside aspect-ratio frames without breaking layout */
  contained?: boolean
}

export function InstagramEmbed({ media, className, contained = false }: InstagramEmbedProps) {
  useEffect(() => {
    const scriptId = "instagram-embed-script"
    if (document.getElementById(scriptId)) {
      // @ts-expect-error — Instagram embed.js global
      window.instgrm?.Embeds?.process()
      return
    }
    const script = document.createElement("script")
    script.id = scriptId
    script.src = "https://www.instagram.com/embed.js"
    script.async = true
    document.body.appendChild(script)
  }, [media.permalink])

  if (contained) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
        <div className="h-full w-full overflow-y-auto overscroll-contain">
          <blockquote
            className="instagram-media !m-0 !max-w-none"
            data-instgrm-permalink={media.permalink}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: 0,
              margin: 0,
              maxWidth: "100%",
              minWidth: 0,
              width: "100%",
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={className ?? "flex min-h-[320px] w-full max-w-full items-center justify-center overflow-hidden bg-background"}
    >
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={media.permalink}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: 3,
          margin: 1,
          maxWidth: "min(540px, 100%)",
          minWidth: 0,
          padding: 0,
          width: "100%",
        }}
      />
    </div>
  )
}
