"use client";

import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

type BaseAutocompleteProps<T> = Omit<
  AutocompleteProps<T, false, false, true>,
  "renderInput" | "value" | "onChange" | "inputValue" | "onInputChange"
>;

interface IRHFAutocompleteProps<T extends string>
  extends BaseAutocompleteProps<T> {
  name: string;
  label?: string;
  helperText?: string;
  rules?: RegisterOptions<FieldValues, string>;
  textFieldProps?: Omit<TextFieldProps, "value" | "onChange" | "error" | "helperText">;
}

const RHFAutocomplete = <T extends string>({
  name,
  label,
  helperText,
  rules,
  textFieldProps,
  ...other
}: IRHFAutocompleteProps<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete<T, false, false, true>
          {...other}
          fullWidth={other.fullWidth ?? true}
          freeSolo
          value={null}
          inputValue={field.value ?? ""}
          onInputChange={(_, value, reason) => {
            if (reason === "input" || reason === "clear") {
              field.onChange(value);
            }
          }}
          onChange={(_, value) => field.onChange(value || "")}
          renderInput={(params) => {
            const { InputProps, inputProps, ...restParams } = params;
            const fieldSlotProps = textFieldProps?.slotProps;

            return (
              <TextField
                {...restParams}
                {...textFieldProps}
                label={label}
                error={!!error}
                helperText={error?.message || helperText}
                slotProps={{
                  ...fieldSlotProps,
                  input: {
                    ...InputProps,
                    ...fieldSlotProps?.input,
                  },
                  htmlInput: {
                    ...inputProps,
                    ...fieldSlotProps?.htmlInput,
                  },
                }}
              />
            );
          }}
        />
      )}
    />
  );
};

export { RHFAutocomplete };
export type { IRHFAutocompleteProps };
