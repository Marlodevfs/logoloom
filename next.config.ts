import type { NextConfig } from "next";

// The Pro plan is only purchasable when Stripe is configured (or in local dev,
// where checkout is simulated). Exposed to the browser as a build-time flag.
const proEnabled =
  process.env.NODE_ENV !== 'production' ||
  Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID_MONTHLY);

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
