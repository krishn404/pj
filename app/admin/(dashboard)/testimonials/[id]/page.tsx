import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { TestimonialForm } from "@/components/admin/forms/collection-forms"
import { fetchTestimonial } from "@/lib/cms/admin/queries"

export default async function AdminTestimonialEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New testimonial" backHref="/admin/testimonials">
        <TestimonialForm isNew />
      </AdminSectionLayout>
    )
  }
  const data = await fetchTestimonial(id)
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit testimonial" backHref="/admin/testimonials">
      <TestimonialForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
