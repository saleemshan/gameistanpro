"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { NewBadge } from "@/components/ui/NewBadge";
import { VersionBadge } from "@/components/ui/VersionBadge";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/listing/StarRating";
import { formatPkDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type AppCardModel = {
  title: string;
  href: string;
  coverImage: string;
  version: string;
  publishedAt: string;
  category: string;
  rating: number;
  votes: number;
  isNew?: boolean;
  featured?: boolean;
};

const categoryLabels: Record<string, string> = {
  tools: "Tools",
  injectors: "Injectors",
  utilities: "Utilities",
  apps: "Apps",
  "casino-games": "Casino",
  "color-prediction": "Color",
  "sports-betting": "Sports",
  "card-games": "Cards",
};

export function AppCard({
  item,
  index = 0,
  compact = false,
}: {
  item: AppCardModel;
  index?: number;
  compact?: boolean;
}) {
  const label =
    categoryLabels[item.category] ?? item.category.replace(/-/g, " ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-card/60 shadow-lg backdrop-blur-md transition",
        "hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_0_24px_rgba(0,255,136,0.12)]",
      )}
    >
      <Link
        href={item.href}
        className={cn(
          "flex min-h-0 flex-1 outline-none transition",
          compact ? "flex-row gap-3 p-3" : "flex-col",
        )}
      >
        {item.isNew ? <NewBadge /> : null}
        <div
          className={cn(
            "relative shrink-0 overflow-hidden bg-bg-deep/80",
            compact ? "size-[75px] rounded-lg" : "aspect-[16/10] w-full",
          )}
        >
          <Image
            src={item.coverImage}
            alt={item.title}
            width={compact ? 75 : 400}
            height={compact ? 75 : 250}
            className={cn(
              "object-cover transition duration-500 group-hover:scale-105",
              compact ? "size-[75px]" : "h-full w-full",
            )}
            sizes={compact ? "75px" : "(max-width:768px) 100vw, 33vw"}
          />
          {item.featured ? (
            <span className="absolute bottom-2 right-2 rounded bg-gold/90 px-1.5 py-0.5 text-[10px] font-bold text-bg-deep">
              Featured
            </span>
          ) : null}
        </div>
        <div className={cn("flex flex-1 flex-col gap-2", compact ? "py-0.5" : "p-4")}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{label}</Badge>
            <VersionBadge version={item.version} />
          </div>
          <h3
            className={cn(
              "font-display font-bold leading-snug tracking-tight text-text group-hover:text-accent",
              compact ? "line-clamp-2 text-sm" : "line-clamp-2 text-lg",
            )}
          >
            {item.title}
          </h3>
          {!compact ? (
            <StarRating rating={item.rating} votes={item.votes} />
          ) : null}
          <p className="text-xs text-text-muted">
            {formatPkDate(item.publishedAt)}
          </p>
        </div>
      </Link>
      {!compact ? (
        <div className="border-t border-border-subtle bg-bg-deep/30 px-4 py-2.5">
          <Link
            href={`${item.href}#download`}
            className="inline-flex items-center gap-1.5 text-sm font-display font-semibold text-accent hover:underline"
          >
            Download APK
            <span aria-hidden className="text-xs">
              →
            </span>
          </Link>
        </div>
      ) : null}
    </motion.article>
  );
}
