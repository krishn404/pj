"use client"

import { AlertTriangle, Database, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const message = error.message || "The admin database request failed."

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center">
      <section className="admin-panel w-full p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-background">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>

          <div className="min-w-0 flex-1 space-y-5">
            <div>
              <p className="admin-label">Admin database unavailable</p>
              <h1 className="mt-2 font-boldonse text-3xl tracking-wide text-foreground">
                Content desk could not load
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                These edit pages need the live CMS database. Check that
                <span className="font-mono text-foreground"> DATABASE_URL </span>
                is set in Vercel, reachable from the deployment, and seeded with the
                CMS tables.
              </p>
            </div>

            <div className="admin-panel bg-background p-4">
              <div className="flex items-start gap-3">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="admin-label">Server message</p>
                  <p className="mt-1 break-words font-mono text-xs text-muted-foreground">
                    {message}
                  </p>
                  {error.digest && (
                    <p className="mt-2 font-mono text-[11px] text-muted-foreground/80">
                      Digest: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button type="button" onClick={reset} className="w-fit">
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
