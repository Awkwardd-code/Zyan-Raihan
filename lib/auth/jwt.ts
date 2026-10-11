import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const USER_SESSION_COOKIE = "user_session";
export const USER_REFRESH_COOKIE = "user_refresh";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "development-user-secret-change-me"
);

export async function signJwt(
  payload: Record<string, string | number | boolean>,
  expiresIn: string
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  rememberMe = false
) {
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;

  response.cookies.set(USER_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(USER_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(USER_SESSION_COOKIE)?.value ?? null;
}
