// Tables
export declare enum SortOrder {
    /**
     * Ordinamento ascendente
     */
    Asc = "asc",
    /**
     * Ordinamento discendente
     */
    Desc = "desc"
}


export const tablePageSizeOption = [10, 25, 50];


// utils/global.ts (o in un file simile)
export interface IPaginationFilters {
    /**
     * La pagina da recuperare
     */
    page?: number;
    /**
     * La dimensione della pagina da recuperare
     */
    pageSize?: number;
  }
  
  export interface IPaginatedList<T> {
    /**
     * Il numero totale di elementi
     */
    count: number;
    /**
     * Gli elementi della pagina corrente
     */
    items: T[];
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export type QueryParamsObj = Record<string, any>;
  