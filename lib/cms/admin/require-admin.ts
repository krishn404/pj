import "server-only"

import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/constants"
import { isValidAdminSession } from "@/lib/admin/session-edge"

export class AdminAuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message)
    this.name = "AdminAuthError"
  }
}

export async function requireAdmin(): Promise<void> {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value
  if (!isValidAdminSession(token)) {
    throw new AdminAuthError()
  }
}

export async function requireAdminDb() {
  await requireAdmin()
  const { db, isDatabaseConfigured } = await import("@/lib/cms/db")
  if (!isDatabaseConfigured() || !db) {
    throw new Error("Database is not configured.")
  }
  return db
}
