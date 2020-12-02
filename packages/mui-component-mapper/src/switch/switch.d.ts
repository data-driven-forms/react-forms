import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { SwitchProps as MuiSwitchProps, GridProps, FormControlProps, FormGroupProps, FormControlLabelProps, FormLabelProps, FormHelperTextProps } from '@material-ui/core';
import { ReactNode } from "react";

interface InternalSwitchProps extends MuiSwitchProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  description?: ReactNode;
  validateOnMount?: boolean;
  onText?: ReactNode;
  offText?: ReactNode;
  FormFieldGridProps?: GridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  SwitchProps?: MuiSwitchProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
}

export type SwitchProps = InternalSwitchProps & UseFieldApiComponentConfig;

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
