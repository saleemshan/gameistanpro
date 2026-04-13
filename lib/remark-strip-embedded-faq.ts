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

/**
 * Removes a top-level `## FAQs` block from game MDX so the accordion FAQSection
 * (driven by frontmatter `faqs`) is not duplicated on the page.
 */
export const remarkStripEmbeddedFaq: Plugin<[], MdastRoot> = () => (tree, file) => {
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
      /^faqs?$/i.test(headingText(node))
    ) {
      i += 1;
      while (
        i < ch.length &&
        !(ch[i].type === "heading" && ch[i].depth === 2)
      ) {
        i += 1;
      }
      continue;
    }
    out.push(node);
    i += 1;
  }
  tree.children = out;
};
