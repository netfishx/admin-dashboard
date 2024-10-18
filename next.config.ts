import type { NextConfig } from "next";

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
  },
  output: "standalone",
};

export default nextConfig;
