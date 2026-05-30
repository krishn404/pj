import "server-only"
import { ADMIN_SESSION_COOKIE } from "./constants"

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set in .env.local")
  }
  return secret
}

/** Cookie value — must match edge validation in session-edge.ts */
export function createAdminSessionToken(): string {
  return getSecret()
}

export { ADMIN_SESSION_COOKIE }
