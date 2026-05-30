import Link from "next/link"
import { ArrowUpRight, Circle } from "lucide-react"
import type { PortfolioDTO } from "@/lib/cms/types/portfolio"
import { normalizeTestimonials } from "@/lib/cms/normalize-portfolio"

const shortcuts = [
  { href: "/admin/hero", label: "Hero", tag: "tag-gold", desc: "Name, roles, tagline" },
  { href: "/admin/work", label: "Work", tag: "tag-pink", desc: "Projects & case studies" },
  { href: "/admin/showreel", label: "Video gallery", tag: "tag-mint", desc: "YouTube & Instagram embeds" },
  { href: "/admin/services", label: "Services", tag: "tag-cream", desc: "Offerings & tags" },
  { href: "/admin/experience", label: "Experience", tag: "tag-cyan", desc: "Timeline & logos" },
  { href: "/admin/contact", label: "Contact", tag: "tag-gold", desc: "Links & heading" },
] as const

const statAccents = [
  "admin-stat-accent-gold",
  "admin-stat-accent-mint",
  "admin-stat-accent-pink",
  "admin-stat-accent-cyan",
  "admin-stat-accent-cream",
  "admin-stat-accent-gold",
] as const

export function AdminDashboardHome({
  portfolio,
  dbConnected,
}: {
  portfolio: PortfolioDTO
  dbConnected: boolean
}) {
  const testimonials = normalizeTestimonials(portfolio.testimonials)

  const counts = [
    { label: "Projects", value: portfolio.work.projects.length, edit: "/admin/work" },
    { label: "Services", value: portfolio.services.items.length, edit: "/admin/services" },
    { label: "Experience", value: portfolio.experience.items.length, edit: "/admin/experience" },
    { label: "Skills", value: portfolio.skills.categories.length, edit: "/admin/skills" },
    { label: "Social links", value: portfolio.contact.links.length, edit: "/admin/contact" },
    { label: "Testimonials", value: testimonials.items.length, edit: "/admin/testimonials" },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <header className="space-y-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="tag-mint sticky-note inline-block px-2 py-1 font-mono text-[10px] uppercase tracking-wider">
              {dbConnected ? "Live database" : "Offline fallback"}
            </span>
            <h1 className="mt-4 font-boldonse text-4xl md:text-5xl tracking-wide text-foreground leading-tight">
              {portfolio.site.name.split(" ")[0]}
              <br />
              <span className="text-muted-foreground">
                {portfolio.site.name.split(" ").slice(1).join(" ") || "CMS"}
              </span>
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
              idhar na changes kr sktey ho Website ke. like adding more work , chanding details like contact,mail, instagram id  kabhi dikkat aaye toh no stress hmu
            </p>
          </div>
          <div
            className={`admin-panel flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-wider ${
              dbConnected ? "text-foreground" : "text-amber-800 bg-amber-50"
            }`}
          >
            <Circle
              className={`h-2 w-2 fill-current ${dbConnected ? "text-emerald-600" : "text-amber-600"}`}
            />
            {dbConnected ? "Postgres connected" : "Using local fallback"}
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {portfolio.site.title} · {portfolio.site.location}
        </p>
      </header>

      <section>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Quick edit
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="admin-panel group flex flex-col gap-3 p-4 transition-shadow hover:shadow-[3px_3px_0_rgba(0,0,0,0.06)]"
            >
              <span
                className={`${item.tag} sticky-note w-fit px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider`}
              >
                {item.label}
              </span>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
              <span className="mt-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100">
                Open
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Content inventory
        </h2>
        <ul className="admin-panel divide-y divide-border">
          {counts.map((row, i) => (
            <li key={row.label}>
              <Link
                href={row.edit}
                className={`flex items-center justify-between gap-4 px-4 py-3.5 transition-colors hover:bg-secondary/80 ${statAccents[i % statAccents.length]}`}
              >
                <span className="text-sm font-medium">{row.label}</span>
                <span className="flex items-center gap-3">
                  <span className="font-mono text-2xl tabular-nums leading-none">
                    {row.value}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-panel p-5">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Site identity
        </h2>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Display name</dt>
            <dd className="font-medium">{portfolio.site.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Headline</dt>
            <dd className="font-medium">{portfolio.site.title}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">{portfolio.site.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Availability</dt>
            <dd className="font-medium">{portfolio.site.availability}</dd>
          </div>
        </dl>
        <Link
          href="/admin/settings"
          className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          Edit site settings
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </section>
    </div>
  )
}
