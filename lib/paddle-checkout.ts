'use client';

/**
 * Browser-side Paddle.js checkout (overlay on top of the current page).
 *
 * Public env vars (safe to expose):
 *   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN          client-side token ("test_..." in sandbox, "live_..." in production)
 *   NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY     price ID of Pro billed monthly ("pri_...")
 *   NEXT_PUBLIC_PADDLE_PRICE_PRO_YEARLY      price ID of Pro billed yearly ("pri_...")
 */

export type ProInterval = 'month' | 'year';

const CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '';
const PRICE_IDS: Record<ProInterval, string> = {
  month: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY || '',
  year: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_YEARLY || '',
};

/** Is a yearly price configured? (the yearly option is hidden otherwise) */
export const PRO_YEARLY_AVAILABLE = Boolean(CLIENT_TOKEN && PRICE_IDS.year);

declare global {
  interface Window {
    Paddle?: any;
  }
}

let loader: Promise<any> | null = null;
let onCompleted: ((transactionId: string) => void) | null = null;

function loadPaddle(locale: string): Promise<any> {
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const init = () => {
      const Paddle = window.Paddle;
      if (!Paddle) return reject(new Error('Paddle.js failed to load'));
      if (CLIENT_TOKEN.startsWith('test_')) Paddle.Environment.set('sandbox');
      Paddle.Initialize({
        token: CLIENT_TOKEN,
        checkout: { settings: { displayMode: 'overlay', theme: 'light', locale } },
        eventCallback: (event: any) => {
          if (event?.name === 'checkout.completed') {
            const txn = event.data?.transaction_id;
            if (txn && onCompleted) onCompleted(txn);
          }
        },
      });
      resolve(Paddle);
    };
    if (window.Paddle) return init();
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = init;
    script.onerror = () => {
      loader = null;
      reject(new Error('Paddle.js failed to load'));
    };
    document.head.appendChild(script);
  });
  return loader;
}

/**
 * Opens the Paddle overlay for Pro. When payment succeeds, the browser is sent to
 * `returnUrl?transaction_id=txn_...`, where the transaction is verified server-side.
 *
 * In local development without a client token, simulates a successful purchase.
 */
export async function openProCheckout(opts: { interval: ProInterval; returnUrl: string; locale: string }) {
  const sep = opts.returnUrl.includes('?') ? '&' : '?';
  const goTo = (txn: string) => {
    window.location.href = `${opts.returnUrl}${sep}transaction_id=${encodeURIComponent(txn)}`;
  };

  const priceId = PRICE_IDS[opts.interval];
  if (!CLIENT_TOKEN || !priceId) {
    if (process.env.NODE_ENV !== 'production') {
      goTo('demo_pro_session_success');
      return;
    }
    throw new Error('Paddle is not configured');
  }

  onCompleted = (txn) => {
    window.Paddle?.Checkout?.close?.();
    goTo(txn);
  };
  const Paddle = await loadPaddle(opts.locale);
  Paddle.Checkout.open({ items: [{ priceId, quantity: 1 }] });
}
