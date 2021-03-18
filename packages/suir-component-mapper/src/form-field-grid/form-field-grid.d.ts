import { ReactNode } from "react";
import { HelperTextProps } from "../helper-text";

export interface FormFieldGridProps {
  className?: string;
  helperText?: ReactNode;
  HelperTextProps?: HelperTextProps;
}

declare const FormFieldGrid: React.ComponentType<FormFieldGridProps>;

export default FormFieldGrid;
