// api/tmdb.ts
import { API, IPaginatedList, QueryParamsObj } from "@/utils";
import { IMovie, IMovieDetails, IMovieDto } from "./movies.types";

export const getMovieDetails = async (id: number): Promise<IMovieDetails> => {
  const res = await API.get<IMovieDetails>(`/movie/${id}`);
  return res;
};

export const getMoviesList = async (
  params: QueryParamsObj
): Promise<IPaginatedList<IMovie>> => {
  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const moviesPerRequest = 20;
  const title = String(params.title || "").trim();
  const year =
    params.year && params.year !== "all" ? String(params.year).trim() : "";
  const language =
    params.language && params.language !== "all"
      ? String(params.language).trim()
      : "";
  const hasTitleFilter = title.length > 0;

  const pagesToFetch = Math.ceil(pageSize / moviesPerRequest);

  let allResults: IMovie[] = [];
  let totalCount = 0;

  for (let i = 0; i < pagesToFetch; i++) {
    const queryParams = hasTitleFilter
      ? {
          page: page + i,
          query: title,
          include_adult: "false",
          ...(year ? { primary_release_year: year } : {}),
        }
      : {
          page: page + i,
          include_adult: "false",
          sort_by: "popularity.desc",
          ...(year ? { primary_release_year: year } : {}),
          ...(language ? { with_original_language: language } : {}),
        };

    const endpoint = hasTitleFilter ? "/search/movie" : "/discover/movie";
    const res = await API.get<IMovieDto>(endpoint, queryParams);
    let filteredResults = res.results;

    if (hasTitleFilter && language) {
      filteredResults = filteredResults.filter(
        (movie) => movie.original_language === language
      );
    }

    allResults = [...allResults, ...filteredResults];
    totalCount = res.total_results;

    if (allResults.length >= pageSize) break;
  }

  const hasPostFilter = hasTitleFilter && !!language;

  return {
    count: hasPostFilter ? allResults.length : totalCount || allResults.length,
    items: allResults.slice(0, pageSize),
  };
};
