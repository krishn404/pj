import { type NextRequest } from "next/server"
import { handleAdminAuth } from "@/lib/admin/middleware"

export function middleware(request: NextRequest) {
  return handleAdminAuth(request)
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
