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
  noValidate?: boolean;
  blockEvent?: boolean;
}

const FormProvider = <T extends FieldValues>({
  children,
  methods,
  onSubmit,
  noValidate = true,
  blockEvent = false,
}: IFormProviderProps<T>) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    if (blockEvent) {
      event.preventDefault();
      event.stopPropagation();
    }

    onSubmit?.(event);
  };

  return (
    <RHFProvider {...methods}>
      <form onSubmit={handleSubmit} noValidate={noValidate}>
        {children}
      </form>
    </RHFProvider>
  );
};

export { FormProvider };
