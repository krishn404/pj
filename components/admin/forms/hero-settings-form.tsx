"use client"

import { useState } from "react"
import { updateHeroSettings } from "@/lib/cms/admin/actions/content"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SaveBar } from "@/components/admin/primitives/save-bar"
import { SectionVisibilityFields } from "@/components/admin/primitives/section-visibility-fields"
import { SectionHiddenBanner } from "@/components/admin/section-hidden-banner"
import { useAdminAction } from "@/components/admin/primitives/use-admin-action"
import type { heroSettings } from "@/lib/cms/db/schema"

type Row = typeof heroSettings.$inferSelect

const fields: { key: keyof Row; label: string; multiline?: boolean }[] = [
  { key: "introLabel", label: "Intro label" },
  { key: "nameLine1", label: "Name line 1" },
  { key: "nameLine2", label: "Name line 2" },
  { key: "currentRole", label: "Current role (sticky)" },
  { key: "previousRole", label: "Previous role (sticky)" },
  { key: "roleBadge", label: "Role badge" },
  { key: "availabilityLine", label: "Availability line" },
  { key: "tagline", label: "Tagline", multiline: true },
  { key: "contactCta", label: "Contact CTA" },
]

export function HeroSettingsForm({ data }: { data: Row }) {
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    ...data,
    isVisible: data.isVisible ?? true,
  })

  return (
    <div className="space-y-4">
      {!form.isVisible && <SectionHiddenBanner />}
      <SectionVisibilityFields
        sectionLabel="Hero"
        value={form.isVisible}
        onChange={(isVisible) => setForm((f) => ({ ...f, isVisible }))}
      />
      {fields.map(({ key, label, multiline }) => (
        <div key={key} className="space-y-2">
          <Label className="admin-label">{label}</Label>
          {multiline ? (
            <Textarea
              value={String(form[key] ?? "")}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="admin-field border-border bg-background min-h-20"
            />
          ) : (
            <Input
              value={String(form[key] ?? "")}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="admin-field border-border bg-background"
            />
          )}
        </div>
      ))}
      <SaveBar
        saving={pending}
        onSave={() =>
          run(() => updateHeroSettings(form), { successMessage: "Hero saved" })
        }
      />
    </div>
  )
}
