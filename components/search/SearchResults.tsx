import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import type { SearchableItem } from "@/lib/content";

const kindLabel: Record<SearchableItem["kind"], string> = {
  app: "App",
  game: "Game",
  guide: "Guide",
};

export function SearchResults({ items }: { items: SearchableItem[] }) {
  if (!items.length) {
    return (
      <p className="rounded-xl border border-border-subtle bg-bg-card/40 p-8 text-center text-text-muted">
        No results. Try &quot;P999&quot;, &quot;injector&quot;, or &quot;JazzCash&quot;.
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="block rounded-xl border border-border-subtle bg-bg-card/50 p-4 transition hover:border-accent/35"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="gold">{kindLabel[item.kind]}</Badge>
              <span className="text-xs text-text-muted">{item.category}</span>
            </div>
            <h2 className="mt-2 font-display text-lg font-semibold text-text">
              {item.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-text-muted">
              {item.shortDescription}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
