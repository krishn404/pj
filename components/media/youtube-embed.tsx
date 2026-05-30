import type { YouTubeEmbedDTO } from "@/lib/cms/types/media"

type YouTubeEmbedProps = {
  media: YouTubeEmbedDTO
  title?: string
  className?: string
}

export function YouTubeEmbed({ media, title = "YouTube video", className }: YouTubeEmbedProps) {
  return (
    <div className={className ?? "relative aspect-video w-full overflow-hidden bg-black"}>
      <iframe
        src={media.embedUrl}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
