import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { ProjectForm } from "@/components/admin/forms/project-form"
import { fetchProject } from "@/lib/cms/admin/queries"

export default async function AdminWorkEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New project" backHref="/admin/work">
        <ProjectForm />
      </AdminSectionLayout>
    )
  }

  const data = await fetchProject(id)
  if (!data) notFound()

  return (
    <AdminSectionLayout title="Edit project" backHref="/admin/work">
      <ProjectForm data={data} />
    </AdminSectionLayout>
  )
}
