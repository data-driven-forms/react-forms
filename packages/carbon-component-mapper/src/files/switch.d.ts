import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";

import { ToggleProps } from 'carbon-components-react';

interface InternalSwitchProps extends ToggleProps { }

export type SwitchProps = InternalSwitchProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
