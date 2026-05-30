"use client"

import { useRouter } from "next/navigation"
import { lockAdminSession } from "@/app/actions/admin-auth"
import { Button } from "@/components/ui/button"

export function AdminSignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await lockAdminSession()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      className="font-mono text-[10px] uppercase tracking-wider"
    >
      Lock desk
    </Button>
  )
}
