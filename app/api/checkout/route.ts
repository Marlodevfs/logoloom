import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRO_CONFIG } from '@/lib/stripe-pro';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://logoloom.app';
    // Always derive the origin from our own config/request URL, never trust the
    // client-supplied Origin header blindly.
    const origin = new URL(appUrl).origin;
    const requestOrigin = new URL(req.url).origin;
    const allowedOrigins = new Set([origin, requestOrigin]);

    // Only accept a returnUrl that points back to this site (prevents open redirect
    // through Stripe's success_url).
    let returnUrl = `${origin}/?pro=activated`;
    if (typeof body.returnUrl === 'string') {
      try {
        const candidate = new URL(body.returnUrl);
        if (allowedOrigins.has(candidate.origin)) {
          returnUrl = candidate.toString();
        }
      } catch {
        // invalid URL -> keep default
      }
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const isProduction = process.env.NODE_ENV === 'production';

    const separator = returnUrl.includes('?') ? '&' : '?';

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
        success_url: `${returnUrl}${separator}session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        customer_email:
          typeof body.email === 'string' && body.email.includes('@') ? body.email : undefined,
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
      url: `${returnUrl}${separator}session_id=demo_pro_session_success`,
      simulated: true,
    });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    // Don't leak internal Stripe/config error details to the browser
    return NextResponse.json(
      { error: 'Checkout failed' },
      { status: 500 }
    );
  }
}
