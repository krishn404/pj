import type { MediaEmbedDTO } from "./media"

export type SiteDTO = {
  name: string
  title: string
  tagline: string
  location: string
  locationShort: string
  availability: string
  email: string
  phone: string
  phoneDisplay: string
  instagram: { handle: string; url: string }
  navLogoText: string
  seo: {
    title: string
    description: string
    keywords: string[]
    ogDescription: string
  }
}

export type HeroDTO = {
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

export type AboutDTO = {
  isVisible: boolean
  cornerLabel: string
  whatsUpLabel: string
  paragraphs: string[]
  polaroidLeftCaption: string | null
  polaroidRightCaption: string | null
}

export type ShowreelSectionDTO = {
  isVisible: boolean
  label: string
  title: string
  period: string
  placeholderCta: string
  caption: string
  reelTag: string
  videos: ShowreelVideoDTO[]
}

export type ShowreelVideoDTO = {
  id: string
  title: string | null
  caption: string | null
  media: MediaEmbedDTO
}

export type WorkSectionDTO = {
  isVisible: boolean
  label: string
  title: string
  projects: ProjectDTO[]
}

export type ProjectDTO = {
  id: string
  title: string
  category: string
  year: string
  description: string
  accent: string
  hoverBg: string
  tagText: string
  externalUrl: string | null
  media: MediaEmbedDTO
}

export type ExperimentalSectionDTO = {
  isVisible: boolean
  label: string
  title: string
  description: string
  footerNote: string
  items: ExperimentalItemDTO[]
}

export type ExperimentalItemDTO = {
  id: string
  label: string
  media: MediaEmbedDTO
}

export type ServicesSectionDTO = {
  isVisible: boolean
  label: string
  title: string
  intro: string
  items: ServiceDTO[]
}

export type ServiceDTO = {
  id: string
  number: string
  title: string
  description: string
  tags: string[]
  color: string
}

export type ExperienceSectionDTO = {
  isVisible: boolean
  label: string
  title: string
  companiesTitle: string
  items: ExperienceItemDTO[]
  companyLogos: CompanyLogoDTO[]
}

export type ExperienceItemDTO = {
  id: string
  period: string
  role: string
  company: string
  description: string
  color: string
}

export type CompanyLogoDTO = {
  id: string
  name: string
  accentColor: string
  url: string | null
}

export type SkillsSectionDTO = {
  isVisible: boolean
  label: string
  title: string
  categories: SkillCategoryDTO[]
}

export type SkillCategoryDTO = {
  id: string
  title: string
  skills: string[]
  color: string
}

export type ContactSectionDTO = {
  isVisible: boolean
  connectLabel: string
  heading: string
  availabilityNote: string
  links: SocialLinkDTO[]
  footer: {
    location: string
    remote: string
  }
}

export type SocialLinkDTO = {
  id: string
  label: string
  value: string
  href: string
  iconKey: "email" | "phone" | "instagram" | "linkedin" | "twitter" | "youtube" | "website" | "other"
  external: boolean
}

export type TestimonialDTO = {
  id: string
  quote: string
  authorName: string
  authorRole: string | null
  company: string | null
}

export type TestimonialsSectionDTO = {
  isVisible: boolean
  label: string
  title: string
  items: TestimonialDTO[]
}

export type PortfolioDTO = {
  site: SiteDTO
  hero: HeroDTO
  about: AboutDTO
  showreel: ShowreelSectionDTO
  work: WorkSectionDTO
  experimental: ExperimentalSectionDTO
  services: ServicesSectionDTO
  experience: ExperienceSectionDTO
  skills: SkillsSectionDTO
  contact: ContactSectionDTO
  testimonials: TestimonialsSectionDTO
}
