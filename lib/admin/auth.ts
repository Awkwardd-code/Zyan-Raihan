import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "development-admin-secret-change-me"
);

export async function signSession(email: string) {
  return new SignJWT({ email, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function compareAdminPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    return false;
  }

  return bcrypt.compare(password, hash);
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifySession(token);

  if (!payload || payload.sub !== "admin") {
    return null;
  }

  return {
    email: typeof payload.email === "string" ? payload.email : null,
    sub: typeof payload.sub === "string" ? payload.sub : null,
  };
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return null;
  }

  return admin;
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
