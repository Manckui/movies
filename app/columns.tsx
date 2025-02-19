import { GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";


export const moviesColumns = (): GridColDef[] => [
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
        <Stack direction={'row'} alignItems={'center'} gap={5} sx={ { height: '100%'}}>
          <Image
            src={imageUrl}
            width={40}
            height={40}
            alt={row.title}
            style={{ borderRadius: "100%", objectFit: "cover", width: 40, height: 40, minWidth: 40, minHeight: 40, }}
            priority={false} 
          />
          <Typography variant="body1">{row.title}</Typography>
        </Stack>
      );
    },
  },
  {
    field: "release_date",
    headerName: "Release Date",
    flex: 1,
  },
  {
    field: "original_language",
    headerName: "Original Language",
    flex: 1,
  },
  {
    field: "vote_count",
    headerName: "Total Reviews",
    flex: 1,
  },
  {
    field: "vote_average",
    headerName: "Review Average",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
];
