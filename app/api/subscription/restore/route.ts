import { NextRequest, NextResponse } from 'next/server';
import { signProToken } from '@/lib/pro-auth';
import { paddleApiKey, findCustomersByEmail, hasActiveSubscription } from '@/lib/paddle';

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

    if (!paddleApiKey()) {
      return NextResponse.json(
        { success: false, error: 'Subscription restoration is unavailable on this instance.' },
        { status: 503 }
      );
    }

    const customers = await findCustomersByEmail(cleanEmail);
    for (const customer of customers) {
      if (await hasActiveSubscription(customer.id)) {
        const signedToken = signProToken({
          email: cleanEmail,
          customerId: customer.id,
          durationDays: 35,
        });
        return NextResponse.json({
          success: true,
          token: signedToken,
          message: 'Active Pro subscription restored successfully.',
        });
      }
    }

    return NextResponse.json(
      { success: false, error: 'No active subscription found for this email.' },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Subscription restore error:', error);
    return NextResponse.json({ success: false, error: 'Restoration failed' }, { status: 500 });
  }
}
