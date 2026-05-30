export type MediaType = "none" | "youtube" | "instagram" | "image"

export type YouTubeEmbedDTO = {
  type: "youtube"
  videoId: string
  embedUrl: string
  originalUrl: string
}

export type InstagramEmbedDTO = {
  type: "instagram"
  permalink: string
  embedPath: string
  originalUrl: string
}

export type ImageMediaDTO = {
  type: "image"
  url: string
  alt: string | null
}

export type NoneMediaDTO = {
  type: "none"
}

export type MediaEmbedDTO = YouTubeEmbedDTO | InstagramEmbedDTO | ImageMediaDTO | NoneMediaDTO
