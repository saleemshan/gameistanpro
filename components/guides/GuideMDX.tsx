"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

export function GuideMDX({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code);
  return (
    <div className="detail-mdx space-y-4 text-base leading-relaxed text-text-muted [&_a]:text-accent [&_a]:underline [&_h2]:scroll-mt-24 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h3]:scroll-mt-24 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-text [&_li]:ml-4 [&_ol]:list-decimal [&_p]:max-w-[68ch] [&_strong]:text-text [&_ul]:list-disc">
      <MDXContent />
    </div>
  );
}
