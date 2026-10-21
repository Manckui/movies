// Server Component: legge i filtri dall'URL, chiama TMDB sul server
// e passa i film già pronti alla parte interattiva (MoviesView).
import { FrontOfficePage } from "@/components";
import { ROOT } from "@/routes";
import { getMovies } from "@/services/tmdb";
import { IMoviesFilters } from "@/services";
import { MoviesFilters } from "./movies-filters";
import { MoviesView } from "./movies-view";

interface IMoviesPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Movies({ searchParams }: IMoviesPageProps) {
  const query = await searchParams;

  // "all" è il valore dell'opzione "Tutti/Tutte" nei filtri
  const filters: IMoviesFilters = {
    page: Number(query.page) || 1,
    title: query.title?.trim() || "",
    year: query.year && query.year !== "all" ? query.year : "",
    language: query.language && query.language !== "all" ? query.language : "",
  };

  const movies = await getMovies(filters);

  return (
    <FrontOfficePage
      breadcrumbs={[{ text: "Home", link: ROOT }, { text: "Film" }]}
      title="Film"
    >
      <MoviesFilters filters={filters} />
      <MoviesView movies={movies} filters={filters} />
    </FrontOfficePage>
  );
}
