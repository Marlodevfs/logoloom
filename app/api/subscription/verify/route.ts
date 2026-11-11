import { NextRequest, NextResponse } from 'next/server';
import { verifyProToken, signProToken } from '@/lib/pro-auth';
import { paddleApiKey, paddleGet, hasActiveSubscription } from '@/lib/paddle';

// Tokens are short-lived and re-checked against Paddle on every verification,
// so a cancelled subscription loses Pro quickly.
const TOKEN_DURATION_DAYS = 35;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { token } = body;
    // "sessionId" kept as an alias for old links / cached clients
    const transactionId: unknown = body.transactionId ?? body.sessionId;
    const isProduction = process.env.NODE_ENV === 'production';
    const paddleReady = Boolean(paddleApiKey());

    // 1. Verify an existing signed token
    if (typeof token === 'string' && token) {
      const payload = verifyProToken(token);
      if (payload) {
        if (paddleReady && payload.customerId?.startsWith('ctm_')) {
          let active = true;
          try {
            active = await hasActiveSubscription(payload.customerId);
          } catch (err) {
            // Paddle unreachable: keep the (still valid, signed) token rather than
            // punishing a paying user for a transient outage.
            console.warn('Paddle subscription re-check failed, trusting token', err);
          }
          if (!active) {
            return NextResponse.json(
              { verified: false, error: 'Subscription is no longer active' },
              { status: 401 }
            );
          }
          const refreshed = signProToken({
            email: payload.email,
            customerId: payload.customerId,
            durationDays: TOKEN_DURATION_DAYS,
          });
          return NextResponse.json({ verified: true, email: payload.email, token: refreshed });
        }

        return NextResponse.json({
          verified: true,
          email: payload.email,
          token,
          expiresAt: payload.expiresAt,
        });
      }
    }

    // 2. Verify a Paddle transaction right after checkout
    if (typeof transactionId === 'string' && transactionId) {
      if (!isProduction && transactionId === 'demo_pro_session_success') {
        const devToken = signProToken({ email: 'demo@logoloom.app', durationDays: 30 });
        return NextResponse.json({
          verified: true,
          token: devToken,
          email: 'demo@logoloom.app',
          simulated: true,
        });
      }

      if (paddleReady && /^txn_[a-z0-9]+$/i.test(transactionId)) {
        const txn = await paddleGet<any>(
          `/transactions/${encodeURIComponent(transactionId)}?include=customer`
        );
        const paid = txn && (txn.status === 'completed' || txn.status === 'paid');

        if (paid && txn.subscription_id && txn.customer_id) {
          const signedToken = signProToken({
            email: txn.customer?.email,
            customerId: txn.customer_id,
            durationDays: TOKEN_DURATION_DAYS,
          });
          return NextResponse.json({ verified: true, token: signedToken, email: txn.customer?.email });
        }
      }
    }

    return NextResponse.json(
      { verified: false, error: 'Invalid or unverified subscription credentials' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Subscription verification error:', error);
    return NextResponse.json({ verified: false, error: 'Verification failed' }, { status: 500 });
  }
}
