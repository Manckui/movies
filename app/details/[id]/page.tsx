"use client";

import { FormProvider, RHFRating, RHFTextField } from "@/components/form";
import { FrontOfficePage } from "@/components";
import { useReviewsStore } from "@/hooks";
import { REVIEW, ROOT } from "@/routes/paths";
import { getMovieDetails, IMovieDetails } from "@/services";
import { formatDate, RATING_LABELS, tmdbImage } from "@/utils";
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PaidIcon from "@mui/icons-material/Paid";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface IReviewFormValues {
  rating: number;
  text: string;
}

const formatMoney = (value?: number) =>
  value
    ? value.toLocaleString("it-IT", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
    : "—";

// Riquadro informativo (budget, incassi, ...).
const InfoTile = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: SvgIconComponent;
}) => (
  <Stack
    direction="row"
    alignItems="center"
    gap={1.75}
    sx={{
      p: 2,
      borderRadius: "14px",
      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
    }}
  >
    <Icon sx={{ color: "text.secondary" }} />
    <Box>
      <Typography variant="caption" color="text.secondary" component="div">
        {label}
      </Typography>
      <Typography variant="subtitle1">{value}</Typography>
    </Box>
  </Stack>
);

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [movie, setMovie] = useState<IMovieDetails>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string>();
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Recensioni  e form.
  const { reviews, saveReview } = useReviewsStore();
  const existingReview = reviews.find((r) => r.movieId === Number(id));
  const reviewMethods = useForm<IReviewFormValues>({
    defaultValues: { rating: 0, text: "" },
  });
  // Voto selezionato in tempo reale, per l'etichetta accanto alle stelle.
  const rating = useWatch({ control: reviewMethods.control, name: "rating" });

  // Precompila la recensione esistente.
  useEffect(() => {
    const review = reviews.find((r) => r.movieId === Number(id));
    reviewMethods.reset({
      rating: review?.rating ?? 0,
      text: review?.text ?? "",
    });
  }, [id, reviews, reviewMethods]);

  // Carica il film.
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setFetchError(undefined);
      try {
        const res = await getMovieDetails(Number(id));
        setMovie(res);
      } catch (error) {
        console.error(error);
        setFetchError("Impossibile caricare il film.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const breadcrumbItems = [
    { text: "Home", link: ROOT },
    { text: "Movies", link: ROOT },
    { text: movie?.title || "Dettaglio film" },
  ];

  const backdropUrl = tmdbImage(movie?.backdrop_path, "w1280");
  const posterUrl = tmdbImage(movie?.poster_path);
  // Sito ufficiale o IMDb.
  const websiteUrl =
    movie?.homepage ||
    (movie?.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}` : "");
  const score = Math.round((movie?.vote_average || 0) * 10);

  // Salva la recensione e apre la lista.
  const onSubmitReview = (data: IReviewFormValues) => {
    if (!movie) return;

    saveReview({
      movieId: Number(id),
      rating: data.rating,
      text: data.text,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      original_language: movie.original_language,
      vote_count: movie.vote_count,
      vote_average: movie.vote_average,
    });
    setShowSavedToast(true);
    setTimeout(() => router.push(REVIEW), 800);
  };

  return (
    <FrontOfficePage
      breadcrumbs={breadcrumbItems}
      title="Dettaglio film"
      subtitle="Informazioni complete e la tua recensione personale."
      action={
        <Button
          component={Link}
          href={ROOT}
          variant="outlined"
          color="inherit"
          startIcon={<ArrowBackIcon />}
        >
          Torna ai film
        </Button>
      }
    >
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
        <Stack gap={3}>
          <Skeleton variant="rounded" width="100%" height={420} sx={{ borderRadius: "24px" }} />
          <Stack direction={{ xs: "column", md: "row" }} gap={3}>
            <Skeleton variant="rounded" height={260} sx={{ flex: 1.25, borderRadius: "20px" }} />
            <Skeleton variant="rounded" height={260} sx={{ flex: 1, borderRadius: "20px" }} />
          </Stack>
        </Stack>
      ) : fetchError || !movie ? (
        <Alert severity="error">{fetchError}</Alert>
      ) : (
        <>
          {/* Hero */}
          <Box
            sx={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              minHeight: 420,
              bgcolor: "background.paper",
            }}
          >
            <Image
              src={backdropUrl}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 75vw"
              style={{ objectFit: "cover" }}
              priority
            />
            <Box
              sx={(theme) => ({
                position: "absolute",
                inset: 0,
                background: {
                  xs: alpha(theme.palette.background.default, 0.85),
                  md: `linear-gradient(90deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.7)} 45%, ${alpha(theme.palette.background.default, 0.2)} 100%)`,
                },
              })}
            />

            <Stack
              direction={{ xs: "column", md: "row" }}
              gap={5}
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{ position: "relative", p: { xs: 3, md: 6 } }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 180, md: 220 },
                  height: { xs: 260, md: 320 },
                  flexShrink: 0,
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: 12,
                }}
              >
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>

              <Stack gap={2} sx={{ flex: 1, width: "100%", pt: { md: 1 } }}>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      sx={(theme) => ({
                        borderRadius: 20,
                        color: "common.white",
                        bgcolor: alpha(theme.palette.common.white, 0.14),
                        border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                      })}
                    />
                  ))}
                </Stack>

                <Typography
                  component="h2"
                  sx={{ typography: { xs: "h3", md: "displayLarge" } }}
                >
                  {movie.title}{" "}
                  <Box component="span" sx={{ fontWeight: 400, color: "grey.400" }}>
                    ({movie.release_date?.split("-")[0]})
                  </Box>
                </Typography>

                <Typography variant="body2" color="grey.300">
                  {formatDate(movie.release_date)} • {movie.status}
                </Typography>

                {movie.tagline && (
                  <Typography sx={{ fontStyle: "italic", color: "grey.300", fontSize: 16 }}>
                    “{movie.tagline}”
                  </Typography>
                )}

                <Stack direction="row" alignItems="center" gap={1.75}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      value={score}
                      size={76}
                      thickness={5}
                      color="success"
                    />
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{ position: "absolute", inset: 0 }}
                    >
                      <Typography variant="h6" component="span">
                        {score}%
                      </Typography>
                    </Stack>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1">Punteggio TMDB</Typography>
                    <Typography variant="body2" color="grey.400">
                      {movie.vote_count.toLocaleString("it-IT")} voti
                    </Typography>
                  </Box>
                </Stack>

                {websiteUrl && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      component="a"
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      color="info"
                      startIcon={<OpenInNewIcon />}
                    >
                      Vai al sito
                    </Button>
                  </Box>
                )}
              </Stack>
            </Stack>
          </Box>

          {/* Colonne della stessa altezza: la card recensione segue le due card a sinistra. */}
          <Stack direction={{ xs: "column", md: "row" }} gap={3} alignItems="stretch">
            <Stack gap={3} sx={{ flex: 1.25, width: "100%" }}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  Trama
                </Typography>
                <Typography color="grey.400" sx={{ fontSize: 15, lineHeight: "26px" }}>
                  {movie.overview || "Trama non disponibile."}
                </Typography>
              </Card>

              <Card sx={{ p: 3, flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 1.5 }}>
                  Informazioni
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <InfoTile label="Budget" value={formatMoney(movie.budget)} icon={PaidIcon} />
                  <InfoTile label="Incassi" value={formatMoney(movie.revenue)} icon={TrendingUpIcon} />
                  <InfoTile label="Durata" value={movie.runtime ? `${movie.runtime} minuti` : "—"} icon={ScheduleIcon} />
                  <InfoTile label="Lingua originale" value={movie.original_language.toUpperCase()} icon={LanguageIcon} />
                </Box>
              </Card>
            </Stack>

            {/* Recensione */}
            <Card
              sx={{
                flex: 1,
                width: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
                // Il form riempie la card: i pulsanti restano in fondo.
                "& > form": { flex: 1, display: "flex", flexDirection: "column" },
              }}
            >
              <FormProvider
                methods={reviewMethods}
                onSubmit={reviewMethods.handleSubmit(onSubmitReview)}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">La tua recensione</Typography>
                  {existingReview && (
                    <Chip icon={<CheckCircleIcon />} label="Salvata" size="small" color="success" />
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Dai un voto da 1 a 5 e racconta cosa ne pensi.
                </Typography>

                <Stack direction="row" alignItems="center" gap={1.75} sx={{ mb: 3.5 }}>
                  <RHFRating
                    name="rating"
                    label="Voto *"
                    max={5}
                    rules={{
                      validate: (value) => value > 0 || "Seleziona un voto",
                    }}
                  />
                  {rating > 0 && (
                    <Chip
                      label={RATING_LABELS[rating]}
                      size="small"
                      color="warning"
                      sx={{ mt: 2.5 }}
                    />
                  )}
                </Stack>

                <RHFTextField
                  name="text"
                  label="Messaggio *"
                  placeholder="Scrivi qui la tua recensione..."
                  multiline
                  minRows={5}
                  fullWidth
                  rules={{ required: "Il testo della recensione è obbligatorio" }}
                />

                <Stack direction="row" justifyContent="flex-end" sx={{ mt: "auto", pt: 3.5 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={existingReview ? <EditIcon /> : <CheckCircleIcon />}
                  >
                    {existingReview ? "Modifica recensione" : "Salva recensione"}
                  </Button>
                </Stack>
              </FormProvider>
            </Card>
          </Stack>
        </>
      )}
    </FrontOfficePage>
  );
}
