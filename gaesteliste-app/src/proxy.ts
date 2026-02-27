import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // 1. Always run Supabase session refresh first so cookies are fresh for
  //    both the auth-guard check and any subsequent Server Components.
  const sessionResponse = await updateSession(request);

  // 2. If the session middleware issued a redirect (unauthenticated user,
  //    or already-authenticated user hitting login page), return that redirect
  //    immediately — no point running i18n routing on top of it.
  if (sessionResponse.status === 307 || sessionResponse.status === 302) {
    return sessionResponse;
  }

  // 3. Apply next-intl routing (locale detection / prefix redirects).
  //    We pass the original request so intl can read Accept-Language etc.
  const intlResponse = intlMiddleware(request);

  // 4. If intl issued a redirect (e.g. / → /de), merge the refreshed
  //    session cookies into the intl redirect response so the session is
  //    not lost across the locale redirect.
  if (intlResponse.status === 307 || intlResponse.status === 302) {
    sessionResponse.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return intlResponse;
  }

  // 5. Normal request — return the session response which already carries
  //    the refreshed cookies and the correct Next.js response.
  return sessionResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
