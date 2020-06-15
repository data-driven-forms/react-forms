import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ISwitchProps } from "@blueprintjs/core";
import { ReactNode } from "react";

interface InternalSwitchProps extends ISwitchProps {
  onText?: ReactNode;
  offText?: ReactNode;
}

export type SwitchProps = InternalSwitchProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
