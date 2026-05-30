import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { ServiceForm } from "@/components/admin/forms/collection-forms"
import { fetchService } from "@/lib/cms/admin/queries"

export default async function AdminServiceEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New service" backHref="/admin/services">
        <ServiceForm isNew />
      </AdminSectionLayout>
    )
  }
  const data = await fetchService(id)
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit service" backHref="/admin/services">
      <ServiceForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
