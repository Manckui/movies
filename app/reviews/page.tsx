"use client";

import { FrontOfficePage, MetricCard, Table } from "@/components";
import { useReviewsStore } from "@/hooks";
import { ROOT } from "@/routes/paths";
import { Stack, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { reviewsColumns } from "./columns";

export default function Reviews() {
  const theme = useTheme();
  const router = useRouter();
  const { reviews } = useReviewsStore();

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  const rows = useMemo(
    () =>
      reviews.map((review) => ({
        ...review,
        id: review.movieId,
        myRating: review.rating,
      })),
    [reviews]
  );

  const breadcrumbItems = [
    { text: "Home", link: ROOT },
    { text: "Recensioni" },
  ];

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Recensioni">
      <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mb: 3 }}>
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
        paginationMode="client"
        sortingMode="client"
      />
    </FrontOfficePage>
  );
}
