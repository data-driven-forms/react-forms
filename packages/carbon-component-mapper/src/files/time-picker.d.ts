import { ReactNode } from "react";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

import { FormGroupProps } from "./form-group";

export interface Timezone extends AnyObject {
    value: string;
    label?: ReactNode;
}

interface InternalTimePickerProps extends AnyObject, React.HTMLProps<HTMLInputElement> {
    twelveHoursFormat?: boolean;
    timezones?: Timezone[];
}

export type TimePickerProps = InternalTimePickerProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
