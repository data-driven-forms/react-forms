import { FormGroupProps } from '../form-group';
import { UseFieldApiComponentConfig, AnyObject } from '@data-driven-forms/react-form-renderer';
import { ReactNode } from 'react';

export interface RadioOption extends AnyObject {
    value: any;
    label: ReactNode;
}

interface InternalRadioProps {
    idDisabled?: boolean;
    label?: ReactNode;
    options: RadioOption[];
}

export type RadioProps = InternalRadioProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Radio: React.ComponentType<RadioProps>;

export default Radio;
