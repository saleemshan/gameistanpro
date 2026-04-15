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
      {
        protocol: "https",
        hostname: "gameistan.com.pk",
        pathname: "/wp-content/uploads/**",
      },
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
        source: "/category/tools",
        destination: "/apps?category=tools",
        permanent: false,
      },
      {
        source: "/category/tools/page/:page",
        destination: "/apps?category=tools",
        permanent: false,
      },
      {
        source: "/categories/tools",
        destination: "/apps?category=tools",
        permanent: false,
      },
      {
        source: "/categories/:category",
        destination: "/category/:category",
        permanent: true,
      },
      {
        source: "/categories/:category/page/:page",
        destination: "/category/:category/page/:page",
        permanent: true,
      },
      {
        source: "/terms-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/guides/777taz-game-apk-pakistan",
        destination: "/777poker-game",
        permanent: true,
      },
      {
        source: "/guides/777-pkr-game-cd22-pakistan",
        destination: "/cd22-game",
        permanent: true,
      },
      {
        source: "/games/p88-877bet-game-apk-pakistan",
        destination: "/877bet-game",
        permanent: true,
      },
      {
        source: "/games/j188-color-prediction-apk-pakistan",
        destination: "/j188-game",
        permanent: true,
      },
      {
        source: "/games/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(withBundleAnalyzer(nextConfig));
