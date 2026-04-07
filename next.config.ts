import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { withContentlayer } from "next-contentlayer2";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  turbopack: {},
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
  ],
  async redirects() {
    return [
      {
        source: "/guides/777taz-game-apk-pakistan",
        destination: "/games/777-poker-game-apk-pakistan",
        permanent: true,
      },
      {
        source: "/guides/777-pkr-game-cd22-pakistan",
        destination: "/games/cd22-game-pakistan",
        permanent: true,
      },
      {
        source: "/games/p88-877bet-game-apk-pakistan",
        destination: "/games/877bet-game-apk-pakistan",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(withBundleAnalyzer(nextConfig));
