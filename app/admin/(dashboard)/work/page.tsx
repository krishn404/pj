import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import { deleteProject } from "@/lib/cms/admin/actions/content"
import { fetchProjects, fetchSectionByKey } from "@/lib/cms/admin/queries"

export default async function AdminWorkPage() {
  const [section, items] = await Promise.all([
    fetchSectionByKey("work"),
    fetchProjects(),
  ])

  return (
    <AdminSectionLayout title="Work / Projects" description="Portfolio project list.">
      <SectionHeaderForm
        sectionKey="work"
        sectionLabel="Work"
        fields={[
          { key: "label", label: "Tag label" },
          { key: "title", label: "Section title" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Projects"
        newHref="/admin/work/new"
        table="projects"
        items={items.map((p) => ({
          id: p.id,
          title: p.title,
          status: p.status,
          isVisible: p.isVisible,
        }))}
        onDelete={deleteProject}
        editBasePath="/admin/work/"
      />
    </AdminSectionLayout>
  )
}
