import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRO_CONFIG } from '@/lib/stripe-pro';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://logoloom.app';
    const returnUrl = body.returnUrl || `${origin}/?pro=activated`;

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const isProduction = process.env.NODE_ENV === 'production';

    // If Stripe keys are configured, create real Stripe Checkout session
    if (stripeKey && PRO_CONFIG.stripePriceId) {
      const stripe = new Stripe(stripeKey);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: PRO_CONFIG.stripePriceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        customer_email: body.email || undefined,
        allow_promotion_codes: true,
      });

      return NextResponse.json({ url: session.url });
    }

    // STRICT PRODUCTION GUARD: Never allow simulation in production
    if (isProduction) {
      return NextResponse.json(
        {
          error:
            'Stripe payments are currently not configured on this production instance. Please contact support.',
        },
        { status: 503 }
      );
    }

    // In local development only: simulated checkout flow
    return NextResponse.json({
      url: `${returnUrl}?session_id=demo_pro_session_success`,
      simulated: true,
    });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}
