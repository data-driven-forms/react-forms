import { ReactNode } from "react";
import { FieldArrayField } from "@data-driven-forms/react-form-renderer";

interface FieldArrayButtonLabels {
  add?: ReactNode;
  remove?: ReactNode;
  removeAll?: ReactNode;
}

export interface FieldArrayProps {
  label?: ReactNode;
  description?: ReactNode;
  fields: FieldArrayField[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
  name: string;
  buttonLabels?: FieldArrayButtonLabels;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
