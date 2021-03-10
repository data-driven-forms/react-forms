import { ReactNode } from 'react';
import { FormGroupProps as PfFormGroupProps } from '@patternfly/react-core';

interface FormGroupProps {
  description?: ReactNode;
  hideLabel?: boolean;
  id?: string;
  label?: ReactNode;
  isRequired?: boolean;
  helperText?: ReactNode;
  FormGroupProps?: PfFormGroupProps;
}

export default FormGroupProps;
