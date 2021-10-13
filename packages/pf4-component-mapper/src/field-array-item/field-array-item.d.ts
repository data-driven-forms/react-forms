import { Field } from "@data-driven-forms/react-form-renderer";

interface Widths {
    label: number;
    field: number;
}

export interface FieldArrayItemProps {
  field: Field;
  widths: Widths;
  index: number;
}

declare const FieldArrayItem: React.ComponentType<FieldArrayItemProps>;

export default FieldArrayItem;
