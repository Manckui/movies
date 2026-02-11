"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface IRHFSelectOption {
  label: string;
  value: string;
}

interface IRHFSelectProps extends Omit<TextFieldProps, "name" | "select" | "onChange"> {
  name: string;
  options: IRHFSelectOption[];
  rules?: RegisterOptions<FieldValues, string>;
}

const RHFSelect = ({ name, options, rules, ...other }: IRHFSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth={other.fullWidth ?? true}
          value={field.value ?? ""}
          onChange={(event) => field.onChange(event.target.value)}
          error={!!error}
          helperText={error?.message || other.helperText}
          {...other}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export { RHFSelect };
export type { IRHFSelectOption, IRHFSelectProps };
