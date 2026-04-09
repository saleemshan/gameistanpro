/**
 * Central marketing imagery. Hero file lives in `public/images/hero/`.
 *
 * Re-optimize after replacing the source bitmap:
 * `node scripts/optimize-hero.mjs`
 */
export const SITE_HERO_IMAGE = {
  src: "/images/hero/hero-gameistan-pro.webp",
  alt: "Gameistan Pro — PK’s premier esports and gaming platform: team, arena, and competitive play branding",
} as const;

/** Nav-optimized mark (RGBA PNG — transparent). Rebuild: `pnpm run optimize:logo`. */
export const SITE_LOGO = {
  src: "/images/brand/gameistan-pro-logo.png",
  width: 81,
  height: 80,
  alt: "Gameistan Pro",
} as const;
