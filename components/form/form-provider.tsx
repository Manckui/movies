"use client";

import { FormEventHandler, ReactNode } from "react";
import {
  FormProvider as RHFProvider,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";

interface IFormProviderProps<T extends FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const FormProvider = <T extends FieldValues>({
  children,
  methods,
  onSubmit,
}: IFormProviderProps<T>) => {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </RHFProvider>
  );
};

export { FormProvider };
