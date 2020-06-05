import { ReactNode } from "react";
import { Field } from "@data-driven-forms/react-form-renderer";
import { FormControlProps, GridProps } from "@material-ui/core";

export interface FieldArrayButtonLabels {
  add?: ReactNode;
  remove?: ReactNode;
}

export interface FieldArrayProps {
  label?: ReactNode;
  description?: ReactNode;
  fields: Field[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
  FormControlProps?: FormControlProps;
  FormFieldGridProps?: GridProps;
  buttonLabels?: FieldArrayButtonLabels;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;
export default FieldArray;
