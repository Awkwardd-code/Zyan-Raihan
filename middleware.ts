import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { verifyJwt } from "@/lib/auth/jwt";

const ADMIN_SECRET = process.env.JWT_SECRET || "development-admin-secret-change-me";

const protectedUserPaths = ["/profile"];
const authOnlyPaths = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(ADMIN_SECRET));
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (protectedUserPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    const token = request.cookies.get("user_session")?.value;

    if (!token || !(await verifyJwt(token))) {
      return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(pathname)}`, request.url));
    }
  }

  if (authOnlyPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    const token = request.cookies.get("user_session")?.value;

    if (token && (await verifyJwt(token))) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/profile", "/login", "/register", "/forgot-password", "/reset-password"],
};
