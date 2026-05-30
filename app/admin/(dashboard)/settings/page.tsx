import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SiteSettingsForm } from "@/components/admin/forms/site-settings-form"
import { fetchSiteSettings } from "@/lib/cms/admin/queries"

export default async function AdminSiteSettingsPage() {
  const data = await fetchSiteSettings()
  if (!data) throw new Error("Site settings not found. Run db:seed.")

  return (
    <AdminSectionLayout title="Site settings" description="Global identity, contact, and SEO.">
      <SiteSettingsForm data={data} />
    </AdminSectionLayout>
  )
}
