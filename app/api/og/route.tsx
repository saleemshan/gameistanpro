import { ImageResponse } from "next/og";

import { ogSearchParamsSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = ogSearchParamsSchema.safeParse({
    title: searchParams.get("title") ?? undefined,
    rating: searchParams.get("rating") ?? undefined,
    subtitle: searchParams.get("subtitle") ?? undefined,
  });

  const title = parsed.success ? (parsed.data.title ?? siteConfig.shortName) : siteConfig.shortName;
  const rating = parsed.success ? parsed.data.rating : undefined;
  const subtitle =
    parsed.success ? (parsed.data.subtitle ?? "Pakistan APK & games") : "Pakistan APK & games";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
          background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #022c22 100%)",
          color: "#e2e8f0",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#00ff88", fontSize: 28, fontWeight: 700 }}>
            {siteConfig.shortName}
          </span>
          {rating ? (
            <span style={{ color: "#ffd700", fontSize: 24 }}>★ {rating}</span>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#94a3b8" }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 20, color: "#64748b" }}>gameistan.pro editorial</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
