import { NextRequest, NextResponse } from 'next/server';
import { verifyPaddleSignature } from '@/lib/paddle';

/**
 * Paddle notification destination: https://logoloom.app/api/webhook
 * Pro access is checked live against the Paddle API, so events are only logged.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook environment variables missing' }, { status: 500 });
  }

  const rawBody = await req.text();
  if (!verifyPaddleSignature(rawBody, req.headers.get('paddle-signature'), secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const event = JSON.parse(rawBody);
    const data = event?.data || {};
    switch (event?.event_type) {
      case 'transaction.completed':
        console.log(`[Paddle] Transaction completed: ${data.id} (customer ${data.customer_id})`);
        break;
      case 'subscription.created':
      case 'subscription.updated':
      case 'subscription.canceled':
        console.log(`[Paddle] ${event.event_type}: ${data.id} status=${data.status}`);
        break;
      default:
        console.log(`[Paddle] Unhandled event type: ${event?.event_type}`);
    }
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
