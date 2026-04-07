import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FilterBar } from "@/components/listing/FilterBar";
import { Badge } from "@/components/ui/Badge";
import { AppsListingSearch } from "@/components/search/AppsListingSearch";
import { getAllGuides, getAllSearchableItems } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { formatPkDate } from "@/lib/utils";
import type { Guide } from "contentlayer/generated";

export const revalidate = 3600;

const GCATS: Guide["category"][] = ["general", "how-to", "reviews", "news"];

export const metadata: Metadata = {
  title: "Gaming guides & casino tips for Pakistani players",
  description:
    "How-tos, security explainers, and wallet tips for APK sideloading in Pakistan.",
  alternates: { canonical: absoluteUrl("/guides") },
};

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const cat =
    typeof sp.category === "string" && GCATS.includes(sp.category as Guide["category"])
      ? (sp.category as Guide["category"])
      : undefined;

  let list = getAllGuides();
  if (cat) list = list.filter((g) => g.category === cat);

  const searchItems = getAllSearchableItems().filter((i) => i.kind === "guide");

  const q = (c?: Guide["category"]) => {
    if (!c) return "/guides";
    return `/guides?category=${c}`;
  };

  const chips = [
    { label: "All", href: q(), active: !cat },
    ...GCATS.map((c) => ({
      label: c,
      href: q(c),
      active: cat === c,
    })),
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
          Gaming guides &amp; casino tips for Pakistani players
        </h1>
        <p className="mt-3 max-w-2xl text-text-muted">
          Editorial articles covering APK safety, fake apps, and wallet hygiene.
        </p>
      </div>
      <AppsListingSearch
        items={searchItems}
        placeholder="Search guides by title or tag…"
      />
      <FilterBar title="Category" chips={chips} />
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((g) => (
          <Link
            key={g.slug}
            href={g.url}
            className="group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm transition hover:border-accent/35"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={g.coverImage}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-2 p-4">
              <Badge variant="accent">{g.category}</Badge>
              <h2 className="font-display text-lg font-semibold text-text group-hover:text-accent">
                {g.title}
              </h2>
              <p className="line-clamp-2 text-sm text-text-muted">{g.excerpt}</p>
              <p className="text-xs text-text-muted">
                {formatPkDate(g.publishedAt)} · {g.readingTime} min read
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
