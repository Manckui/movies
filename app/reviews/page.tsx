"use client";

import { FrontOfficePage, MetricCard, Table } from "@/components";
import { useReviewsStore } from "@/hooks";
import { ROOT } from "@/routes/paths";
import { getMovieDetails, IMovieDetails } from "@/services";
import { Stack, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { reviewsColumns } from "./columns";

interface IReviewRow extends IMovieDetails {
  myRating: number;
}

export default function Reviews() {
  const theme = useTheme();
  const router = useRouter();
  const { reviews } = useReviewsStore();

  const [rows, setRows] = useState<IReviewRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  useEffect(() => {
    const fetchReviewedMovies = async () => {
      setIsLoading(true);
      try {
        const movies = await Promise.all(
          reviews.map((review) => getMovieDetails(review.movieId))
        );
        setRows(
          movies.map((movie, index) => ({
            ...movie,
            myRating: reviews[index].rating,
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewedMovies();
  }, [reviews]);

  const breadcrumbItems = [
    { text: "Home", link: ROOT },
    { text: "Recensioni" },
  ];

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Recensioni">
      <Stack direction="row" gap={2} sx={{ mb: 3 }}>
        <MetricCard
          value={averageRating}
          label="Il Mio Voto Medio"
          color={theme.palette.warning.dark}
          icon={StarIcon}
        />
        <MetricCard
          value={reviews.length}
          label="Recensioni Scritte"
          color={theme.palette.info.dark}
          icon={EditIcon}
        />
      </Stack>
      <Table
        columns={reviewsColumns(theme, router)}
        rows={rows}
        loading={isLoading}
        paginationMode="client"
        sortingMode="client"
      />
    </FrontOfficePage>
  );
}
