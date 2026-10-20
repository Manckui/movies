"use client";
import {
  FrontOfficePage,
  MetricCard,
  MoviesTableFilters,
  Table,
} from "@/components";
import { ROOT } from "@/routes";
import { moviesColumns } from "./columns";
import { useReviewsStore, useTable } from "@/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { getMoviesList, IMovie } from "@/services";
import { IPaginatedList } from "@/utils";
import { Alert, Button, Stack, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { IMoviesTableFilters } from "@/components/table/filters";
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";

export default function Movies() {
  const theme = useTheme();
  const router = useRouter();
  const { reviews } = useReviewsStore();

  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Film" }];

  const { tableProps, tableState, setTableState } =
    useTable<IMoviesTableFilters>({
      page: 1,
      pageSize: 10,
      title: "",
      year: "all",
      language: "all",
    });

  const [movies, setMovies] = useState<IPaginatedList<IMovie>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>();
  // Id dell'ultima richiesta: scrivendo veloce nel filtro una risposta
  // vecchia può arrivare dopo quella nuova e non deve sovrascriverla.
  const lastRequestId = useRef(0);

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

  const fetchMovies = async () => {
    const requestId = ++lastRequestId.current;
    setIsLoading(true);
    setFetchError(undefined);
    try {
      const res = await getMoviesList(tableState);
      if (requestId === lastRequestId.current) setMovies(res);
    } catch (error) {
      console.error(error);
      if (requestId === lastRequestId.current) {
        setFetchError("Impossibile caricare i film. Riprova.");
      }
    } finally {
      if (requestId === lastRequestId.current) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableState]);

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Film">
      <MoviesTableFilters
        value={filters}
        onChange={handleFiltersChange}
        titleOptions={titleOptions}
      />
      <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mb: 3 }}>
        <MetricCard
          value={reviews.length}
          label="Recensioni Scritte"
          color={theme.palette.info.dark}
          icon={EditIcon}
        />
        <MetricCard
          value={movies?.count ?? 0}
          label="Totale Film"
          color={theme.palette.success.dark}
          icon={MovieIcon}
        />
      </Stack>
      {fetchError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchMovies}>
              Riprova
            </Button>
          }
        >
          {fetchError}
        </Alert>
      ) : (
        <Table
          columns={moviesColumns(theme, router, reviews)}
          data={movies}
          loading={isLoading}
          {...tableProps}
        />
      )}
    </FrontOfficePage>
  );
}
