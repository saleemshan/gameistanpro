import type { MetadataRoute } from "next";

import {
  getAllApps,
  getAllGames,
  getAllGuides,
  getAllCategorySlugs,
  getTagSlugMap,
  isTagPageIndexable,
} from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/apps`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/games`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.55 },
    { url: `${base}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

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
    ...apps,
    ...games,
    ...guides,
    ...categories,
    ...tags,
  ];
}
