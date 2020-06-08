import { ReactNode } from "react";
import { FieldArrayField } from "@data-driven-forms/react-form-renderer";

export interface FieldArrayProps {
  label?: ReactNode;
  description?: ReactNode;
  fields: FieldArrayField[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
