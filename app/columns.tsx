import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { Chip, Rating, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import { MOVIE_DETAILS } from "@/routes";
import { useRouter } from "next/navigation";
import { IReview } from "@/hooks";
import { MovieTitleCell, ScoreCell } from "@/components";
import { formatDate } from "@/utils";

export const moviesColumns = (
  router: ReturnType<typeof useRouter>,
  reviews: IReview[] = []
): GridColDef[] => {
  const findReview = (movieId: number) =>
    reviews.find((r) => r.movieId === movieId);

  return [
    {
      field: "title",
      headerName: "Film",
      flex: 2.4,
      minWidth: 220,
      renderCell: ({ row }) => (
        <MovieTitleCell
          title={row.title}
          posterPath={row.poster_path}
          subtitle={row.release_date?.split("-")[0]}
        />
      ),
    },
    {
      field: "release_date",
      headerName: "Uscita",
      flex: 1,
      minWidth: 110,
      valueFormatter: (value?: string) => formatDate(value),
    },
    {
      field: "original_language",
      headerName: "Lingua",
      flex: 0.8,
      minWidth: 90,
      renderCell: ({ value }) => (
        <Chip label={String(value).toUpperCase()} size="small" variant="outlined" />
      ),
    },
    {
      field: "vote_count",
      headerName: "Voti TMDB",
      flex: 1,
      minWidth: 110,
      type: "number",
      align: "left",
      headerAlign: "left",
      valueFormatter: (value?: number) => value?.toLocaleString("it-IT"),
    },
    {
      field: "vote_average",
      headerName: "Media TMDB",
      flex: 1.2,
      minWidth: 130,
      type: "number",
      align: "left",
      headerAlign: "left",
      renderCell: ({ value }) => <ScoreCell value={value} />,
    },
    {
      field: "app_review_average",
      headerName: "Il mio voto",
      flex: 1.1,
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const review = findReview(row.id);
        return review ? (
          <Rating value={review.rating} readOnly size="small" />
        ) : (
          <Typography color="text.disabled">—</Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Stato",
      flex: 1.1,
      minWidth: 150,
      sortable: false,
      renderCell: ({ row }) =>
        findReview(row.id) ? (
          <Chip
            icon={<CheckCircleIcon />}
            label="Recensito"
            size="small"
            color="success"
          />
        ) : (
          <Chip icon={<PendingIcon />} label="Da recensire" size="small" />
        ),
    },
    {
      field: "config",
      headerName: "Azioni",
      type: "actions",
      headerAlign: "right",
      align: "right",
      minWidth: 110,
      getActions: (params: GridRowParams) => {
        const id = params.row.id;

        const actions = [
          <Tooltip title="Dettagli" placement="top" key={`details-movies-${id}`}>
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Dettagli"
              onClick={(event) => {
                event.stopPropagation(); // evita anche l'onRowClick della riga
                router.push(MOVIE_DETAILS(id));
              }}
            />
          </Tooltip>,
        ];

        // Con recensione: matita per far capire che si può modificare.
        if (findReview(id)) {
          actions.push(
            <Tooltip title="Modifica recensione" placement="top" key={`edit-review-${id}`}>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Modifica recensione"
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(MOVIE_DETAILS(id));
                }}
              />
            </Tooltip>
          );
        }

        return actions;
      },
    },
  ];
};
