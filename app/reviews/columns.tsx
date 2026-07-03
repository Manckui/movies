import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { Stack, Theme, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { MOVIE_DETAILS } from "@/routes";
import { useRouter } from "next/navigation";

export const reviewsColumns = (
  theme: Theme,
  router: ReturnType<typeof useRouter>
): GridColDef[] => [
  {
    field: "title",
    headerName: "Film",
    flex: 2,
    renderCell: (params) => {
      const { row } = params;
      const imageUrl = row.poster_path
        ? `https://image.tmdb.org/t/p/w500${row.poster_path}`
        : "/placeholder.jpg";
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
    renderCell: () => 1, /// todo da modificare con il numero delle recensioni del film appena c'è back di tutta app
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
    renderCell: (params) => params.row.myRating, /// todo da modificare con la media delle recensioni del film appena c'è back di tutta app
  },
  {
    field: "myRating",
    headerName: "Il Mio Voto",
    flex: 1,
    type: "number",
    align: "left",
    headerAlign: "left",
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

      return [
        <Tooltip title="Dettagli" placement="top" key={`details-review-${id}`}>
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
    },
  },
];
