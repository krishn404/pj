"use server"

import { cookies } from "next/headers"
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
} from "@/lib/admin/session.server"

const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function unlockAdminSession() {
  const cookieStore = await cookies()
  const token = createAdminSessionToken()

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })

  return { ok: true as const }
}

export async function lockAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}
