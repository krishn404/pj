import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import {
  deleteExperience,
  deleteCompanyLogo,
} from "@/lib/cms/admin/actions/content"
import {
  fetchSectionByKey,
  fetchExperience,
  fetchCompanyLogos,
} from "@/lib/cms/admin/queries"

export default async function AdminExperiencePage() {
  const [section, entries, logos] = await Promise.all([
    fetchSectionByKey("experience"),
    fetchExperience(),
    fetchCompanyLogos(),
  ])

  return (
    <AdminSectionLayout title="Experience" description="Timeline and company logos.">
      <SectionHeaderForm
        sectionKey="experience"
        sectionLabel="Experience"
        fields={[
          { key: "label", label: "Tag" },
          { key: "title", label: "Title" },
          { key: "companiesTitle", label: "Companies title" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Timeline entries"
        newHref="/admin/experience/new"
        table="experience_entries"
        items={entries.map((e) => ({
          id: e.id,
          title: `${e.role} @ ${e.company}`,
          status: e.status,
          isVisible: e.isVisible,
        }))}
        onDelete={deleteExperience}
        editBasePath="/admin/experience/"
      />
      <EntityList
        title="Company logos"
        newHref="/admin/experience/logos/new"
        table="company_logos"
        items={logos.map((c) => ({
          id: c.id,
          title: c.name,
          status: c.status,
          isVisible: c.isVisible,
        }))}
        onDelete={deleteCompanyLogo}
        editBasePath="/admin/experience/logos/"
      />
    </AdminSectionLayout>
  )
}
