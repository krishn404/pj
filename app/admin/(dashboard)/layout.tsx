export const dynamic = "force-dynamic"

import "../admin.css"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminSignOutButton } from "@/components/admin/admin-sign-out-button"
import { Toaster } from "@/components/ui/sonner"

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="admin-shell hero-canvas relative min-h-screen bg-background text-foreground">
      <div className="grain pointer-events-none opacity-40" aria-hidden />
      <div className="relative flex min-h-screen">
        <AdminSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="admin-main-header sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border px-6 md:px-8">
            <p className="admin-label mb-0">Content desk</p>
            <AdminSignOutButton />
          </header>
          <main className="flex-1 overflow-auto px-6 py-8 md:px-10 md:py-10">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}
