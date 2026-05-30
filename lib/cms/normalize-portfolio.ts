import type {
  PortfolioDTO,
  ShowreelSectionDTO,
  ShowreelVideoDTO,
  TestimonialDTO,
  TestimonialsSectionDTO,
} from "@/lib/cms/types/portfolio"

function visible<T extends { isVisible?: boolean }>(section: T): T & { isVisible: boolean } {
  return { ...section, isVisible: section.isVisible !== false }
}

/** Handles stale cache / legacy shapes where testimonials was a bare array. */
export function normalizeTestimonials(
  value: TestimonialsSectionDTO | TestimonialDTO[] | unknown
): TestimonialsSectionDTO {
  if (Array.isArray(value)) {
    return {
      isVisible: true,
      label: "Testimonials",
      title: "KIND WORDS",
      items: value,
    }
  }

  if (value && typeof value === "object" && "items" in value) {
    const section = value as TestimonialsSectionDTO
    return visible({
      label: section.label ?? "Testimonials",
      title: section.title ?? "KIND WORDS",
      items: Array.isArray(section.items) ? section.items : [],
      isVisible: section.isVisible,
    })
  }

  return {
    isVisible: true,
    label: "Testimonials",
    title: "KIND WORDS",
    items: [],
  }
}

/** Handles stale cache where showreel used a single `featuredVideo`. */
export function normalizeShowreel(
  value: ShowreelSectionDTO | (Omit<ShowreelSectionDTO, "videos"> & { featuredVideo?: ShowreelVideoDTO | null })
): ShowreelSectionDTO {
  if (value && typeof value === "object" && "videos" in value && Array.isArray(value.videos)) {
    return visible(value)
  }

  const legacy = value as { featuredVideo?: ShowreelVideoDTO | null } & Omit<ShowreelSectionDTO, "videos">
  if (legacy?.featuredVideo) {
    const { featuredVideo: _f, ...rest } = legacy as ShowreelSectionDTO & { featuredVideo?: ShowreelVideoDTO | null }
    return visible({ ...rest, videos: [legacy.featuredVideo] })
  }

  const { featuredVideo: _f, ...rest } = legacy as ShowreelSectionDTO & { featuredVideo?: ShowreelVideoDTO | null }
  return visible({ ...rest, videos: [] })
}

export function normalizePortfolio(portfolio: PortfolioDTO): PortfolioDTO {
  return {
    ...portfolio,
    hero: visible(portfolio.hero),
    about: visible(portfolio.about),
    showreel: normalizeShowreel(portfolio.showreel),
    work: visible(portfolio.work),
    experimental: visible(portfolio.experimental),
    services: visible(portfolio.services),
    experience: visible(portfolio.experience),
    skills: visible(portfolio.skills),
    contact: visible(portfolio.contact),
    testimonials: normalizeTestimonials(
      portfolio.testimonials as TestimonialsSectionDTO | TestimonialDTO[]
    ),
  }
}
