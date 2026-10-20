// api/tmdb.ts
import { API, IPaginatedList, QueryParamsObj } from "@/utils";
import { IMovie, IMovieDetails, IMovieDto } from "./movies.types";
import { getReachableCount, getTmdbPageWindow } from "./pagination";

export const getMovieDetails = async (id: number): Promise<IMovieDetails> => {
  const res = await API.get<IMovieDetails>(`/movie/${id}`);
  return res;
};

export const getMoviesList = async (
  params: QueryParamsObj
): Promise<IPaginatedList<IMovie>> => {
  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const title = String(params.title || "").trim();
  const year =
    params.year && params.year !== "all" ? String(params.year).trim() : "";
  const language =
    params.language && params.language !== "all"
      ? String(params.language).trim()
      : "";
  const hasTitleFilter = title.length > 0;

  // /search/movie non supporta il filtro per lingua originale:
  // con un titolo la lingua viene ignorata (il filtro è disabilitato in UI).
  const endpoint = hasTitleFilter ? "/search/movie" : "/discover/movie";
  const baseParams = hasTitleFilter
    ? {
        query: title,
        include_adult: "false",
        ...(year ? { primary_release_year: year } : {}),
      }
    : {
        include_adult: "false",
        sort_by: "popularity.desc",
        ...(year ? { primary_release_year: year } : {}),
        ...(language ? { with_original_language: language } : {}),
      };

  const { firstPage, lastPage, offset } = getTmdbPageWindow(page, pageSize);
  const pages = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index
  );

  const responses = await Promise.all(
    pages.map((tmdbPage) =>
      API.get<IMovieDto>(endpoint, { ...baseParams, page: tmdbPage })
    )
  );

  const allResults = responses.flatMap((res) => res.results);

  return {
    count: getReachableCount(responses[0]?.total_results ?? 0),
    items: allResults.slice(offset, offset + pageSize),
  };
};
