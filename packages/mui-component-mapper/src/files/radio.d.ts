import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { RadioProps as MuiRadioProps, GridProps, FormControlProps, FormControlLabelProps, FormLabelProps, FormHelperTextProps } from '@material-ui/core';
import { ReactNode } from "react";

export interface RadioOption extends AnyObject {
  label: ReactNode;
  value?: any;
}
interface InternalRadioProps extends MuiRadioProps {
  options?: RadioOption[];
  FormFieldGridProps?: GridProps;
  FormControlProps?: FormControlProps;
  FormControlLabelProps?: FormControlLabelProps;
  RadioProps?: MuiRadioProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  isDisabled?: boolean;
  description?: ReactNode;
  helperText?: ReactNode;
  validateOnMount?: boolean;
}

export type RadioProps = InternalRadioProps & UseFieldApiComponentConfig;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
