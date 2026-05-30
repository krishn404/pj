import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { ShowreelVideoForm } from "@/components/admin/forms/collection-forms"
import { fetchShowreelVideo } from "@/lib/cms/admin/queries"

export default async function AdminShowreelEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New showreel video" backHref="/admin/showreel">
        <ShowreelVideoForm isNew />
      </AdminSectionLayout>
    )
  }
  const data = await fetchShowreelVideo(id)
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit showreel video" backHref="/admin/showreel">
      <ShowreelVideoForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
