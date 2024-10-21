import { routing } from "@/i18n/routing";
import { getSession } from "@/session";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);

  const user = await getSession();
  if (!(user || request.nextUrl.pathname === "/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|icon.svg).*)"],
};
