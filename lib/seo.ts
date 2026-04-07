export const siteConfig = {
  name: "Gameistan Pro",
  shortName: "Gameistan Pro",
  defaultTitle:
    "Best Real Cash Earning Games & APK Downloads in Pakistan | Gameistan Pro",
  description:
    "Download trusted real money earning games, casino apps, and APKs in Pakistan. Reviews, guides, and tips for PK players.",
  locale: "en_PK",
} as const;

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://yourdomain.com"
  );
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
