import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export function AdminSectionLayout({
  title,
  description,
  backHref = "/admin",
  actions,
  children,
}: {
  title: string
  description?: string
  backHref?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={backHref}
            className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-3 w-3" />
            Back
          </Link>
          <h1 className="font-boldonse text-3xl tracking-wide text-foreground">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}
