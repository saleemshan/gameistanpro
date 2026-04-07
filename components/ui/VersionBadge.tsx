import { cn } from "@/lib/utils";

export function VersionBadge({
  version,
  className,
}: {
  version: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] text-text-muted tabular-nums",
        className,
      )}
    >
      v{version}
    </span>
  );
}
