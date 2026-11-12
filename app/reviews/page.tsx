"use client";

import { FrontOfficePage, MetricCard, Table } from "@/components";
import { getAverageRating, IReview, useReviewsStore } from "@/hooks";
import { ROOT } from "@/routes/paths";
import {
  Alert,
  Box,
  Button,
  Card,
  InputAdornment,
  LinearProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { reviewsColumns } from "./columns";

export default function Reviews() {
  const theme = useTheme();
  const router = useRouter();
  const { reviews, saveReview, deleteReview } = useReviewsStore();

  const [search, setSearch] = useState("");
  const [deletedReview, setDeletedReview] = useState<IReview>();

  // Media dei voti personali.
  const averageRating = useMemo(() => getAverageRating(reviews), [reviews]);

  // Quante recensioni per ogni voto (5 → 1).
  const distribution = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((stars) => ({
        stars,
        count: reviews.filter((r) => r.rating === stars).length,
      })),
    [reviews]
  );

  // Filtra per testo e adatta le recensioni alla tabella.
  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reviews
      .filter(
        (review) =>
          !query ||
          review.title.toLowerCase().includes(query) ||
          review.text.toLowerCase().includes(query)
      )
      .map((review) => ({
        ...review,
        id: review.movieId,
        myRating: review.rating,
      }));
  }, [reviews, search]);

  // Elimina con possibilità di annullare.
  const handleDelete = (movieId: number) => {
    setDeletedReview(reviews.find((r) => r.movieId === movieId));
    deleteReview(movieId);
  };

  const handleUndo = () => {
    if (deletedReview) saveReview(deletedReview);
    setDeletedReview(undefined);
  };

  const breadcrumbItems = [
    { text: "Home", link: ROOT },
    { text: "Recensioni" },
  ];

  return (
    <FrontOfficePage
      breadcrumbs={breadcrumbItems}
      title="Le mie recensioni"
      subtitle="Tutte le recensioni che hai scritto, in un unico posto."
      action={
        <Button
          component={Link}
          href={ROOT}
          variant="contained"
          startIcon={<MovieIcon />}
        >
          Trova un film
        </Button>
      }
    >
      <Snackbar
        open={!!deletedReview}
        autoHideDuration={5000}
        onClose={() => setDeletedReview(undefined)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          variant="filled"
          action={
            <Button color="inherit" size="small" onClick={handleUndo}>
              Annulla
            </Button>
          }
        >
          Recensione eliminata
        </Alert>
      </Snackbar>

      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        <Stack direction={{ xs: "column", sm: "row" }} gap={3} sx={{ flex: 2 }}>
          <MetricCard
            value={averageRating.toLocaleString("it-IT")}
            label="Il mio voto medio"
            color={theme.palette.warning.main}
            icon={StarIcon}
          />
          <MetricCard
            value={reviews.length}
            label="Recensioni scritte"
            color={theme.palette.info.main}
            icon={EditIcon}
          />
        </Stack>

        <Card sx={{ flex: 1, px: 3, py: 2.5 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Distribuzione voti
          </Typography>
          <Stack gap={0.75}>
            {distribution.map(({ stars, count }) => (
              <Stack key={stars} direction="row" alignItems="center" gap={1.25}>
                <Typography variant="caption" sx={{ width: 10 }}>
                  {stars}
                </Typography>
                <StarIcon sx={{ fontSize: 14, color: "warning.main" }} />
                <LinearProgress
                  variant="determinate"
                  color="warning"
                  value={reviews.length ? (count / reviews.length) * 100 : 0}
                  sx={{ flex: 1 }}
                  aria-label={`${count} recensioni da ${stars} stelle`}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ width: 16, textAlign: "right" }}
                >
                  {count}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Card>
      </Stack>

      <Card>
        <Box sx={{ p: 3 }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cerca per titolo o testo della recensione…"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.disabled" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Table
          columns={reviewsColumns(router, handleDelete)}
          rows={rows}
          paginationMode="client"
          sortingMode="client"
          localeText={{ noRowsLabel: "Nessuna recensione trovata" }}
        />
      </Card>
    </FrontOfficePage>
  );
}
