import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { setSessionCookie, signJwt } from "@/lib/auth/jwt";
import {
  GOOGLE_STATE_COOKIE,
  GOOGLE_VERIFIER_COOKIE,
  getGoogleRedirectUri,
} from "@/lib/auth/google";

type GoogleProfile = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
};

function loginRedirect(requestUrl: string, error: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || requestUrl;
  return NextResponse.redirect(new URL(`/login?error=${error}`, appUrl));
}

function clearOAuthCookies(response: NextResponse) {
  response.cookies.set(GOOGLE_STATE_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  response.cookies.set(GOOGLE_VERIFIER_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}

function isGoogleProfile(value: unknown): value is GoogleProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const profile = value as Record<string, unknown>;
  return (
    typeof profile.sub === "string" &&
    profile.sub.length > 0 &&
    typeof profile.email === "string" &&
    typeof profile.email_verified === "boolean" &&
    (profile.name === undefined || typeof profile.name === "string")
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get(GOOGLE_STATE_COOKIE)?.value;
  const verifier = cookieStore.get(GOOGLE_VERIFIER_COOKIE)?.value;

  if (url.searchParams.has("error")) {
    return clearOAuthCookies(loginRedirect(request.url, "google_auth_failed"));
  }

  if (!code || !returnedState || !expectedState || returnedState !== expectedState || !verifier) {
    return clearOAuthCookies(loginRedirect(request.url, "google_auth_failed"));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return clearOAuthCookies(loginRedirect(request.url, "google_not_configured"));
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: getGoogleRedirectUri(request.url),
        grant_type: "authorization_code",
        code_verifier: verifier,
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      throw new Error("Google token exchange failed.");
    }

    const tokenPayload: unknown = await tokenResponse.json();
    if (
      !tokenPayload ||
      typeof tokenPayload !== "object" ||
      typeof (tokenPayload as Record<string, unknown>).access_token !== "string"
    ) {
      throw new Error("Google token response was invalid.");
    }

    const accessToken = (tokenPayload as { access_token: string }).access_token;
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (!profileResponse.ok) {
      throw new Error("Google profile lookup failed.");
    }

    const profileData: unknown = await profileResponse.json();
    if (!isGoogleProfile(profileData) || !profileData.email_verified) {
      throw new Error("Google did not return a verified email address.");
    }

    const client = await clientPromise;
    const db = client?.db();
    if (!db) {
      throw new Error("Database is unavailable.");
    }

    const users = db.collection("users");
    const email = profileData.email.trim().toLowerCase();
    let user = await users.findOne({ googleId: profileData.sub });

    if (!user) {
      const existingUser = await users.findOne({ email });
      if (existingUser?.googleId && existingUser.googleId !== profileData.sub) {
        return clearOAuthCookies(loginRedirect(request.url, "google_account_conflict"));
      }

      if (existingUser) {
        await users.updateOne(
          { _id: existingUser._id },
          {
            $set: { googleId: profileData.sub, lastLoginAt: new Date(), updatedAt: new Date() },
            $addToSet: { authProviders: "google" },
          }
        );
        user = await users.findOne({ _id: existingUser._id });
      } else {
        const now = new Date();
        const newUser = {
          _id: new ObjectId(),
          name: profileData.name?.trim() || email.split("@")[0],
          email,
          passwordHash: null,
          googleId: profileData.sub,
          authProviders: ["google"],
          avatar: null,
          verifiedAt: now,
          lastLoginAt: now,
          createdAt: now,
          updatedAt: now,
        };

        try {
          await users.insertOne(newUser);
          user = newUser;
        } catch (error) {
          const isDuplicateKey =
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000;
          if (!isDuplicateKey) {
            throw error;
          }

          const racedUser = await users.findOne({ $or: [{ googleId: profileData.sub }, { email }] });
          if (!racedUser || (racedUser.googleId && racedUser.googleId !== profileData.sub)) {
            throw error;
          }

          if (!racedUser.googleId) {
            await users.updateOne(
              { _id: racedUser._id },
              {
                $set: { googleId: profileData.sub, lastLoginAt: new Date(), updatedAt: new Date() },
                $addToSet: { authProviders: "google" },
              }
            );
          }
          user = await users.findOne({ _id: racedUser._id });
        }
      }
    } else {
      await users.updateOne(
        { _id: user._id },
        { $set: { lastLoginAt: new Date(), updatedAt: new Date() }, $addToSet: { authProviders: "google" } }
      );
      user = await users.findOne({ _id: user._id });
    }

    if (!user || typeof user.email !== "string") {
      throw new Error("Unable to load the Google account.");
    }

    const sessionToken = await signJwt(
      { sub: String(user._id), email: user.email },
      "7d"
    );
    const response = NextResponse.redirect(new URL("/profile", process.env.NEXT_PUBLIC_APP_URL || request.url));
    setSessionCookie(response, sessionToken, false);

    return clearOAuthCookies(response);
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return clearOAuthCookies(loginRedirect(request.url, "google_auth_failed"));
  }
}
