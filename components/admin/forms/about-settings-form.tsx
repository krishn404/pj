"use client"

import { useState } from "react"
import { updateAboutSettings } from "@/lib/cms/admin/actions/content"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SaveBar } from "@/components/admin/primitives/save-bar"
import { SectionVisibilityFields } from "@/components/admin/primitives/section-visibility-fields"
import { SectionHiddenBanner } from "@/components/admin/section-hidden-banner"
import { useAdminAction } from "@/components/admin/primitives/use-admin-action"
import type { aboutSettings } from "@/lib/cms/db/schema"

type Row = typeof aboutSettings.$inferSelect

export function AboutSettingsForm({ data }: { data: Row }) {
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    isVisible: data.isVisible ?? true,
    cornerLabel: data.cornerLabel,
    whatsUpLabel: data.whatsUpLabel,
    paragraphs: [...data.paragraphs],
    polaroidLeftCaption: data.polaroidLeftCaption ?? "",
    polaroidRightCaption: data.polaroidRightCaption ?? "",
  })

  return (
    <div className="space-y-4">
      {!form.isVisible && <SectionHiddenBanner />}
      <SectionVisibilityFields
        sectionLabel="About"
        value={form.isVisible}
        onChange={(isVisible) => setForm((f) => ({ ...f, isVisible }))}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="admin-label">Corner label</Label>
          <Input
            value={form.cornerLabel}
            onChange={(e) => setForm((f) => ({ ...f, cornerLabel: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="admin-label">What&apos;s up label</Label>
          <Input
            value={form.whatsUpLabel}
            onChange={(e) => setForm((f) => ({ ...f, whatsUpLabel: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
      </div>
      <div className="space-y-3">
        <Label className="admin-label">Paragraphs</Label>
        {form.paragraphs.map((p, i) => (
          <Textarea
            key={i}
            value={p}
            onChange={(e) => {
              const paragraphs = [...form.paragraphs]
              paragraphs[i] = e.target.value
              setForm((f) => ({ ...f, paragraphs }))
            }}
            className="admin-field border-border bg-background min-h-20"
          />
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setForm((f) => ({ ...f, paragraphs: [...f.paragraphs, ""] }))}
        >
          Add paragraph
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="admin-label">Polaroid left caption</Label>
          <Input
            value={form.polaroidLeftCaption}
            onChange={(e) => setForm((f) => ({ ...f, polaroidLeftCaption: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="admin-label">Polaroid right caption</Label>
          <Input
            value={form.polaroidRightCaption}
            onChange={(e) => setForm((f) => ({ ...f, polaroidRightCaption: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
      </div>
      <SaveBar
        saving={pending}
        onSave={() =>
          run(
            () =>
              updateAboutSettings({
                ...form,
                polaroidLeftCaption: form.polaroidLeftCaption || null,
                polaroidRightCaption: form.polaroidRightCaption || null,
                paragraphs: form.paragraphs.filter((p) => p.trim()),
              }),
            { successMessage: "About saved" }
          )
        }
      />
    </div>
  )
}
