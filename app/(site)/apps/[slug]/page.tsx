import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppDescription } from "@/components/detail/AppDescription";
import { AppHero } from "@/components/detail/AppHero";
import { AppMetaBox } from "@/components/detail/AppMetaBox";
import { DownloadMirrorLinks } from "@/components/detail/DownloadMirrorLinks";
import { FAQSection } from "@/components/detail/FAQSection";
import { InstallSteps } from "@/components/detail/InstallSteps";
import { RelatedApps } from "@/components/detail/RelatedApps";
import { ScreenshotGallery } from "@/components/detail/ScreenshotGallery";
import { ShareButtons } from "@/components/detail/ShareButtons";
import { TagList } from "@/components/detail/TagList";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ListingSidebar } from "@/components/layout/ListingSidebar";
import { SoftwareApplicationJsonLd } from "@/components/seo/AppJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FAQPageJsonLd } from "@/components/seo/FAQPageJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { appToCardModel } from "@/lib/card-mappers";
import { getAllApps, getAppBySlug, getRelatedApps } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { formatPkDate } from "@/lib/utils";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllApps().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return { title: "Not found" };
  const path = `/apps/${slug}`;
  const title = `${app.title} download APK – tools for Pakistan | ${siteConfig.name}`;
  return {
    title,
    description: app.shortDescription,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: app.title,
      description: app.shortDescription,
      url: absoluteUrl(path),
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(app.title)}&rating=${app.rating}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: app.title,
      description: app.shortDescription,
    },
  };
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Apps", href: "/apps" },
    { name: app.title },
  ];

  const related = getRelatedApps(app).map(appToCardModel);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
      <article className="space-y-10">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Apps", href: "/apps" },
            { name: app.title, href: app.url },
          ]}
        />
        <SoftwareApplicationJsonLd
          name={app.title}
          description={app.shortDescription}
          slugPath={app.url}
          rating={app.rating}
          votes={app.votes}
        />
        <FAQPageJsonLd faqs={app.faqs} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: app.title,
            datePublished: app.publishedAt,
            dateModified: app.updatedAt,
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: { "@type": "Organization", name: siteConfig.name },
          }}
        />
        <Breadcrumb items={crumbs} />
        <AppHero
          title={app.title}
          coverImage={app.coverImage}
          shortDescription={app.shortDescription}
          rating={app.rating}
          votes={app.votes}
        />
        <AppMetaBox
          size={app.size}
          version={app.version}
          requirements={app.requirements}
          downloads={app.downloads}
        />
        <ShareButtons urlPath={app.url} title={app.title} floatingMobile />
        <AppDescription code={app.body.code} />
        {app.screenshots.length > 0 ? (
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-text">Screenshots</h2>
            <ScreenshotGallery urls={app.screenshots} />
          </section>
        ) : null}
        <InstallSteps steps={app.installSteps} />
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold text-text">Tags</h2>
          <TagList tags={app.tags} />
        </section>
        <FAQSection faqs={app.faqs} />
        <section id="download" className="scroll-mt-24 space-y-4">
          <h2 className="font-display text-xl font-bold text-text">Download</h2>
          <p className="text-sm text-text-muted">
            Updated {formatPkDate(app.updatedAt)} · verify file size ({app.size}) after download.
          </p>
          <DownloadMirrorLinks links={app.downloadLinks} />
        </section>
        <RelatedApps items={related} />
      </article>
      <ListingSidebar />
    </div>
  );
}
