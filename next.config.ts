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
    serverActions: {
      bodySizeLimit: "5mb",
    },
    staleTimes: {
      dynamic: 1,
      static: 60 * 60 * 24,
    },
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: "16.163.156.77",
        pathname: "/code/**",
        port: "9999",
        protocol: "http",
      },
    ],
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
