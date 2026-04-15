"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  /** Appended after MDX headings (e.g. `#reviews`). */
  extraItems?: TOCItem[];
}

export function TableOfContents({ items, extraItems = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const allItems = [...items, ...extraItems];

  useEffect(() => {
    const merged = [...items, ...extraItems];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    for (const item of merged) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items, extraItems]);

  if (allItems.length === 0) return null;

  return (
    <nav className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Table of Contents
      </h3>
      <ul className="space-y-1">
        {allItems.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block py-1 text-sm transition-colors hover:text-primary ${
                activeId === item.id
                  ? "font-medium text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
