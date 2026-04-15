import Slugger from "github-slugger";

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/** IDs match `rehype-slug` / GitHub-style heading anchors in compiled MDX. */
export function extractTocFromMarkdown(raw: string): TocEntry[] {
  const lines = raw.split("\n");
  const slugger = new Slugger();
  const out: TocEntry[] = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/);
    if (h2?.[1]) {
      const text = h2[1].trim();
      out.push({ id: slugger.slug(text), text, level: 2 });
      continue;
    }
    const h3 = line.match(/^###\s+(.+)/);
    if (h3?.[1]) {
      const text = h3[1].trim();
      out.push({ id: slugger.slug(text), text, level: 3 });
    }
  }
  return out;
}
