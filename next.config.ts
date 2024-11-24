import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  experimental: {
    ppr: true,
    reactCompiler: true,
    dynamicIO: true,
    inlineCss: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
    staleTimes: {
      dynamic: 1,
      static: 60 * 60 * 24,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: "16.163.41.52",
        port: "4000",
        protocol: "http",
      },
      {
        hostname: "localhost",
        port: "4000",
        protocol: "http",
      },
    ],
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
