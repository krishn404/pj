import { z } from "zod"

export const publishStatusSchema = z.enum(["draft", "published"])
export const mediaTypeSchema = z.enum(["none", "youtube", "instagram", "image"])
export const sectionKeySchema = z.enum([
  "showreel",
  "work",
  "experimental",
  "services",
  "experience",
  "skills",
  "contact",
  "testimonials",
])
export const socialIconKeySchema = z.enum([
  "email",
  "phone",
  "instagram",
  "linkedin",
  "twitter",
  "youtube",
  "website",
  "other",
])
