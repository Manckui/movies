"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface IRHFTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  rules?: RegisterOptions<FieldValues, string>;
}

const RHFTextField = ({ name, rules, ...other }: IRHFTextFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          value={field.value ?? ""}
          error={!!error}
          helperText={error?.message || other.helperText}
          {...other}
        />
      )}
    />
  );
};

export { RHFTextField };
export type { IRHFTextFieldProps };
