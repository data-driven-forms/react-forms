import { ReactNode } from "react";
import { AnyObject, Input } from "@data-driven-forms/react-form-renderer";

import { FormGroupProps } from "../form-group";

import { TimePickerProps as CarbonTimePickerProps, SelectItemProps } from 'carbon-components-react';

export interface Timezone extends SelectItemProps {
    value: string;
    label?: string;
}

interface InternalTimePickerBaseProps extends CarbonTimePickerProps, AnyObject {
    twelveHoursFormat?: boolean;
    timezones?: Timezone[];
    input: Input<any>;
    enhnancedOnBlur?: () => void;
    enhancedOnChange?: (value: string) => void;
    finalValue: any;
    warnText?: ReactNode;
    selectFormat: (value: 'AM' | 'PM') => void;
    selectTimezone: (value: string) => void;
    format?: 'AM' | 'PM';
    defaultTimezone?: string;
}

export type TimePickerBaseProps = InternalTimePickerBaseProps & FormGroupProps;

declare const TimePickerBase: React.ComponentType<TimePickerBaseProps>;

export default TimePickerBase;
