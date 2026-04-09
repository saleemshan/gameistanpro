import type { Metadata } from "next";

import { absoluteUrl, getContactEmail, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "Terms of use for Gameistan Pro listings and editorial content.",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="font-display text-3xl font-bold text-text">
        Terms &amp; conditions
      </h1>
      <p className="text-sm text-text-muted">Last updated: 6 April 2026</p>
      <div className="space-y-4 text-text-muted">
        <p>
          By using {siteConfig.name} you accept that listings are informational. APKs are provided
          by third parties; you install and use software at your own risk.
        </p>
        <p>
          We are not affiliated with publishers unless explicitly stated. Trademarks belong to their
          owners.
        </p>
        <p>
          <strong className="text-text">DMCA:</strong> rights holders may request removal of
          allegedly infringing references via {getContactEmail()} with substantiation.
        </p>
      </div>
    </article>
  );
}
