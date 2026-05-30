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
import { buildPortfolioDTO } from "@/lib/cms/mappers/to-portfolio"
import type { PortfolioDTO } from "@/lib/cms/types/portfolio"
import { legacyProjects, legacyWorkSection } from "@/lib/cms/seed/legacy-projects"

const COMPANY_ACCENT: Record<string, string> = {
  Vibrantick: "var(--cyan)",
  "Ellement Co.": "var(--pink)",
  "Tharun Speaks": "var(--mint)",
  Napstack: "var(--cream)",
}

/** Server-only fallback when DATABASE_URL is not configured (local dev). */
export function getLegacyPortfolioFallback(): PortfolioDTO {
  return buildPortfolioDTO({
    site: {
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
      seoTitle: null,
      seoDescription: null,
      seoKeywords: [
        "video editor",
        "visual artist",
        "motion graphics",
        "video editing",
        "content creator",
        "Punjab",
      ],
      ogDescription: null,
    },
    hero: { ...hero, isVisible: true },
    about: {
      isVisible: true,
      cornerLabel: about.cornerLabel,
      whatsUpLabel: about.whatsUpLabel,
      paragraphs: [...about.paragraphs],
      polaroidLeftCaption: about.polaroidLeftCaption,
      polaroidRightCaption: about.polaroidRightCaption,
    },
    sections: {
      showreel: {
        isVisible: true,
        label: showreel.label,
        title: showreel.title,
        period: showreel.period,
        placeholderCta: showreel.placeholderCta,
        caption: showreel.caption,
        reelTag: showreel.reelTag,
      },
      work: {
        label: legacyWorkSection.label,
        title: legacyWorkSection.title,
      },
      experimental: {
        label: experimental.label,
        title: experimental.title,
        description: experimental.description,
        footerNote: experimental.footerNote,
      },
      services: {
        label: services.label,
        title: services.title,
        intro: services.intro,
      },
      experience: {
        label: experience.label,
        title: experience.title,
        companiesTitle: experience.companiesTitle,
      },
      skills: {
        label: skills.label,
        title: skills.title,
      },
      contact: {
        connectLabel: contact.connectLabel,
        heading: contact.heading,
        availabilityNote: contact.availabilityNote,
      },
    },
    showreelVideos: [],
    projects: legacyProjects.map((p, i) => ({
      id: `legacy-project-${i}`,
      ...p,
      externalUrl: null,
      mediaType: "none" as const,
      mediaUrl: null,
      mediaEmbedId: null,
    })),
    experimentalItems: experimental.videoPlaceholders.map((label, i) => ({
      id: `legacy-experimental-${i}`,
      label,
      mediaType: "none" as const,
      mediaUrl: null,
      mediaEmbedId: null,
    })),
    services: services.items.map((s, i) => ({
      id: `legacy-service-${i}`,
      number: s.number,
      title: s.title,
      description: s.description,
      tags: [...s.tags],
      accentColor: s.color,
    })),
    experienceEntries: experience.items.map((e, i) => ({
      id: `legacy-experience-${i}`,
      period: e.period,
      role: e.role,
      company: e.company,
      description: e.description,
      accentColor: e.color,
    })),
    companyLogos: experience.companyLogos.map((name, i) => ({
      id: `legacy-company-${i}`,
      name,
      accentColor: COMPANY_ACCENT[name] ?? "var(--foreground)",
      url: null,
    })),
    skillCategories: skills.categories.map((c, i) => ({
      id: `legacy-skill-${i}`,
      title: c.title,
      skills: [...c.skills],
      accentColor: c.color,
    })),
    socialLinks: contact.links.map((link, i) => ({
      id: `legacy-social-${i}`,
      label: link.label,
      value: link.value,
      href: link.href,
      iconKey:
        link.label === "Email"
          ? "email"
          : link.label === "Phone"
            ? "phone"
            : link.label === "Instagram"
              ? "instagram"
              : "other",
      openInNewTab: "external" in link && Boolean(link.external),
    })),
    testimonials: {
      label: "Testimonials",
      title: "KIND WORDS",
      items: [],
    },
  })
}
