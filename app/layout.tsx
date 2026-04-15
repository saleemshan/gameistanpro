import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_LOGO } from "@/lib/site-media";
import {
  absoluteUrl,
  getDefaultOgImagePath,
  getGoogleSiteVerification,
  getOrgSameAs,
  getSiteUrl,
  siteConfig,
} from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [{ url: "/images/brand/gameistan-pro-logo.png", type: "image/png" }],
    shortcut: ["/images/brand/gameistan-pro-logo.png"],
    apple: [{ url: "/images/brand/gameistan-pro-logo.png", type: "image/png" }],
  },
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "earning games pakistan",
    "casino apk download",
    "real money games pakistan",
    "pk earning apps",
  ],
  // SEO FIX: No default canonical — child routes must set self-referencing canonicals (root "/" leaked to paginated listings).
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: getSiteUrl(),
    // SEO FIX: Default share image when a route omits openGraph.images.
    images: [
      {
        url: getDefaultOgImagePath(),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [getDefaultOgImagePath()],
  },
  verification: {
    google: getGoogleSiteVerification(),
  },
};

// SEO FIX: Organization logo = brand mark (crawlable); sameAs from env when set.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: getSiteUrl(),
  logo: absoluteUrl(SITE_LOGO.src),
  ...(getOrgSameAs().length ? { sameAs: getOrgSameAs() } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: getSiteUrl(),
  potentialAction: {
    "@type": "SearchAction",
    target: `${getSiteUrl()}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// SEO FIX: Explicit mobile viewport (document for audits; matches Next defaults).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} dark h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* SEO FIX: Third-party cover-image origin (MDX) — faster TLS + DNS for LCP. */}
        <link
          rel="preconnect"
          href="https://gameistan.com.pk"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://gameistan.com.pk" />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <JsonLd data={[orgSchema, websiteSchema]} />
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
