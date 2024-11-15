import { getSession } from "@/session";
import { type NextRequest, NextResponse } from "next/server";

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
      !user?.permissions?.includes("supplier_report") &&
      request.nextUrl.pathname === "/reports/supplier"
    ) {
      return Response.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|icon.svg).*)"],
};
