import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATH = "/auth/login";
const DASHBOARD_PATH = "/dashboard";

export const config = {
  matcher: ["/auth/login", "/dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("ACCESS_TOKEN");

  if (token && pathname === AUTH_PATH) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && pathname.startsWith(DASHBOARD_PATH)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
