import Image from "next/image";

import { DownloadButton } from "@/components/detail/DownloadButton";
import { StarRating } from "@/components/listing/StarRating";

export function AppHero({
  title,
  coverImage,
  shortDescription,
  rating,
  votes,
  downloadHref,
}: {
  title: string;
  coverImage: string;
  shortDescription: string;
  rating: number;
  votes: number;
  /** First HTTPS mirror — hero button links here when present. */
  downloadHref?: string | null;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="relative mx-auto size-[200px] shrink-0 overflow-hidden rounded-2xl border border-border-subtle bg-bg-card shadow-xl lg:mx-0">
        <Image
          src={coverImage}
          alt={title}
          width={200}
          height={200}
          priority
          // SEO FIX: Hint LCP image priority for Core Web Vitals (Next passes to fetchpriority).
          fetchPriority="high"
          className="size-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1 space-y-4 text-center lg:text-left">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text md:text-4xl">
          {title}
        </h1>
        <StarRating
          rating={rating}
          votes={votes}
          className="justify-center lg:justify-start"
        />
        <p className="text-pretty text-lg text-text-muted">{shortDescription}</p>
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <DownloadButton href={downloadHref} />
          {downloadHref ? (
            <a
              href="#download"
              className="text-sm text-accent underline-offset-2 hover:underline"
            >
              More mirrors &amp; file checks
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
