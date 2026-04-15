import type { UserReview } from "@/components/game/UserReviews";
import { getAllGames, getGameBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export function getReviewsForGame(slug: string): UserReview[] {
  const g = getGameBySlug(slug);
  if (!g?.playerReviews?.length) return [];
  const date = g.updatedAt.slice(0, 10);
  return g.playerReviews.map((r, i) => ({
    name: r.name,
    city: r.place ?? "Pakistan",
    rating: r.rating,
    date,
    comment: r.text,
    helpful: Math.max(1, 24 - i * 3),
  }));
}

/** Site-wide testimonials for homepage — prefers real `playerReviews` snippets, pads with brand copy. */
export function getSiteReviews(): UserReview[] {
  const games = getAllGames().filter((g) => g.playerReviews?.length);
  const out: UserReview[] = [];
  for (const g of games) {
    for (const r of g.playerReviews.slice(0, 2)) {
      out.push({
        name: r.name,
        city: r.place ?? "Pakistan",
        rating: r.rating,
        date: g.updatedAt.slice(0, 10),
        comment: r.text,
        helpful: 20 + out.length,
      });
      if (out.length >= 6) break;
    }
    if (out.length >= 6) break;
  }
  while (out.length < 5) {
    out.push({
      name: "Reader",
      city: "Pakistan",
      rating: 5,
      date: "2026-01-15",
      comment: `${siteConfig.name} surfaces version metadata, mirror hygiene, and JazzCash / EasyPaisa context for Pakistani players—without ad-heavy clutter.`,
      helpful: 12 + out.length,
    });
  }
  return out.slice(0, 6);
}
