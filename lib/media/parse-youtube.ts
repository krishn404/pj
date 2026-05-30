import { youtubeUrlSchema } from "@/lib/cms/validation/media"
import type { YouTubeEmbedDTO } from "@/lib/cms/types/media"

export function extractYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim()
  try {
    const parsed = new URL(trimmed)
    const host = parsed.hostname.replace(/^www\./, "")

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0]
      return id || null
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] ?? null
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] ?? null
      }
      const v = parsed.searchParams.get("v")
      if (v) return v
    }
  } catch {
    return null
  }
  return null
}

export function parseYouTubeUrl(url: string): YouTubeEmbedDTO | null {
  const result = youtubeUrlSchema.safeParse(url)
  if (!result.success) return null

  const videoId = extractYouTubeVideoId(url)
  if (!videoId) return null

  return {
    type: "youtube",
    videoId,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
    originalUrl: url.trim(),
  }
}
