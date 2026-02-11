import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { alpha, Box, Stack, Theme, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { MOVIE_DETAILS } from "@/routes";
import { useRouter } from "next/navigation";

export const moviesColumns = (
  theme: Theme,
  router: ReturnType<typeof useRouter>
): GridColDef[] => [
  {
    field: "title",
    headerName: "Movies",
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
  { field: "release_date", headerName: "Release Date", flex: 1 },
  { field: "original_language", headerName: "Original Language", flex: 1 },
  {
    field: "vote_count",
    headerName: "Total Reviews",
    flex: 1,
    type: "number",
    align: "right",
    headerAlign: "right",
    headerClassName: "numeric-header",
    cellClassName: "numeric-cell",
  },
  {
    field: "vote_average",
    headerName: "Review Average",
    flex: 1,
    type: "number",
    align: "right",
    headerAlign: "right",
    headerClassName: "numeric-header",
    cellClassName: "numeric-cell",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => {
      const status = params.value || "Not reviewed";
      return (
        <Stack justifyContent={"center"} sx={{ height: "100%", width: "100%" }}>
          <Box
            sx={{
              backgroundColor: alpha(theme.palette.grey[500], 0.08),
              color: theme.palette.text.primary,
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
    headerName: "Azzioni",
    type: "actions",
    headerAlign: "right",
    align: "right",
    minWidth: 120,
    getActions: (params: GridRowParams) => {
      const id = params.row.id;

      return [
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
    },
  },
];
