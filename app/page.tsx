"use client";
import {
  FrontOfficePage,
  MetricCard,
  MoviesTableFilters,
  Table,
} from "@/components";
import { MOVIE_DETAILS, REVIEW, ROOT } from "@/routes";
import { moviesColumns } from "./columns";
import { getAverageRating, useReviewsStore, useTable } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { getMoviesList, IMovie } from "@/services";
import { IPaginatedList } from "@/utils";
import {
  Alert,
  Box,
  Button,
  Card,
  Stack,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IMoviesTableFilters } from "@/components/table/filters";
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";
import StarIcon from "@mui/icons-material/Star";

const DEFAULT_FILTERS: IMoviesTableFilters = {
  title: "",
  year: "all",
  language: "all",
};

export default function Movies() {
  const theme = useTheme();
  const router = useRouter();
  const { reviews } = useReviewsStore();

  const [movies, setMovies] = useState<IPaginatedList<IMovie>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>();

  // Paginazione e filtri.
  const { tableProps, tableState, setTableState } =
    useTable<IMoviesTableFilters>({
      page: 1,
      pageSize: 20,
      ...DEFAULT_FILTERS,
    });

  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Movies" }];

  // Filtri
  const filters = useMemo<IMoviesTableFilters>(
    () => ({
      title: tableState.title || "",
      year: tableState.year || "all",
      language: tableState.language || "all",
    }),
    [tableState.language, tableState.title, tableState.year]
  );

  // Suggerimenti unici.
  const titleOptions = useMemo(() => {
    const options = movies?.items.map((movie) => movie.title) || [];
    return [...new Set(options)];
  }, [movies]);

  // Applica filtri
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

  // Carica i film.
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setFetchError(undefined);
      try {
        const res = await getMoviesList(tableState);
        setMovies(res);
      } catch (error) {
        console.error(error);
        setFetchError("Impossibile caricare i film.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [tableState]);

  // Totale senza filtri.
  const hasFilters =
    !!filters.title.trim() ||
    filters.year !== "all" ||
    filters.language !== "all";

  // Filtro locale sulla lingua.
  const hasLocalLanguageFilter =
    !!filters.title.trim() && filters.language !== "all";

  return (
    <FrontOfficePage
      breadcrumbs={breadcrumbItems}
      title="Movies"
      subtitle="Esplora il catalogo, filtra e recensisci i tuoi film preferiti."
      action={
        <Button
          component={Link}
          href={REVIEW}
          variant="outlined"
          color="inherit"
          startIcon={<StarIcon sx={{ color: "warning.main" }} />}
        >
          Le mie recensioni
        </Button>
      }
    >
      <Stack direction={{ xs: "column", sm: "row" }} gap={3}>
        <MetricCard
          value={(movies?.count ?? 0).toLocaleString("it-IT")}
          label={hasFilters ? "Risultati" : "Totale film"}
          color={theme.palette.info.main}
          icon={MovieIcon}
        />
        <MetricCard
          value={reviews.length}
          label="Recensioni scritte"
          color={theme.palette.primary.main}
          icon={EditIcon}
        />
        <MetricCard
          value={getAverageRating(reviews).toLocaleString("it-IT")}
          label="Il mio voto medio"
          color={theme.palette.warning.main}
          icon={StarIcon}
        />
      </Stack>

      <Card>
        <Box sx={{ p: 3 }}>
          <MoviesTableFilters
            value={filters}
            onChange={handleFiltersChange}
            titleOptions={titleOptions}
          />
        </Box>

        {fetchError ? (
          <Alert severity="error" sx={{ mx: 3, mb: 3 }}>
            {fetchError}
          </Alert>
        ) : (
          <Table
            columns={moviesColumns(router, reviews)}
            data={movies}
            loading={isLoading}
            hideFooter={hasLocalLanguageFilter}
            onRowClick={({ id }) => router.push(MOVIE_DETAILS(Number(id)))}
            sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
            {...tableProps}
          />
        )}
      </Card>
    </FrontOfficePage>
  );
}
