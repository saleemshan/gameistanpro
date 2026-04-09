// SEO FIX: Matches primary content CDN / brand host used in MDX cover images.
const PRODUCTION_FALLBACK_ORIGIN = "https://gameistan.com.pk";

export const siteConfig = {
  name: "Gameistan Pro",
  shortName: "Gameistan Pro",
  defaultTitle:
    "Best Real Cash Earning Games & APK Downloads in Pakistan | Gameistan Pro",
  description:
    "Independent guides to real-money earning games in Pakistan—color prediction & casino APKs, JazzCash / EasyPaisa context, safe installs, and PKR-focused reviews.",
  locale: "en_PK",
} as const;

/** Relative path for default OG image (composed with metadataBase). */
export function getDefaultOgImagePath(): string {
  return `/api/og?title=${encodeURIComponent(siteConfig.name)}`;
}

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  // SEO FIX: Vercel provides a canonical host when NEXT_PUBLIC_SITE_URL is unset.
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return PRODUCTION_FALLBACK_ORIGIN;
}

export function getContactEmail(): string {
  return (
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@gameistan.com.pk"
  );
}

/** Optional profile URLs for Organization sameAs (comma-separated in env). */
export function getOrgSameAs(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS?.trim();
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/** Google Search Console HTML tag verification (`<meta name="google-site-verification">`). */
export function getGoogleSiteVerification(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (fromEnv) return fromEnv;
  return "LN9scHeHRieDWfE7UXTKE30fsUaQxY5T1_CBqwQP6HA";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

// SEO FIX: Stable, self-referencing listing URLs for canonicals (sorted query keys).
export function buildListingSearchPath(
  pathname: string,
  opts: { category?: string; sort?: string; page?: number },
): string {
  const sp = new URLSearchParams();
  if (opts.category) sp.set("category", opts.category);
  if (opts.sort && opts.sort !== "latest") sp.set("sort", opts.sort);
  if (opts.page && opts.page > 1) sp.set("page", String(opts.page));
  const q = sp.toString();
  return q ? `${pathname}?${q}` : pathname;
}
