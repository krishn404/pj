import { AdminSectionLayout } from "@/components/admin/primitives/section-layout"
import { SectionHeaderForm } from "@/components/admin/section-header-form"
import { EntityList } from "@/components/admin/entity-list"
import { deleteShowreelVideo } from "@/lib/cms/admin/actions/content"
import { fetchSectionByKey, fetchShowreelVideos } from "@/lib/cms/admin/queries"

export default async function AdminShowreelPage() {
  const [section, videos] = await Promise.all([
    fetchSectionByKey("showreel"),
    fetchShowreelVideos(),
  ])

  return (
    <AdminSectionLayout
      title="Video gallery"
      description="YouTube & Instagram embeds in the portfolio video section. Reorder items to control the public grid."
    >
      <SectionHeaderForm
        sectionKey="showreel"
        sectionLabel="Video gallery"
        fields={[
          { key: "label", label: "Tag" },
          { key: "title", label: "Title" },
          { key: "period", label: "Period" },
          { key: "placeholderCta", label: "Placeholder CTA" },
          { key: "caption", label: "Caption", type: "textarea" },
          { key: "reelTag", label: "Reel tag" },
        ]}
        initial={section ?? {}}
      />
      <EntityList
        title="Gallery videos"
        newHref="/admin/showreel/new"
        table="showreel_videos"
        items={videos.map((v) => ({
          id: v.id,
          title: v.title ?? v.caption ?? "Untitled video",
          status: v.status,
          isVisible: v.isVisible,
        }))}
        onDelete={deleteShowreelVideo}
        editBasePath="/admin/showreel/"
      />
    </AdminSectionLayout>
  )
}
