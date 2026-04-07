import { NextResponse } from "next/server";

import { searchQuerySchema } from "@/lib/schema";
import { searchItems } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = searchQuerySchema.safeParse({
    q: searchParams.get("q") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }
  const q = parsed.data.q ?? "";
  const results = searchItems(q, 30);
  return NextResponse.json({ results });
}
