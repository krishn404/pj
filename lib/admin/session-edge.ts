import { ADMIN_SESSION_COOKIE } from "./constants"

export { ADMIN_SESSION_COOKIE }

/** Constant-time-ish compare without Node crypto (Edge middleware). */
export function isValidAdminSession(token: string | undefined): boolean {
  const expected = process.env.ADMIN_SESSION_SECRET
  if (!token || !expected) return false
  if (token.length !== expected.length) return false

  let mismatch = 0
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}
