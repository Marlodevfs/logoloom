import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
