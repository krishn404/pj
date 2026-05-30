import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import { deleteSocialLink } from "@/lib/cms/admin/actions/content"
import { fetchSectionByKey, fetchSocialLinks } from "@/lib/cms/admin/queries"

export default async function AdminContactPage() {
  const [section, links] = await Promise.all([
    fetchSectionByKey("contact"),
    fetchSocialLinks(),
  ])

  return (
    <AdminSectionLayout title="Contact" description="Contact heading and social link cards.">
      <SectionHeaderForm
        sectionKey="contact"
        sectionLabel="Contact"
        fields={[
          { key: "connectLabel", label: "Connect label" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "availabilityNote", label: "Availability note" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Social links"
        newHref="/admin/contact/new"
        table="social_links"
        items={links.map((l) => ({
          id: l.id,
          title: l.label,
          status: l.status,
          isVisible: l.isVisible,
        }))}
        onDelete={deleteSocialLink}
        editBasePath="/admin/contact/"
      />
    </AdminSectionLayout>
  )
}
