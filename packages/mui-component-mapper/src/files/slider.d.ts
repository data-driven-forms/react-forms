import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { SliderProps as MuiSliderProps, GridProps, FormControlProps, FormGroupProps, FormLabelProps, FormHelperTextProps } from '@material-ui/core';
import { ReactNode } from "react";

export interface SliderProps extends MuiSliderProps {
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  label?: ReactNode;
  helperText?: ReactNode;
  description?: ReactNode;
  validateOnMount?: boolean;
  FormFieldGridProps?: GridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  before?: ReactNode;
  after?: ReactNode;
  InputGridProps?: GridProps;
  BeforeGridProps?: GridProps;
  SliderGridProps?: GridProps;
  AfterGridProps?: GridProps;
}

declare const Slider: React.ComponentType<SliderProps & UseFieldApiComponentConfig>;

export default Slider;
