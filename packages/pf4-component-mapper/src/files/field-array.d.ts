import { ReactNode } from "react";
import { Field } from "@data-driven-forms/react-form-renderer";

export interface FieldArrayProps {
  label?: ReactNode;
  description?: ReactNode;
  fields: Field[];
  defaultItem?: any;
  minItems?: number;
  maxItems?: number;
  noItemsMessage?: ReactNode;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
