"use client";

import { FormProvider, RHFRating, RHFTextField } from "@/components/form";
import { FrontOfficePage } from "@/components";
import { useReviewsStore } from "@/hooks";
import { REVIEW, ROOT } from "@/routes/paths";
import { getMovieDetails, IMovieDetails } from "@/services";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IReviewFormValues {
  rating: number;
  text: string;
}

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [movie, setMovie] = useState<IMovieDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>();
  const [showSavedToast, setShowSavedToast] = useState(false);

  const { reviews, addReview } = useReviewsStore();
  const reviewMethods = useForm<IReviewFormValues>({
    defaultValues: { rating: 0, text: "" },
  });

  useEffect(() => {
    const existingReview = reviews.find((r) => r.movieId === Number(id));
    reviewMethods.reset({
      rating: existingReview?.rating ?? 0,
      text: existingReview?.text ?? "",
    });
  }, [id, reviews, reviewMethods]);

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    setFetchError(undefined);
    try {
      const res = await getMovieDetails(Number(id));
      setMovie(res);
    } catch (error) {
      console.error(error);
      setFetchError("Impossibile caricare il film. Riprova.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const breadcrumbItems = [
    { text: "Home", link: ROOT },
    { text: movie?.title || "Dettaglio Movie" },
  ];

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "/placeholder.jpg";

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.jpg";

  const websiteUrl =
    movie?.homepage ||
    (movie?.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}` : "");

  const onSubmitReview = (data: IReviewFormValues) => {
    if (!movie) return;

    const newReview = {
      movieId: Number(id),
      rating: data.rating,
      text: data.text,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      original_language: movie.original_language,
      vote_count: movie.vote_count,
      vote_average: movie.vote_average,
    };
    addReview(newReview);
    setShowSavedToast(true);
    reviewMethods.reset();
    setTimeout(() => router.push(REVIEW), 800);
  };

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Dettaglio Movie">
      <Snackbar
        open={showSavedToast}
        autoHideDuration={4000}
        onClose={() => setShowSavedToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Recensione salvata con successo
        </Alert>
      </Snackbar>

      {isLoading ? (
        <Stack gap={2}>
          <Skeleton variant="rectangular" width="100%" height={320} />
          <Skeleton variant="text" width="40%" height={45} />
          <Skeleton variant="text" width="100%" height={120} />
        </Stack>
      ) : fetchError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchMovieDetails}>
              Riprova
            </Button>
          }
        >
          {fetchError}
        </Alert>
      ) : (
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
            <Image
              src={backdropUrl}
              alt={movie?.title || "Backdrop"}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.45)",
              }}
            />
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
                alt={movie?.title || "Poster"}
                width={441}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Stack
              gap={2}
              sx={{ flex: 1, width: "100%", color: { xs: "#212B36", md: "#fff" } }}
            >
              <Box>
                <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
                  <Typography variant="h3">{movie?.title}</Typography>
                  <Typography variant="h3" color="text.secondary">
                    {movie?.release_date?.split("-")[0]}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Typography variant="caption">
                    {movie?.release_date
                      ? new Date(movie.release_date).toLocaleDateString(
                          "it-IT",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )
                      : ""}
                  </Typography>
                  <Typography variant="caption">|</Typography>
                  <Typography variant="caption">
                    {movie?.genres.map((genre) => genre.name).join(", ")}
                  </Typography>
                </Stack>
              </Box>

              <Stack
                direction="row"
                gap={2}
                alignItems="center"
                sx={{ my: "20px" }}
              >
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={(movie?.vote_average || 0) * 10}
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
                      {Math.round((movie?.vote_average || 0) * 10)}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle2">Average Point</Typography>
              </Stack>

              <Box>
                <Typography variant="subtitle2">Descrizione</Typography>
                <Typography variant="body2">{movie?.overview}</Typography>
              </Box>
            </Stack>
          </Stack>

          <FormProvider
            methods={reviewMethods}
            onSubmit={reviewMethods.handleSubmit(onSubmitReview)}
          >
            <Box
              sx={{
                pl: { xs: "20px", md: "489px" },
                pr: "20px",
                pt: 3,
                color: "#212B36",
                "& .MuiInputBase-input": { color: "#212B36" },
                "& .MuiFormLabel-root": { color: "#637381" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#DFE3E8",
                },
              }}
            >
              <Typography variant="h5" sx={{ mb: 4 }}>
                Review
              </Typography>

              <Box sx={{ mb: 3 }}>
                <RHFRating
                  name="rating"
                  label="Vote (1-5)"
                  max={5}
                  rules={{
                    validate: (value) => value > 0 || "Seleziona un voto",
                  }}
                />
              </Box>

              <RHFTextField
                name="text"
                label="Message"
                placeholder="Scrivi qui la tua recensione..."
                multiline
                minRows={4}
                fullWidth
                rules={{ required: "Il testo della recensione è obbligatorio" }}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 5, pb: 5, pl: 2, pr: 2 }}
            >
              <Button
                component="a"
                href={websiteUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="info"
                disabled={!websiteUrl}
                sx={{ width: "120px" }}
              >
                Vai al sito
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ width: "120px" }}
              >
                Salva
              </Button>
            </Stack>
          </FormProvider>
        </Stack>
      )}
    </FrontOfficePage>
  );
}
