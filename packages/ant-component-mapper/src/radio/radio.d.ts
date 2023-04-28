import { FormGroupProps } from "../form-group";
import { AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

import { RadioProps as AntRadioProps } from 'antd/es/radio/interface';

export interface RadioOption extends AnyObject {
    value: any;
    label: ReactNode;
}

interface InternalRadioProps extends AntRadioProps {
    options: RadioOption[];
}

export type RadioProps = InternalRadioProps & FormGroupProps;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
