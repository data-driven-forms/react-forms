import { UseFieldApiComponentConfig, AnyObject } from '@data-driven-forms/react-form-renderer';
import { ReactNode } from 'react';
import { FormGroupProps } from '../form-group';

export interface CheckboxOption extends AnyObject {
  value?: any;
  label: ReactNode;
}

interface InternalCheckboxProps extends React.HTMLProps<HTMLInputElement> {
  options?: CheckboxOption[];
}

export type CheckboxProps = InternalCheckboxProps & FormGroupProps &  UseFieldApiComponentConfig;

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
