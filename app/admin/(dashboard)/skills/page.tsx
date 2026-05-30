import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import { deleteSkillCategory } from "@/lib/cms/admin/actions/content"
import { fetchSectionByKey, fetchSkillCategories } from "@/lib/cms/admin/queries"

export default async function AdminSkillsPage() {
  const [section, items] = await Promise.all([
    fetchSectionByKey("skills"),
    fetchSkillCategories(),
  ])

  return (
    <AdminSectionLayout title="Skills" description="Skill categories and tags.">
      <SectionHeaderForm
        sectionKey="skills"
        sectionLabel="Skills"
        fields={[
          { key: "label", label: "Tag" },
          { key: "title", label: "Title" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Categories"
        newHref="/admin/skills/new"
        table="skill_categories"
        items={items.map((c) => ({
          id: c.id,
          title: c.title,
          status: c.status,
          isVisible: c.isVisible,
        }))}
        onDelete={deleteSkillCategory}
        editBasePath="/admin/skills/"
      />
    </AdminSectionLayout>
  )
}
