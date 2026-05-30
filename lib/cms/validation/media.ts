import { z } from "zod"
import { mediaTypeSchema } from "./enums"

export const mediaInputSchema = z.object({
  mediaType: mediaTypeSchema,
  mediaUrl: z.string().url().optional().nullable(),
})

export const youtubeUrlSchema = z
  .string()
  .min(1)
  .refine(
    (url) => {
      try {
        const parsed = new URL(url.trim())
        const host = parsed.hostname.replace(/^www\./, "")
        return (
          host === "youtu.be" ||
          host === "youtube.com" ||
          host === "m.youtube.com" ||
          host === "music.youtube.com"
        )
      } catch {
        return false
      }
    },
    { message: "Invalid YouTube URL" }
  )

export const instagramUrlSchema = z
  .string()
  .min(1)
  .refine(
    (url) => {
      try {
        const parsed = new URL(url.trim())
        const host = parsed.hostname.replace(/^www\./, "")
        return host === "instagram.com" || host === "instagr.am"
      } catch {
        return false
      }
    },
    { message: "Invalid Instagram URL" }
  )
