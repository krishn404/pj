"use server"

import { eq, sql } from "drizzle-orm"
import {
  companyLogos,
  experimentalItems,
  experienceEntries,
  projects,
  services,
  showreelVideos,
  skillCategories,
  socialLinks,
  testimonials,
} from "@/lib/cms/db/schema"
import { afterMutation } from "@/lib/cms/admin/revalidate"
import { requireAdminDb } from "@/lib/cms/admin/require-admin"
import { reorderSchema } from "@/lib/cms/admin/schemas"
import { fail, ok, type ActionResult } from "@/lib/cms/admin/types"

const tables = {
  projects,
  showreel_videos: showreelVideos,
  services,
  experience_entries: experienceEntries,
  skill_categories: skillCategories,
  experimental_items: experimentalItems,
  social_links: socialLinks,
  testimonials,
  company_logos: companyLogos,
} as const

export async function reorderItems(input: unknown): Promise<ActionResult> {
  try {
    const db = await requireAdminDb()
    const parsed = reorderSchema.parse(input)
    const table = tables[parsed.table]

    await db.transaction(async (tx) => {
      for (let i = 0; i < parsed.orderedIds.length; i++) {
        await tx
          .update(table)
          .set({ sortOrder: i, updatedAt: sql`now()` })
          .where(eq(table.id, parsed.orderedIds[i]))
      }
    })

    await afterMutation()
    return ok()
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Reorder failed")
  }
}
