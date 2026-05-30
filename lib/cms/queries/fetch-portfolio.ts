import { asc, eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/cms/db"
import {
  aboutSettings,
  companyLogos,
  experienceEntries,
  experimentalItems,
  heroSettings,
  projects,
  sectionSettings,
  services,
  showreelVideos,
  siteSettings,
  skillCategories,
  socialLinks,
  testimonials,
} from "@/lib/cms/db/schema"
import { buildPortfolioDTO, type SectionSettingsMap } from "@/lib/cms/mappers/to-portfolio"

export async function fetchPortfolioFromDatabase() {
  if (!isDatabaseConfigured() || !db) {
    return null
  }

  const [
    siteRows,
    heroRows,
    aboutRows,
    sectionRows,
    showreelRows,
    projectRows,
    experimentalRows,
    serviceRows,
    experienceRows,
    companyRows,
    skillRows,
    socialRows,
    testimonialRows,
  ] = await Promise.all([
    db.select().from(siteSettings).limit(1),
    db.select().from(heroSettings).limit(1),
    db.select().from(aboutSettings).limit(1),
    db.select().from(sectionSettings),
    db
      .select()
      .from(showreelVideos)
      .where(eq(showreelVideos.status, "published"))
      .orderBy(asc(showreelVideos.sortOrder)),
    db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"))
      .orderBy(asc(projects.sortOrder)),
    db
      .select()
      .from(experimentalItems)
      .where(eq(experimentalItems.status, "published"))
      .orderBy(asc(experimentalItems.sortOrder)),
    db
      .select()
      .from(services)
      .where(eq(services.status, "published"))
      .orderBy(asc(services.sortOrder)),
    db
      .select()
      .from(experienceEntries)
      .where(eq(experienceEntries.status, "published"))
      .orderBy(asc(experienceEntries.sortOrder)),
    db
      .select()
      .from(companyLogos)
      .where(eq(companyLogos.status, "published"))
      .orderBy(asc(companyLogos.sortOrder)),
    db
      .select()
      .from(skillCategories)
      .where(eq(skillCategories.status, "published"))
      .orderBy(asc(skillCategories.sortOrder)),
    db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.status, "published"))
      .orderBy(asc(socialLinks.sortOrder)),
    db
      .select()
      .from(testimonials)
      .where(eq(testimonials.status, "published"))
      .orderBy(asc(testimonials.sortOrder)),
  ])

  const siteRow = siteRows[0]
  const heroRow = heroRows[0]
  const aboutRow = aboutRows[0]

  if (!siteRow || !heroRow || !aboutRow) {
    return null
  }

  const sections: SectionSettingsMap = {}
  for (const row of sectionRows) {
    sections[row.sectionKey] = row
  }

  const visible = <T extends { isVisible: boolean }>(rows: T[]) =>
    rows.filter((r) => r.isVisible)

  return buildPortfolioDTO({
    site: {
      name: siteRow.name,
      title: siteRow.title,
      tagline: siteRow.tagline,
      location: siteRow.location,
      locationShort: siteRow.locationShort,
      availability: siteRow.availability,
      email: siteRow.email,
      phone: siteRow.phone,
      phoneDisplay: siteRow.phoneDisplay,
      instagramHandle: siteRow.instagramHandle,
      instagramUrl: siteRow.instagramUrl,
      navLogoText: siteRow.navLogoText,
      seoTitle: siteRow.seoTitle,
      seoDescription: siteRow.seoDescription,
      seoKeywords: siteRow.seoKeywords ?? [],
      ogDescription: siteRow.ogDescription,
    },
    hero: heroRow,
    about: {
      isVisible: aboutRow.isVisible,
      cornerLabel: aboutRow.cornerLabel,
      whatsUpLabel: aboutRow.whatsUpLabel,
      paragraphs: aboutRow.paragraphs,
      polaroidLeftCaption: aboutRow.polaroidLeftCaption,
      polaroidRightCaption: aboutRow.polaroidRightCaption,
    },
    sections,
    showreelVideos: visible(showreelRows).map((v) => ({
      id: v.id,
      title: v.title,
      caption: v.caption,
      mediaType: v.mediaType,
      mediaUrl: v.mediaUrl,
      mediaEmbedId: v.mediaEmbedId,
      isFeatured: v.isFeatured,
    })),
    projects: visible(projectRows).map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      year: p.year,
      description: p.description,
      accentColor: p.accentColor,
      hoverBgColor: p.hoverBgColor,
      tagTextColor: p.tagTextColor,
      externalUrl: p.externalUrl,
      mediaType: p.mediaType,
      mediaUrl: p.mediaUrl,
      mediaEmbedId: p.mediaEmbedId,
    })),
    experimentalItems: visible(experimentalRows).map((item) => ({
      id: item.id,
      label: item.label,
      mediaType: item.mediaType,
      mediaUrl: item.mediaUrl,
      mediaEmbedId: item.mediaEmbedId,
    })),
    services: visible(serviceRows).map((s) => ({
      id: s.id,
      number: s.number,
      title: s.title,
      description: s.description,
      tags: s.tags,
      accentColor: s.accentColor,
    })),
    experienceEntries: visible(experienceRows).map((e) => ({
      id: e.id,
      period: e.period,
      role: e.role,
      company: e.company,
      description: e.description,
      accentColor: e.accentColor,
    })),
    companyLogos: visible(companyRows).map((c) => ({
      id: c.id,
      name: c.name,
      accentColor: c.accentColor,
      url: c.url,
    })),
    skillCategories: visible(skillRows).map((c) => ({
      id: c.id,
      title: c.title,
      skills: c.skills,
      accentColor: c.accentColor,
    })),
    socialLinks: visible(socialRows).map((link) => ({
      id: link.id,
      label: link.label,
      value: link.value,
      href: link.href,
      iconKey: link.iconKey,
      openInNewTab: link.openInNewTab,
    })),
    testimonials: visible(testimonialRows).map((t) => ({
      id: t.id,
      quote: t.quote,
      authorName: t.authorName,
      authorRole: t.authorRole,
      company: t.company,
    })),
  })
}
