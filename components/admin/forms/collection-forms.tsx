"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  createService,
  updateService,
  deleteService,
  createExperience,
  updateExperience,
  deleteExperience,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  createExperimentalItem,
  updateExperimentalItem,
  deleteExperimentalItem,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createShowreelVideo,
  updateShowreelVideo,
  deleteShowreelVideo,
  createCompanyLogo,
  updateCompanyLogo,
  deleteCompanyLogo,
} from "@/lib/cms/admin/actions/content"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PublishFields } from "@/components/admin/primitives/publish-fields"
import { MediaUrlInput } from "@/components/admin/primitives/media-url-input"
import { SaveBar } from "@/components/admin/primitives/save-bar"
import { DeleteConfirmationDialog } from "@/components/admin/primitives/delete-dialog"
import { useAdminAction } from "@/components/admin/primitives/use-admin-action"
import { Button } from "@/components/ui/button"

function DeleteBtn({
  onDelete,
  redirect,
}: {
  onDelete: () => Promise<{ success: boolean }>
  redirect: string
}) {
  const router = useRouter()
  return (
    <DeleteConfirmationDialog
      title="Delete?"
      description="This cannot be undone."
      onConfirm={async () => {
        const r = await onDelete()
        if (r.success) router.push(redirect)
      }}
      trigger={
        <Button type="button" variant="destructive" size="sm">
          Delete
        </Button>
      }
    />
  )
}

// ——— Service ———
export function ServiceForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    number: String(data?.number ?? "01"),
    title: String(data?.title ?? ""),
    description: String(data?.description ?? ""),
    tags: ((data?.tags as string[]) ?? []).join(", "),
    accentColor: String(data?.accentColor ?? "var(--gold)"),
    isFeatured: Boolean(data?.isFeatured),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  const payload = () => ({
    ...form,
    tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
  })
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Field label="Number" value={form.number} onChange={(v) => setForm((f) => ({ ...f, number: v }))} />
      <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
      <Text label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
      <Field label="Tags (comma-separated)" value={form.tags} onChange={(v) => setForm((f) => ({ ...f, tags: v }))} />
      <Field label="Accent color" value={form.accentColor} onChange={(v) => setForm((f) => ({ ...f, accentColor: v }))} mono />
      {!isNew && <DeleteBtn onDelete={() => deleteService(id)} redirect="/admin/services" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/services")} onSave={() => run(() => isNew ? createService(payload()) : updateService(id, payload()), { successMessage: "Saved", redirect: isNew ? undefined : undefined })} />
    </FormShell>
  )
}

// ——— Experience ———
export function ExperienceForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    period: String(data?.period ?? ""),
    role: String(data?.role ?? ""),
    company: String(data?.company ?? ""),
    description: String(data?.description ?? ""),
    accentColor: String(data?.accentColor ?? "var(--gold)"),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Field label="Period" value={form.period} onChange={(v) => setForm((f) => ({ ...f, period: v }))} />
      <Field label="Role" value={form.role} onChange={(v) => setForm((f) => ({ ...f, role: v }))} />
      <Field label="Company" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} />
      <Text label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
      <Field label="Accent" value={form.accentColor} onChange={(v) => setForm((f) => ({ ...f, accentColor: v }))} mono />
      {!isNew && <DeleteBtn onDelete={() => deleteExperience(id)} redirect="/admin/experience" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/experience")} onSave={() => run(() => isNew ? createExperience(form) : updateExperience(id, form))} />
    </FormShell>
  )
}

// ——— Skill ———
export function SkillForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    title: String(data?.title ?? ""),
    skills: ((data?.skills as string[]) ?? []).join(", "),
    accentColor: String(data?.accentColor ?? "var(--gold)"),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  const payload = () => ({ ...form, skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean) })
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Field label="Category title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
      <Field label="Skills (comma-separated)" value={form.skills} onChange={(v) => setForm((f) => ({ ...f, skills: v }))} />
      <Field label="Accent" value={form.accentColor} onChange={(v) => setForm((f) => ({ ...f, accentColor: v }))} mono />
      {!isNew && <DeleteBtn onDelete={() => deleteSkillCategory(id)} redirect="/admin/skills" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/skills")} onSave={() => run(() => isNew ? createSkillCategory(payload()) : updateSkillCategory(id, payload()))} />
    </FormShell>
  )
}

// ——— Experimental ———
export function ExperimentalForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    label: String(data?.label ?? ""),
    mediaType: (data?.mediaType as "none" | "youtube" | "instagram" | "image") ?? "none",
    mediaUrl: String(data?.mediaUrl ?? ""),
    isFeatured: Boolean(data?.isFeatured),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Field label="Label" value={form.label} onChange={(v) => setForm((f) => ({ ...f, label: v }))} />
      <MediaUrlInput value={{ mediaType: form.mediaType, mediaUrl: form.mediaUrl }} onChange={(m) => setForm((f) => ({ ...f, ...m }))} />
      <p className="text-xs text-muted-foreground -mt-2">
        YouTube watch/shorts links or Instagram post/reel permalinks.
      </p>
      <FeaturedSwitch value={form.isFeatured} onChange={(isFeatured) => setForm((f) => ({ ...f, isFeatured }))} />
      {!isNew && <DeleteBtn onDelete={() => deleteExperimentalItem(id)} redirect="/admin/experimental" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/experimental")} onSave={() => run(() => isNew ? createExperimentalItem({ ...form, mediaUrl: form.mediaUrl || null }) : updateExperimentalItem(id, { ...form, mediaUrl: form.mediaUrl || null }))} />
    </FormShell>
  )
}

// ——— Social ———
export function SocialForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    label: String(data?.label ?? ""),
    value: String(data?.value ?? ""),
    href: String(data?.href ?? ""),
    iconKey: String(data?.iconKey ?? "other"),
    openInNewTab: Boolean(data?.openInNewTab),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Field label="Label" value={form.label} onChange={(v) => setForm((f) => ({ ...f, label: v }))} />
      <Field label="Display value" value={form.value} onChange={(v) => setForm((f) => ({ ...f, value: v }))} />
      <Field label="Href" value={form.href} onChange={(v) => setForm((f) => ({ ...f, href: v }))} />
      <div className="space-y-2">
        <Label className="admin-label">Icon</Label>
        <Select value={form.iconKey} onValueChange={(iconKey) => setForm((f) => ({ ...f, iconKey }))}>
          <SelectTrigger className="admin-field border-border bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["email", "phone", "instagram", "linkedin", "twitter", "youtube", "website", "other"].map((k) => (
              <SelectItem key={k} value={k}>{k}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FeaturedSwitch label="Open in new tab" value={form.openInNewTab} onChange={(openInNewTab) => setForm((f) => ({ ...f, openInNewTab }))} />
      {!isNew && <DeleteBtn onDelete={() => deleteSocialLink(id)} redirect="/admin/contact" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/contact")} onSave={() => run(() => isNew ? createSocialLink({ ...form, iconKey: form.iconKey as never }) : updateSocialLink(id, { ...form, iconKey: form.iconKey as never }))} />
    </FormShell>
  )
}

// ——— Testimonial ———
export function TestimonialForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    quote: String(data?.quote ?? ""),
    authorName: String(data?.authorName ?? ""),
    authorRole: String(data?.authorRole ?? ""),
    company: String(data?.company ?? ""),
    isFeatured: Boolean(data?.isFeatured),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  const payload = () => ({
    ...form,
    authorRole: form.authorRole || null,
    company: form.company || null,
  })
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Text label="Quote" value={form.quote} onChange={(v) => setForm((f) => ({ ...f, quote: v }))} />
      <Field label="Author" value={form.authorName} onChange={(v) => setForm((f) => ({ ...f, authorName: v }))} />
      <Field label="Role" value={form.authorRole} onChange={(v) => setForm((f) => ({ ...f, authorRole: v }))} />
      <Field label="Company" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} />
      <FeaturedSwitch value={form.isFeatured} onChange={(isFeatured) => setForm((f) => ({ ...f, isFeatured }))} />
      {!isNew && <DeleteBtn onDelete={() => deleteTestimonial(id)} redirect="/admin/testimonials" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/testimonials")} onSave={() => run(() => isNew ? createTestimonial(payload()) : updateTestimonial(id, payload()))} />
    </FormShell>
  )
}

// ——— Showreel video ———
export function ShowreelVideoForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    title: String(data?.title ?? ""),
    caption: String(data?.caption ?? ""),
    mediaType: (data?.mediaType as "none" | "youtube" | "instagram" | "image") ?? "none",
    mediaUrl: String(data?.mediaUrl ?? ""),
    isFeatured: Boolean(data?.isFeatured),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  const payload = () => ({ ...form, title: form.title || null, caption: form.caption || null, mediaUrl: form.mediaUrl || null })
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
      <Text label="Caption" value={form.caption} onChange={(v) => setForm((f) => ({ ...f, caption: v }))} />
      <MediaUrlInput
        value={{ mediaType: form.mediaType, mediaUrl: form.mediaUrl }}
        onChange={(m) => setForm((f) => ({ ...f, ...m }))}
        allowImageUrl={false}
      />
      <p className="text-xs text-muted-foreground -mt-2">
        YouTube or Instagram only — each published item appears in the video gallery grid.
      </p>
      <FeaturedSwitch
        label="Pin first in gallery"
        value={form.isFeatured}
        onChange={(isFeatured) => setForm((f) => ({ ...f, isFeatured }))}
      />
      {!isNew && <DeleteBtn onDelete={() => deleteShowreelVideo(id)} redirect="/admin/showreel" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/showreel")} onSave={() => run(() => isNew ? createShowreelVideo(payload()) : updateShowreelVideo(id, payload()))} />
    </FormShell>
  )
}

// ——— Company logo ———
export function CompanyLogoForm({ data, isNew }: { data?: Record<string, unknown>; isNew: boolean }) {
  const router = useRouter()
  const { pending, run } = useAdminAction()
  const [form, setForm] = useState({
    name: String(data?.name ?? ""),
    accentColor: String(data?.accentColor ?? "var(--cyan)"),
    url: String(data?.url ?? ""),
    status: (data?.status as "draft" | "published") ?? "published",
    isVisible: data?.isVisible !== false,
  })
  const id = String(data?.id ?? "")
  return (
    <FormShell>
      <PublishFields value={{ status: form.status, isVisible: form.isVisible }} onChange={(v) => setForm((f) => ({ ...f, ...v }))} />
      <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
      <Field label="Accent" value={form.accentColor} onChange={(v) => setForm((f) => ({ ...f, accentColor: v }))} mono />
      <Field label="URL (optional)" value={form.url} onChange={(v) => setForm((f) => ({ ...f, url: v }))} />
      {!isNew && <DeleteBtn onDelete={() => deleteCompanyLogo(id)} redirect="/admin/experience" />}
      <SaveBar saving={pending} onCancel={() => router.push("/admin/experience")} onSave={() => run(() => isNew ? createCompanyLogo({ ...form, url: form.url || null }) : updateCompanyLogo(id, { ...form, url: form.url || null }))} />
    </FormShell>
  )
}

function FormShell({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>
}

function Field({ label, value, onChange, mono }: { label: string; value: string; onChange: (v: string) => void; mono?: boolean }) {
  return (
    <div className="space-y-2">
      <Label className="admin-label">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className={`admin-field border-border bg-background ${mono ? "font-mono text-xs" : ""}`} />
    </div>
  )
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="admin-label">{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} className="admin-field border-border bg-background min-h-24" />
    </div>
  )
}

function FeaturedSwitch({ label = "Featured", value, onChange }: { label?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={value} onCheckedChange={onChange} />
      <Label className="text-foreground">{label}</Label>
    </div>
  )
}
