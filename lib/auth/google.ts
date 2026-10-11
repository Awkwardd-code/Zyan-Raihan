export const GOOGLE_STATE_COOKIE = "google_oauth_state";
export const GOOGLE_VERIFIER_COOKIE = "google_oauth_verifier";

export const googleOAuthCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 10 * 60,
};

export function getGoogleRedirectUri(requestUrl: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl;
  return new URL("/api/auth/google/callback", appUrl).toString();
}
