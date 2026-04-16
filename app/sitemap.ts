import type { MetadataRoute } from "next";

import {
  getAllApps,
  getAllGames,
  getAllGuides,
  getAllCategorySlugs,
  getTagSlugMap,
  isTagPageIndexable,
} from "@/lib/content";
import { getGamesByCategory } from "@/lib/games";
import { getSiteUrl } from "@/lib/seo";

/** Must match `ITEMS_PER_PAGE` in `app/(site)/category/[category]/page.tsx`. */
const EARNING_CATEGORY_PAGE_SIZE = 12;

/** Slugs for `/category/[category]` (EarningGames-style hubs). Keep in sync with that route’s VALID_CATEGORIES. */
const EARNING_CATEGORY_SLUGS = [
  "casino-games",
  "earning-apps",
  "general",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/apps`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/games`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.55 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const earningCategoryRoutes: MetadataRoute.Sitemap = [];
  for (const slug of EARNING_CATEGORY_SLUGS) {
    const { total } = await getGamesByCategory(slug, 1, EARNING_CATEGORY_PAGE_SIZE);
    const totalPages = Math.max(1, Math.ceil(total / EARNING_CATEGORY_PAGE_SIZE));
    earningCategoryRoutes.push({
      url: `${base}/category/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.72,
    });
    // Page 2 is indexable (`generateCategoryMetadata` noindex only for page > 2).
    if (totalPages >= 2) {
      earningCategoryRoutes.push({
        url: `${base}/category/${slug}/page/2`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.58,
      });
    }
  }

  const apps = getAllApps().map((app) => ({
    url: `${base}${app.url}`,
    lastModified: new Date(app.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const games = getAllGames().map((g) => ({
    url: `${base}${g.url}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guides = getAllGuides().map((g) => ({
    url: `${base}${g.url}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categories = getAllCategorySlugs().map((c) => ({
    url: `${base}/categories/${c}`,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  // SEO FIX: Omit thin tag URLs (noindex in generateMetadata) to avoid sitemap vs robots conflicts.
  const tags = [...getTagSlugMap().keys()]
    .filter((t) => isTagPageIndexable(t))
    .map((t) => ({
      url: `${base}/tags/${t}`,
      changeFrequency: "weekly" as const,
      priority: 0.55,
    }));

  return [
    ...staticRoutes,
    ...earningCategoryRoutes,
    ...apps,
    ...games,
    ...guides,
    ...categories,
    ...tags,
  ];
}
