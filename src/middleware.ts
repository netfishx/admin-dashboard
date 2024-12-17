import { getRedirectUrl, urlPermissions } from "@/lib/permissions";
import { getSession } from "@/session";
import { type NextRequest, NextResponse } from "next/server";

function needAuth(url: string) {
  return urlPermissions.some(({ url: permUrl }) => permUrl === url);
}

export async function middleware(request: NextRequest) {
  if (!needAuth(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const user = await getSession();
  if (!user) {
    return Response.redirect(new URL("/login", request.url));
  }
  const permissions = urlPermissions.filter(
    ({ url }) => url === request.nextUrl.pathname,
  );
  if (
    permissions.some(({ permission }) => user.permissions.includes(permission))
  ) {
    return NextResponse.next();
  }
  return Response.redirect(
    new URL(getRedirectUrl(user.permissions), request.url),
  );
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|icon.svg).*)"],
};
