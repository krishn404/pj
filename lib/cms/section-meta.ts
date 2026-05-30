import type { PortfolioDTO } from "@/lib/cms/types/portfolio"

export type PublicSectionKey =
  | "hero"
  | "about"
  | "showreel"
  | "work"
  | "experimental"
  | "services"
  | "experience"
  | "skills"
  | "testimonials"
  | "contact"

export type PublicNavIcon = "home" | "star" | "play" | "folder" | "briefcase"

export type PublicNavItem = {
  label: string
  href: string
  icon: PublicNavIcon
  sectionKey: PublicSectionKey
}

type NavCatalogItem = PublicNavItem & {
  titleFrom?: (p: PortfolioDTO) => string
}

const NAV_CATALOG: NavCatalogItem[] = [
  { label: "Home", href: "#home", icon: "home", sectionKey: "hero" },
  { label: "About", href: "#about", icon: "star", sectionKey: "about" },
  {
    label: "Videos",
    href: "#showreel",
    icon: "play",
    sectionKey: "showreel",
    titleFrom: (p) => p.showreel.title,
  },
  { label: "Work", href: "#work", icon: "folder", sectionKey: "work" },
  { label: "Experience", href: "#experience", icon: "briefcase", sectionKey: "experience" },
]

export function isSectionVisible(portfolio: PortfolioDTO, key: PublicSectionKey): boolean {
  switch (key) {
    case "hero":
      return portfolio.hero.isVisible
    case "about":
      return portfolio.about.isVisible
    case "showreel":
      return portfolio.showreel.isVisible
    case "work":
      return portfolio.work.isVisible
    case "experimental":
      return portfolio.experimental.isVisible
    case "services":
      return portfolio.services.isVisible
    case "experience":
      return portfolio.experience.isVisible
    case "skills":
      return portfolio.skills.isVisible
    case "testimonials":
      return portfolio.testimonials.isVisible
    case "contact":
      return portfolio.contact.isVisible
    default:
      return true
  }
}

export function buildPublicNavItems(portfolio: PortfolioDTO): PublicNavItem[] {
  return NAV_CATALOG.filter((item) => isSectionVisible(portfolio, item.sectionKey)).map(
    ({ titleFrom, ...item }) => ({
      ...item,
      label:
        item.sectionKey === "showreel" && titleFrom
          ? navLabelForShowreel(portfolio)
          : item.label,
    })
  )
}

function navLabelForShowreel(portfolio: PortfolioDTO): string {
  const title = portfolio.showreel.title.trim()
  if (!title) return "Videos"
  if (title.toLowerCase().includes("gallery")) return "Videos"
  return title.length <= 14 ? title : "Videos"
}
