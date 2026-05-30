import { notFound } from "next/navigation"
import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { CompanyLogoForm } from "@/components/admin/forms/collection-forms"
import { eq } from "drizzle-orm"
import { companyLogos } from "@/lib/cms/db/schema"
import { getAdminDb } from "@/lib/cms/admin/queries"

export default async function AdminCompanyLogoEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (id === "new") {
    return (
      <AdminSectionLayout title="New company" backHref="/admin/experience">
        <CompanyLogoForm isNew />
      </AdminSectionLayout>
    )
  }
  const db = await getAdminDb()
  const [data] = await db.select().from(companyLogos).where(eq(companyLogos.id, id))
  if (!data) notFound()
  return (
    <AdminSectionLayout title="Edit company" backHref="/admin/experience">
      <CompanyLogoForm data={data as unknown as Record<string, unknown>} isNew={false} />
    </AdminSectionLayout>
  )
}
