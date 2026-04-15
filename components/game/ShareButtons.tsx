"use client";

import { Share2 } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const platforms = [
  {
    name: "WhatsApp",
    color: "bg-green-600 hover:bg-green-700",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: "Telegram",
    color: "bg-blue-500 hover:bg-blue-600",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Facebook",
    color: "bg-blue-700 hover:bg-blue-800",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "X",
    color: "bg-neutral-800 hover:bg-neutral-700",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
];

export function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Share2 className="h-4 w-4 text-muted-foreground" />
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.getUrl(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-8 items-center rounded-lg px-3 text-xs font-medium text-white transition-colors ${p.color}`}
        >
          {p.name}
        </a>
      ))}
    </div>
  );
}
