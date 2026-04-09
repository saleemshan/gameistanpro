import Image from "next/image";
import Link from "next/link";

import { SITE_LOGO } from "@/lib/site-media";
import { cn } from "@/lib/utils";

const heightClass = {
  sm: "h-8",
  md: "h-10",
} as const;

export function SiteLogoLink({
  size = "md",
  className,
  priority = false,
}: {
  size?: keyof typeof heightClass;
  className?: string;
  priority?: boolean;
}) {
  const h = heightClass[size];
  return (
    <Link
      href="/"
      className={cn("flex items-center bg-transparent", h, className)}
    >
      <Image
        src={SITE_LOGO.src}
        alt={SITE_LOGO.alt}
        width={SITE_LOGO.width}
        height={SITE_LOGO.height}
        className={cn(h, "w-auto bg-transparent object-contain")}
        priority={priority}
        sizes={size === "sm" ? "120px" : "150px"}
      />
    </Link>
  );
}
