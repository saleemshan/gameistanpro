import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Responsible gambling and editorial disclaimer for Gameistan Pro.",
  alternates: { canonical: absoluteUrl("/disclaimer") },
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: absoluteUrl("/"),
        }}
      />
      <h1 className="font-display text-3xl font-bold text-text">Disclaimer</h1>
      <p className="text-sm text-text-muted">Last updated: 6 April 2026</p>
      <div className="mt-6 space-y-4 text-text-muted">
        <p className="font-semibold text-danger">
          18+ only. Gambling can be addictive. If you need help, seek professional support.
        </p>
        <p>
          {siteConfig.name} publishes editorial descriptions and metadata about third-party APKs
          and games. We do not operate real-money games, hold player funds, or process withdrawals.
        </p>
        <p>
          Laws around online betting and casino-style apps vary in Pakistan and may change. You are
          responsible for compliance with local regulations before installing or funding any app.
        </p>
        <p>
          Contact: editorial@yourdomain.com (replace with your operational inbox before launch).
        </p>
      </div>
    </article>
  );
}
