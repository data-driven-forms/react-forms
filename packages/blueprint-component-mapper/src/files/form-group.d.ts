import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { IFormGroupProps } from '@blueprintjs/core';
import { ReactNode } from "react";

export interface FormGroupProps extends IFormGroupProps {
  isDisabled?: boolean;
  FormGroupProps?: IFormGroupProps;
  isReadOnly?: boolean;
  isRequired?: boolean;
  helperText?: ReactNode;
  label?: ReactNode;
  validateOnMount?: boolean;
  description?: ReactNode;
  hideLabel?: boolean;
}

export interface FormGroupInternalProps extends FormGroupProps {
  meta: AnyObject;
  input: AnyObject;
  Component: React.ComponentType;
}

export const FormGroupInternal: React.ComponentType<FormGroupInternalProps>;

declare const FormGroup: React.ComponentType<FormGroupProps & UseFieldApiComponentConfig>;

export default FormGroup;
