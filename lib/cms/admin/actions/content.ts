"use server"

import { desc, eq, sql } from "drizzle-orm"
import {
  aboutSettings,
  companyLogos,
  experimentalItems,
  experienceEntries,
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
import { resolveMediaFields } from "@/lib/cms/admin/media-fields"
import { afterMutation } from "@/lib/cms/admin/revalidate"
import { requireAdminDb } from "@/lib/cms/admin/require-admin"
import {
  aboutSettingsSchema,
  companyLogoSchema,
  experimentalItemSchema,
  experienceSchema,
  heroSettingsSchema,
  projectSchema,
  sectionSettingsSchema,
  serviceSchema,
  showreelVideoSchema,
  siteSettingsSchema,
  skillCategorySchema,
  socialLinkSchema,
  testimonialSchema,
} from "@/lib/cms/admin/schemas"
import { fail, ok, type ActionResult } from "@/lib/cms/admin/types"

async function nextOrder(
  db: Awaited<ReturnType<typeof requireAdminDb>>,
  table:
    | typeof projects
    | typeof services
    | typeof showreelVideos
    | typeof experienceEntries
    | typeof skillCategories
    | typeof experimentalItems
    | typeof socialLinks
    | typeof testimonials
    | typeof companyLogos
) {
  const [row] = await db
    .select({ sortOrder: table.sortOrder })
    .from(table)
    .orderBy(desc(table.sortOrder))
    .limit(1)
  return (row?.sortOrder ?? -1) + 1
}

// ——— Singletons ———

export async function updateSiteSettings(input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = siteSettingsSchema.parse(input)
    await db
      .update(siteSettings)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(siteSettings.id, 1))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Save failed")
  }
}

export async function updateHeroSettings(input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = heroSettingsSchema.parse(input)
    await db
      .update(heroSettings)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(heroSettings.id, 1))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Save failed")
  }
}

export async function updateAboutSettings(input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = aboutSettingsSchema.parse(input)
    await db
      .update(aboutSettings)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(aboutSettings.id, 1))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Save failed")
  }
}

export async function updateSectionSettings(
  sectionKey: string,
  input: unknown
): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = sectionSettingsSchema.parse(input)
    const existing = await db
      .select()
      .from(sectionSettings)
      .where(eq(sectionSettings.sectionKey, sectionKey as never))
      .limit(1)

    if (existing[0]) {
      await db
        .update(sectionSettings)
        .set({ ...data, updatedAt: sql`now()` })
        .where(eq(sectionSettings.id, existing[0].id))
    } else {
      await db.insert(sectionSettings).values({
        sectionKey: sectionKey as never,
        ...data,
      })
    }
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Save failed")
  }
}

// ——— Projects ———

export async function createProject(input: unknown): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = projectSchema.parse(input)
    const media = resolveMediaFields(data.mediaType, data.mediaUrl)
    const [row] = await db
      .insert(projects)
      .values({
        title: data.title,
        category: data.category,
        year: data.year,
        description: data.description,
        accentColor: data.accentColor,
        hoverBgColor: data.hoverBgColor,
        tagTextColor: data.tagTextColor,
        externalUrl: data.externalUrl || null,
        coverAssetId: data.coverAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        sortOrder: await nextOrder(db, projects),
        ...media,
      })
      .returning({ id: projects.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateProject(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = projectSchema.parse(input)
    const media = resolveMediaFields(data.mediaType, data.mediaUrl)
    await db
      .update(projects)
      .set({
        title: data.title,
        category: data.category,
        year: data.year,
        description: data.description,
        accentColor: data.accentColor,
        hoverBgColor: data.hoverBgColor,
        tagTextColor: data.tagTextColor,
        externalUrl: data.externalUrl || null,
        coverAssetId: data.coverAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        updatedAt: sql`now()`,
        ...media,
      })
      .where(eq(projects.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(projects).where(eq(projects.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

// ——— Showreel ———

export async function createShowreelVideo(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = showreelVideoSchema.parse(input)
    const media = resolveMediaFields(data.mediaType, data.mediaUrl)
    if (data.isFeatured) {
      await db.update(showreelVideos).set({ isFeatured: false })
    }
    const [row] = await db
      .insert(showreelVideos)
      .values({
        title: data.title,
        caption: data.caption,
        thumbnailAssetId: data.thumbnailAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        sortOrder: await nextOrder(db, showreelVideos),
        ...media,
      })
      .returning({ id: showreelVideos.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateShowreelVideo(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = showreelVideoSchema.parse(input)
    const media = resolveMediaFields(data.mediaType, data.mediaUrl)
    if (data.isFeatured) {
      await db.update(showreelVideos).set({ isFeatured: false })
    }
    await db
      .update(showreelVideos)
      .set({
        title: data.title,
        caption: data.caption,
        thumbnailAssetId: data.thumbnailAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        updatedAt: sql`now()`,
        ...media,
      })
      .where(eq(showreelVideos.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteShowreelVideo(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(showreelVideos).where(eq(showreelVideos.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

// ——— Services ———

export async function createService(input: unknown): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = serviceSchema.parse(input)
    const [row] = await db
      .insert(services)
      .values({
        ...data,
        sortOrder: await nextOrder(db, services),
      })
      .returning({ id: services.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateService(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = serviceSchema.parse(input)
    await db
      .update(services)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(services.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(services).where(eq(services.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

// ——— Experience ———

export async function createExperience(input: unknown): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = experienceSchema.parse(input)
    const [row] = await db
      .insert(experienceEntries)
      .values({ ...data, sortOrder: await nextOrder(db, experienceEntries) })
      .returning({ id: experienceEntries.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateExperience(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = experienceSchema.parse(input)
    await db
      .update(experienceEntries)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(experienceEntries.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(experienceEntries).where(eq(experienceEntries.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

export async function createCompanyLogo(input: unknown): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = companyLogoSchema.parse(input)
    const [row] = await db
      .insert(companyLogos)
      .values({
        name: data.name,
        accentColor: data.accentColor,
        url: data.url || null,
        logoAssetId: data.logoAssetId || null,
        status: data.status,
        isVisible: data.isVisible,
        sortOrder: await nextOrder(db, companyLogos),
      })
      .returning({ id: companyLogos.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateCompanyLogo(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = companyLogoSchema.parse(input)
    await db
      .update(companyLogos)
      .set({
        name: data.name,
        accentColor: data.accentColor,
        url: data.url || null,
        logoAssetId: data.logoAssetId || null,
        status: data.status,
        isVisible: data.isVisible,
        updatedAt: sql`now()`,
      })
      .where(eq(companyLogos.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteCompanyLogo(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(companyLogos).where(eq(companyLogos.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

// ——— Skills ———

export async function createSkillCategory(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = skillCategorySchema.parse(input)
    const [row] = await db
      .insert(skillCategories)
      .values({ ...data, sortOrder: await nextOrder(db, skillCategories) })
      .returning({ id: skillCategories.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateSkillCategory(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = skillCategorySchema.parse(input)
    await db
      .update(skillCategories)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(skillCategories.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteSkillCategory(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(skillCategories).where(eq(skillCategories.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

// ——— Experimental ———

export async function createExperimentalItem(
  input: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = experimentalItemSchema.parse(input)
    const media = resolveMediaFields(data.mediaType, data.mediaUrl)
    const [row] = await db
      .insert(experimentalItems)
      .values({
        label: data.label,
        coverAssetId: data.coverAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        sortOrder: await nextOrder(db, experimentalItems),
        ...media,
      })
      .returning({ id: experimentalItems.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateExperimentalItem(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = experimentalItemSchema.parse(input)
    const media = resolveMediaFields(data.mediaType, data.mediaUrl)
    await db
      .update(experimentalItems)
      .set({
        label: data.label,
        coverAssetId: data.coverAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        updatedAt: sql`now()`,
        ...media,
      })
      .where(eq(experimentalItems.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteExperimentalItem(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(experimentalItems).where(eq(experimentalItems.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

// ——— Social ———

export async function createSocialLink(input: unknown): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = socialLinkSchema.parse(input)
    const [row] = await db
      .insert(socialLinks)
      .values({ ...data, sortOrder: await nextOrder(db, socialLinks) })
      .returning({ id: socialLinks.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateSocialLink(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = socialLinkSchema.parse(input)
    await db
      .update(socialLinks)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(socialLinks.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteSocialLink(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(socialLinks).where(eq(socialLinks.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}

// ——— Testimonials ———

export async function createTestimonial(input: unknown): Promise<ActionResult<{ id: string }>> {
  try {
    const db = await requireAdminDb()
    const data = testimonialSchema.parse(input)
    const [row] = await db
      .insert(testimonials)
      .values({
        quote: data.quote,
        authorName: data.authorName,
        authorRole: data.authorRole,
        company: data.company,
        avatarAssetId: data.avatarAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        sortOrder: await nextOrder(db, testimonials),
      })
      .returning({ id: testimonials.id })
    await afterMutation()
    return ok({ id: row.id })
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Create failed")
  }
}

export async function updateTestimonial(id: string, input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const data = testimonialSchema.parse(input)
    await db
      .update(testimonials)
      .set({
        quote: data.quote,
        authorName: data.authorName,
        authorRole: data.authorRole,
        company: data.company,
        avatarAssetId: data.avatarAssetId || null,
        isFeatured: data.isFeatured,
        status: data.status,
        isVisible: data.isVisible,
        updatedAt: sql`now()`,
      })
      .where(eq(testimonials.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Update failed")
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    await db.delete(testimonials).where(eq(testimonials.id, id))
    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Delete failed")
  }
}
