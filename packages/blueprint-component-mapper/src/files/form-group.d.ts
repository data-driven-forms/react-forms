import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { IFormGroupProps } from '@blueprintjs/core';
import { ReactNode } from "react";

interface InternalFormGroupProps extends IFormGroupProps {
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

export interface FormGroupInternalProps extends InternalFormGroupProps {
  meta: AnyObject;
  input: AnyObject;
  Component: React.ComponentType;
}

export const FormGroupInternal: React.ComponentType<FormGroupInternalProps>;

export type FormGroupProps = InternalFormGroupProps & UseFieldApiComponentConfig;

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
