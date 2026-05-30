import { z } from "zod"
import { instagramUrlSchema, youtubeUrlSchema } from "@/lib/cms/validation/media"
import { mediaTypeSchema, publishStatusSchema, socialIconKeySchema } from "@/lib/cms/validation/enums"

export const publishFieldsSchema = z.object({
  status: publishStatusSchema.default("published"),
  isVisible: z.boolean().default(true),
})

export const siteSettingsSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  location: z.string().min(1),
  locationShort: z.string().min(1),
  availability: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  phoneDisplay: z.string().min(1),
  instagramHandle: z.string().min(1),
  instagramUrl: z.string().url(),
  navLogoText: z.string().min(1).max(8),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  seoKeywords: z.array(z.string()).default([]),
  ogDescription: z.string().optional().nullable(),
})

export const heroSettingsSchema = z.object({
  isVisible: z.boolean().default(true),
  introLabel: z.string().min(1),
  nameLine1: z.string().min(1),
  nameLine2: z.string().min(1),
  currentRole: z.string().min(1),
  previousRole: z.string().min(1),
  roleBadge: z.string().min(1),
  availabilityLine: z.string().min(1),
  tagline: z.string().min(1),
  contactCta: z.string().min(1),
})

export const aboutSettingsSchema = z.object({
  isVisible: z.boolean().default(true),
  cornerLabel: z.string().min(1),
  whatsUpLabel: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1).max(8),
  polaroidLeftCaption: z.string().optional().nullable(),
  polaroidRightCaption: z.string().optional().nullable(),
  polaroidLeftImageId: z.string().uuid().optional().nullable(),
  polaroidRightImageId: z.string().uuid().optional().nullable(),
})

export const sectionSettingsSchema = z.object({
  isVisible: z.boolean().default(true),
  label: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  intro: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  footerNote: z.string().optional().nullable(),
  period: z.string().optional().nullable(),
  placeholderCta: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  reelTag: z.string().optional().nullable(),
  companiesTitle: z.string().optional().nullable(),
  connectLabel: z.string().optional().nullable(),
  heading: z.string().optional().nullable(),
  availabilityNote: z.string().optional().nullable(),
})

export const mediaFieldsSchema = z.object({
  mediaType: mediaTypeSchema.default("none"),
  mediaUrl: z.string().optional().nullable(),
})

export const projectSchema = publishFieldsSchema.extend({
  title: z.string().min(1),
  category: z.string().min(1),
  year: z.string().min(4).max(8),
  description: z.string().min(1),
  accentColor: z.string().min(1),
  hoverBgColor: z.string().min(1),
  tagTextColor: z.string().min(1),
  externalUrl: z.string().url().optional().nullable().or(z.literal("")),
  coverAssetId: z.string().uuid().optional().nullable(),
  isFeatured: z.boolean().default(false),
  mediaType: mediaTypeSchema.default("none"),
  mediaUrl: z.string().optional().nullable(),
})

export const showreelVideoSchema = publishFieldsSchema.extend({
  title: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  thumbnailAssetId: z.string().uuid().optional().nullable(),
  isFeatured: z.boolean().default(false),
  mediaType: mediaTypeSchema.default("none"),
  mediaUrl: z.string().optional().nullable(),
})

export const serviceSchema = publishFieldsSchema.extend({
  number: z.string().min(1).max(4),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  accentColor: z.string().min(1),
  isFeatured: z.boolean().default(false),
})

export const experienceSchema = publishFieldsSchema.extend({
  period: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
  description: z.string().min(1),
  accentColor: z.string().min(1),
})

export const companyLogoSchema = publishFieldsSchema.extend({
  name: z.string().min(1),
  accentColor: z.string().min(1),
  url: z.string().url().optional().nullable().or(z.literal("")),
  logoAssetId: z.string().uuid().optional().nullable(),
})

export const skillCategorySchema = publishFieldsSchema.extend({
  title: z.string().min(1),
  skills: z.array(z.string().min(1)).min(1),
  accentColor: z.string().min(1),
})

export const experimentalItemSchema = publishFieldsSchema.extend({
  label: z.string().min(1),
  coverAssetId: z.string().uuid().optional().nullable(),
  isFeatured: z.boolean().default(false),
  mediaType: mediaTypeSchema.default("none"),
  mediaUrl: z.string().optional().nullable(),
})

export const socialLinkSchema = publishFieldsSchema.extend({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().min(1),
  iconKey: socialIconKeySchema,
  openInNewTab: z.boolean().default(false),
})

export const testimonialSchema = publishFieldsSchema.extend({
  quote: z.string().min(1),
  authorName: z.string().min(1),
  authorRole: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  avatarAssetId: z.string().uuid().optional().nullable(),
  isFeatured: z.boolean().default(false),
})

export const reorderSchema = z.object({
  table: z.enum([
    "projects",
    "showreel_videos",
    "services",
    "experience_entries",
    "skill_categories",
    "experimental_items",
    "social_links",
    "testimonials",
    "company_logos",
  ]),
  orderedIds: z.array(z.string().uuid()).min(1),
})

export const mediaUrlInputSchema = z
  .string()
  .optional()
  .nullable()
  .refine(
    (val) => {
      if (!val?.trim()) return true
      return (
        youtubeUrlSchema.safeParse(val).success ||
        instagramUrlSchema.safeParse(val).success ||
        z.string().url().safeParse(val).success
      )
    },
    { message: "Invalid media URL" }
  )
