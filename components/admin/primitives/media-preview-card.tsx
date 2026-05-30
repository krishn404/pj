"use client"

import { MediaRenderer } from "@/components/media/media-renderer"
import type { MediaEmbedDTO } from "@/lib/cms/types/media"
import { parseInstagramUrl } from "@/lib/media/parse-instagram"
import { parseYouTubeUrl } from "@/lib/media/parse-youtube"

export function MediaPreviewCard({
  mediaType,
  url,
  parsed,
}: {
  mediaType: "youtube" | "instagram" | "image"
  url: string
  parsed: ReturnType<typeof parseYouTubeUrl> | ReturnType<typeof parseInstagramUrl> | null
}) {
  let media: MediaEmbedDTO | null = null

  if (mediaType === "youtube" && parsed && "videoId" in parsed) {
    media = parsed
  } else if (mediaType === "instagram" && parsed && "permalink" in parsed) {
    media = parsed
  } else if (mediaType === "image" && url) {
    media = { type: "image", url, alt: null }
  }

  if (!media) {
    return (
      <p className="text-xs text-amber-500">
        URL could not be parsed — check format and try again.
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <MediaRenderer media={media} className="max-h-64 w-full" />
    </div>
  )
}
