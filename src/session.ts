import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const expiresTime = 24 * 60 * 60 * 1000;

type User = {
  id: number;
};

type SessionData = {
  user: User;
  expires: string;
};

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as SessionData;
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return null;
  }
  return await verifyToken(session);
}

export async function setSession(user: User) {
  const expires = new Date(Date.now() + expiresTime);
  const session: SessionData = {
    user: { id: user.id },
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
