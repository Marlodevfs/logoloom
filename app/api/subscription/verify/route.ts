import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { verifyProToken, signProToken } from '@/lib/pro-auth';

// Tokens are short-lived relative to the monthly plan and are re-checked against
// Stripe on every verification, so a cancelled subscription loses Pro quickly.
const TOKEN_DURATION_DAYS = 35;

async function hasActiveSubscription(stripe: Stripe, customerId: string): Promise<boolean> {
  const subs = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 10,
  });
  return subs.data.some((s) => s.status === 'active' || s.status === 'trialing');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { token, sessionId } = body;
    const isProduction = process.env.NODE_ENV === 'production';
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const stripe = stripeKey ? new Stripe(stripeKey) : null;

    // 1. Verify existing signed token if supplied
    if (typeof token === 'string' && token) {
      const payload = verifyProToken(token);
      if (payload) {
        // Re-check the subscription with Stripe so cancelled/unpaid users lose Pro
        if (stripe && payload.customerId) {
          let active = true;
          try {
            active = await hasActiveSubscription(stripe, payload.customerId);
          } catch (err) {
            // Stripe unreachable: keep the (still valid, signed) token rather than
            // punishing a paying user for a transient outage.
            console.warn('Stripe subscription re-check failed, trusting token', err);
          }
          if (!active) {
            return NextResponse.json(
              { verified: false, error: 'Subscription is no longer active' },
              { status: 401 }
            );
          }
          // Refresh the token so active subscribers never expire
          const refreshed = signProToken({
            email: payload.email,
            customerId: payload.customerId,
            durationDays: TOKEN_DURATION_DAYS,
          });
          return NextResponse.json({
            verified: true,
            email: payload.email,
            token: refreshed,
          });
        }

        return NextResponse.json({
          verified: true,
          email: payload.email,
          token,
          expiresAt: payload.expiresAt,
        });
      }
    }

    // 2. Verify Stripe Checkout Session ID
    if (typeof sessionId === 'string' && sessionId) {
      // In dev environment, accept demo session
      if (!isProduction && sessionId === 'demo_pro_session_success') {
        const devToken = signProToken({
          email: 'demo@logoloom.app',
          durationDays: 30,
        });
        return NextResponse.json({
          verified: true,
          token: devToken,
          email: 'demo@logoloom.app',
          simulated: true,
        });
      }

      if (stripe && sessionId.startsWith('cs_')) {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // A completed subscription checkout is either paid, or needs no payment (trial / 100% coupon)
        const isPaid =
          session.mode === 'subscription' &&
          session.status === 'complete' &&
          (session.payment_status === 'paid' || session.payment_status === 'no_payment_required');

        if (isPaid) {
          const userEmail =
            session.customer_details?.email ||
            session.customer_email ||
            undefined;
          const customerId =
            typeof session.customer === 'string'
              ? session.customer
              : session.customer?.id;

          const signedToken = signProToken({
            email: userEmail,
            customerId,
            durationDays: TOKEN_DURATION_DAYS,
          });

          return NextResponse.json({
            verified: true,
            token: signedToken,
            email: userEmail,
          });
        }
      }
    }

    return NextResponse.json(
      { verified: false, error: 'Invalid or unverified subscription credentials' },
      { status: 401 }
    );
  } catch (error: any) {
    console.error('Subscription verification error:', error);
    return NextResponse.json(
      { verified: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
