"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SaveBar({
  saving,
  onSave,
  onCancel,
  label = "Save changes",
}: {
  saving?: boolean
  onSave: () => void
  onCancel?: () => void
  label?: string
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-6 mt-8 flex items-center justify-end gap-3 border-t admin-panel border-border bg-background/95 px-6 py-4 backdrop-blur">
      {onCancel && (
        <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      )}
      <Button type="button" onClick={onSave} disabled={saving}>
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {label}
      </Button>
    </div>
  )
}
