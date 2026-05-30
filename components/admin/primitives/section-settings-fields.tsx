"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export type SectionFieldDef = {
  key: string
  label: string
  type?: "input" | "textarea"
}

export function SectionSettingsFields({
  fields,
  values,
  onChange,
}: {
  fields: SectionFieldDef[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map(({ key, label, type }) => (
        <div key={key} className={type === "textarea" ? "sm:col-span-2 space-y-2" : "space-y-2"}>
          <Label className="admin-label">{label}</Label>
          {type === "textarea" ? (
            <Textarea
              value={values[key] ?? ""}
              onChange={(e) => onChange(key, e.target.value)}
              className="admin-field border-border bg-background min-h-20"
            />
          ) : (
            <Input
              value={values[key] ?? ""}
              onChange={(e) => onChange(key, e.target.value)}
              className="admin-field border-border bg-background"
            />
          )}
        </div>
      ))}
    </div>
  )
}
