import type { Metadata } from "next";

import { CasinoGamesSection } from "@/components/home/CasinoGamesSection";
import { GamesSection } from "@/components/home/GamesSection";
import { GeneralGuidesSection } from "@/components/home/GeneralGuidesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestAppsSection } from "@/components/home/LatestAppsSection";
import { SafeDownloadGuideSection } from "@/components/home/SafeDownloadGuideSection";
import { TopRatedSection } from "@/components/home/TopRatedSection";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    images: [{ url: "/api/og?title=Gameistan+Pro", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <HeroSection />
      <TopRatedSection />
      <LatestAppsSection />
      <CasinoGamesSection />
      <GamesSection />
      <GeneralGuidesSection />
      <WhyChooseSection />
      <SafeDownloadGuideSection />
    </div>
  );
}
