const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";
const PLACEHOLDER = "/placeholder.jpg";

// URL immagine TMDB con immagine di riserva.
export const tmdbImage = (path?: string | null, size = "w500") =>
  path ? `${TMDB_IMAGE_URL}/${size}${path}` : PLACEHOLDER;

// "2023-07-19" -> "19/07/2023"
export const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

// Etichetta del voto personale (1-5).
export const RATING_LABELS: Record<number, string> = {
  1: "Scarso",
  2: "Mediocre",
  3: "Buono",
  4: "Ottimo",
  5: "Capolavoro",
};

export const formatMoney = (value?: number) =>
  value
    ? value.toLocaleString("it-IT", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      })
    : "—";
