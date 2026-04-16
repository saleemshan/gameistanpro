import type { Plugin } from "unified";

type MdastNode = {
  type: string;
  depth?: number;
  children?: MdastNode[];
  value?: string;
};

type MdastRoot = { type: "root"; children: MdastNode[] };

function headingText(node: MdastNode): string {
  if (!node.children) return "";
  return node.children
    .map((c) => {
      if (c.type === "text" && typeof c.value === "string") return c.value;
      if (c.type === "inlineCode" && typeof c.value === "string") return c.value;
      return "";
    })
    .join("")
    .trim();
}

function isGameMdxPath(filePath: string): boolean {
  return /[/\\]games[/\\].+\.mdx$/i.test(filePath);
}

/** Embedded pros/cons prose + GFM tables duplicate GameProsConsTable (YAML or derived rows). */
function isEmbeddedProsConsHeading(text: string): boolean {
  const t = text.trim();
  if (/^pros\s+and\s+considerations\b/i.test(t)) return true;
  if (/^pros\b/i.test(t) && /\bcons\b/i.test(t)) return true;
  return /^pros\s*\/\s*cons\b/i.test(t);
}

export const remarkStripEmbeddedProsCons: Plugin<[], MdastRoot> = () => (tree, file) => {
  const fp = String(
    (file as { path?: string }).path ??
      (file as { history?: string[] }).history?.[0] ??
      "",
  );
  if (!isGameMdxPath(fp)) return;

  const ch = tree.children;
  const out: MdastNode[] = [];
  let i = 0;
  while (i < ch.length) {
    const node = ch[i];
    if (
      node.type === "heading" &&
      node.depth === 2 &&
      isEmbeddedProsConsHeading(headingText(node))
    ) {
      i += 1;
      while (i < ch.length && !(ch[i].type === "heading" && ch[i].depth === 2)) {
        i += 1;
      }
      continue;
    }
    out.push(node);
    i += 1;
  }
  tree.children = out;
};
