import { type NextRequest, NextResponse } from "next/server"

/**
 * Language lives in the URL, not in a cookie.
 *
 * English stays at the root (`/about`) so the URLs already indexed keep
 * working, and Portuguese gets its own prefix (`/pt/about`). The prefix is
 * rewritten away here, so the route tree does not need a `[locale]` segment,
 * and the resolved locale travels to the server components as a request header.
 *
 * Choosing the language by IP or by cookie would hand the crawler a single
 * version and leave the other one unindexed, which is the whole problem this
 * solves.
 */

const PT_PREFIX = "/pt"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPortuguese = pathname === PT_PREFIX || pathname.startsWith(`${PT_PREFIX}/`)

  const headers = new Headers(request.headers)
  headers.set("x-locale", isPortuguese ? "pt-BR" : "en")
  headers.set(
    "x-pathname",
    isPortuguese ? pathname.slice(PT_PREFIX.length) || "/" : pathname
  )

  if (isPortuguese) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(PT_PREFIX.length) || "/"
    return NextResponse.rewrite(url, { request: { headers } })
  }

  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
