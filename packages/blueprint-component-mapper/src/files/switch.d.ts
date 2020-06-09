import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ISwitchProps } from "@blueprintjs/core";
import { ReactNode } from "react";

export interface SwitchProps extends ISwitchProps {
  onText?: ReactNode;
  offText?: ReactNode;
}

declare const Switch: React.ComponentType<SwitchProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Switch;
