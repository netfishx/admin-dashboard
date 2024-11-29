import { getSession } from "@/session";
import { type NextRequest, NextResponse } from "next/server";
import { getRedirectUrl, urlPermissions } from "./lib/permissions";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/landing" ||
    request.nextUrl.pathname === "/login"
  ) {
    return NextResponse.next();
  }
  const user = await getSession();
  if (!user && request.nextUrl.pathname !== "/login") {
    return Response.redirect(new URL("/login", request.url));
  }
  if (user) {
    if (
      Object.keys(urlPermissions).some((key) => {
        return (
          !user.permissions.includes(urlPermissions[key]) &&
          request.nextUrl.pathname === key
        );
      })
    ) {
      return Response.redirect(
        new URL(getRedirectUrl(user.permissions), request.url),
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|icon.svg).*)"],
};
