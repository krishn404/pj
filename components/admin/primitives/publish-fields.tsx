"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export type PublishFieldValues = {
  status: "draft" | "published"
  isVisible: boolean
}

export function PublishFields({
  value,
  onChange,
}: {
  value: PublishFieldValues
  onChange: (v: PublishFieldValues) => void
}) {
  return (
    <div className="flex flex-wrap items-end gap-6 rounded-lg border admin-panel border-border bg-secondary/50 p-4">
      <div className="space-y-2">
        <Label className="admin-label">Status</Label>
        <Select
          value={value.status}
          onValueChange={(status) =>
            onChange({ ...value, status: status as PublishFieldValues["status"] })
          }
        >
          <SelectTrigger className="w-36 admin-field border-border bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 pb-1">
        <Switch
          id="visible"
          checked={value.isVisible}
          onCheckedChange={(isVisible) => onChange({ ...value, isVisible })}
        />
        <Label htmlFor="visible" className="text-foreground">
          Visible on site
        </Label>
      </div>
    </div>
  )
}
