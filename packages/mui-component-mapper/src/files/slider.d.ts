import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { SliderProps as MuiSliderProps, GridProps, FormControlProps, FormGroupProps, FormLabelProps, FormHelperTextProps } from '@material-ui/core';
import { ReactNode } from "react";

interface InternalSliderProps extends MuiSliderProps {
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

export type SliderProps = InternalSliderProps & UseFieldApiComponentConfig;

declare const Slider: React.ComponentType<SliderProps>;

export default Slider;
