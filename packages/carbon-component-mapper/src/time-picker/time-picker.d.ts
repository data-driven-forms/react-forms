import { ReactNode } from "react";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

import { FormGroupProps } from "./form-group";

import { TimePickerProps as CarbonTimePickerProps, SelectItemProps } from 'carbon-components-react';

export interface Timezone extends SelectItemProps {
    value: string;
    label?: string;
}

interface InternalTimePickerProps extends CarbonTimePickerProps {
    twelveHoursFormat?: boolean;
    timezones?: Timezone[];
}

export type TimePickerProps = InternalTimePickerProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
