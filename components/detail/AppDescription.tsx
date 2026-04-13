"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

export function AppDescription({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);
  return (
    <div className="detail-mdx space-y-4 text-base leading-relaxed text-text-muted [&_a]:text-accent [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-accent/40 [&_blockquote]:bg-bg-card/50 [&_blockquote]:py-3 [&_blockquote]:pl-4 [&_blockquote]:pr-3 [&_blockquote]:text-sm [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-text [&_li]:ml-4 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:mt-1.5 [&_ol>li]:pl-1 [&_p]:max-w-[68ch] [&_strong]:text-text [&_ul]:list-disc [&_ul_ul]:mt-2 [&_ul_ul]:list-[circle]">
      <MDXContent />
    </div>
  );
}
