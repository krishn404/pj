import type { MediaEmbedDTO } from "@/lib/cms/types/media"
import { InstagramEmbed } from "./instagram-embed"
import { YouTubeEmbed } from "./youtube-embed"

type MediaRendererProps = {
  media: MediaEmbedDTO
  title?: string
  className?: string
  imageClassName?: string
  /** Keeps Instagram/iframe embeds inside aspect-ratio frames */
  contained?: boolean
}

export function MediaRenderer({
  media,
  title,
  className,
  imageClassName,
  contained = false,
}: MediaRendererProps) {
  if (media.type === "youtube") {
    return <YouTubeEmbed media={media} title={title} className={className} />
  }

  if (media.type === "instagram") {
    return <InstagramEmbed media={media} className={className} contained={contained} />
  }

  if (media.type === "image") {
    return (
      <div className={className ?? "relative aspect-video w-full overflow-hidden"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.url}
          alt={media.alt ?? title ?? ""}
          loading="lazy"
          className={imageClassName ?? "h-full w-full object-cover"}
        />
      </div>
    )
  }

  return null
}
