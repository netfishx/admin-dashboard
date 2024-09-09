/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  experimental: {
    after: true,
    ppr: true,
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "car7788.com",
        pathname: "/api/**",
        port: "",
        protocol: "https",
      },
    ],
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);

