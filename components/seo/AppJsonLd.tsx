import { absoluteUrl } from "@/lib/seo";

import { JsonLd } from "@/components/seo/JsonLd";

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
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    operatingSystem: "Android",
    applicationCategory: "GameApplication",
    description,
    url: absoluteUrl(slugPath),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(rating),
      ratingCount: String(votes),
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PKR",
    },
  };
  return <JsonLd data={data} />;
}
