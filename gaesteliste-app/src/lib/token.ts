/**
 * Tamper-proof QR ticket tokens using HMAC-SHA256.
 *
 * Token structure:  <base64url(JSON-payload)>.<base64url(HMAC-SHA256 signature)>
 *
 * Payload fields:
 *   gid  — guest UUID (primary DB key, not guessable)
 *   vd   — visit date (YYYY-MM-DD), so a token is only valid for one day
 *   v    — schema version (= 1)
 *
 * Security properties:
 *   - Tokens cannot be forged without knowledge of TICKET_SECRET
 *   - Tokens cannot be reused for a different guest (gid is bound)
 *   - Signature comparison uses timingSafeEqual to prevent timing attacks
 *   - The payload itself is public (base64-encoded, not encrypted); only integrity
 *     is guaranteed — do NOT put sensitive data in the payload
 *
 * Set TICKET_SECRET to a random 32+ byte hex string:
 *   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 */

import { createHmac, timingSafeEqual } from "crypto";
import { randomUUID } from "crypto";

export { randomUUID };

interface TokenPayload {
  gid: string;   // guest ID
  vd: string;    // visit date (YYYY-MM-DD)
  v: 1;          // schema version
}

function getSecret(): string {
  const s = process.env.TICKET_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "TICKET_SECRET is not set or too short. " +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    );
  }
  return s;
}

/**
 * Creates a signed token string for a given guest.
 * Store the returned value in guests.qr_token.
 */
export function signToken(guestId: string, visitDate: string): string {
  const payload: TokenPayload = { gid: guestId, vd: visitDate, v: 1 };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(encoded).digest("base64url");
  return `${encoded}.${sig}`;
}

export type VerifiedToken = { guestId: string; visitDate: string };

/**
 * Verifies a token. Returns the payload on success, null on any failure
 * (invalid format, bad signature, wrong version).
 * Uses constant-time comparison to prevent timing attacks.
 */
export function verifyToken(token: string): VerifiedToken | null {
  if (!token || typeof token !== "string") return null;

  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return null;

  const encoded = token.slice(0, dotIndex);
  const receivedSig = token.slice(dotIndex + 1);

  let expectedSig: string;
  try {
    expectedSig = createHmac("sha256", getSecret()).update(encoded).digest("base64url");
  } catch {
    return null;
  }

  // Constant-time comparison — both buffers must be the same length
  const a = Buffer.from(receivedSig, "utf8");
  const b = Buffer.from(expectedSig, "utf8");
  if (a.length !== b.length) return null;

  let match = false;
  try {
    match = timingSafeEqual(a, b);
  } catch {
    return null;
  }

  if (!match) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as TokenPayload;

    if (payload.v !== 1 || !payload.gid || !payload.vd) return null;
    return { guestId: payload.gid, visitDate: payload.vd };
  } catch {
    return null;
  }
}
