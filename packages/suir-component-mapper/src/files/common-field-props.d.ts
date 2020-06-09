import { ReactNode } from "react";
import { FormFieldGridProps, HelperTextProps } from "./form-field-grid";

export interface CommonFieldProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  description?: ReactNode;
  validateOnMount?: boolean;
  id?: string;
  /** Sub components customization API */
  FormFieldGridProps?: FormFieldGridProps;
  HelperTextProps?: HelperTextProps;
}
