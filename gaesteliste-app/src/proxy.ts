import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // First apply i18n routing
  const intlResponse = intlMiddleware(request);

  // If intl redirected (e.g. locale detection), pass through
  if (intlResponse.status !== 200) {
    return intlResponse;
  }

  // Then apply Supabase session refresh + auth guard
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
