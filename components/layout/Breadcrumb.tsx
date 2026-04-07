import Link from "next/link";

import { cn } from "@/lib/utils";

export function Breadcrumb({
  items,
  className,
}: {
  items: { name: string; href?: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-2">
              {i > 0 ? <span className="text-text-muted/50">/</span> : null}
              {last || !item.href ? (
                <span className="font-medium text-text">{item.name}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition hover:text-accent"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
