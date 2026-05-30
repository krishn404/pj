"use client"

import { useState } from "react"
import { updateSiteSettings } from "@/lib/cms/admin/actions/content"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SaveBar } from "@/components/admin/primitives/save-bar"
import { useAdminAction } from "@/components/admin/primitives/use-admin-action"
import type { siteSettings } from "@/lib/cms/db/schema"

type Row = typeof siteSettings.$inferSelect

export function SiteSettingsForm({ data }: { data: Row }) {
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    name: data.name,
    title: data.title,
    tagline: data.tagline,
    location: data.location,
    locationShort: data.locationShort,
    availability: data.availability,
    email: data.email,
    phone: data.phone,
    phoneDisplay: data.phoneDisplay,
    instagramHandle: data.instagramHandle,
    instagramUrl: data.instagramUrl,
    navLogoText: data.navLogoText,
    seoTitle: data.seoTitle ?? "",
    seoDescription: data.seoDescription ?? "",
    seoKeywords: (data.seoKeywords ?? []).join(", "),
    ogDescription: data.ogDescription ?? "",
  })

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["name", "Name"],
            ["title", "Title"],
            ["tagline", "Tagline"],
            ["location", "Location"],
            ["locationShort", "Location short"],
            ["availability", "Availability"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["phoneDisplay", "Phone display"],
            ["instagramHandle", "Instagram handle"],
            ["instagramUrl", "Instagram URL"],
            ["navLogoText", "Nav logo text"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="space-y-2">
            <Label className="admin-label">{label}</Label>
            <Input
              value={form[key]}
              onChange={(e) => set(key, e.target.value)}
              className="admin-field border-border bg-background"
            />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label className="admin-label">SEO keywords (comma-separated)</Label>
        <Input
          value={form.seoKeywords}
          onChange={(e) => set("seoKeywords", e.target.value)}
          className="admin-field border-border bg-background"
        />
      </div>
      <div className="space-y-2">
        <Label className="admin-label">SEO description</Label>
        <Textarea
          value={form.seoDescription}
          onChange={(e) => set("seoDescription", e.target.value)}
          className="admin-field border-border bg-background min-h-24"
        />
      </div>
      <div className="space-y-2">
        <Label className="admin-label">Open Graph description</Label>
        <Textarea
          value={form.ogDescription}
          onChange={(e) => set("ogDescription", e.target.value)}
          className="admin-field border-border bg-background min-h-20"
        />
      </div>
      <SaveBar
        saving={pending}
        onSave={() =>
          run(
            () =>
              updateSiteSettings({
                ...form,
                seoTitle: form.seoTitle || null,
                seoDescription: form.seoDescription || null,
                ogDescription: form.ogDescription || null,
                seoKeywords: form.seoKeywords
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }),
            { successMessage: "Site settings saved" }
          )
        }
      />
    </div>
  )
}
