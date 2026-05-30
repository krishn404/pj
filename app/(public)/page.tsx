import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Showreel } from "@/components/showreel"
import { Work } from "@/components/work"
import { Experimental } from "@/components/experimental"
import { Services } from "@/components/services"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Testimonials } from "@/components/testimonials"
import { getPortfolio } from "@/lib/cms/queries/get-portfolio"
import { normalizePortfolio } from "@/lib/cms/normalize-portfolio"
import { buildPublicNavItems } from "@/lib/cms/section-meta"

export const revalidate = 3600

export default async function Home() {
  const portfolio = normalizePortfolio(await getPortfolio())
  const navItems = buildPublicNavItems(portfolio)

  return (
    <main className="w-full overflow-x-clip">
      <Navigation
        logoText={portfolio.site.navLogoText}
        items={navItems}
        showContact={portfolio.contact.isVisible}
      />
      {portfolio.hero.isVisible && <Hero hero={portfolio.hero} site={portfolio.site} />}
      {portfolio.about.isVisible && <About about={portfolio.about} />}
      {portfolio.showreel.isVisible && <Showreel showreel={portfolio.showreel} />}
      {portfolio.work.isVisible && <Work work={portfolio.work} />}
      {portfolio.experimental.isVisible && (
        <Experimental experimental={portfolio.experimental} />
      )}
      {portfolio.services.isVisible && <Services services={portfolio.services} />}
      {portfolio.experience.isVisible && <Experience experience={portfolio.experience} />}
      {portfolio.skills.isVisible && <Skills skills={portfolio.skills} />}
      {portfolio.testimonials.isVisible && (
        <Testimonials testimonials={portfolio.testimonials} />
      )}
      {portfolio.contact.isVisible && (
        <Contact contact={portfolio.contact} site={portfolio.site} />
      )}
    </main>
  )
}
