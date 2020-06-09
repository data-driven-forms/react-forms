import { ReactNode } from "react";

export interface HelperTextProps {
  className?: string;
}

export interface FormFieldGridProps {
  className?: string;
  helperText?: ReactNode;
  HelperTextProps?: HelperTextProps;
}

declare const FormFieldGrid: React.ComponentType<FormFieldGridProps>;

export default FormFieldGrid;
