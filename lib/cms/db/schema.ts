import { relations } from "drizzle-orm"
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core"

export const publishStatusEnum = pgEnum("publish_status", ["draft", "published"])
export const mediaTypeEnum = pgEnum("media_type", ["none", "youtube", "instagram", "image"])
export const sectionKeyEnum = pgEnum("section_key", [
  "showreel",
  "work",
  "experimental",
  "services",
  "experience",
  "skills",
  "contact",
  "testimonials",
])
export const socialIconKeyEnum = pgEnum("social_icon_key", [
  "email",
  "phone",
  "instagram",
  "linkedin",
  "twitter",
  "youtube",
  "website",
  "other",
])

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}

const publishFields = {
  status: publishStatusEnum("status").default("published").notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
}

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  storagePath: text("storage_path").notNull(),
  publicUrl: text("public_url").notNull(),
  alt: text("alt"),
  mimeType: varchar("mime_type", { length: 128 }),
  width: integer("width"),
  height: integer("height"),
  ...timestamps,
})

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  location: text("location").notNull(),
  locationShort: text("location_short").notNull(),
  availability: text("availability").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  phoneDisplay: text("phone_display").notNull(),
  instagramHandle: text("instagram_handle").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  navLogoText: varchar("nav_logo_text", { length: 8 }).default("PJ").notNull(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: jsonb("seo_keywords").$type<string[]>().default([]).notNull(),
  ogDescription: text("og_description"),
  ...timestamps,
})

export const heroSettings = pgTable("hero_settings", {
  id: integer("id").primaryKey().default(1),
  isVisible: boolean("is_visible").default(true).notNull(),
  introLabel: text("intro_label").notNull(),
  nameLine1: text("name_line_1").notNull(),
  nameLine2: text("name_line_2").notNull(),
  currentRole: text("current_role").notNull(),
  previousRole: text("previous_role").notNull(),
  roleBadge: text("role_badge").notNull(),
  availabilityLine: text("availability_line").notNull(),
  tagline: text("tagline").notNull(),
  contactCta: text("contact_cta").notNull(),
  ...timestamps,
})

export const aboutSettings = pgTable("about_settings", {
  id: integer("id").primaryKey().default(1),
  cornerLabel: text("corner_label").notNull(),
  whatsUpLabel: text("whats_up_label").notNull(),
  paragraphs: jsonb("paragraphs").$type<string[]>().notNull(),
  polaroidLeftCaption: text("polaroid_left_caption"),
  polaroidRightCaption: text("polaroid_right_caption"),
  polaroidLeftImageId: uuid("polaroid_left_image_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  polaroidRightImageId: uuid("polaroid_right_image_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  ...timestamps,
})

export const sectionSettings = pgTable(
  "section_settings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sectionKey: sectionKeyEnum("section_key").notNull(),
    label: text("label"),
    title: text("title"),
    subtitle: text("subtitle"),
    intro: text("intro"),
    description: text("description"),
    footerNote: text("footer_note"),
    period: text("period"),
    placeholderCta: text("placeholder_cta"),
    caption: text("caption"),
    reelTag: text("reel_tag"),
    companiesTitle: text("companies_title"),
    connectLabel: text("connect_label"),
    heading: text("heading"),
    availabilityNote: text("availability_note"),
    isVisible: boolean("is_visible").default(true).notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("section_settings_key_idx").on(table.sectionKey)]
)

export const showreelVideos = pgTable("showreel_videos", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),
  caption: text("caption"),
  mediaType: mediaTypeEnum("media_type").default("none").notNull(),
  mediaUrl: text("media_url"),
  mediaEmbedId: text("media_embed_id"),
  thumbnailAssetId: uuid("thumbnail_asset_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  sortOrder: integer("sort_order").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  ...publishFields,
  ...timestamps,
})

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  year: varchar("year", { length: 8 }).notNull(),
  description: text("description").notNull(),
  accentColor: varchar("accent_color", { length: 32 }).notNull(),
  hoverBgColor: varchar("hover_bg_color", { length: 64 }).notNull(),
  tagTextColor: varchar("tag_text_color", { length: 32 }).notNull(),
  externalUrl: text("external_url"),
  mediaType: mediaTypeEnum("media_type").default("none").notNull(),
  mediaUrl: text("media_url"),
  mediaEmbedId: text("media_embed_id"),
  coverAssetId: uuid("cover_asset_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  sortOrder: integer("sort_order").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  ...publishFields,
  ...timestamps,
})

export const experimentalItems = pgTable("experimental_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull(),
  mediaType: mediaTypeEnum("media_type").default("none").notNull(),
  mediaUrl: text("media_url"),
  mediaEmbedId: text("media_embed_id"),
  coverAssetId: uuid("cover_asset_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  sortOrder: integer("sort_order").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  ...publishFields,
  ...timestamps,
})

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  number: varchar("number", { length: 4 }).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  accentColor: varchar("accent_color", { length: 32 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  ...publishFields,
  ...timestamps,
})

export const experienceEntries = pgTable("experience_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  period: text("period").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  description: text("description").notNull(),
  accentColor: varchar("accent_color", { length: 32 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...publishFields,
  ...timestamps,
})

export const companyLogos = pgTable("company_logos", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  accentColor: varchar("accent_color", { length: 32 }).notNull(),
  logoAssetId: uuid("logo_asset_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  url: text("url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...publishFields,
  ...timestamps,
})

export const skillCategories = pgTable("skill_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull(),
  accentColor: varchar("accent_color", { length: 32 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...publishFields,
  ...timestamps,
})

export const socialLinks = pgTable("social_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  href: text("href").notNull(),
  iconKey: socialIconKeyEnum("icon_key").default("other").notNull(),
  openInNewTab: boolean("open_in_new_tab").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  ...publishFields,
  ...timestamps,
})

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  quote: text("quote").notNull(),
  authorName: text("author_name").notNull(),
  authorRole: text("author_role"),
  company: text("company"),
  avatarAssetId: uuid("avatar_asset_id").references(() => mediaAssets.id, {
    onDelete: "set null",
  }),
  sortOrder: integer("sort_order").default(0).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  ...publishFields,
  ...timestamps,
})

export const mediaAssetsRelations = relations(mediaAssets, ({ many }) => ({
  showreelVideos: many(showreelVideos),
}))
