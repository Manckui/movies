// Server Component: carica il film da TMDB sul server e lo mostra.
// L'unica parte client è il form di recensione (ReviewForm).
import { FrontOfficePage } from "@/components";
import { ROOT } from "@/routes/paths";
import { getMovieDetails } from "@/services/tmdb";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ReviewForm } from "./review-form";

interface IDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function Details({ params }: IDetailsPageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder.svg";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("it-IT")
    : "";

  return (
    <FrontOfficePage
      breadcrumbs={[{ text: "Home", link: ROOT }, { text: movie.title }]}
      title="Dettaglio film"
    >
      <Stack
        sx={{
          position: "relative",
          backgroundColor: "#f5f5f5",
          borderRadius: 10,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 360,
            borderRadius: 2,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            overflow: "hidden",
          }}
        >
          <Image src={backdropUrl} alt={movie.title} fill style={{ objectFit: "cover" }} priority />
          <Box sx={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" }} />
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          alignItems={{ xs: "center", md: "flex-start" }}
          sx={{
            position: { xs: "static", md: "absolute" },
            top: 24,
            left: 20,
            right: 20,
            px: { xs: 2, md: 0 },
            mt: { xs: -30, md: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: 220, md: 441 },
              height: { xs: 310, md: 616 },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 4,
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            <Image
              src={posterUrl}
              alt={movie.title}
              width={441}
              height={600}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Stack gap={2} sx={{ flex: 1, width: "100%", color: { xs: "#212B36", md: "#fff" } }}>
            <Box>
              <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
                <Typography variant="h3">{movie.title}</Typography>
                <Typography variant="h3" color="text.secondary">
                  {movie.release_date?.split("-")[0]}
                </Typography>
              </Stack>
              <Typography variant="caption">
                {releaseDate} | {movie.genres.map((genre) => genre.name).join(", ")}
              </Typography>
            </Box>

            <Stack direction="row" gap={2} alignItems="center" sx={{ my: "20px" }}>
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={movie.vote_average * 10}
                  size={64}
                  thickness={4}
                  sx={{ color: "success.main" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="subtitle2">
                    {Math.round(movie.vote_average * 10)}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="subtitle2">Voto medio TMDB</Typography>
            </Stack>

            <Box>
              <Typography variant="subtitle2">Descrizione</Typography>
              <Typography variant="body2">{movie.overview}</Typography>
            </Box>
          </Stack>
        </Stack>

        <ReviewForm movie={movie} />
      </Stack>
    </FrontOfficePage>
  );
}
