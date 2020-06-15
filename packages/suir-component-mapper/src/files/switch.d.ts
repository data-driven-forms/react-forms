import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { FormFieldProps } from "semantic-ui-react";
import { ReactNode } from "react";

interface InternalSwitchProps extends FormFieldProps {
  onText?: ReactNode;
  offText?: ReactNode;
}

export type SwitchProps = InternalSwitchProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
