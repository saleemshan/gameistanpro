import Link from "next/link";

import { AppGrid } from "@/components/listing/AppGrid";
import { Button } from "@/components/ui/button";
import { gameToCardModel } from "@/lib/card-mappers";
import { getFeaturedGamesInCategory } from "@/lib/content";

export function CasinoGamesSection() {
  const games = getFeaturedGamesInCategory("casino-games", 6);
  const cards = games.map(gameToCardModel);
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-bold text-text">
          Top casino games in Pakistan 2026
        </h2>
        <Button asChild variant="ghost">
          <Link href="/games?category=casino-games">View more</Link>
        </Button>
      </div>
      <AppGrid items={cards} />
    </section>
  );
}
