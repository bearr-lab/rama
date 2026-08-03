import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/update-session';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // 1. Generate response using next-intl middleware for locale routing
  const intlResponse = intlMiddleware(request);

  // 2. Manage Supabase Session (refreshes auth cookies securely)
  const { response, userId } = await updateSession(request, intlResponse);

  // 3. Simple Route Protection (Workspace requires auth)
  const isWorkspace = request.nextUrl.pathname.includes('/dashboard') || 
                      request.nextUrl.pathname.includes('/shortlist') || 
                      request.nextUrl.pathname.includes('/portfolio');

  if (isWorkspace && !userId) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/login`;
    return NextResponse.redirect(url);
  }

  // Required for Google Sign-In popup to communicate back to the app (if any popup flows remain)
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');

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
