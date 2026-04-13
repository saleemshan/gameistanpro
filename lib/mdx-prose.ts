/** Shared Tailwind for MDX bodies (games, apps, guides). Keep in sync with `app/globals.css` `.detail-mdx` rules. */
export const detailMdxClassName =
  "detail-mdx prose-flow max-w-none space-y-4 text-base leading-relaxed text-text-muted " +
  "[&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-2 [&_a]:hover:underline " +
  "[&_blockquote]:my-6 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-2 [&_blockquote]:border-accent/50 [&_blockquote]:bg-bg-card/60 [&_blockquote]:py-3 [&_blockquote]:pl-4 [&_blockquote]:pr-3 [&_blockquote]:text-sm " +
  "[&_h2]:scroll-mt-28 [&_h2]:mt-12 [&_h2]:border-b [&_h2]:border-border-subtle [&_h2]:pb-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text [&_h2]:first:mt-0 " +
  "[&_h3]:scroll-mt-28 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-text " +
  "[&_h4]:mt-6 [&_h4]:font-display [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-text " +
  "[&_li]:ml-4 [&_li]:marker:text-accent/70 " +
  "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:mt-2 [&_ol>li]:pl-1 " +
  "[&_p]:max-w-[70ch] [&_p]:text-pretty " +
  "[&_strong]:font-semibold [&_strong]:text-text " +
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 " +
  "[&_ul_ul]:mt-2 [&_ul_ul]:list-[circle] [&_ul_ul]:pl-5";
