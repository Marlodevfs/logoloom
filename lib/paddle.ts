/**
 * Server-side Paddle Billing helpers (no SDK: plain REST calls).
 *
 * Env vars:
 *   PADDLE_API_KEY          secret API key (sandbox keys contain "sdbx")
 *   PADDLE_WEBHOOK_SECRET   endpoint secret key of the notification destination
 *   PADDLE_ENVIRONMENT      optional: "sandbox" | "production" (guessed from the key otherwise)
 */
import crypto from 'crypto';

export function paddleApiKey(): string | undefined {
  return process.env.PADDLE_API_KEY || undefined;
}

function isSandbox(): boolean {
  const env = process.env.PADDLE_ENVIRONMENT;
  if (env) return env === 'sandbox';
  return (process.env.PADDLE_API_KEY || '').includes('sdbx');
}

function apiBase(): string {
  return isSandbox() ? 'https://sandbox-api.paddle.com' : 'https://api.paddle.com';
}

export async function paddleGet<T = any>(path: string): Promise<T> {
  const key = paddleApiKey();
  if (!key) throw new Error('PADDLE_API_KEY is not set');
  const res = await fetch(`${apiBase()}${path}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Paddle API ${path} failed with ${res.status}`);
  }
  const json = await res.json();
  return json.data as T;
}

/** True if the Paddle customer has at least one active (or trialing) subscription. */
export async function hasActiveSubscription(customerId: string): Promise<boolean> {
  const subs = await paddleGet<any[]>(
    `/subscriptions?customer_id=${encodeURIComponent(customerId)}&status=active,trialing&per_page=10`
  );
  return Array.isArray(subs) && subs.length > 0;
}

/** Paddle customers matching an email address (exact match). */
export async function findCustomersByEmail(email: string): Promise<{ id: string; email: string }[]> {
  const customers = await paddleGet<any[]>(`/customers?email=${encodeURIComponent(email)}&per_page=10`);
  return Array.isArray(customers) ? customers : [];
}

/**
 * Verifies the Paddle-Signature header ("ts=...;h1=...") against the raw body.
 * Rejects signatures older than 5 minutes to prevent replays.
 */
export function verifyPaddleSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(';').map((kv) => {
      const [k, ...v] = kv.split('=');
      return [k.trim(), v.join('=').trim()];
    })
  ) as Record<string, string>;
  const ts = parts.ts;
  const h1 = parts.h1;
  if (!ts || !h1) return false;

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(ts));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) return false;

  const expected = crypto.createHmac('sha256', secret).update(`${ts}:${rawBody}`).digest('hex');
  const a = Buffer.from(h1);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
