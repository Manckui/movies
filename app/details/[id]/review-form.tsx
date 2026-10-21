"use client";
// Form di recensione: è client perché usa react-hook-form e lo store
// Zustand, che salva le recensioni nel localStorage del browser.
import { FormProvider, RHFRating, RHFTextField } from "@/components/form";
import { useReviewsStore } from "@/hooks";
import { REVIEW } from "@/routes/paths";
import { IMovieDetails } from "@/services";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IReviewFormValues {
  rating: number;
  text: string;
}

export function ReviewForm({ movie }: { movie: IMovieDetails }) {
  const router = useRouter();
  const { reviews, saveReview } = useReviewsStore();
  const methods = useForm<IReviewFormValues>({
    defaultValues: { rating: 0, text: "" },
  });

  // Se il film è già recensito, precompilo il form. Lo faccio in un effect
  // perché il localStorage esiste solo nel browser, non durante il render sul server.
  const existingReview = reviews.find((review) => review.movieId === movie.id);
  useEffect(() => {
    if (existingReview) {
      methods.reset({ rating: existingReview.rating, text: existingReview.text });
    }
  }, [existingReview, methods]);

  const onSubmit = (data: IReviewFormValues) => {
    saveReview({
      movieId: movie.id,
      rating: data.rating,
      text: data.text,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      original_language: movie.original_language,
      vote_count: movie.vote_count,
      vote_average: movie.vote_average,
    });
    router.push(REVIEW);
  };

  const websiteUrl =
    movie.homepage || (movie.imdb_id ? `https://www.imdb.com/title/${movie.imdb_id}` : "");

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box
        sx={{
          pl: { xs: "20px", md: "489px" },
          pr: "20px",
          pt: 3,
          color: "#212B36",
          "& .MuiInputBase-input": { color: "#212B36" },
          "& .MuiFormLabel-root": { color: "#637381" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#DFE3E8" },
        }}
      >
        <Typography variant="h5" sx={{ mb: 4 }}>
          La tua recensione
        </Typography>

        <Box sx={{ mb: 3 }}>
          <RHFRating
            name="rating"
            label="Voto (1-5)"
            max={5}
            rules={{ validate: (value) => value > 0 || "Seleziona un voto" }}
          />
        </Box>

        <RHFTextField
          name="text"
          label="Testo"
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

        <Button type="submit" variant="contained" color="success" sx={{ width: "120px" }}>
          Salva
        </Button>
      </Stack>
    </FormProvider>
  );
}
