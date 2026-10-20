import { describe, expect, it } from "vitest";
import {
  getReachableCount,
  getTmdbPageWindow,
  TMDB_MAX_PAGE,
  TMDB_PAGE_SIZE,
} from "./pagination";

describe("getTmdbPageWindow", () => {
  it("prima pagina da 10: metà della prima pagina TMDB", () => {
    expect(getTmdbPageWindow(1, 10)).toEqual({ firstPage: 1, lastPage: 1, offset: 0 });
  });

  it("seconda pagina da 10: seconda metà della prima pagina TMDB, senza saltare film", () => {
    expect(getTmdbPageWindow(2, 10)).toEqual({ firstPage: 1, lastPage: 1, offset: 10 });
  });

  it("pagina da 25 a cavallo di due pagine TMDB", () => {
    // risultati 25..49 → pagine TMDB 2 (20..39) e 3 (40..59)
    expect(getTmdbPageWindow(2, 25)).toEqual({ firstPage: 2, lastPage: 3, offset: 5 });
  });

  it("pagina da 50 richiede tre pagine TMDB", () => {
    // risultati 50..99 → pagine TMDB 3, 4, 5
    expect(getTmdbPageWindow(2, 50)).toEqual({ firstPage: 3, lastPage: 5, offset: 10 });
  });

  it("non chiede mai pagine oltre il limite TMDB", () => {
    const lastTablePage = getReachableCount(1_000_000) / 50;
    expect(getTmdbPageWindow(lastTablePage, 50).lastPage).toBe(TMDB_MAX_PAGE);
  });
});

describe("getReachableCount", () => {
  it("lascia invariati i totali piccoli", () => {
    expect(getReachableCount(137)).toBe(137);
  });

  it("taglia i totali oltre le 500 pagine TMDB", () => {
    expect(getReachableCount(20001)).toBe(TMDB_MAX_PAGE * TMDB_PAGE_SIZE);
  });
});
