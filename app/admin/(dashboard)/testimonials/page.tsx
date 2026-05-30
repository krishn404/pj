import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import { deleteTestimonial } from "@/lib/cms/admin/actions/content"
import { fetchSectionByKey, fetchTestimonials } from "@/lib/cms/admin/queries"

export default async function AdminTestimonialsPage() {
  const [section, items] = await Promise.all([
    fetchSectionByKey("testimonials"),
    fetchTestimonials(),
  ])

  return (
    <AdminSectionLayout title="Testimonials" description="Client quotes on the public site.">
      <SectionHeaderForm
        sectionKey="testimonials"
        sectionLabel="Testimonials"
        fields={[
          { key: "label", label: "Tag" },
          { key: "title", label: "Title" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Testimonials"
        newHref="/admin/testimonials/new"
        table="testimonials"
        items={items.map((t) => ({
          id: t.id,
          title: t.authorName,
          status: t.status,
          isVisible: t.isVisible,
        }))}
        onDelete={deleteTestimonial}
        editBasePath="/admin/testimonials/"
      />
    </AdminSectionLayout>
  )
}
