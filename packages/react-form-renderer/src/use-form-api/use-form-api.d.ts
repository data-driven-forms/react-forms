import { FormOptions } from '../renderer-context';

export default function useFormApi<FormValues = Record<string, any>, InitialFormValues = Partial<FormValues>>(): FormOptions<
  FormValues,
  InitialFormValues
>;
