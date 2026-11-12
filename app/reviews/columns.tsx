import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { Rating, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { MOVIE_DETAILS } from "@/routes";
import { useRouter } from "next/navigation";
import { MovieTitleCell, ScoreCell } from "@/components";

export const reviewsColumns = (
  router: ReturnType<typeof useRouter>,
  onDelete: (movieId: number) => void
): GridColDef[] => [
  {
    field: "title",
    headerName: "Film",
    flex: 2,
    minWidth: 240,
    renderCell: ({ row }) => (
      <MovieTitleCell
        title={row.title}
        posterPath={row.poster_path}
        subtitle={`${row.release_date?.split("-")[0] ?? ""} · ${String(
          row.original_language
        ).toUpperCase()}`}
      />
    ),
  },
  {
    field: "text",
    headerName: "Recensione",
    flex: 2.6,
    minWidth: 220,
    sortable: false,
    renderCell: ({ value }) => (
      <Typography
        variant="body2"
        color="text.secondary"
        title={value}
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          whiteSpace: "normal",
          lineHeight: "20px",
        }}
      >
        {value}
      </Typography>
    ),
  },
  {
    field: "myRating",
    headerName: "Il mio voto",
    flex: 1.1,
    type: "number",
    align: "left",
    headerAlign: "left",
    renderCell: ({ value }) => <Rating value={value} readOnly size="small" />,
  },
  {
    field: "vote_average",
    headerName: "Media TMDB",
    flex: 1.1,
    type: "number",
    align: "left",
    headerAlign: "left",
    renderCell: ({ value }) => <ScoreCell value={value} />,
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

      return [
        <Tooltip title="Dettagli" placement="top" key={`details-review-${id}`}>
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Dettagli"
            onClick={() => router.push(MOVIE_DETAILS(id))}
          />
        </Tooltip>,
        <Tooltip title="Elimina" placement="top" key={`delete-review-${id}`}>
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            label="Elimina"
            onClick={() => onDelete(id)}
          />
        </Tooltip>,
      ];
    },
  },
];
