import crypto from "node:crypto";

export const COOKIE_NAME = "session";
export const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET environment variable is not set. Generate one and set it before running the app.",
    );
  }
  return secret;
}

export function createSessionToken(studentId: string): string {
  const payload = JSON.stringify({
    sid: studentId,
    exp: Date.now() + MAX_AGE_SECONDS * 1000,
  });
  const body = Buffer.from(payload, "utf8").toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expectedSig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      sid?: unknown;
      exp?: unknown;
    };
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    if (typeof payload.sid !== "string") return null;
    return payload.sid;
  } catch {
    return null;
  }
}
