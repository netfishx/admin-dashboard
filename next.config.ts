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
    after: true,
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
  output: "standalone",
};

export default withNextIntl(nextConfig);
