import type { NextConfig } from "next";

// The Pro plan is only purchasable when Paddle is configured (or in local dev,
// where checkout is simulated). Exposed to the browser as a build-time flag.
const proEnabled =
  process.env.NODE_ENV !== 'production' ||
  Boolean(
    process.env.PADDLE_API_KEY &&
      process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN &&
      process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO_MONTHLY
  );

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PRO_ENABLED: proEnabled ? '1' : '0',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      // Invoice, quote, price list and client tracker templates were removed (Nov 2026): send old links and
      // indexed pages to the locale home instead of a 404.
      {
        source: '/:locale(en|fr|de|es|it|pt)/:tpl(invoice|quote|price-list|client-tracker)',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:tpl(invoice|quote|price-list|client-tracker)',
        destination: '/',
        permanent: true,
      },
      // 301 Redirect www.logoloom.app -> logoloom.app
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.logoloom.app',
          },
        ],
        destination: 'https://logoloom.app/:path*',
        permanent: true,
      },
      // 301 Redirect logoloom-one.vercel.app -> logoloom.app
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'logoloom-one.vercel.app',
          },
        ],
        destination: 'https://logoloom.app/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
