import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SocialForm } from "@/components/admin/forms/collection-forms"
import { fetchSocialLink } from "@/lib/cms/admin/queries"

export default async function AdminSocialEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New link" backHref="/admin/contact">
        <SocialForm isNew />
      </AdminSectionLayout>
    )
  }
  const data = await fetchSocialLink(id)
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit link" backHref="/admin/contact">
      <SocialForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
