import { instagramUrlSchema } from "@/lib/cms/validation/media"
import type { InstagramEmbedDTO } from "@/lib/cms/types/media"

export function extractInstagramPath(url: string): string | null {
  const trimmed = url.trim()
  try {
    const parsed = new URL(trimmed)
    const host = parsed.hostname.replace(/^www\./, "")
    if (host !== "instagram.com" && host !== "instagr.am") return null

    const parts = parsed.pathname.split("/").filter(Boolean)
    if (parts.length < 2) return null

    const type = parts[0]
    if (type === "p" || type === "reel" || type === "reels" || type === "tv") {
      const slug = parts[1]
      const normalizedType = type === "reels" ? "reel" : type
      return `${normalizedType}/${slug}/`
    }
  } catch {
    return null
  }
  return null
}

export function parseInstagramUrl(url: string): InstagramEmbedDTO | null {
  const result = instagramUrlSchema.safeParse(url)
  if (!result.success) return null

  const embedPath = extractInstagramPath(url)
  if (!embedPath) return null

  const permalink = url.trim().split("?")[0].replace(/\/$/, "") + "/"

  return {
    type: "instagram",
    permalink,
    embedPath,
    originalUrl: url.trim(),
  }
}
