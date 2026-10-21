// Chiamate a TMDB. Si usano solo nei Server Components
// (app/page.tsx e app/details/[id]/page.tsx), quindi girano sul server.
// Il token non ha il prefisso NEXT_PUBLIC_: Next non lo manda mai al browser.
import { IMovie, IMovieDetails, IMoviesFilters, IMoviesPage } from "./tmdb.types";

const TMDB_URL = "https://api.themoviedb.org/3";

/** TMDB non restituisce pagine oltre la 500 (20 film per pagina) */
const MAX_PAGE = 500;

async function tmdbGet<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = `${TMDB_URL}${path}?${new URLSearchParams(params)}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
    next: { revalidate: 3600 }, // Next tiene in cache la risposta per un'ora
  });

  if (!response.ok) {
    throw new Error(`Errore TMDB: ${response.status}`);
  }
  return response.json();
}

export async function getMovies(filters: IMoviesFilters): Promise<IMoviesPage> {
  const { page, title, year, language } = filters;

  const params: Record<string, string> = {
    page: String(Math.min(page, MAX_PAGE)),
    include_adult: "false",
  };
  if (year) params.primary_release_year = year;

  let data: { results: IMovie[]; total_results: number };

  if (title) {
    // La ricerca per titolo di TMDB non supporta il filtro per lingua
    data = await tmdbGet("/search/movie", { ...params, query: title });
  } else {
    if (language) params.with_original_language = language;
    data = await tmdbGet("/discover/movie", { ...params, sort_by: "popularity.desc" });
  }

  return {
    items: data.results,
    count: Math.min(data.total_results, MAX_PAGE * 20),
  };
}

export function getMovieDetails(id: string): Promise<IMovieDetails> {
  return tmdbGet(`/movie/${id}`);
}
