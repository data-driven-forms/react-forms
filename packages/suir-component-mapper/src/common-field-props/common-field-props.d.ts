import { ReactNode } from 'react';
import { FormFieldGridProps } from '../form-field-grid';
import { HelperTextProps } from '../helper-text';

export interface CommonFieldProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  description?: ReactNode;
  validateOnMount?: boolean;
  id?: string;
  /** Sub components customization API */
  FormFieldGridProps?: FormFieldGridProps;
  HelperTextProps?: HelperTextProps;
}

export default CommonFieldProps;
