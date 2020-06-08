import FormGroupProps from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { SwitchProps as PFSwitchProps } from '@patternfly/react-core';

export interface SwitchProps extends PFSwitchProps {
  isReadOnly?: boolean;
}

declare const Switch: React.ComponentType<SwitchProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Switch;
