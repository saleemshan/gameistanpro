import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideMDX } from "@/components/guides/GuideMDX";
import { FAQSection } from "@/components/detail/FAQSection";
import { ShareButtons } from "@/components/detail/ShareButtons";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FAQPageJsonLd } from "@/components/seo/FAQPageJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllGuides, getGuideBySlug, getRelatedGuides } from "@/lib/content";
import { extractTocFromMarkdown } from "@/lib/guide-toc";
import { absoluteUrl, getMetadataYear, siteConfig } from "@/lib/seo";
import { formatPkDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Not found" };
  const path = `/guides/${slug}`;
  const y = getMetadataYear();
  const title = `${guide.title} (${y})`;
  return {
    title,
    description: guide.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description: guide.description,
      url: absoluteUrl(path),
      images: [{ url: guide.coverImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: new Date(guide.publishedAt).toISOString(),
      modifiedTime: new Date(guide.updatedAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.description,
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const toc = extractTocFromMarkdown(guide.body.raw);
  const related = getRelatedGuides(guide);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: guide.title },
  ];

  return (
    <article
      className={
        toc.length > 0
          ? "grid gap-10 lg:grid-cols-[1fr_220px]"
          : "max-w-3xl space-y-8"
      }
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: guide.title, href: guide.url },
        ]}
      />
      <FAQPageJsonLd faqs={guide.faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          datePublished: guide.publishedAt,
          dateModified: guide.updatedAt,
          author: { "@type": "Organization", name: guide.author },
          publisher: { "@type": "Organization", name: siteConfig.name },
          // SEO FIX: Article.image must be absolute URL; add mainEntityOfPage for clarity.
          image: [absoluteUrl(guide.coverImage)],
          url: absoluteUrl(guide.url),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(guide.url),
          },
        }}
      />
      <div className={toc.length > 0 ? "min-w-0 space-y-8" : "space-y-8"}>
        <Breadcrumb items={crumbs} />
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-border-subtle">
          <Image
            src={guide.coverImage}
            alt={`Cover image for “${guide.title}” — Pakistani gaming guide`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <header className="space-y-2">
          <p className="text-sm text-text-muted">
            Published {formatPkDate(guide.publishedAt)} · Last updated{" "}
            {formatPkDate(guide.updatedAt)} · {guide.readingTime} min read ·{" "}
            {guide.author}
          </p>
          <h1 className="font-display text-3xl font-bold text-text md:text-4xl">
            {guide.title}
          </h1>
          <p className="text-lg text-text-muted">{guide.excerpt}</p>
        </header>
        <ShareButtons urlPath={guide.url} title={guide.title} />
        <GuideMDX code={guide.body.code} />
        <FAQSection faqs={guide.faqs} />
        {related.length > 0 ? (
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text">
              Related articles
            </h2>
            <ul className="space-y-2">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={g.url} className="text-accent hover:underline">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
      {toc.length > 0 ? (
        <aside className="hidden lg:block">
          <nav className="sticky top-24 rounded-xl border border-border-subtle bg-bg-card/50 p-4 text-sm backdrop-blur-sm">
            <p className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-text-muted">
              On this page
            </p>
            <ul className="space-y-2">
              {toc.map((t) => (
                <li
                  key={t.id}
                  className={t.level === 3 ? "ml-3 text-text-muted" : ""}
                >
                  <a href={`#${t.id}`} className="hover:text-accent">
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      ) : null}
    </article>
  );
}
