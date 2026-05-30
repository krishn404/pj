import "server-only"

import { asc, eq } from "drizzle-orm"
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

export async function getAdminDb() {
  if (!isDatabaseConfigured() || !db) {
    throw new Error("Database not configured")
  }
  return db
}

export async function fetchSiteSettings() {
  const database = await getAdminDb()
  const [row] = await database.select().from(siteSettings).limit(1)
  return row ?? null
}

export async function fetchHeroSettings() {
  const database = await getAdminDb()
  const [row] = await database.select().from(heroSettings).limit(1)
  return row ?? null
}

export async function fetchAboutSettings() {
  const database = await getAdminDb()
  const [row] = await database.select().from(aboutSettings).limit(1)
  return row ?? null
}

export async function fetchSectionByKey(key: string) {
  const database = await getAdminDb()
  const [row] = await database
    .select()
    .from(sectionSettings)
    .where(eq(sectionSettings.sectionKey, key as never))
    .limit(1)
  return row ?? null
}

export async function fetchAllSections() {
  const database = await getAdminDb()
  return database.select().from(sectionSettings)
}

export async function fetchProjects() {
  const database = await getAdminDb()
  return database.select().from(projects).orderBy(asc(projects.sortOrder))
}

export async function fetchProject(id: string) {
  const database = await getAdminDb()
  const [row] = await database.select().from(projects).where(eq(projects.id, id))
  return row ?? null
}

export async function fetchShowreelVideos() {
  const database = await getAdminDb()
  return database.select().from(showreelVideos).orderBy(asc(showreelVideos.sortOrder))
}

export async function fetchShowreelVideo(id: string) {
  const database = await getAdminDb()
  const [row] = await database.select().from(showreelVideos).where(eq(showreelVideos.id, id))
  return row ?? null
}

export async function fetchServices() {
  const database = await getAdminDb()
  return database.select().from(services).orderBy(asc(services.sortOrder))
}

export async function fetchService(id: string) {
  const database = await getAdminDb()
  const [row] = await database.select().from(services).where(eq(services.id, id))
  return row ?? null
}

export async function fetchExperience() {
  const database = await getAdminDb()
  return database.select().from(experienceEntries).orderBy(asc(experienceEntries.sortOrder))
}

export async function fetchExperienceEntry(id: string) {
  const database = await getAdminDb()
  const [row] = await database
    .select()
    .from(experienceEntries)
    .where(eq(experienceEntries.id, id))
  return row ?? null
}

export async function fetchCompanyLogos() {
  const database = await getAdminDb()
  return database.select().from(companyLogos).orderBy(asc(companyLogos.sortOrder))
}

export async function fetchSkillCategories() {
  const database = await getAdminDb()
  return database.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder))
}

export async function fetchSkillCategory(id: string) {
  const database = await getAdminDb()
  const [row] = await database.select().from(skillCategories).where(eq(skillCategories.id, id))
  return row ?? null
}

export async function fetchExperimentalItems() {
  const database = await getAdminDb()
  return database.select().from(experimentalItems).orderBy(asc(experimentalItems.sortOrder))
}

export async function fetchExperimentalItem(id: string) {
  const database = await getAdminDb()
  const [row] = await database
    .select()
    .from(experimentalItems)
    .where(eq(experimentalItems.id, id))
  return row ?? null
}

export async function fetchSocialLinks() {
  const database = await getAdminDb()
  return database.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder))
}

export async function fetchSocialLink(id: string) {
  const database = await getAdminDb()
  const [row] = await database.select().from(socialLinks).where(eq(socialLinks.id, id))
  return row ?? null
}

export async function fetchTestimonials() {
  const database = await getAdminDb()
  return database.select().from(testimonials).orderBy(asc(testimonials.sortOrder))
}

export async function fetchTestimonial(id: string) {
  const database = await getAdminDb()
  const [row] = await database.select().from(testimonials).where(eq(testimonials.id, id))
  return row ?? null
}

export async function fetchMediaAssets() {
  const database = await getAdminDb()
  return database.select().from(mediaAssets).orderBy(asc(mediaAssets.createdAt))
}
