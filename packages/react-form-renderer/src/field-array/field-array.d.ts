import { FieldArrayApi } from '@data-driven-forms/form-state-manager/use-field-array';
import Field from '../common-types/field';

export interface FieldArrayField extends Omit<Field, 'name'> {
  name?: string;
}

declare const FieldArray: React.ComponentType<FieldArrayApi>;

export default FieldArray;
