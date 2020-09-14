import { FormGroupProps as CommonFormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

import { FormGroupProps, RadioButtonGroupProps, RadioButtonProps} from 'carbon-components-react';

export interface RadioOption extends RadioButtonProps {
    value: any;
    label?: ReactNode;
}

interface InternalRadioProps extends RadioButtonGroupProps {
    isDisabled?: boolean;
    label?: ReactNode;
    options: RadioOption[];
    FormGroupProps?: FormGroupProps;
}

export type RadioProps = InternalRadioProps & CommonFormGroupProps & UseFieldApiComponentConfig;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
