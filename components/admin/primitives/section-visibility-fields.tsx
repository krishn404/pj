"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SectionVisibilityFields({
  value,
  onChange,
  sectionLabel,
}: {
  value: boolean
  onChange: (visible: boolean) => void
  sectionLabel: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border admin-panel border-border bg-secondary/50 p-4">
      <div>
        <p className="text-sm font-medium">Show on live site</p>
        <p className="mt-1 text-xs text-muted-foreground max-w-md">
          Turn off to hide the entire <span className="font-medium">{sectionLabel}</span> section
          and remove it from navigation. Other sections are unaffected.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="section-visible"
          checked={value}
          onCheckedChange={onChange}
        />
        <Label htmlFor="section-visible" className="text-foreground">
          {value ? "Visible" : "Hidden"}
        </Label>
      </div>
    </div>
  )
}
