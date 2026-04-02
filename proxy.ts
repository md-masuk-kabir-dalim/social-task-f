import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProd = process.env.NODE_ENV === "production";

// Cookie names
const USER_ACCESS = isProd ? "__Secure-AT" : "__Local-AT";
const USER_REFRESH = isProd ? "__Secure-RT" : "__Local-RT";

// Public routes
const publicRoutes = ["/", "/login", "/register"];

function isAuthenticated(request: NextRequest) {
  const hasAccess = !!request.cookies.get(USER_ACCESS);
  const hasRefresh = !!request.cookies.get(USER_REFRESH);
  return hasAccess || hasRefresh;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  if (publicRoutes.includes(pathname)) {
    if (isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }
    return NextResponse.next();
  }

  // Private routes
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/feed", "/profile"],
};
