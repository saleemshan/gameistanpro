import Link from "next/link";

import { AppGrid } from "@/components/listing/AppGrid";
import { Pagination } from "@/components/listing/Pagination";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { gameToCardModel } from "@/lib/card-mappers";
import { HOMEPAGE_GAMES_PER_PAGE } from "@/lib/constants";
import { getHomepageGamesPage } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export function HomeFeaturedGamesSection({ page }: { page: number }) {
  const {
    games,
    page: currentPage,
    totalPages,
    startIndex,
    total,
  } = getHomepageGamesPage(page, HOMEPAGE_GAMES_PER_PAGE);
  const cards = games.map(gameToCardModel);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: total,
    itemListElement: games.map((g, i) => ({
      "@type": "ListItem",
      position: startIndex + i + 1,
      url: absoluteUrl(g.url),
      name: g.title,
    })),
  };

  return (
    <section
      className="space-y-4"
      aria-labelledby="home-games-heading"
      id="home-games"
    >
      <JsonLd data={itemList} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <h2
            id="home-games-heading"
            className="font-display text-2xl font-bold text-text"
          >
            Top earning &amp; casino games in Pakistan (2026)
          </h2>
          <p className="text-pretty text-sm leading-relaxed text-text-muted md:text-base">
            Hand-picked color-prediction and casino-style APKs with version, size,
            and rating metadata—updated for PK players comparing JazzCash-friendly
            platforms and safe sideload habits.
          </p>
          {total > 0 ? (
            <p className="text-xs text-text-muted">
              Showing{" "}
              <span className="tabular-nums text-text/90">
                {startIndex + 1}–{startIndex + games.length}
              </span>{" "}
              of <span className="tabular-nums text-text/90">{total}</span> games
              {totalPages > 1 ? (
                <>
                  {" "}
                  · page{" "}
                  <span className="tabular-nums text-text/90">{currentPage}</span>{" "}
                  of{" "}
                  <span className="tabular-nums text-text/90">{totalPages}</span>
                </>
              ) : null}
            </p>
          ) : null}
        </div>
        <Button asChild variant="ghost">
          <Link href="/games">Browse all games</Link>
        </Button>
      </div>
      {cards.length ? (
        <AppGrid items={cards} />
      ) : (
        <p className="rounded-xl border border-border-subtle bg-bg-card/40 p-6 text-sm text-text-muted">
          No games published yet. Check back soon.
        </p>
      )}
      <Pagination
        pathname="/"
        page={currentPage}
        totalPages={totalPages}
        scrollAnchor="home-games"
        className="pt-2"
      />
    </section>
  );
}
