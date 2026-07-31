import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { updateSession } from '@/lib/supabase/update-session';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Generate response using next-intl middleware for locale routing
  const intlResponse = intlMiddleware(request);

  // 2. Pass the i18n response to Supabase to append session cookies
  const { response, userId } = await updateSession(request, intlResponse);

  const isAuthRoute = request.nextUrl.pathname.includes('/login');
  const isWorkspaceRoute =
    /\/(dashboard|discover|community|decision-lab|advisor|documents|portfolio|property|settings|shortlist|tasks)(?:\/|$)/.test(
      request.nextUrl.pathname,
    );

  const hasSession = Boolean(userId);

  if (isWorkspaceRoute && !hasSession) {
    const locale = request.nextUrl.pathname.split('/')[1] || 'en';
    const redirectResponse = NextResponse.redirect(
      new URL(
        `/${locale}/login?next=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.url,
      ),
    );
    // Preserve cookies from intlResponse (which includes Supabase session updates)
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  if (isAuthRoute && hasSession) {
    const locale = request.nextUrl.pathname.split('/')[1] || 'en';
    const redirectResponse = NextResponse.redirect(
      new URL(`/${locale}/dashboard`, request.url),
    );
    // Preserve cookies from intlResponse
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  return response;
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
    '/((?!api|_next/static|_next/image|favicon.ico|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|json|ico)$).*)',
  ],
};
