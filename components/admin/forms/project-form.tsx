"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/cms/admin/actions/content"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PublishFields } from "@/components/admin/primitives/publish-fields"
import { MediaUrlInput } from "@/components/admin/primitives/media-url-input"
import { UploadDropzone } from "@/components/admin/primitives/upload-dropzone"
import { SaveBar } from "@/components/admin/primitives/save-bar"
import { DeleteConfirmationDialog } from "@/components/admin/primitives/delete-dialog"
import { useAdminAction } from "@/components/admin/primitives/use-admin-action"
import { Button } from "@/components/ui/button"
import type { projects } from "@/lib/cms/db/schema"

type Row = typeof projects.$inferSelect

const defaults = {
  title: "",
  category: "",
  year: new Date().getFullYear().toString(),
  description: "",
  accentColor: "#E8B84A",
  hoverBgColor: "rgba(232, 184, 74, 0.14)",
  tagTextColor: "#1a1a1a",
  externalUrl: "",
  coverAssetId: null as string | null,
  isFeatured: false,
  status: "published" as const,
  isVisible: true,
  mediaType: "none" as const,
  mediaUrl: "",
}

export function ProjectForm({ data }: { data?: Row }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const isNew = !data

  const [form, setForm] = useState({
    ...defaults,
    ...(data
      ? {
          title: data.title,
          category: data.category,
          year: data.year,
          description: data.description,
          accentColor: data.accentColor,
          hoverBgColor: data.hoverBgColor,
          tagTextColor: data.tagTextColor,
          externalUrl: data.externalUrl ?? "",
          coverAssetId: data.coverAssetId,
          isFeatured: data.isFeatured,
          status: data.status,
          isVisible: data.isVisible,
          mediaType: data.mediaType,
          mediaUrl: data.mediaUrl ?? "",
        }
      : {}),
  })

  const payload = () => ({
    ...form,
    externalUrl: form.externalUrl || null,
    coverAssetId: form.coverAssetId,
    mediaUrl: form.mediaUrl || null,
  })

  return (
    <div className="space-y-6">
      <PublishFields
        value={{ status: form.status, isVisible: form.isVisible }}
        onChange={(v) => setForm((f) => ({ ...f, ...v }))}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="admin-label">Title</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="admin-label">Category</Label>
          <Input
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="admin-label">Year</Label>
          <Input
            value={form.year}
            onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label className="admin-label">External URL</Label>
          <Input
            value={form.externalUrl}
            onChange={(e) => setForm((f) => ({ ...f, externalUrl: e.target.value }))}
            className="admin-field border-border bg-background"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="admin-label">Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="admin-field border-border bg-background min-h-24"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {(
          [
            ["accentColor", "Accent"],
            ["hoverBgColor", "Hover BG"],
            ["tagTextColor", "Tag text"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className="space-y-2">
            <Label className="admin-label">{label}</Label>
            <Input
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              className="admin-field border-border bg-background font-mono text-xs"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={form.isFeatured}
          onCheckedChange={(isFeatured) => setForm((f) => ({ ...f, isFeatured }))}
        />
        <Label className="text-foreground">Featured</Label>
      </div>
      <UploadDropzone
        label="Thumbnail"
        onUploaded={(a) => setForm((f) => ({ ...f, coverAssetId: a.id }))}
      />
      <MediaUrlInput
        value={{ mediaType: form.mediaType, mediaUrl: form.mediaUrl }}
        onChange={(m) => setForm((f) => ({ ...f, mediaType: m.mediaType, mediaUrl: m.mediaUrl }))}
      />
      <div className="flex items-center justify-between gap-4">
        {!isNew && (
          <DeleteConfirmationDialog
            title="Delete project?"
            description="This cannot be undone."
            onConfirm={async () => {
              const r = await deleteProject(data!.id)
              if (r.success) router.push("/admin/work")
            }}
            trigger={
              <Button type="button" variant="destructive" size="sm">
                Delete
              </Button>
            }
          />
        )}
        <div className="flex-1" />
      </div>
      <SaveBar
        saving={pending}
        onCancel={() => router.push("/admin/work")}
        onSave={async () => {
          const result = await run(
            () => (isNew ? createProject(payload()) : updateProject(data!.id, payload())),
            { successMessage: isNew ? "Project created" : "Project saved" }
          )
          if (result && isNew && "id" in result) {
            router.push(`/admin/work/${result.id}`)
          }
        }}
      />
    </div>
  )
}
