import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import {
  GOOGLE_STATE_COOKIE,
  GOOGLE_VERIFIER_COOKIE,
  getGoogleRedirectUri,
  googleOAuthCookieOptions,
} from "@/lib/auth/google";

export async function GET(request: Request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=google_not_configured", request.url));
  }

  const state = randomBytes(32).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", getGoogleRedirectUri(request.url));
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("scope", "openid email profile");
  authorizationUrl.searchParams.set("state", state);
  authorizationUrl.searchParams.set("code_challenge", challenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");
  authorizationUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set(GOOGLE_STATE_COOKIE, state, googleOAuthCookieOptions);
  response.cookies.set(GOOGLE_VERIFIER_COOKIE, verifier, googleOAuthCookieOptions);

  return response;
}
