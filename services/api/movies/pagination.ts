/** TMDB restituisce sempre pagine da 20 risultati. */
export const TMDB_PAGE_SIZE = 20;
/** TMDB non serve pagine oltre la 500 (massimo 10.000 risultati). */
export const TMDB_MAX_PAGE = 500;

export interface ITmdbPageWindow {
  /** Prima pagina TMDB da richiedere (1-based) */
  firstPage: number;
  /** Ultima pagina TMDB da richiedere, inclusa */
  lastPage: number;
  /** Quanti risultati scartare dall'inizio della prima pagina */
  offset: number;
}

/**
 * Traduce pagina e dimensione della tabella (es. pagina 3 da 25) nelle
 * pagine TMDB da 20 che contengono quei risultati.
 */
export const getTmdbPageWindow = (
  page: number,
  pageSize: number
): ITmdbPageWindow => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const firstPage = Math.floor(start / TMDB_PAGE_SIZE) + 1;
  const lastPage = Math.min(Math.ceil(end / TMDB_PAGE_SIZE), TMDB_MAX_PAGE);

  return {
    firstPage,
    lastPage,
    offset: start - (firstPage - 1) * TMDB_PAGE_SIZE,
  };
};

/** Totale navigabile: oltre il limite di pagine TMDB la tabella darebbe errore. */
export const getReachableCount = (totalResults: number) =>
  Math.min(totalResults, TMDB_MAX_PAGE * TMDB_PAGE_SIZE);
