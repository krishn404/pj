import type { MediaEmbedDTO } from "@/lib/cms/types/media"
import { parseInstagramUrl } from "@/lib/media/parse-instagram"
import { parseYouTubeUrl } from "@/lib/media/parse-youtube"
import type { mediaTypeEnum } from "@/lib/cms/db/schema"

type MediaRow = {
  mediaType: (typeof mediaTypeEnum.enumValues)[number]
  mediaUrl: string | null
  mediaEmbedId: string | null
  imageUrl?: string | null
  imageAlt?: string | null
}

export function toMediaEmbedDTO(row: MediaRow): MediaEmbedDTO {
  if (row.mediaType === "youtube" && row.mediaUrl) {
    const parsed = parseYouTubeUrl(row.mediaUrl)
    if (parsed) return parsed
    if (row.mediaEmbedId) {
      return {
        type: "youtube",
        videoId: row.mediaEmbedId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${row.mediaEmbedId}`,
        originalUrl: row.mediaUrl,
      }
    }
  }

  if (row.mediaType === "instagram" && row.mediaUrl) {
    const parsed = parseInstagramUrl(row.mediaUrl)
    if (parsed) return parsed
  }

  if (row.mediaType === "image" && row.imageUrl) {
    return {
      type: "image",
      url: row.imageUrl,
      alt: row.imageAlt ?? null,
    }
  }

  return { type: "none" }
}

export function normalizeMediaForStorage(
  mediaType: MediaRow["mediaType"],
  mediaUrl: string | null
): { mediaEmbedId: string | null } {
  if (!mediaUrl) return { mediaEmbedId: null }
  if (mediaType === "youtube") {
    const parsed = parseYouTubeUrl(mediaUrl)
    return { mediaEmbedId: parsed?.videoId ?? null }
  }
  if (mediaType === "instagram") {
    const parsed = parseInstagramUrl(mediaUrl)
    return { mediaEmbedId: parsed?.embedPath ?? null }
  }
  return { mediaEmbedId: null }
}
