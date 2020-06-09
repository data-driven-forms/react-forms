import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { FormRadioProps, FormFieldProps } from "semantic-ui-react";
import { ReactNode } from "react";

export interface RadioOption {
  label?: ReactNode;
  value?: any;
}

export interface RadioProps extends FormRadioProps {
  options?: RadioOption;
  FormFieldProps?: FormFieldProps;
}

declare const Radio: React.ComponentType<RadioProps & CommonFieldProps & UseFieldApiComponentConfig>;

export default Radio;
