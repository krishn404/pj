import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import { deleteService } from "@/lib/cms/admin/actions/content"
import { fetchSectionByKey, fetchServices } from "@/lib/cms/admin/queries"

export default async function AdminServicesPage() {
  const [section, items] = await Promise.all([
    fetchSectionByKey("services"),
    fetchServices(),
  ])

  return (
    <AdminSectionLayout title="Services" description="What I do cards.">
      <SectionHeaderForm
        sectionKey="services"
        sectionLabel="Services"
        fields={[
          { key: "label", label: "Tag" },
          { key: "title", label: "Title" },
          { key: "intro", label: "Intro", type: "textarea" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Service items"
        newHref="/admin/services/new"
        table="services"
        items={items.map((s) => ({
          id: s.id,
          title: `${s.number} — ${s.title}`,
          status: s.status,
          isVisible: s.isVisible,
        }))}
        onDelete={deleteService}
        editBasePath="/admin/services/"
      />
    </AdminSectionLayout>
  )
}
