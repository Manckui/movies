"use client";

import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid2, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FormProvider, RHFAutocomplete, RHFSelect } from "@/components/form";
import {
  IMoviesTableFilters,
  IMoviesTableFiltersProps,
} from "./movies-table-filters.types";

const currentYear = new Date().getFullYear();
const yearOptions = [
  { label: "Tutti", value: "all" },
  ...Array.from({ length: 55 }, (_, index) => {
    const year = String(currentYear - index);
    return { label: year, value: year };
  }),
];

const languageOptions = [
  { value: "all", label: "All" },
  { value: "en", label: "English" },
  { value: "it", label: "Italiano" },
  { value: "es", label: "Espanol" },
  { value: "fr", label: "Francais" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
];
const TITLE_DEBOUNCE_MS = 350;
const filterFieldSx = {
  "& .MuiOutlinedInput-root": {
    height: 56,
    borderRadius: "12px",
  },
};
const autocompleteFieldSx = {
  ...filterFieldSx,
  "& .MuiAutocomplete-inputRoot": {
    height: 56,
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    alignItems: "center",
  },
  "& .MuiAutocomplete-inputRoot .MuiAutocomplete-input": {
    padding: "0 !important",
  },
  "& .MuiOutlinedInput-input": {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
};
const selectFieldSx = {
  ...filterFieldSx,
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
  },
};

const MoviesTableFilters = ({
  value,
  onChange,
  titleOptions = [],
}: IMoviesTableFiltersProps) => {
  const methods = useForm<IMoviesTableFilters>({
    defaultValues: value,
    mode: "onChange",
  });

  const watched = useWatch({ control: methods.control });
  const [debouncedTitle, setDebouncedTitle] = useState(value.title || "");

  useEffect(() => {
    methods.reset(value);
  }, [methods, value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTitle(watched.title || "");
    }, TITLE_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [watched.title]);

  useEffect(() => {
    onChange({
      title: debouncedTitle,
      year: watched.year || "all",
      language: watched.language || "all",
    });
  }, [debouncedTitle, onChange, watched.language, watched.year]);

  return (
    <Box sx={{ mb: 3 }}>
      <FormProvider methods={methods}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <RHFAutocomplete
              name="title"
              options={titleOptions}
              textFieldProps={{
                placeholder: "Insert the name of the movie",
                sx: autocompleteFieldSx,
                slotProps: {
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#637381" }} />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <RHFSelect
              name="year"
              label="Year"
              options={yearOptions}
              sx={selectFieldSx}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 3 }}>
            <RHFSelect
              name="language"
              label="Language"
              options={languageOptions}
              sx={selectFieldSx}
            />
          </Grid2>
        </Grid2>
      </FormProvider>
    </Box>
  );
};

export { MoviesTableFilters };
