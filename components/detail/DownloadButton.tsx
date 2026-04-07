"use client";

import { track } from "@vercel/analytics";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DownloadButton({ label = "Download APK" }: { label?: string }) {
  return (
    <Button
      size="lg"
      className="animate-pulse-glow w-full font-display text-base font-bold sm:w-auto"
      onClick={() => {
        track("download_cta_click", { section: "hero" });
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
