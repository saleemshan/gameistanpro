"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function NewBadge({ className }: { className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "absolute left-2 top-2 z-10 rounded bg-gold px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg-deep shadow-lg",
        className,
      )}
    >
      New
    </motion.span>
  );
}
