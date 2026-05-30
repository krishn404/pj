import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { ExperienceForm } from "@/components/admin/forms/collection-forms"
import { fetchExperienceEntry } from "@/lib/cms/admin/queries"

export default async function AdminExperienceEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New experience" backHref="/admin/experience">
        <ExperienceForm isNew />
      </AdminSectionLayout>
    )
  }
  const data = await fetchExperienceEntry(id)
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit experience" backHref="/admin/experience">
      <ExperienceForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
