import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

interface InternalSwitchProps extends AnyObject, React.HTMLProps<HTMLInputElement> { }

export type SwitchProps = InternalSwitchProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
