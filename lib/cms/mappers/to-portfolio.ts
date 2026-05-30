import type { PortfolioDTO } from "@/lib/cms/types/portfolio"
import type { MediaEmbedDTO } from "@/lib/cms/types/media"
import { toMediaEmbedDTO } from "./media"

export type SectionSettingsMap = Partial<
  Record<
    string,
    {
      label?: string | null
      title?: string | null
      subtitle?: string | null
      intro?: string | null
      description?: string | null
      footerNote?: string | null
      period?: string | null
      placeholderCta?: string | null
      caption?: string | null
      reelTag?: string | null
      companiesTitle?: string | null
      connectLabel?: string | null
      heading?: string | null
      availabilityNote?: string | null
      isVisible?: boolean | null
    }
  >
>

function sectionIsVisible(sections: SectionSettingsMap, key: string): boolean {
  const row = sections[key]
  return row?.isVisible !== false
}

type BuildPortfolioInput = {
  site: {
    name: string
    title: string
    tagline: string
    location: string
    locationShort: string
    availability: string
    email: string
    phone: string
    phoneDisplay: string
    instagramHandle: string
    instagramUrl: string
    navLogoText: string
    seoTitle: string | null
    seoDescription: string | null
    seoKeywords: string[]
    ogDescription: string | null
  }
  hero: {
    isVisible: boolean
    introLabel: string
    nameLine1: string
    nameLine2: string
    currentRole: string
    previousRole: string
    roleBadge: string
    availabilityLine: string
    tagline: string
    contactCta: string
  }
  about: {
    isVisible: boolean
    cornerLabel: string
    whatsUpLabel: string
    paragraphs: string[]
    polaroidLeftCaption: string | null
    polaroidRightCaption: string | null
  }
  sections: SectionSettingsMap
  showreelVideos: Array<{
    id: string
    title: string | null
    caption: string | null
    mediaType: "none" | "youtube" | "instagram" | "image"
    mediaUrl: string | null
    mediaEmbedId: string | null
    isFeatured: boolean
  }>
  projects: Array<{
    id: string
    title: string
    category: string
    year: string
    description: string
    accentColor: string
    hoverBgColor: string
    tagTextColor: string
    externalUrl: string | null
    mediaType: "none" | "youtube" | "instagram" | "image"
    mediaUrl: string | null
    mediaEmbedId: string | null
  }>
  experimentalItems: Array<{
    id: string
    label: string
    mediaType: "none" | "youtube" | "instagram" | "image"
    mediaUrl: string | null
    mediaEmbedId: string | null
  }>
  services: Array<{
    id: string
    number: string
    title: string
    description: string
    tags: string[]
    accentColor: string
  }>
  experienceEntries: Array<{
    id: string
    period: string
    role: string
    company: string
    description: string
    accentColor: string
  }>
  companyLogos: Array<{
    id: string
    name: string
    accentColor: string
    url: string | null
  }>
  skillCategories: Array<{
    id: string
    title: string
    skills: string[]
    accentColor: string
  }>
  socialLinks: Array<{
    id: string
    label: string
    value: string
    href: string
    iconKey: PortfolioDTO["contact"]["links"][number]["iconKey"]
    openInNewTab: boolean
  }>
  testimonials: Array<{
    id: string
    quote: string
    authorName: string
    authorRole: string | null
    company: string | null
  }>
}

function section(
  sections: SectionSettingsMap,
  key: string
): SectionSettingsMap[string] {
  return sections[key] ?? {}
}

function mediaFromRow(row: {
  mediaType: "none" | "youtube" | "instagram" | "image"
  mediaUrl: string | null
  mediaEmbedId: string | null
}): MediaEmbedDTO {
  return toMediaEmbedDTO(row)
}

export function buildPortfolioDTO(input: BuildPortfolioInput): PortfolioDTO {
  const showreelSec = section(input.sections, "showreel")
  const workSec = section(input.sections, "work")
  const experimentalSec = section(input.sections, "experimental")
  const servicesSec = section(input.sections, "services")
  const experienceSec = section(input.sections, "experience")
  const skillsSec = section(input.sections, "skills")
  const contactSec = section(input.sections, "contact")
  const testimonialsSec = section(input.sections, "testimonials")

  const showreelVideoRows = [...input.showreelVideos].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1
    return 0
  })

  const seoTitle =
    input.site.seoTitle ?? `${input.site.name} — ${input.site.title}`
  const seoDescription =
    input.site.seoDescription ??
    `${input.site.title} based in ${input.site.location}. ${input.site.availability}.`

  return {
    site: {
      name: input.site.name,
      title: input.site.title,
      tagline: input.site.tagline,
      location: input.site.location,
      locationShort: input.site.locationShort,
      availability: input.site.availability,
      email: input.site.email,
      phone: input.site.phone,
      phoneDisplay: input.site.phoneDisplay,
      instagram: {
        handle: input.site.instagramHandle,
        url: input.site.instagramUrl,
      },
      navLogoText: input.site.navLogoText,
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords: input.site.seoKeywords,
        ogDescription:
          input.site.ogDescription ??
          "Creating cinematic edits, motion graphics, and visual storytelling for brands and creators.",
      },
    },
    hero: { ...input.hero, isVisible: input.hero.isVisible !== false },
    about: { ...input.about, isVisible: input.about.isVisible !== false },
    showreel: {
      isVisible: sectionIsVisible(input.sections, "showreel"),
      label: showreelSec.label ?? "Featured",
      title: showreelSec.title ?? "VIDEO GALLERY",
      period: showreelSec.period ?? "",
      placeholderCta: showreelSec.placeholderCta ?? "Click to play",
      caption: showreelSec.caption ?? "",
      reelTag: showreelSec.reelTag ?? "",
      videos: showreelVideoRows.map((video) => ({
        id: video.id,
        title: video.title,
        caption: video.caption,
        media: mediaFromRow(video),
      })),
    },
    work: {
      isVisible: sectionIsVisible(input.sections, "work"),
      label: workSec.label ?? "Case Study",
      title: workSec.title ?? "PROJECTS",
      projects: input.projects.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        year: p.year,
        description: p.description,
        accent: p.accentColor,
        hoverBg: p.hoverBgColor,
        tagText: p.tagTextColor,
        externalUrl: p.externalUrl,
        media: mediaFromRow(p),
      })),
    },
    experimental: {
      isVisible: sectionIsVisible(input.sections, "experimental"),
      label: experimentalSec.label ?? "Playground",
      title: experimentalSec.title ?? "TOUCHDESIGNER",
      description: experimentalSec.description ?? "",
      footerNote: experimentalSec.footerNote ?? "",
      items: input.experimentalItems.map((item) => ({
        id: item.id,
        label: item.label,
        media: mediaFromRow(item),
      })),
    },
    services: {
      isVisible: sectionIsVisible(input.sections, "services"),
      label: servicesSec.label ?? "Services",
      title: servicesSec.title ?? "WHAT I DO",
      intro: servicesSec.intro ?? "",
      items: input.services.map((s) => ({
        id: s.id,
        number: s.number,
        title: s.title,
        description: s.description,
        tags: s.tags,
        color: s.accentColor,
      })),
    },
    experience: {
      isVisible: sectionIsVisible(input.sections, "experience"),
      label: experienceSec.label ?? "Timeline",
      title: experienceSec.title ?? "JOURNEY",
      companiesTitle: experienceSec.companiesTitle ?? "Companies I've Worked With",
      items: input.experienceEntries.map((e) => ({
        id: e.id,
        period: e.period,
        role: e.role,
        company: e.company,
        description: e.description,
        color: e.accentColor,
      })),
      companyLogos: input.companyLogos.map((c) => ({
        id: c.id,
        name: c.name,
        accentColor: c.accentColor,
        url: c.url,
      })),
    },
    skills: {
      isVisible: sectionIsVisible(input.sections, "skills"),
      label: skillsSec.label ?? "Capabilities",
      title: skillsSec.title ?? "SKILLS",
      categories: input.skillCategories.map((c) => ({
        id: c.id,
        title: c.title,
        skills: c.skills,
        color: c.accentColor,
      })),
    },
    contact: {
      isVisible: sectionIsVisible(input.sections, "contact"),
      connectLabel: contactSec.connectLabel ?? "let's connect",
      heading: contactSec.heading ?? "",
      availabilityNote: contactSec.availabilityNote ?? "",
      links: input.socialLinks.map((link) => ({
        id: link.id,
        label: link.label,
        value: link.value,
        href: link.href,
        iconKey: link.iconKey,
        external: link.openInNewTab,
      })),
      footer: {
        location: `Based in ${input.site.location}`,
        remote: input.site.availability,
      },
    },
    testimonials: {
      isVisible: sectionIsVisible(input.sections, "testimonials"),
      label: testimonialsSec.label ?? "Testimonials",
      title: testimonialsSec.title ?? "KIND WORDS",
      items: input.testimonials,
    },
  }
}
