import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { AboutSettingsForm } from "@/components/admin/forms/about-settings-form"
import { fetchAboutSettings } from "@/lib/cms/admin/queries"

export default async function AdminAboutPage() {
  const data = await fetchAboutSettings()
  if (!data) throw new Error("About settings not found.")

  return (
    <AdminSectionLayout title="About" description="About section paragraphs and labels.">
      <AboutSettingsForm data={data} />
    </AdminSectionLayout>
  )
}
