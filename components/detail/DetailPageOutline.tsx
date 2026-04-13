import Link from "next/link";

const linkClass =
  "block rounded-lg px-2 py-1.5 text-text-muted transition hover:bg-accent-dim/25 hover:text-text";

export function DetailPageOutline({
  hasScreenshots,
  hasInstall,
  hasFaq,
  hasDownload,
}: {
  hasScreenshots: boolean;
  hasInstall: boolean;
  hasFaq: boolean;
  hasDownload: boolean;
}) {
  const items: { href: string; label: string }[] = [
    { href: "#review", label: "Review" },
  ];
  if (hasScreenshots) items.push({ href: "#screenshots", label: "Screenshots" });
  if (hasInstall) items.push({ href: "#install", label: "Install" });
  if (hasFaq) items.push({ href: "#faq", label: "FAQ" });
  if (hasDownload) items.push({ href: "#download", label: "Download" });

  return (
    <nav
      className="hidden rounded-2xl border border-border-subtle bg-bg-card/60 p-4 text-sm backdrop-blur-md lg:block"
      aria-label="On this page"
    >
      <p className="mb-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.14em] text-text-muted">
        On this page
      </p>
      <ul className="space-y-0.5">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
