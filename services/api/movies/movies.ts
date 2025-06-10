// api/tmdb.ts
import { API, IPaginatedList, obj2qstring, QueryParamsObj } from "@/utils";
import { IMovie } from "./movies.types";

/**
 * Ottiene la lista di film con paginazione e supporto per `pageSize` personalizzato.
 * TMDB supporta massimo 20 film per pagina, quindi per `pageSize > 20` bisogna fare più richieste.
 */
export const getMoviesList = async (params: QueryParamsObj): Promise<IPaginatedList<IMovie>> => {
  const page = params.page || 1;
  const pageSize = params.pageSize || 5; // Default 10
  const moviesPerRequest = 20; // TMDB restituisce sempre 20 film per pagina

  // Quante pagine dobbiamo chiamare per ottenere abbastanza risultati?
  const pagesToFetch = Math.ceil(pageSize / moviesPerRequest);

  let allResults: IMovie[] = [];

  for (let i = 0; i < pagesToFetch; i++) {
    const queryParams = obj2qstring({ page: page + i });
    const res = await API.get<{
      page: number;
      results: IMovie[];
      total_pages: number;
      total_results: number;
    }>(`/movie/popular${queryParams}`);

    allResults = [...allResults, ...res.results];

    // Se abbiamo abbastanza risultati, fermiamoci
    if (allResults.length >= pageSize) break;
  }

  return {
    count: allResults.length, // Contiamo solo i risultati effettivi caricati
    items: allResults.slice(0, pageSize), // Prendiamo esattamente `pageSize`
  };
};
