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
  const title = String(params.title || "").trim();
  const year =
    params.year && params.year !== "all" ? String(params.year).trim() : "";
  const language =
    params.language && params.language !== "all"
      ? String(params.language).trim()
      : "";
  const hasTitleFilter = title.length > 0;

  const queryParams = hasTitleFilter
    ? {
        page,
        query: title,
        include_adult: "false",
        ...(year ? { primary_release_year: year } : {}),
      }
    : {
        page,
        include_adult: "false",
        sort_by: "primary_release_date.desc",
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

  const hasPostFilter = hasTitleFilter && !!language;

  return {
    count: hasPostFilter
      ? filteredResults.length
      : res.total_results || filteredResults.length,
    items: filteredResults,
  };
};
