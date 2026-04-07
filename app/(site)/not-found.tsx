import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="font-display text-2xl font-bold text-text">
        Page not found
      </h1>
      <p className="max-w-md text-text-muted">
        The APK or guide you wanted moved. Try search or head back home.
      </p>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
