import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { FormFieldProps } from "semantic-ui-react";
import { ReactNode } from "react";

export interface SwitchProps extends FormFieldProps {
  onText?: ReactNode;
  offText?: ReactNode;
}

declare const Switch: React.ComponentType<SwitchProps & CommonFieldProps & UseFieldApiComponentConfig>;

export default Switch;
