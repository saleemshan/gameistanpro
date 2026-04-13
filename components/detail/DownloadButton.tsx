"use client";

import { track } from "@vercel/analytics";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DownloadButton({
  label = "Download APK",
  href,
}: {
  label?: string;
  /** When set, opens mirror in a new tab (first verified HTTPS mirror from the listing). */
  href?: string | null;
}) {
  const trimmed = href?.trim();
  if (trimmed && /^https?:\/\//i.test(trimmed)) {
    return (
      <Button
        asChild
        size="lg"
        className="animate-pulse-glow w-full font-display text-base font-bold sm:w-auto"
      >
        <a
          href={trimmed}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("download_cta_click", { section: "hero", mode: "direct_mirror" })
          }
        >
          <Download />
          {label}
        </a>
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="animate-pulse-glow w-full font-display text-base font-bold sm:w-auto"
      onClick={() => {
        track("download_cta_click", { section: "hero", mode: "scroll_to_section" });
        document.getElementById("download")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      type="button"
    >
      <Download />
      {label}
    </Button>
  );
}
