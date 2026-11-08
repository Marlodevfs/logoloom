import crypto from 'crypto';

interface ProTokenPayload {
  email?: string;
  customerId?: string;
  status: 'pro';
  issuedAt: number;
  expiresAt: number; // Unix timestamp ms
}

function getSecretKey(): string {
  return (
    process.env.PRO_SIGNING_SECRET ||
    process.env.STRIPE_SECRET_KEY ||
    'logoloom-pro-cryptographic-salt-key-2026'
  );
}

/**
 * Creates a cryptographically signed HMAC-SHA256 Pro token.
 */
export function signProToken(data: { email?: string; customerId?: string; durationDays?: number }): string {
  const secret = getSecretKey();
  const issuedAt = Date.now();
  const duration = (data.durationDays || 365) * 24 * 60 * 60 * 1000;
  const expiresAt = issuedAt + duration;

  const payload: ProTokenPayload = {
    email: data.email,
    customerId: data.customerId,
    status: 'pro',
    issuedAt,
    expiresAt,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies the HMAC-SHA256 signature and expiration of a Pro token.
 */
export function verifyProToken(token: string): ProTokenPayload | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadBase64, providedSig] = parts;
  const secret = getSecretKey();

  try {
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(payloadBase64)
      .digest('base64url');

    // Constant-time comparison to prevent timing attacks
    const providedBuf = Buffer.from(providedSig);
    const expectedBuf = Buffer.from(expectedSig);

    if (providedBuf.length !== expectedBuf.length) return null;
    if (!crypto.timingSafeEqual(providedBuf, expectedBuf)) return null;

    const payloadJson = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    const payload: ProTokenPayload = JSON.parse(payloadJson);

    if (payload.status !== 'pro') return null;
    if (payload.expiresAt && Date.now() > payload.expiresAt) return null;

    return payload;
  } catch (err) {
    return null;
  }
}
