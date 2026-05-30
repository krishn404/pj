import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { ExperimentalForm } from "@/components/admin/forms/collection-forms"
import { fetchExperimentalItem } from "@/lib/cms/admin/queries"

export default async function AdminExperimentalEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New item" backHref="/admin/experimental">
        <ExperimentalForm isNew />
      </AdminSectionLayout>
    )
  }
  const data = await fetchExperimentalItem(id)
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit item" backHref="/admin/experimental">
      <ExperimentalForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
