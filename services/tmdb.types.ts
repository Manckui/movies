export interface IMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
}

export interface IMovieGenre {
  id: number;
  name: string;
}

export interface IMovieDetails extends IMovie {
  backdrop_path: string;
  genres: IMovieGenre[];
  runtime: number;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
  status: string;
  imdb_id: string;
}

/** Filtri del catalogo, letti dall'URL (es. /?page=2&title=matrix) */
export interface IMoviesFilters {
  page: number;
  title: string;
  year: string;
  language: string;
}

/** Una pagina di film già pronta per la tabella */
export interface IMoviesPage {
  items: IMovie[];
  count: number;
}
