"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import type { ActionResult } from "@/lib/cms/admin/types"

export function useAdminAction() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function run<T>(
    action: () => Promise<ActionResult<T>>,
    options?: { successMessage?: string; redirect?: string }
  ) {
    setPending(true)
    const result = await action()
    setPending(false)

    if (!result.success) {
      toast.error(result.error)
      return null
    }

    toast.success(options?.successMessage ?? "Saved")
    router.refresh()
    if (options?.redirect) router.push(options.redirect)
    return (result.data ?? null) as T | null
  }

  return { pending, run }
}
