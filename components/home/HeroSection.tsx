"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SITE_HERO_IMAGE } from "@/lib/site-media";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/40 px-6 py-12 backdrop-blur-md md:px-12 md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-10 size-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 size-64 rounded-full bg-gold/15 blur-3xl" />
      </div>
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl lg:text-5xl"
          >
            Best real cash earning games &amp; APK downloads in Pakistan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="mt-4 max-w-xl text-pretty text-lg text-text-muted"
          >
            Independent guides to color-prediction and casino-style earning games—PKR,
            JazzCash &amp; EasyPaisa context, version/size metadata, and safe sideload
            checklists for Pakistani players.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link href="/games">Browse games</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/guides">Read guides</Link>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="relative mx-auto aspect-video w-full max-w-2xl overflow-hidden rounded-xl border border-accent/20 shadow-[0_0_40px_rgba(0,255,136,0.12)]"
        >
          <Image
            src={SITE_HERO_IMAGE.src}
            alt={SITE_HERO_IMAGE.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 672px"
            priority
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}
