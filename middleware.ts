import { get } from '@vercel/edge-config'
import { NextRequest, NextResponse } from 'next/server'

// https://vercel.com/docs/edge-network/redirects
// https://github.com/vercel/examples/blob/f172cedc3ec6399823fa1319e93e2588d40f1cfe/edge-middleware/maintenance-page/middleware.ts
export async function middleware(request: NextRequest) {
  try {
    const redirect = ((await get('redirects')) as Array<any>)?.find(
      ({ source }) => source === request.nextUrl.pathname,
    )

    if (redirect) {
      return NextResponse.redirect(new URL(redirect.destination, request.url), {
        status: redirect.permanent ? 308 : 307,
      })
    }
  } catch (err) {
    console.error(err)
  }
}

export const config = {
  matcher: [
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
