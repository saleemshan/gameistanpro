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
        source: "/favicon.ico",
        destination: "/images/brand/gameistan-pro-logo.png",
        permanent: false,
      },
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
      // SEO FIX: Redirects for renamed game slugs (old long-form -> new two-word format)
      { source: "/3rr777game-game", destination: "/3rr777-game", permanent: true },
      { source: "/588wingame-game", destination: "/588win-game", permanent: true },
      { source: "/666wgame-game", destination: "/666w-game", permanent: true },
      { source: "/88efgame-game", destination: "/88ef-game", permanent: true },
      { source: "/8batgame-game", destination: "/8bat-game", permanent: true },
      { source: "/bet877game-game", destination: "/bet877-game", permanent: true },
      { source: "/ct777game-game", destination: "/ct777-game", permanent: true },
      { source: "/dk999-game-pakistan-2025", destination: "/dk999-game", permanent: true },
      { source: "/done-55-game", destination: "/done55-game", permanent: true },
      { source: "/done-999-game-apk-pakistan", destination: "/done999-game", permanent: true },
      { source: "/hahapkrgame-game", destination: "/hahapkr-game", permanent: true },
      { source: "/jami-777-game", destination: "/jami777-game", permanent: true },
      { source: "/no777-game-app", destination: "/no777-game", permanent: true },
      { source: "/noob-win-game", destination: "/noobwin-game", permanent: true },
      { source: "/pk8-game-apk-pakistan", destination: "/pk8-game", permanent: true },
      { source: "/rs786-game-apk-download", destination: "/rs786-game", permanent: true },
      { source: "/td777-game-pakistan-2025", destination: "/td777-game", permanent: true },
      {
        source: "/games/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(withBundleAnalyzer(nextConfig));
