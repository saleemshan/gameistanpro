import type { Metadata } from "next";
import Link from "next/link";

import { absoluteUrl, getContactEmail, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are, how Gameistan Pro reviews APK listings for Pakistan, and how to reach the editorial team.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description:
      "Editorial mission, review methodology, and contact for Pakistani gaming APK coverage.",
    url: absoluteUrl("/about"),
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
        About {siteConfig.name}
      </h1>
      <p className="text-sm text-text-muted">Last updated: 13 April 2026</p>

      <section className="space-y-3 text-text-muted">
        <h2 className="font-display text-xl font-semibold text-text">Mission</h2>
        <p>
          {siteConfig.name} publishes independent, Pakistan-focused explainers on real-money style
          mobile games, APK sideloading, and wallet hygiene (including JazzCash and EasyPaisa
          context where it appears in our sources). We do not operate games, hold balances, or
          process withdrawals.
        </p>
      </section>

      <section
        id="editorial-team"
        className="space-y-4 text-text-muted"
      >
        <h2 className="font-display text-xl font-semibold text-text">
          Editorial team
        </h2>
        <p className="text-sm">
          These editors maintain listings, review APK metadata, and write the guides.
          Bylines may use professional names where contributors prefer limited public
          profiles; all content is edited under the {siteConfig.name} masthead.
        </p>
        <ul className="space-y-4">
          <li className="rounded-xl border border-border-subtle bg-bg-card/40 p-4">
            <p className="font-display font-semibold text-text">Omar Siddiqui</p>
            <p className="text-xs text-accent">Lead APK analyst</p>
            <p className="mt-2 text-sm">
              Checks install flows, mirror hygiene, and version/size consistency across
              game MDX. Flags placeholder download URLs until HTTPS publisher endpoints are
              confirmed.
            </p>
          </li>
          <li className="rounded-xl border border-border-subtle bg-bg-card/40 p-4">
            <p className="font-display font-semibold text-text">Fatima Noor</p>
            <p className="text-xs text-accent">Wallet &amp; safety editor</p>
            <p className="mt-2 text-sm">
              Leads JazzCash / EasyPaisa explainers, scam-pattern callouts, and CNIC/OTP
              hygiene copy on money pages. Works with the fake-app and safe-APK guides.
            </p>
          </li>
          <li className="rounded-xl border border-border-subtle bg-bg-card/40 p-4">
            <p className="font-display font-semibold text-text">Bilal Hussain</p>
            <p className="text-xs text-accent">Guides &amp; long-form editor</p>
            <p className="mt-2 text-sm">
              Structures category hubs (earning games, colour prediction, no-investment
              intent), responsible-play framing, and cross-links between guides and game
              listings.
            </p>
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-text-muted">
        <h2 className="font-display text-xl font-semibold text-text">
          How we build listings
        </h2>
        <p>
          Each game or app page combines structured front matter (version, size, requirements,
          mirrors) with an editorial MDX body. We do not invent ratings, download counts, or support
          claims—those fields are part of our editorial dataset and should be double-checked in the
          live app before you fund an account.
        </p>
        <p>
          When mirrors are placeholders (e.g. example.com), we label them in copy until verified
          publisher URLs are available.
        </p>
      </section>

      <section className="space-y-3 text-text-muted">
        <h2 className="font-display text-xl font-semibold text-text">Responsible use</h2>
        <p>
          Gambling-style products carry financial and legal risk. We include age and
          responsible-play reminders on money pages. If play stops being fun, pause and seek local
          help.
        </p>
      </section>

      <section className="space-y-3 text-text-muted">
        <h2 className="font-display text-xl font-semibold text-text">Contact</h2>
        <p>
          Editorial and corrections:{" "}
          <a className="text-accent hover:underline" href={`mailto:${getContactEmail()}`}>
            {getContactEmail()}
          </a>
          .
        </p>
      </section>

      <p className="text-sm">
        <Link href="/guides/safe-apk-download-pakistan" className="text-accent hover:underline">
          Safe APK downloads in Pakistan
        </Link>
        {" · "}
        <Link
          href="/guides/fake-casino-apps-pakistan"
          className="text-accent hover:underline"
        >
          Fake casino app signals
        </Link>
        {" · "}
        <Link href="/disclaimer" className="text-accent hover:underline">
          Disclaimer
        </Link>
      </p>
    </article>
  );
}
