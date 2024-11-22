import type { User } from "@/lib/types";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const expiresTime = 24 * 60 * 60;

export type SessionData = User & {
  expires: string;
};

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiresTime} seconds`)
    .sign(key);
}

export async function verifyToken(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as SessionData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return null;
  }
  return await verifyToken(session);
}

export async function setSession(user: User) {
  const expires = new Date(Date.now() + expiresTime * 1000);
  const session: SessionData = {
    ...user,
    expires: expires.toISOString(),
  };
  const encryptedSession = await signToken(session);
  (await cookies()).set("session", encryptedSession, {
    expires,
    httpOnly: true,
    // secure: true,
    sameSite: "lax",
  });
}

export async function hasPermission(permission: string) {
  const session = await getSession();
  return session?.permissions.includes(permission) ?? false;
}

export async function signOut() {
  (await cookies()).delete("session");
}
