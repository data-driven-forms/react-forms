import { ReactNode } from "react";

export default interface FormGroupProps {
  description?: ReactNode;
  hideLabel?: boolean;
  id?: string;
  label?: ReactNode;
  isRequired?: boolean;
  helperText?: ReactNode;
}
