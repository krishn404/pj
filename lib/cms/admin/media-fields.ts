import type { mediaTypeEnum } from "@/lib/cms/db/schema"
import { normalizeMediaForStorage } from "@/lib/cms/mappers/media"
import { parseInstagramUrl } from "@/lib/media/parse-instagram"
import { parseYouTubeUrl } from "@/lib/media/parse-youtube"

type MediaType = (typeof mediaTypeEnum.enumValues)[number]

export function resolveMediaFields(
  mediaType: MediaType,
  mediaUrl: string | null | undefined
): {
  mediaType: MediaType
  mediaUrl: string | null
  mediaEmbedId: string | null
} {
  const url = mediaUrl?.trim() || null

  if (mediaType === "none" || !url) {
    return { mediaType: "none", mediaUrl: null, mediaEmbedId: null }
  }

  if (mediaType === "youtube") {
    const parsed = parseYouTubeUrl(url)
    if (!parsed) throw new Error("Invalid YouTube URL")
    return {
      mediaType: "youtube",
      mediaUrl: url,
      mediaEmbedId: parsed.videoId,
    }
  }

  if (mediaType === "instagram") {
    const parsed = parseInstagramUrl(url)
    if (!parsed) throw new Error("Invalid Instagram URL")
    return {
      mediaType: "instagram",
      mediaUrl: url,
      mediaEmbedId: parsed.embedPath,
    }
  }

  if (mediaType === "image") {
    return { mediaType: "image", mediaUrl: url, mediaEmbedId: null }
  }

  const normalized = normalizeMediaForStorage(mediaType, url)
  return { mediaType, mediaUrl: url, mediaEmbedId: normalized.mediaEmbedId }
}
