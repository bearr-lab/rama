import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(
  request: NextRequest,
  response?: NextResponse,
) {
  const supabaseResponse =
    response ||
    NextResponse.next({
      request,
    });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          // Preserve the original response (e.g. next-intl redirect) instead of recreating it
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // `getClaims` validates the JWT before proxy route protection trusts it.
  const { data: claims } = await supabase.auth.getClaims();

  return { response: supabaseResponse, userId: claims?.claims?.sub ?? null };
}
