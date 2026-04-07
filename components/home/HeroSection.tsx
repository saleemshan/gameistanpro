"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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
            Trusted reviews of casino APKs, tools, and earning apps with JazzCash &
            EasyPaisa context—structured metadata, safe install guides, and fast pages
            built for Pakistani players.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link href="/apps">Browse apps</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/games">Explore games</Link>
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl border border-accent/20 shadow-[0_0_40px_rgba(0,255,136,0.12)]"
        >
          <Image
            src="https://placehold.co/800x600/0A0F1E/00FF88/webp?text=PK+Gaming"
            alt=""
            width={800}
            height={600}
            priority
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
