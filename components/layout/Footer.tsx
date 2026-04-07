import Link from "next/link";

import { siteConfig } from "@/lib/seo";

const footerLinks = [
  { href: "/apps", label: "Apps & tools" },
  { href: "/games", label: "Games" },
  { href: "/guides", label: "Guides" },
  { href: "/categories/casino-games", label: "Casino games" },
  { href: "/categories/tools", label: "Tools" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border-subtle bg-bg-deep/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="font-display text-lg font-bold text-text">
            {siteConfig.name}
          </p>
          <p className="text-sm text-text-muted">{siteConfig.description}</p>
          <p className="text-xs text-danger">
            18+ only. Gambling involves risk. Play responsibly.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              {footerLinks.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-muted hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              {footerLinks.slice(4).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-text-muted hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border-subtle py-4 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Pakistan-focused gaming
        editorial.
      </div>
    </footer>
  );
}
