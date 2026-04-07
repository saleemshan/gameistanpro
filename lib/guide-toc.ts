export type TocEntry = { id: string; text: string; level: 2 | 3 };

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\u0600-\u06FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractTocFromMarkdown(raw: string): TocEntry[] {
  const lines = raw.split("\n");
  const out: TocEntry[] = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    if (h2?.[1]) {
      const text = h2[1].trim();
      out.push({ id: slugifyHeading(text), text, level: 2 });
      continue;
    }
    const h3 = line.match(/^###\s+(.+)/);
    if (h3?.[1]) {
      const text = h3[1].trim();
      out.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }
  return out;
}
