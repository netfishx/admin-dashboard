import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

function getRemotePatterns(): {
  hostname: string;
  port: string;
  protocol: "http" | "https";
}[] {
  const hostnames = process.env.NEXT_PUBLIC_REMOTE_HOSTNAMES?.split(",") || [];
  const ports = process.env.NEXT_PUBLIC_REMOTE_PORTS?.split(",") || [];
  const protocols = process.env.NEXT_PUBLIC_REMOTE_PROTOCOLS?.split(",") || [];

  return hostnames.map((hostname, index) => ({
    hostname,
    port: ports[index],
    protocol: protocols[index] as "http" | "https",
  }));
}

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
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "dir", "group", "groupEnd"],
          }
        : false,
  },
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    ppr: true,
    reactCompiler: true,
    dynamicIO: true,
    authInterrupts: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
    useCache: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: getRemotePatterns(),
    formats: ["image/avif", "image/webp"],
  },
  env: {
    NEXT_PUBLIC_TIMESTAMP: Date.now().toString(),
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
