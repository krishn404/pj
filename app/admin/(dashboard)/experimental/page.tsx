import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import { deleteExperimentalItem } from "@/lib/cms/admin/actions/content"
import { fetchSectionByKey, fetchExperimentalItems } from "@/lib/cms/admin/queries"

export default async function AdminExperimentalPage() {
  const [section, items] = await Promise.all([
    fetchSectionByKey("experimental"),
    fetchExperimentalItems(),
  ])

  return (
    <AdminSectionLayout
      title="Playground"
      description="Grid of experiments — each item supports YouTube, Instagram, or an image URL in the same embed frame as the public site."
    >
      <SectionHeaderForm
        sectionKey="experimental"
        sectionLabel="Playground"
        fields={[
          { key: "label", label: "Tag" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "footerNote", label: "Footer note" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Items"
        newHref="/admin/experimental/new"
        table="experimental_items"
        items={items.map((i) => ({
          id: i.id,
          title: i.label,
          status: i.status,
          isVisible: i.isVisible,
        }))}
        onDelete={deleteExperimentalItem}
        editBasePath="/admin/experimental/"
      />
    </AdminSectionLayout>
  )
}
