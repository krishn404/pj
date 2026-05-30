"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Settings,
  Home,
  Film,
  Briefcase,
  FlaskConical,
  Layers,
  Route,
  Sparkles,
  MessageSquareQuote,
  Mail,
  User,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Page",
    items: [
      { href: "/admin/settings", label: "Site", icon: Settings },
      { href: "/admin/hero", label: "Hero", icon: Home },
      { href: "/admin/about", label: "About", icon: User },
    ],
  },
  {
    label: "Sections",
    items: [
      { href: "/admin/showreel", label: "Video gallery", icon: Film },
      { href: "/admin/work", label: "Work", icon: Briefcase },
      { href: "/admin/experimental", label: "Playground", icon: FlaskConical },
      { href: "/admin/services", label: "Services", icon: Layers },
      { href: "/admin/experience", label: "Experience", icon: Route },
      { href: "/admin/skills", label: "Skills", icon: Sparkles },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
      { href: "/admin/contact", label: "Contact", icon: Mail },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside className="admin-sidebar flex w-[var(--admin-sidebar-width)] shrink-0 flex-col border-r">
      <div className="border-b border-border px-5 py-6">
        <p className="font-boldonse text-lg leading-none tracking-wide text-foreground">
          STUDIO
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          bhai ka garrage
        </p>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="admin-label mb-2 px-2">{group.label}</p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon, exact }) => {
                const active = isActive(href, exact)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "admin-nav-active font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-80" />
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
        >
          View live site
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  )
}
