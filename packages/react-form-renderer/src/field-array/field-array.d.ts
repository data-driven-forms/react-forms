import { FieldArrayProps } from 'react-final-form-arrays';
import Field from '../common-types/field';

export interface FieldArrayField extends Omit<Field, 'name'> {
  name?: string;
}

declare const FieldArray: React.ComponentType<FieldArrayProps<any, HTMLElement>>;

export default FieldArray;
