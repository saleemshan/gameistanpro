"use client";

import { Download } from "lucide-react";
import { track } from "@vercel/analytics";

interface DownloadButtonProps {
  url: string;
  gameName: string;
  sticky?: boolean;
}

export function DownloadButton({ url, gameName, sticky = false }: DownloadButtonProps) {
  const handleClick = () => {
    track("download_click", { game: gameName, url });
  };

  const button = (
    <a
      href={url}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={handleClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl gradient-primary px-6 h-14 text-lg font-heading font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] transition-all animate-pulse hover:animate-none"
    >
      <Download className="h-5 w-5" />
      Download APK
    </a>
  );

  if (sticky) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur-sm md:hidden">
        {button}
      </div>
    );
  }

  return button;
}
