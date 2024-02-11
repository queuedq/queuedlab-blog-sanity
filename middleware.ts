import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

// References
// https://vercel.com/docs/edge-network/redirects#edge-middleware
// https://github.com/vercel/next.js/discussions/15344#discussioncomment-6586944
// https://github.com/vercel/examples/blob/f172cedc3ec6399823fa1319e93e2588d40f1cfe/edge-middleware/maintenance-page/middleware.ts
export async function middleware(req: NextRequest) {
  try {
    const redirect = ((await get('redirects')) as Array<any>)?.find(
      ({ source }) => source === req.nextUrl.pathname,
    )
    if (!redirect) return

    req.nextUrl.pathname = redirect.destination
    return NextResponse.redirect(req.nextUrl, {
      status: redirect.permanent ? 308 : 307,
    })
  } catch (err) {
    console.error(err)
  }
}

export const config = {
  matcher: [
    // Reference: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
