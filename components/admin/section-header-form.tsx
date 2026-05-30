"use client"

import { useState } from "react"
import { updateSectionSettings } from "@/lib/cms/admin/actions/content"
import { SectionSettingsFields, type SectionFieldDef } from "@/components/admin/primitives/section-settings-fields"
import { SectionVisibilityFields } from "@/components/admin/primitives/section-visibility-fields"
import { SectionHiddenBanner } from "@/components/admin/section-hidden-banner"
import { SaveBar } from "@/components/admin/primitives/save-bar"
import { useAdminAction } from "@/components/admin/primitives/use-admin-action"

export function SectionHeaderForm({
  sectionKey,
  sectionLabel,
  fields,
  initial,
}: {
  sectionKey: string
  sectionLabel: string
  fields: SectionFieldDef[]
  initial: Record<string, string | null | undefined | boolean>
}) {
  const { pending, run } = useAdminAction()
  const [isVisible, setIsVisible] = useState(initial.isVisible !== false)
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {}
    for (const f of fields) {
      v[f.key] = String(initial[f.key] ?? "")
    }
    return v
  })

  return (
    <div className="space-y-4">
      {!isVisible && <SectionHiddenBanner />}
      <SectionVisibilityFields
        sectionLabel={sectionLabel}
        value={isVisible}
        onChange={setIsVisible}
      />
      <div className="space-y-4 rounded-lg border admin-panel border-border bg-secondary/30 p-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Section header
        </h2>
        <SectionSettingsFields
          fields={fields}
          values={values}
          onChange={(key, value) => setValues((v) => ({ ...v, [key]: value }))}
        />
        <SaveBar
          saving={pending}
          label="Save section"
          onSave={() =>
            run(
              () =>
                updateSectionSettings(sectionKey, {
                  isVisible,
                  ...values,
                  label: values.label || null,
                  title: values.title || null,
                  intro: values.intro || null,
                  description: values.description || null,
                  footerNote: values.footerNote || null,
                  period: values.period || null,
                  placeholderCta: values.placeholderCta || null,
                  caption: values.caption || null,
                  reelTag: values.reelTag || null,
                  companiesTitle: values.companiesTitle || null,
                  connectLabel: values.connectLabel || null,
                  heading: values.heading || null,
                  availabilityNote: values.availabilityNote || null,
                }),
              { successMessage: "Section saved" }
            )
          }
        />
      </div>
    </div>
  )
}
