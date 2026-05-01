import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxDetailComponents } from "@/components/mdx/mdx-detail-components";
import { detailMdxClassName } from "@/lib/mdx-prose";

export function AppDescription({ raw }: { raw: string }) {
  return (
    <div className={detailMdxClassName}>
      <MDXRemote source={raw} components={mdxDetailComponents} />
    </div>
  );
}
