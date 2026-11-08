import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { verifyProToken, signProToken } from '@/lib/pro-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { token, sessionId } = body;
    const isProduction = process.env.NODE_ENV === 'production';
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    // 1. Verify existing signed token if supplied
    if (token) {
      const payload = verifyProToken(token);
      if (payload) {
        return NextResponse.json({
          verified: true,
          email: payload.email,
          token,
          expiresAt: payload.expiresAt,
        });
      }
    }

    // 2. Verify Stripe Checkout Session ID
    if (sessionId) {
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

      if (stripeKey) {
        const stripe = new Stripe(stripeKey);
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const isPaid =
          session.payment_status === 'paid' || session.status === 'complete';

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
            durationDays: 365,
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
      { verified: false, error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
