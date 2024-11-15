import { getSession } from "@/session";
import { type NextRequest, NextResponse } from "next/server";
import { urlPermissions } from "./lib/permissions";

export async function middleware(request: NextRequest) {
  const user = await getSession();
  if (!user && request.nextUrl.pathname !== "/login") {
    return Response.redirect(new URL("/login", request.url));
  }
  if (user) {
    if (
      !user?.permissions?.includes("agent_stat") &&
      request.nextUrl.pathname !== "/reports/supplier"
    ) {
      return Response.redirect(new URL("/reports/supplier", request.url));
    }
    if (
      Object.keys(urlPermissions).some((key) => {
        return (
          !user?.permissions?.includes(urlPermissions[key]) &&
          request.nextUrl.pathname === key
        );
      })
    ) {
      return Response.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|icon.svg).*)"],
};
