"use client"

import { useFormContext, FormProvider } from "react-hook-form"

export function Form({ children, ...props }) {
  const methods = useFormContext()

  return (
    <form {...props}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  )
}
