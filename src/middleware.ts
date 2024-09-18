import createMiddleware from "next-intl/middleware";
import type { LocalePrefix } from "next-intl/routing";
import type { NextRequest } from "next/server";

export const localePrefix = "never" satisfies LocalePrefix;

export function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    defaultLocale: "zh",
    localePrefix: "never",
    locales: ["zh"],
  });
  const _user = request.cookies.get("user")?.value;

  // if (!user && request.nextUrl.pathname !== "/login") {
  //   return Response.redirect(new URL("/login", request.url));
  // }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
