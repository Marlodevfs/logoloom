import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { signProToken } from '@/lib/pro-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid billing email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const isProduction = process.env.NODE_ENV === 'production';

    // In dev mode, allow demo restore
    if (!isProduction && cleanEmail.includes('demo')) {
      const demoToken = signProToken({ email: cleanEmail, durationDays: 30 });
      return NextResponse.json({
        success: true,
        token: demoToken,
        message: 'Demo subscription restored successfully.',
      });
    }

    if (!stripeKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Subscription restoration is unavailable because Stripe is not configured on this instance.',
        },
        { status: 503 }
      );
    }

    const stripe = new Stripe(stripeKey);
    const customers = await stripe.customers.list({
      email: cleanEmail,
      limit: 5,
    });

    if (customers.data.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No active Stripe subscription found matching this email.',
        },
        { status: 404 }
      );
    }

    // Check each customer record for an active subscription
    for (const customer of customers.data) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        const sub = subscriptions.data[0];
        const signedToken = signProToken({
          email: cleanEmail,
          customerId: customer.id,
          durationDays: 365,
        });

        return NextResponse.json({
          success: true,
          token: signedToken,
          message: 'Active Pro subscription restored successfully.',
        });
      }
    }

    return NextResponse.json(
      {
        success: false,
        error:
          'A customer record was found, but there are no active subscriptions associated with it.',
      },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Subscription restore error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Restoration failed' },
      { status: 500 }
    );
  }
}
