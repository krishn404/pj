import "server-only"

import { asc, eq } from "drizzle-orm"
import { getLegacyPortfolioFallback } from "@/lib/cms/fallback/legacy-portfolio"
import { normalizeTestimonials } from "@/lib/cms/normalize-portfolio"
import { db, isDatabaseConfigured } from "@/lib/cms/db"
import {
  aboutSettings,
  companyLogos,
  experimentalItems,
  experienceEntries,
  heroSettings,
  mediaAssets,
  projects,
  sectionSettings,
  services,
  showreelVideos,
  siteSettings,
  skillCategories,
  socialLinks,
  testimonials,
} from "@/lib/cms/db/schema"
import type { MediaEmbedDTO } from "@/lib/cms/types/media"
import type { PortfolioDTO } from "@/lib/cms/types/portfolio"

const ADMIN_QUERY_TIMEOUT_MS = 8000

type AboutSettingsRow = typeof aboutSettings.$inferSelect
type CompanyLogoRow = typeof companyLogos.$inferSelect
type ExperienceEntryRow = typeof experienceEntries.$inferSelect
type ExperimentalItemRow = typeof experimentalItems.$inferSelect
type HeroSettingsRow = typeof heroSettings.$inferSelect
type ProjectRow = typeof projects.$inferSelect
type SectionSettingsRow = typeof sectionSettings.$inferSelect
type ServiceRow = typeof services.$inferSelect
type ShowreelVideoRow = typeof showreelVideos.$inferSelect
type SiteSettingsRow = typeof siteSettings.$inferSelect
type SkillCategoryRow = typeof skillCategories.$inferSelect
type SocialLinkRow = typeof socialLinks.$inferSelect
type TestimonialRow = typeof testimonials.$inferSelect

const fallbackDate = new Date(0)

function fallbackUuid(index: number): string {
  return `00000000-0000-4000-8000-${String(index).padStart(12, "0")}`
}

function mediaToRow(media: MediaEmbedDTO): {
  mediaType: "none" | "youtube" | "instagram" | "image"
  mediaUrl: string | null
  mediaEmbedId: string | null
} {
  if (media.type === "youtube") {
    return {
      mediaType: "youtube",
      mediaUrl: media.originalUrl,
      mediaEmbedId: media.videoId,
    }
  }

  if (media.type === "instagram") {
    return {
      mediaType: "instagram",
      mediaUrl: media.originalUrl,
      mediaEmbedId: media.embedPath,
    }
  }

  if (media.type === "image") {
    return {
      mediaType: "image",
      mediaUrl: media.url,
      mediaEmbedId: null,
    }
  }

  return {
    mediaType: "none",
    mediaUrl: null,
    mediaEmbedId: null,
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined

  return Promise.race([
    promise.finally(() => {
      if (timer) {
        clearTimeout(timer)
      }
    }),
    new Promise<T>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`Admin database query timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    }),
  ])
}

async function queryOrFallback<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await withTimeout(query(), ADMIN_QUERY_TIMEOUT_MS)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.warn(`Using admin fallback content because the CMS database is unavailable: ${message}`)
    return fallback
  }
}

function fallbackPortfolio(): PortfolioDTO {
  return getLegacyPortfolioFallback()
}

function fallbackSiteSettings(): SiteSettingsRow {
  const portfolio = fallbackPortfolio()
  return {
    id: 1,
    name: portfolio.site.name,
    title: portfolio.site.title,
    tagline: portfolio.site.tagline,
    location: portfolio.site.location,
    locationShort: portfolio.site.locationShort,
    availability: portfolio.site.availability,
    email: portfolio.site.email,
    phone: portfolio.site.phone,
    phoneDisplay: portfolio.site.phoneDisplay,
    instagramHandle: portfolio.site.instagram.handle,
    instagramUrl: portfolio.site.instagram.url,
    navLogoText: portfolio.site.navLogoText,
    seoTitle: portfolio.site.seo.title,
    seoDescription: portfolio.site.seo.description,
    seoKeywords: portfolio.site.seo.keywords,
    ogDescription: portfolio.site.seo.ogDescription,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }
}

function fallbackHeroSettings(): HeroSettingsRow {
  const hero = fallbackPortfolio().hero
  return {
    id: 1,
    ...hero,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }
}

function fallbackAboutSettings(): AboutSettingsRow {
  const about = fallbackPortfolio().about
  return {
    id: 1,
    cornerLabel: about.cornerLabel,
    whatsUpLabel: about.whatsUpLabel,
    paragraphs: about.paragraphs,
    polaroidLeftCaption: about.polaroidLeftCaption,
    polaroidRightCaption: about.polaroidRightCaption,
    polaroidLeftImageId: null,
    polaroidRightImageId: null,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }
}

function fallbackSectionRows(): SectionSettingsRow[] {
  const portfolio = fallbackPortfolio()
  const rows: Array<[SectionSettingsRow["sectionKey"], Partial<SectionSettingsRow>]> = [
    ["showreel", portfolio.showreel],
    ["work", portfolio.work],
    ["experimental", portfolio.experimental],
    ["services", portfolio.services],
    ["experience", portfolio.experience],
    ["skills", portfolio.skills],
    ["contact", portfolio.contact],
    ["testimonials", portfolio.testimonials],
  ]

  return rows.map(([sectionKey, section], index) => ({
    id: fallbackUuid(100 + index),
    sectionKey,
    label: "label" in section ? section.label ?? null : null,
    title: "title" in section ? section.title ?? null : null,
    subtitle: null,
    intro: "intro" in section ? section.intro ?? null : null,
    description: "description" in section ? section.description ?? null : null,
    footerNote: "footerNote" in section ? section.footerNote ?? null : null,
    period: "period" in section ? section.period ?? null : null,
    placeholderCta:
      "placeholderCta" in section ? section.placeholderCta ?? null : null,
    caption: "caption" in section ? section.caption ?? null : null,
    reelTag: "reelTag" in section ? section.reelTag ?? null : null,
    companiesTitle:
      "companiesTitle" in section ? section.companiesTitle ?? null : null,
    connectLabel:
      "connectLabel" in section ? section.connectLabel ?? null : null,
    heading: "heading" in section ? section.heading ?? null : null,
    availabilityNote:
      "availabilityNote" in section ? section.availabilityNote ?? null : null,
    isVisible: section.isVisible !== false,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackSectionByKey(key: string): SectionSettingsRow | null {
  return fallbackSectionRows().find((row) => row.sectionKey === key) ?? null
}

function fallbackProjects(): ProjectRow[] {
  return fallbackPortfolio().work.projects.map((project, index) => ({
    id: fallbackUuid(200 + index),
    title: project.title,
    category: project.category,
    year: project.year,
    description: project.description,
    accentColor: project.accent,
    hoverBgColor: project.hoverBg,
    tagTextColor: project.tagText,
    externalUrl: project.externalUrl,
    coverAssetId: null,
    sortOrder: index,
    isFeatured: false,
    status: "published",
    isVisible: true,
    ...mediaToRow(project.media),
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackShowreelVideos(): ShowreelVideoRow[] {
  return fallbackPortfolio().showreel.videos.map((video, index) => ({
    id: fallbackUuid(300 + index),
    title: video.title,
    caption: video.caption,
    thumbnailAssetId: null,
    sortOrder: index,
    isFeatured: index === 0,
    status: "published",
    isVisible: true,
    ...mediaToRow(video.media),
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackServices(): ServiceRow[] {
  return fallbackPortfolio().services.items.map((service, index) => ({
    id: fallbackUuid(400 + index),
    number: service.number,
    title: service.title,
    description: service.description,
    tags: service.tags,
    accentColor: service.color,
    sortOrder: index,
    isFeatured: false,
    status: "published",
    isVisible: true,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackExperience(): ExperienceEntryRow[] {
  return fallbackPortfolio().experience.items.map((entry, index) => ({
    id: fallbackUuid(500 + index),
    period: entry.period,
    role: entry.role,
    company: entry.company,
    description: entry.description,
    accentColor: entry.color,
    sortOrder: index,
    status: "published",
    isVisible: true,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackCompanyLogos(): CompanyLogoRow[] {
  return fallbackPortfolio().experience.companyLogos.map((logo, index) => ({
    id: fallbackUuid(600 + index),
    name: logo.name,
    accentColor: logo.accentColor,
    logoAssetId: null,
    url: logo.url,
    sortOrder: index,
    status: "published",
    isVisible: true,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackSkillCategories(): SkillCategoryRow[] {
  return fallbackPortfolio().skills.categories.map((category, index) => ({
    id: fallbackUuid(700 + index),
    title: category.title,
    skills: category.skills,
    accentColor: category.color,
    sortOrder: index,
    status: "published",
    isVisible: true,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackExperimentalItems(): ExperimentalItemRow[] {
  return fallbackPortfolio().experimental.items.map((item, index) => ({
    id: fallbackUuid(800 + index),
    label: item.label,
    coverAssetId: null,
    sortOrder: index,
    isFeatured: false,
    status: "published",
    isVisible: true,
    ...mediaToRow(item.media),
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackSocialLinks(): SocialLinkRow[] {
  return fallbackPortfolio().contact.links.map((link, index) => ({
    id: fallbackUuid(900 + index),
    label: link.label,
    value: link.value,
    href: link.href,
    iconKey: link.iconKey,
    openInNewTab: link.external,
    sortOrder: index,
    status: "published",
    isVisible: true,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

function fallbackTestimonials(): TestimonialRow[] {
  return normalizeTestimonials(fallbackPortfolio().testimonials).items.map((testimonial, index) => ({
    id: fallbackUuid(1000 + index),
    quote: testimonial.quote,
    authorName: testimonial.authorName,
    authorRole: testimonial.authorRole,
    company: testimonial.company,
    avatarAssetId: null,
    sortOrder: index,
    isFeatured: false,
    status: "published",
    isVisible: true,
    createdAt: fallbackDate,
    updatedAt: fallbackDate,
  }))
}

export async function getAdminDb() {
  if (!isDatabaseConfigured() || !db) {
    throw new Error("Database not configured")
  }
  return db
}

export async function fetchSiteSettings() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(siteSettings).limit(1)
    return row ?? fallbackSiteSettings()
  }, fallbackSiteSettings())
}

export async function fetchHeroSettings() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(heroSettings).limit(1)
    return row ?? fallbackHeroSettings()
  }, fallbackHeroSettings())
}

export async function fetchAboutSettings() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(aboutSettings).limit(1)
    return row ?? fallbackAboutSettings()
  }, fallbackAboutSettings())
}

export async function fetchSectionByKey(key: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database
      .select()
      .from(sectionSettings)
      .where(eq(sectionSettings.sectionKey, key as never))
      .limit(1)
    return row ?? fallbackSectionByKey(key)
  }, fallbackSectionByKey(key))
}

export async function fetchAllSections() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    return database.select().from(sectionSettings)
  }, fallbackSectionRows())
}

export async function fetchProjects() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(projects).orderBy(asc(projects.sortOrder))
    return rows.length > 0 ? rows : fallbackProjects()
  }, fallbackProjects())
}

export async function fetchProject(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(projects).where(eq(projects.id, id))
    return row ?? fallbackProjects().find((project) => project.id === id) ?? null
  }, fallbackProjects().find((project) => project.id === id) ?? null)
}

export async function fetchShowreelVideos() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(showreelVideos).orderBy(asc(showreelVideos.sortOrder))
    return rows.length > 0 ? rows : fallbackShowreelVideos()
  }, fallbackShowreelVideos())
}

export async function fetchShowreelVideo(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(showreelVideos).where(eq(showreelVideos.id, id))
    return row ?? fallbackShowreelVideos().find((video) => video.id === id) ?? null
  }, fallbackShowreelVideos().find((video) => video.id === id) ?? null)
}

export async function fetchServices() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(services).orderBy(asc(services.sortOrder))
    return rows.length > 0 ? rows : fallbackServices()
  }, fallbackServices())
}

export async function fetchService(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(services).where(eq(services.id, id))
    return row ?? fallbackServices().find((service) => service.id === id) ?? null
  }, fallbackServices().find((service) => service.id === id) ?? null)
}

export async function fetchExperience() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(experienceEntries).orderBy(asc(experienceEntries.sortOrder))
    return rows.length > 0 ? rows : fallbackExperience()
  }, fallbackExperience())
}

export async function fetchExperienceEntry(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database
      .select()
      .from(experienceEntries)
      .where(eq(experienceEntries.id, id))
    return row ?? fallbackExperience().find((entry) => entry.id === id) ?? null
  }, fallbackExperience().find((entry) => entry.id === id) ?? null)
}

export async function fetchCompanyLogos() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(companyLogos).orderBy(asc(companyLogos.sortOrder))
    return rows.length > 0 ? rows : fallbackCompanyLogos()
  }, fallbackCompanyLogos())
}

export async function fetchSkillCategories() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder))
    return rows.length > 0 ? rows : fallbackSkillCategories()
  }, fallbackSkillCategories())
}

export async function fetchSkillCategory(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(skillCategories).where(eq(skillCategories.id, id))
    return row ?? fallbackSkillCategories().find((category) => category.id === id) ?? null
  }, fallbackSkillCategories().find((category) => category.id === id) ?? null)
}

export async function fetchExperimentalItems() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(experimentalItems).orderBy(asc(experimentalItems.sortOrder))
    return rows.length > 0 ? rows : fallbackExperimentalItems()
  }, fallbackExperimentalItems())
}

export async function fetchExperimentalItem(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database
      .select()
      .from(experimentalItems)
      .where(eq(experimentalItems.id, id))
    return row ?? fallbackExperimentalItems().find((item) => item.id === id) ?? null
  }, fallbackExperimentalItems().find((item) => item.id === id) ?? null)
}

export async function fetchSocialLinks() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder))
    return rows.length > 0 ? rows : fallbackSocialLinks()
  }, fallbackSocialLinks())
}

export async function fetchSocialLink(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(socialLinks).where(eq(socialLinks.id, id))
    return row ?? fallbackSocialLinks().find((link) => link.id === id) ?? null
  }, fallbackSocialLinks().find((link) => link.id === id) ?? null)
}

export async function fetchTestimonials() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const rows = await database.select().from(testimonials).orderBy(asc(testimonials.sortOrder))
    return rows.length > 0 ? rows : fallbackTestimonials()
  }, fallbackTestimonials())
}

export async function fetchTestimonial(id: string) {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    const [row] = await database.select().from(testimonials).where(eq(testimonials.id, id))
    return row ?? fallbackTestimonials().find((testimonial) => testimonial.id === id) ?? null
  }, fallbackTestimonials().find((testimonial) => testimonial.id === id) ?? null)
}

export async function fetchMediaAssets() {
  return queryOrFallback(async () => {
    const database = await getAdminDb()
    return database.select().from(mediaAssets).orderBy(asc(mediaAssets.createdAt))
  }, [])
}
