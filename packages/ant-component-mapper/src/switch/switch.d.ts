import { FormGroupProps } from "../form-group";
import { SwitchProps as AntSwitchProps } from 'antd/lib/switch';
import { ReactNode } from "react";

interface InternalSwitchProps extends AntSwitchProps { 
    onText?: ReactNode;
    offText?: ReactNode;
}

export type SwitchProps = InternalSwitchProps & FormGroupProps;

declare const Switch: React.ComponentType<SwitchProps>;

export default Switch;
