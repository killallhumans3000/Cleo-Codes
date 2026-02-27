import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: No code between createServerClient and getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedPaths = ["/dashboard", "/guests", "/scanner"];
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    pathname.match(new RegExp(`^/(de|en)${path}`))
  );

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    const locale = pathname.split("/")[1] || "de";
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  if (
    user &&
    (pathname.match(/^\/(de|en)\/login$/) ||
      pathname.match(/^\/(de|en)\/register$/))
  ) {
    const url = request.nextUrl.clone();
    const locale = pathname.split("/")[1] || "de";
    url.pathname = `/${locale}/dashboard`;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
