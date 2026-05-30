import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SkillForm } from "@/components/admin/forms/collection-forms"
import { fetchSkillCategory } from "@/lib/cms/admin/queries"

export default async function AdminSkillEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New category" backHref="/admin/skills">
        <SkillForm isNew />
      </AdminSectionLayout>
    )
  }
  const data = await fetchSkillCategory(id)
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit category" backHref="/admin/skills">
      <SkillForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
