"use client"

import { useRef, useState } from "react"
import { Upload } from "lucide-react"
import { uploadPortfolioImage } from "@/lib/cms/admin/actions/upload"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function UploadDropzone({
  onUploaded,
  label = "Upload image",
}: {
  onUploaded: (asset: { id: string; publicUrl: string }) => void
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    const result = await uploadPortfolioImage(fd)
    setUploading(false)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success("Image uploaded")
    onUploaded(result.data!)
  }

  return (
    <div className="space-y-2">
      <Label className="admin-label">{label}</Label>
      <div
        className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-secondary/30 px-6 py-8"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const file = e.dataTransfer.files[0]
          if (file) void handleFile(file)
        }}
      >
        <Upload className="h-8 w-8 text-muted-foreground" />
        <p className="text-center text-xs text-muted-foreground">JPEG, PNG, WebP, GIF — max 5MB</p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Choose file"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void handleFile(file)
          }}
        />
      </div>
    </div>
  )
}
