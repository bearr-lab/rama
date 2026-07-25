import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { updateSession } from '@/lib/supabase/middleware'

const intlMiddleware = createMiddleware(routing)

export default async function proxy(request: NextRequest) {
  // 1. Generate response using next-intl middleware for locale routing
  const intlResponse = intlMiddleware(request)

  // 2. Pass the i18n response to Supabase to append session cookies
  const { response, user } = await updateSession(request, intlResponse)

  // Very basic route protection logic (to be expanded)
  const isAuthRoute = request.nextUrl.pathname.includes('/login')
  const isWorkspaceRoute = request.nextUrl.pathname.includes('/shortlist') || request.nextUrl.pathname.includes('/advisor')

  const hasSession = !!user

  if (isWorkspaceRoute && !hasSession) {
    const locale = request.nextUrl.pathname.split('/')[1] || 'en'
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if (isAuthRoute && hasSession) {
    const locale = request.nextUrl.pathname.split('/')[1] || 'en'
    return NextResponse.redirect(new URL(`/${locale}/homes`, request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm)$).*)',
  ],
}
