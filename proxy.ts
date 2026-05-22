import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("user_token")?.value
    || request.headers.get("authorization")?.replace("Bearer ", "")

  const { pathname } = request.nextUrl

  if (pathname.startsWith("/dashboard") && !token) {
    const url = request.nextUrl.clone()
    url.pathname = "/signin"
    url.searchParams.set("redirect", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
