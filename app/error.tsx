"use client";
// Mostrata da Next quando una chiamata a TMDB nei Server Components fallisce.
import { Alert, Button } from "@mui/material";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={reset}>
          Riprova
        </Button>
      }
    >
      Impossibile caricare i dati da TMDB. Riprova.
    </Alert>
  );
}
