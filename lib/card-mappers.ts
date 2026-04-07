import type { App, Game } from "contentlayer/generated";

import type { AppCardModel } from "@/components/listing/AppCard";

export function appToCardModel(a: App): AppCardModel {
  return {
    title: a.title,
    href: a.url,
    coverImage: a.coverImage,
    version: a.version,
    publishedAt: a.publishedAt,
    category: a.category,
    rating: a.rating,
    votes: a.votes,
    isNew: a.isNew,
    featured: a.featured,
  };
}

export function gameToCardModel(g: Game): AppCardModel {
  return {
    title: g.title,
    href: g.url,
    coverImage: g.coverImage,
    version: g.version,
    publishedAt: g.publishedAt,
    category: g.category,
    rating: g.rating,
    votes: g.votes,
    isNew: g.isNew,
    featured: g.featured,
  };
}
