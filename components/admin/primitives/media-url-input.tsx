"use client"

import { useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MediaPreviewCard } from "./media-preview-card"
import { parseInstagramUrl } from "@/lib/media/parse-instagram"
import { parseYouTubeUrl } from "@/lib/media/parse-youtube"

export type MediaFieldValue = {
  mediaType: "none" | "youtube" | "instagram" | "image"
  mediaUrl: string
}

export function MediaUrlInput({
  value,
  onChange,
  allowImageUrl = true,
}: {
  value: MediaFieldValue
  onChange: (v: MediaFieldValue) => void
  allowImageUrl?: boolean
}) {
  const preview = useMemo(() => {
    if (!value.mediaUrl?.trim()) return null
    if (value.mediaType === "youtube") return parseYouTubeUrl(value.mediaUrl)
    if (value.mediaType === "instagram") return parseInstagramUrl(value.mediaUrl)
    return null
  }, [value.mediaType, value.mediaUrl])

  return (
    <div className="space-y-4 rounded-lg border admin-panel border-border bg-secondary/40 p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="admin-label">Media type</Label>
          <Select
            value={value.mediaType}
            onValueChange={(mediaType) =>
              onChange({
                ...value,
                mediaType: mediaType as MediaFieldValue["mediaType"],
              })
            }
          >
            <SelectTrigger className="admin-field border-border bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None / placeholder</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              {allowImageUrl && <SelectItem value="image">Image URL</SelectItem>}
            </SelectContent>
          </Select>
        </div>
        {value.mediaType !== "none" && (
          <div className="space-y-2">
            <Label className="admin-label">URL</Label>
            <Input
              value={value.mediaUrl}
              onChange={(e) => onChange({ ...value, mediaUrl: e.target.value })}
              placeholder={
                value.mediaType === "youtube"
                  ? "https://youtube.com/watch?v=..."
                  : value.mediaType === "instagram"
                    ? "https://instagram.com/reel/..."
                    : "https://..."
              }
              className="admin-field border-border bg-background"
            />
          </div>
        )}
      </div>
      {value.mediaType !== "none" && value.mediaUrl && (
        <MediaPreviewCard mediaType={value.mediaType} url={value.mediaUrl} parsed={preview} />
      )}
    </div>
  )
}
