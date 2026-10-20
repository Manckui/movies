import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Solo gli endpoint che l'app usa davvero: il proxy non deve diventare
// un accesso libero a TMDB con il nostro token.
const ALLOWED_PATHS = [/^movie\/\d+$/, /^discover\/movie$/, /^search\/movie$/];

/**
 * Proxy server-side verso TMDB: il token resta sul server e non finisce
 * nel bundle JavaScript scaricato dal browser.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "TMDB_ACCESS_TOKEN non configurato" },
      { status: 500 }
    );
  }

  const path = (await params).path.join("/");
  if (!ALLOWED_PATHS.some((pattern) => pattern.test(path))) {
    return NextResponse.json({ error: "Endpoint non consentito" }, { status: 404 });
  }

  const url = new URL(`${TMDB_BASE_URL}/${path}`);
  url.search = request.nextUrl.search;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  return NextResponse.json(await response.json(), { status: response.status });
}
