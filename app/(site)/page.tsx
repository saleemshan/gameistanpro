import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { GeneralGuidesSection } from "@/components/home/GeneralGuidesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeFeaturedGamesSection } from "@/components/home/HomeFeaturedGamesSection";
import { SafeDownloadGuideSection } from "@/components/home/SafeDownloadGuideSection";
import { UserReviewsSection } from "@/components/home/UserReviewsSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOMEPAGE_GAMES_PER_PAGE } from "@/lib/constants";
import { getHomepageGamesPage } from "@/lib/content";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo";

export const revalidate = 60;

const homeDescription =
  "Browse real-money earning games in Pakistan: color prediction, casino APKs, JazzCash & EasyPaisa guides, ratings, versions, and safe install tips. Independent PKR-focused reviews for 2026.";

const homeKeywords = [
  "earning games Pakistan",
  "color prediction app Pakistan",
  "real money games PKR",
  "casino APK download Pakistan",
  "JazzCash earning games",
  "EasyPaisa withdrawal games",
  "PK gaming guides",
  "safe APK install Pakistan",
] as const;

function parseHomePage(v: string | string[] | undefined): number {
  const raw = typeof v === "string" ? v : v?.[0];
  const n = raw ? parseInt(raw, 10) : 1;
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function homeCanonicalPath(page: number): string {
  return page <= 1 ? "/" : `/?page=${page}`;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const requested = parseHomePage(sp.page);
  const { page, totalPages } = getHomepageGamesPage(
    requested,
    HOMEPAGE_GAMES_PER_PAGE,
  );
  const path = homeCanonicalPath(page);
  const canonical = absoluteUrl(path);

  const titleAbsolute =
    page > 1
      ? `${siteConfig.defaultTitle} — Page ${page}`
      : siteConfig.defaultTitle;

  return {
    title: { absolute: titleAbsolute },
    description: homeDescription,
    keywords: [...homeKeywords],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      ...(page > 1
        ? { prev: absoluteUrl(homeCanonicalPath(page - 1)) }
        : {}),
      ...(page < totalPages
        ? { next: absoluteUrl(homeCanonicalPath(page + 1)) }
        : {}),
    },
    openGraph: {
      title: titleAbsolute,
      description: homeDescription,
      url: canonical,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [{ url: "/api/og?title=Gameistan+Pro", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbsolute,
      description: homeDescription,
      images: ["/api/og?title=Gameistan+Pro"],
    },
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const requested = parseHomePage(sp.page);
  const { page: validPage } = getHomepageGamesPage(
    requested,
    HOMEPAGE_GAMES_PER_PAGE,
  );
  if (validPage !== requested) {
    redirect(validPage <= 1 ? "/" : `/?page=${validPage}`);
  }
  const pageUrl = absoluteUrl(homeCanonicalPath(validPage));

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: siteConfig.defaultTitle,
    description: homeDescription,
    isPartOf: { "@type": "WebSite", url: getSiteUrl(), name: siteConfig.name },
    about: {
      "@type": "Thing",
      name: "Real money earning games and APK guides in Pakistan",
    },
    inLanguage: "en-PK",
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <div className="flex flex-col gap-16">
        <HeroSection />
        <HomeFeaturedGamesSection page={validPage} />
        <UserReviewsSection />
        <GeneralGuidesSection />
        <WhyChooseSection />
        <SafeDownloadGuideSection />
      </div>
    </>
  );
}
