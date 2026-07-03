"use client";

import { FormHelperText, Stack, Typography } from "@mui/material";
import Rating, { RatingProps } from "@mui/material/Rating";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface IRHFRatingProps extends Omit<RatingProps, "name" | "value" | "onChange"> {
  name: string;
  label?: string;
  rules?: RegisterOptions<FieldValues, string>;
}

const RHFRating = ({ name, label, rules, ...other }: IRHFRatingProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Stack gap={0.5}>
          {label && (
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          )}
          <Rating
            size="large"
            sx={{ fontSize: "3rem" }}
            {...other}
            value={field.value ?? 0}
            onChange={(_, value) => field.onChange(value || 0)}
          />
          {error?.message && (
            <FormHelperText error>{error.message}</FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};

export { RHFRating };
export type { IRHFRatingProps };
