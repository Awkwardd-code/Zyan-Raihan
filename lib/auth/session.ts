import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { USER_SESSION_COOKIE, verifyJwt } from "@/lib/auth/jwt";

type UserRecord = Record<string, unknown> & {
  _id?: unknown;
  name?: unknown;
  email?: unknown;
  avatar?: unknown;
  verifiedAt?: unknown;
  lastLoginAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export function serializeUser(user: UserRecord) {
  return {
    _id: String(user._id ?? ""),
    name: typeof user.name === "string" ? user.name : "",
    email: typeof user.email === "string" ? user.email : "",
    avatar: user.avatar ?? null,
    verifiedAt: user.verifiedAt ?? null,
    lastLoginAt: user.lastLoginAt ?? null,
    createdAt: user.createdAt ?? null,
    updatedAt: user.updatedAt ?? null,
  };
}

export async function getCurrentUser(options?: { includePasswordHash?: boolean }) {
  const { includePasswordHash = false } = options ?? {};
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyJwt(token);

  if (!payload || typeof payload.sub !== "string" || typeof payload.email !== "string") {
    return null;
  }

  const client = await clientPromise;
  const db = client?.db();

  if (!db) {
    return null;
  }

  const user = await db.collection("users").findOne(
    { _id: new ObjectId(payload.sub) },
    includePasswordHash ? undefined : { projection: { passwordHash: 0 } }
  );

  if (!user) {
    return null;
  }

  if (includePasswordHash) {
    return user;
  }

  return serializeUser(user);
}

export async function requireUser(options?: { includePasswordHash?: boolean }) {
  const user = await getCurrentUser(options);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
