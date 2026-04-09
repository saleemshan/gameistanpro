import { absoluteUrl } from "@/lib/seo";

import { JsonLd } from "@/components/seo/JsonLd";

const MIN_VOTES_FOR_AGGREGATE_RATING = 5;
const MAX_SCREENSHOTS = 8;

function toIsoDate(d: string | Date | undefined): string | undefined {
  if (d == null) return undefined;
  const t = new Date(d).getTime();
  if (!Number.isFinite(t)) return undefined;
  return new Date(t).toISOString();
}

function appCategoryToSchema(category: string): string {
  switch (category) {
    case "injectors":
      return "DeveloperApplication";
    case "tools":
    case "utilities":
      return "UtilitiesApplication";
    case "apps":
    default:
      return "MobileApplication";
  }
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  slugPath,
  rating,
  votes,
  kind,
  coverImage,
  screenshots = [],
  softwareVersion,
  datePublished,
  dateModified,
  tags = [],
  categoryKey,
}: {
  name: string;
  description: string;
  slugPath: string;
  rating: number;
  votes: number;
  kind: "game" | "app";
  coverImage?: string;
  screenshots?: string[];
  softwareVersion?: string;
  datePublished?: string | Date;
  dateModified?: string | Date;
  tags?: string[];
  /** Contentlayer `category` enum value — drives `applicationCategory` for apps. */
  categoryKey?: string;
}) {
  const published = toIsoDate(datePublished);
  const modified = toIsoDate(dateModified);
  const shotUrls = screenshots
    .slice(0, MAX_SCREENSHOTS)
    .map((u) => absoluteUrl(u));
  const keywordParts = [
    ...tags,
    ...(categoryKey && kind === "game" ? [categoryKey.replace(/-/g, " ")] : []),
    ...(categoryKey && kind === "app" ? [categoryKey] : []),
  ];
  const keywords =
    keywordParts.length > 0
      ? keywordParts.map((s) => s.trim()).filter(Boolean).join(", ")
      : undefined;

  const applicationCategory =
    kind === "game"
      ? "GameApplication"
      : appCategoryToSchema(categoryKey ?? "apps");

  // SEO FIX: Omit aggregateRating when vote count is too low for Google rich-result eligibility.
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type":
      kind === "game" ? (["SoftwareApplication", "VideoGame"] as const) : "SoftwareApplication",
    name,
    operatingSystem: "Android",
    applicationCategory,
    description,
    url: absoluteUrl(slugPath),
    inLanguage: "en-PK",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PKR",
    },
  };

  if (coverImage) data.image = absoluteUrl(coverImage);
  if (shotUrls.length) data.screenshot = shotUrls;
  if (softwareVersion) data.softwareVersion = softwareVersion;
  if (published) data.datePublished = published;
  if (modified) data.dateModified = modified;
  if (keywords) data.keywords = keywords;

  if (votes >= MIN_VOTES_FOR_AGGREGATE_RATING) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(rating),
      ratingCount: String(votes),
    };
  }

  return <JsonLd data={data} />;
}
