// Filtri come semplice form HTML: premendo "Cerca" (o Invio) il <Form> di
// Next mette i campi nell'URL (/?title=...&year=...&language=...) e la
// pagina si ricarica dal server con i nuovi film. Niente stato React.
import Form from "next/form";
import { Button, Grid2, MenuItem, TextField } from "@mui/material";
import { IMoviesFilters } from "@/services";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 55 }, (_, index) => String(currentYear - index));

const languages = [
  { value: "en", label: "Inglese" },
  { value: "it", label: "Italiano" },
  { value: "es", label: "Spagnolo" },
  { value: "fr", label: "Francese" },
  { value: "de", label: "Tedesco" },
  { value: "ja", label: "Giapponese" },
  { value: "ko", label: "Coreano" },
];

// Stile dei select ripreso dalla vecchia versione: valore centrato sotto l'etichetta
const selectSx = {
  "& .MuiOutlinedInput-root": { height: 56, borderRadius: "12px" },
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
};

export function MoviesFilters({ filters }: { filters: IMoviesFilters }) {
  return (
    <Form action="/">
      <Grid2 container spacing={2} sx={{ mb: 3 }}>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <TextField
            name="title"
            label="Titolo"
            placeholder="Cerca un film per titolo"
            defaultValue={filters.title}
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { height: 56, borderRadius: "12px" } }}
          />
        </Grid2>

        <Grid2 size={{ xs: 6, md: 2 }}>
          <TextField
            select
            name="year"
            label="Anno"
            defaultValue={filters.year || "all"}
            fullWidth
            sx={selectSx}
          >
            <MenuItem value="all">Tutti</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid2>

        <Grid2 size={{ xs: 6, md: 3 }}>
          <TextField
            select
            name="language"
            label="Lingua originale"
            defaultValue={filters.language || "all"}
            helperText="Ignorata se cerchi per titolo"
            fullWidth
            sx={selectSx}
          >
            <MenuItem value="all">Tutte</MenuItem>
            {languages.map((language) => (
              <MenuItem key={language.value} value={language.value}>
                {language.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 2 }}>
          <Button type="submit" variant="contained" fullWidth sx={{ height: 56 }}>
            Cerca
          </Button>
        </Grid2>
      </Grid2>
    </Form>
  );
}
