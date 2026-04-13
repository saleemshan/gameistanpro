"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

import { detailMdxClassName } from "@/lib/mdx-prose";

export function AppDescription({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);
  return (
    <div className={detailMdxClassName}>
      <MDXContent />
    </div>
  );
}
