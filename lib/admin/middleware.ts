import { NextResponse, type NextRequest } from "next/server"
import { ADMIN_SESSION_COOKIE } from "./constants"
import { isValidAdminSession } from "./session-edge"

export function handleAdminAuth(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLogin = pathname === "/admin/login" || pathname.startsWith("/admin/login/")
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/")

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const authenticated = isValidAdminSession(token)

  if (!authenticated && !isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  if (authenticated && isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
