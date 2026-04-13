import Link from "next/link";

import { SiteLogoLink } from "@/components/brand/SiteLogoLink";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { href: "/apps", label: "Apps" },
  { href: "/games", label: "Games" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle/80 bg-bg-deep/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <SiteLogoLink priority />
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-muted transition hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
