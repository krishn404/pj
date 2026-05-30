import { config } from "dotenv"

config({ path: ".env.local" })
config({ path: ".env" })
import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import {
  about,
  contact,
  experience,
  experimental,
  hero,
  services,
  showreel,
  site,
  skills,
} from "@/lib/content"
import * as schema from "@/lib/cms/db/schema"
import { legacyProjects, legacyWorkSection } from "./legacy-projects"

const COMPANY_ACCENT: Record<string, string> = {
  Vibrantick: "var(--cyan)",
  "Ellement Co.": "var(--pink)",
  "Tharun Speaks": "var(--mint)",
  Napstack: "var(--cream)",
}

export async function runSeed() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to run the seed script.")
  }

  const client = postgres(connectionString, { prepare: false, max: 1 })
  const db = drizzle(client, { schema })

  console.log("Clearing existing content...")
  await db.execute(sql`
    TRUNCATE TABLE
      testimonials,
      social_links,
      skill_categories,
      company_logos,
      experience_entries,
      services,
      experimental_items,
      projects,
      showreel_videos,
      section_settings,
      about_settings,
      hero_settings,
      site_settings,
      media_assets
    RESTART IDENTITY CASCADE
  `)

  console.log("Seeding site settings...")
  await db.insert(schema.siteSettings).values({
    id: 1,
    name: site.name,
    title: site.title,
    tagline: site.tagline,
    location: site.location,
    locationShort: site.locationShort,
    availability: site.availability,
    email: site.email,
    phone: site.phone,
    phoneDisplay: site.phoneDisplay,
    instagramHandle: site.instagram.handle,
    instagramUrl: site.instagram.url,
    navLogoText: "PJ",
    seoKeywords: [
      "video editor",
      "visual artist",
      "motion graphics",
      "video editing",
      "content creator",
      "Punjab",
    ],
    ogDescription:
      "Creating cinematic edits, motion graphics, and visual storytelling for brands and creators.",
  })

  console.log("Seeding hero & about...")
  await db.insert(schema.heroSettings).values({ id: 1, ...hero })
  await db.insert(schema.aboutSettings).values({
    id: 1,
    cornerLabel: about.cornerLabel,
    whatsUpLabel: about.whatsUpLabel,
    paragraphs: [...about.paragraphs],
    polaroidLeftCaption: about.polaroidLeftCaption,
    polaroidRightCaption: about.polaroidRightCaption,
  })

  console.log("Seeding section settings...")
  await db.insert(schema.sectionSettings).values([
    {
      sectionKey: "showreel",
      label: showreel.label,
      title: showreel.title,
      period: showreel.period,
      placeholderCta: showreel.placeholderCta,
      caption: showreel.caption,
      reelTag: showreel.reelTag,
    },
    {
      sectionKey: "work",
      label: legacyWorkSection.label,
      title: legacyWorkSection.title,
    },
    {
      sectionKey: "experimental",
      label: experimental.label,
      title: experimental.title,
      description: experimental.description,
      footerNote: experimental.footerNote,
    },
    {
      sectionKey: "services",
      label: services.label,
      title: services.title,
      intro: services.intro,
    },
    {
      sectionKey: "experience",
      label: experience.label,
      title: experience.title,
      companiesTitle: experience.companiesTitle,
    },
    {
      sectionKey: "skills",
      label: skills.label,
      title: skills.title,
    },
    {
      sectionKey: "contact",
      connectLabel: contact.connectLabel,
      heading: contact.heading,
      availabilityNote: contact.availabilityNote,
    },
    {
      sectionKey: "testimonials",
      label: "Testimonials",
      title: "KIND WORDS",
    },
  ])

  console.log("Seeding projects...")
  await db.insert(schema.projects).values(
    legacyProjects.map((p, index) => ({
      title: p.title,
      category: p.category,
      year: p.year,
      description: p.description,
      accentColor: p.accentColor,
      hoverBgColor: p.hoverBgColor,
      tagTextColor: p.tagTextColor,
      sortOrder: index,
      status: "published" as const,
      isVisible: true,
      mediaType: "none" as const,
    }))
  )

  console.log("Seeding experimental items...")
  await db.insert(schema.experimentalItems).values(
    experimental.videoPlaceholders.map((label, index) => ({
      label,
      sortOrder: index,
      status: "published" as const,
      isVisible: true,
      mediaType: "none" as const,
    }))
  )

  console.log("Seeding services...")
  await db.insert(schema.services).values(
    services.items.map((item, index) => ({
      number: item.number,
      title: item.title,
      description: item.description,
      tags: [...item.tags],
      accentColor: item.color,
      sortOrder: index,
      status: "published" as const,
      isVisible: true,
    }))
  )

  console.log("Seeding experience...")
  await db.insert(schema.experienceEntries).values(
    experience.items.map((item, index) => ({
      period: item.period,
      role: item.role,
      company: item.company,
      description: item.description,
      accentColor: item.color,
      sortOrder: index,
      status: "published" as const,
      isVisible: true,
    }))
  )

  await db.insert(schema.companyLogos).values(
    experience.companyLogos.map((name, index) => ({
      name,
      accentColor: COMPANY_ACCENT[name] ?? "var(--foreground)",
      sortOrder: index,
      status: "published" as const,
      isVisible: true,
    }))
  )

  console.log("Seeding skills & social links...")
  await db.insert(schema.skillCategories).values(
    skills.categories.map((cat, index) => ({
      title: cat.title,
      skills: [...cat.skills],
      accentColor: cat.color,
      sortOrder: index,
      status: "published" as const,
      isVisible: true,
    }))
  )

  await db.insert(schema.socialLinks).values(
    contact.links.map((link, index) => ({
      label: link.label,
      value: link.value,
      href: link.href,
      iconKey:
        link.label === "Email"
          ? ("email" as const)
          : link.label === "Phone"
            ? ("phone" as const)
            : link.label === "Instagram"
              ? ("instagram" as const)
              : ("other" as const),
      openInNewTab: "external" in link && Boolean(link.external),
      sortOrder: index,
      status: "published" as const,
      isVisible: true,
    }))
  )

  console.log("Seed completed successfully.")
  await client.end()
}
