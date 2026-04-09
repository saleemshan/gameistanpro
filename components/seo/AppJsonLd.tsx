import { absoluteUrl } from "@/lib/seo";

import { JsonLd } from "@/components/seo/JsonLd";

const MIN_VOTES_FOR_AGGREGATE_RATING = 5;

export function SoftwareApplicationJsonLd({
  name,
  description,
  slugPath,
  rating,
  votes,
}: {
  name: string;
  description: string;
  slugPath: string;
  rating: number;
  votes: number;
}) {
  // SEO FIX: Omit aggregateRating when vote count is too low for Google rich-result eligibility.
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    operatingSystem: "Android",
    applicationCategory: "GameApplication",
    description,
    url: absoluteUrl(slugPath),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PKR",
    },
  };
  if (votes >= MIN_VOTES_FOR_AGGREGATE_RATING) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(rating),
      ratingCount: String(votes),
    };
  }
  return <JsonLd data={data} />;
}
