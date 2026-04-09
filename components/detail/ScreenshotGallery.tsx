"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

export function ScreenshotGallery({
  urls,
  productTitle,
}: {
  urls: string[];
  /** SEO FIX: Contextual alts for gallery images (app/game name). */
  productTitle?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  if (!urls.length) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {urls.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setActive(i);
              setOpen(true);
            }}
            className="relative aspect-[9/16] overflow-hidden rounded-lg border border-border-subtle bg-bg-deep transition hover:border-accent/40"
          >
            <Image
              src={src}
              alt={
                productTitle
                  ? `${productTitle} screenshot ${i + 1}`
                  : `Screenshot ${i + 1}`
              }
              fill
              className="object-cover"
              sizes="(max-width:640px) 50vw, 33vw"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(100vw-2rem,900px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border-subtle bg-bg-deep p-2 shadow-2xl outline-none">
          <Dialog.Title className="sr-only">Screenshot preview</Dialog.Title>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
            <Image
              src={urls[active] ?? urls[0]}
              alt={
                productTitle
                  ? `${productTitle} screenshot preview`
                  : "Screenshot preview"
              }
              fill
              className="object-contain"
              sizes="900px"
            />
          </div>
          <div className="mt-2 flex justify-between gap-2">
            <button
              type="button"
              className="rounded-lg border border-border-subtle px-3 py-1 text-sm text-text"
              onClick={() => setActive((a) => (a > 0 ? a - 1 : urls.length - 1))}
            >
              Prev
            </button>
            <Dialog.Close className="rounded-lg border border-border-subtle px-3 py-1 text-sm text-text">
              Close
            </Dialog.Close>
            <button
              type="button"
              className="rounded-lg border border-border-subtle px-3 py-1 text-sm text-text"
              onClick={() => setActive((a) => (a < urls.length - 1 ? a + 1 : 0))}
            >
              Next
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
