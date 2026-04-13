import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppDescription } from "@/components/detail/AppDescription";
import { AppHero } from "@/components/detail/AppHero";
import { DetailPageOutline } from "@/components/detail/DetailPageOutline";
import { DownloadMirrorLinks } from "@/components/detail/DownloadMirrorLinks";
import { GamePlayerReviews } from "@/components/detail/GamePlayerReviews";
import { FAQSection } from "@/components/detail/FAQSection";
import { InstallSteps } from "@/components/detail/InstallSteps";
import { RelatedApps } from "@/components/detail/RelatedApps";
import { RelatedGuides } from "@/components/detail/RelatedGuides";
import { EditorialReviewNote } from "@/components/detail/EditorialReviewNote";
import { ResponsibleGamblingBanner } from "@/components/detail/ResponsibleGamblingBanner";
import { SafetyTrustBlock } from "@/components/detail/SafetyTrustBlock";
import { ScreenshotGallery } from "@/components/detail/ScreenshotGallery";
import { ShareButtons } from "@/components/detail/ShareButtons";
import { TagList } from "@/components/detail/TagList";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ListingSidebar } from "@/components/layout/ListingSidebar";
import { SoftwareApplicationJsonLd } from "@/components/seo/AppJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FAQPageJsonLd } from "@/components/seo/FAQPageJsonLd";
import { gameToCardModel } from "@/lib/card-mappers";
import { getAllGames, getGameBySlug, getGuidesForGame, getRelatedGames } from "@/lib/content";
import {
  absoluteUrl,
  buildGameMetaDescription,
  buildGameMetaTitle,
} from "@/lib/seo";
import { getPrimaryDownloadUrl } from "@/lib/download-links";
import { formatPkDate } from "@/lib/utils";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllGames().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "Not found" };

  const path = game.url;
  const title = buildGameMetaTitle(game);
  const description = buildGameMetaDescription(game);
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(game.title)}&rating=${game.rating}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootGameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Games", href: "/games" },
    { name: game.title },
  ];

  const related = getRelatedGames(game).map(gameToCardModel);
  const downloadHref = getPrimaryDownloadUrl(game.downloadLinks);

  const sectionTitle =
    "font-display text-xl font-bold tracking-tight text-text sm:text-2xl";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <article className="min-w-0 space-y-10">
        <BreadcrumbJsonLd
          items={[
            { name: "Home", href: "/" },
            { name: "Games", href: "/games" },
            { name: game.title, href: game.url },
          ]}
        />
        <SoftwareApplicationJsonLd
          name={game.title}
          description={game.shortDescription}
          slugPath={game.url}
          rating={game.rating}
          votes={game.votes}
          kind="game"
          coverImage={game.coverImage}
          screenshots={game.screenshots}
          softwareVersion={game.version}
          fileSize={game.size}
          datePublished={game.publishedAt}
          dateModified={game.updatedAt}
          tags={game.tags}
          categoryKey={game.category}
        />
        <FAQPageJsonLd faqs={game.faqs} />
        <Breadcrumb items={crumbs} />
        <EditorialReviewNote updatedAt={game.updatedAt} />
        <ResponsibleGamblingBanner />
        <AppHero
          title={game.title}
          coverImage={game.coverImage}
          shortDescription={game.shortDescription}
          rating={game.rating}
          votes={game.votes}
          downloadHref={downloadHref}
          downloads={game.downloads}
          size={game.size}
          requirements={game.requirements}
          version={game.version}
          isNew={game.isNew}
        />
        <SafetyTrustBlock />
        <ShareButtons urlPath={game.url} title={game.title} floatingMobile />
        <section id="review" className="scroll-mt-28 space-y-3">
          <h2 className={sectionTitle}>Full review</h2>
          <p className="text-sm text-text-muted">
            In-depth notes, tables, and screenshots from our listing—scroll or use the outline to
            jump.
          </p>
          <AppDescription code={game.body.code} />
        </section>
        <GamePlayerReviews gameTitle={game.title} reviews={game.playerReviews} />
        {game.screenshots.length > 0 ? (
          <section id="screenshots" className="scroll-mt-28 space-y-3">
            <h2 className={sectionTitle}>Screenshots</h2>
            <ScreenshotGallery urls={game.screenshots} productTitle={game.title} />
          </section>
        ) : null}
        <InstallSteps productTitle={game.title} steps={game.installSteps} />
        <section className="space-y-3">
          <h2 className={sectionTitle}>Tags</h2>
          <TagList tags={game.tags} />
        </section>
        <FAQSection faqs={game.faqs} />
        <RelatedGuides guides={getGuidesForGame(game)} />
        <section id="download" className="scroll-mt-28 space-y-4">
          <h2 className={sectionTitle}>Download</h2>
          <p className="text-sm text-text-muted">
            Updated {formatPkDate(game.updatedAt)} · verify file size ({game.size}) after download.
          </p>
          <DownloadMirrorLinks links={game.downloadLinks} />
        </section>
        <RelatedApps items={related} />
      </article>
      <aside className="flex min-w-0 flex-col gap-6">
        <DetailPageOutline
          hasScreenshots={game.screenshots.length > 0}
          hasInstall={game.installSteps.length > 0}
          hasFaq={game.faqs.length > 0}
          hasDownload={game.downloadLinks.length > 0}
        />
        <ListingSidebar />
      </aside>
    </div>
  );
}
