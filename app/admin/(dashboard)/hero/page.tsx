import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { HeroSettingsForm } from "@/components/admin/forms/hero-settings-form"
import { fetchHeroSettings } from "@/lib/cms/admin/queries"

export default async function AdminHeroPage() {
  const data = await fetchHeroSettings()
  if (!data) throw new Error("Hero settings not found.")

  return (
    <AdminSectionLayout title="Hero" description="Home section copy and badges.">
      <HeroSettingsForm data={data} />
    </AdminSectionLayout>
  )
}
