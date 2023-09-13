import { FieldArrayField } from '@data-driven-forms/react-form-renderer';

export interface FieldArrayProps {
  fields: FieldArrayField[];
  itemDefault?: any;
}

declare const FieldArray: React.ComponentType<FieldArrayProps>;

export default FieldArray;
