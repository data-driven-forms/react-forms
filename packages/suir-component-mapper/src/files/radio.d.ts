import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { FormRadioProps, FormFieldProps } from "semantic-ui-react";
import { ReactNode } from "react";

export interface RadioOption {
  label?: ReactNode;
  value?: any;
}

interface InternalRadioProps extends FormRadioProps {
  options?: RadioOption;
  FormFieldProps?: FormFieldProps;
}

export type RadioProps = InternalRadioProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
