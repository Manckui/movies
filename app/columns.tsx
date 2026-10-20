import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { alpha, Box, Stack, Theme, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { MOVIE_DETAILS } from "@/routes";
import { useRouter } from "next/navigation";
import { IReview } from "@/hooks";

export const moviesColumns = (
  theme: Theme,
  router: ReturnType<typeof useRouter>,
  reviews: IReview[] = []
): GridColDef[] => [
  {
    field: "title",
    headerName: "Film",
    flex: 2,
    renderCell: (params) => {
      const { row } = params;
      const imageUrl = row.poster_path
        ? `https://image.tmdb.org/t/p/w500${row.poster_path}`
        : "/placeholder.svg";
      return (
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={2}
          sx={{ height: "100%" }}
        >
          <Image
            src={imageUrl}
            width={56}
            height={56}
            alt={row.title}
            style={{
              borderRadius: "100%",
              objectFit: "cover",
              width: 56,
              height: 56,
              minWidth: 56,
              minHeight: 56,
            }}
            priority={false}
          />
          <Typography variant="subtitle1">{row.title}</Typography>
        </Stack>
      );
    },
  },
  { field: "release_date", headerName: "Data di Uscita", flex: 1 },
  { field: "original_language", headerName: "Lingua Originale", flex: 1 },
  {
    field: "vote_count",
    headerName: "Totale Recensioni",
    flex: 1,
    type: "number",
    align: "left",
    headerAlign: "left",
  },
  {
    field: "vote_average",
    headerName: "Media Recensioni",
    flex: 1,
    type: "number",
    align: "left",
    headerAlign: "left",
    valueFormatter: (value?: number) =>
      value !== undefined && value !== null ? Math.round(value) : value,
  },
  {
    field: "app_review_count",
    headerName: "Numero Recensioni App",
    flex: 1,
    type: "number",
    align: "left",
    headerAlign: "left",
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const review = reviews.find((r) => r.movieId === params.row.id);
      return review ? 1 : 0;
    },
  },
  {
    field: "app_review_average",
    headerName: "Punteggio App",
    flex: 1,
    type: "number",
    align: "left",
    headerAlign: "left",
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      const review = reviews.find((r) => r.movieId === params.row.id);
      return review ? review.rating : "-";
    },
  },
  {
    field: "status",
    headerName: "Stato",
    flex: 1,
    renderCell: (params) => {
      const review = reviews.find((r) => r.movieId === params.row.id);
      const status = review ? "Recensito" : "Non recensito";
      return (
        <Stack justifyContent={"center"} sx={{ height: "100%", width: "100%" }}>
          <Box
            sx={{
              backgroundColor: review
                ? alpha(theme.palette.success.main, 0.3)
                : alpha(theme.palette.grey[500], 0.08),
              color: review
                ? theme.palette.success.light
                : theme.palette.text.primary,
              padding: "6px 12px",
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
              width: "fit-content",
            }}
          >
            {status}
          </Box>
        </Stack>
      );
    },
  },
  {
    field: "config",
    headerName: "Azioni",
    type: "actions",
    headerAlign: "right",
    align: "right",
    minWidth: 120,
    getActions: (params: GridRowParams) => {
      const id = params.row.id;
      const hasReview = reviews.some((r) => r.movieId === id);

      const actions = [
        <Tooltip title="Dettagli" placement="top" key={`details-movies-${id}`}>
          <GridActionsCellItem
            icon={
              <VisibilityIcon
                sx={{ color: theme.palette.text.primary, fontSize: "2.4rem" }}
              />
            }
            label="Dettagli"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push(MOVIE_DETAILS(id))}
          />
        </Tooltip>,
      ];

      if (hasReview) {
        actions.push(
          <Tooltip
            title="Modifica Recensione"
            placement="top"
            key={`edit-review-${id}`}
          >
            <GridActionsCellItem
              icon={
                <EditIcon
                  sx={{ color: theme.palette.text.primary, fontSize: "2.4rem" }}
                />
              }
              label="Modifica Recensione"
              sx={{ cursor: "pointer" }}
              onClick={() => router.push(MOVIE_DETAILS(id))}
            />
          </Tooltip>
        );
      }

      return actions;
    },
  },
];
