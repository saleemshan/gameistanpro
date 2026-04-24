import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * SEO FIX: Redirect homepage pagination URLs (e.g. `/?page=4`) to `/`.
 *
 * The homepage no longer uses pagination, but Google still crawls stale
 * `/?page=N` URLs from an older version of the site (HomeFeaturedGamesSection).
 * This caused "Alternate page with proper canonical tag" warnings in
 * Google Search Console. A 301 redirect tells Google these URLs are
 * permanently gone and consolidates crawl signals on the canonical `/`.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Only intercept the root path with a `page` query parameter
  if (pathname === "/" && searchParams.has("page")) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("page");
    // If no other search params remain, redirect to clean `/`
    url.search = url.searchParams.toString()
      ? `?${url.searchParams.toString()}`
      : "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Only run on the root path — avoid running middleware on every request
  matcher: "/",
};
