"use client";
import { FrontOfficePage, MoviesTableFilters, Table } from "@/components";
import { ROOT } from "@/routes";
import { moviesColumns } from "./columns";
import { useTable } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { getMoviesList, IMovie } from "@/services";
import { IPaginatedList } from "@/utils";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { IMoviesTableFilters } from "@/components/table/filters";

export default function Movies() {
  const theme = useTheme();
  const router = useRouter();

  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Movies" }];

  const { tableProps, tableState, setTableState } = useTable<IMoviesTableFilters>({
    page: 1,
    pageSize: 10,
    title: "",
    year: "all",
    language: "all",
  });

  const [movies, setMovies] = useState<IPaginatedList<IMovie>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filters = useMemo<IMoviesTableFilters>(
    () => ({
      title: tableState.title || "",
      year: tableState.year || "all",
      language: tableState.language || "all",
    }),
    [tableState.language, tableState.title, tableState.year]
  );

  const titleOptions = useMemo(() => {
    const options = movies?.items.map((movie) => movie.title) || [];
    return [...new Set(options)];
  }, [movies]);

  const handleFiltersChange = (nextFilters: IMoviesTableFilters) => {
    setTableState((prev) => {
      const isSame =
        prev.title === nextFilters.title &&
        prev.year === nextFilters.year &&
        prev.language === nextFilters.language;

      if (isSame) return prev;

      return {
        ...prev,
        ...nextFilters,
        page: 1,
      };
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const res = await getMoviesList(tableState);
        setMovies(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [tableState]);

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Movies">
      <MoviesTableFilters
        value={filters}
        onChange={handleFiltersChange}
        titleOptions={titleOptions}
      />
      <Table
        columns={moviesColumns(theme, router)}
        data={movies}
        loading={isLoading}
        {...tableProps}
      />
    </FrontOfficePage>
  );
}
