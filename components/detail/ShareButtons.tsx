"use client";

import { Link2, MessageCircle, Send, Share2 } from "lucide-react";
import { useMemo } from "react";

import { absoluteUrl } from "@/lib/seo";

export function ShareButtons({
  urlPath,
  title,
  floatingMobile,
}: {
  urlPath: string;
  title: string;
  floatingMobile?: boolean;
}) {
  const url = useMemo(() => encodeURIComponent(absoluteUrl(urlPath)), [urlPath]);
  const text = useMemo(() => encodeURIComponent(title), [title]);

  const links = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${text}%20${url}`,
      icon: MessageCircle,
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${url}&text=${text}`,
      icon: Send,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: Share2,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      icon: Link2,
    },
  ];

  return (
    <div
      className={
        floatingMobile
          ? "fixed bottom-4 right-4 z-40 flex flex-col gap-2 md:hidden"
          : "flex flex-wrap gap-2"
      }
    >
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-10 items-center justify-center rounded-full border border-border-subtle bg-bg-card/90 text-text shadow-lg backdrop-blur hover:border-accent/40 hover:text-accent"
          aria-label={`Share on ${name}`}
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}
