"use client";
// Parte interattiva del catalogo. Riceve i film già caricati dal server:
// qui non si chiama mai TMDB. Serve il client solo per le recensioni
// (salvate nel localStorage) e per cambiare pagina.
import { MetricCard, Table } from "@/components";
import { useReviewsStore } from "@/hooks";
import { IMoviesFilters, IMoviesPage } from "@/services";
import { Stack, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";
import { moviesColumns } from "./columns";

/** TMDB restituisce sempre 20 film per pagina: la tabella usa la stessa misura */
const PAGE_SIZE = 20;

interface IMoviesViewProps {
  movies: IMoviesPage;
  filters: IMoviesFilters;
}

export function MoviesView({ movies, filters }: IMoviesViewProps) {
  const theme = useTheme();
  const router = useRouter();
  const { reviews } = useReviewsStore();
  // isPending è true mentre il server prepara la nuova pagina
  const [isPending, startTransition] = useTransition();

  const goToPage = (page: number) => {
    const query = new URLSearchParams({
      title: filters.title,
      year: filters.year,
      language: filters.language,
      page: String(page),
    });
    startTransition(() => router.push(`/?${query}`));
  };

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mb: 3 }}>
        <MetricCard
          value={reviews.length}
          label="Recensioni Scritte"
          color={theme.palette.info.dark}
          icon={EditIcon}
        />
        <MetricCard
          value={movies.count}
          label="Totale Film"
          color={theme.palette.success.dark}
          icon={MovieIcon}
        />
      </Stack>

      <Table
        columns={moviesColumns(theme, router, reviews)}
        data={movies}
        loading={isPending}
        pageSizeOptions={[PAGE_SIZE]}
        paginationModel={{ page: filters.page - 1, pageSize: PAGE_SIZE }}
        onPaginationModelChange={(model) => goToPage(model.page + 1)}
      />
    </>
  );
}
