import { createI18nMiddleware } from "next-international/middleware";
import type { NextRequest } from "next/server";
import { getSession } from "./session";

const I18nMiddleware = createI18nMiddleware({
  locales: ["zh"],
  defaultLocale: "zh",
  urlMappingStrategy: "rewriteDefault",
});

export async function middleware(request: NextRequest) {
  const user = await getSession();
  if (!(user || request.nextUrl.pathname === "/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|icon.svg).*)"],
};
