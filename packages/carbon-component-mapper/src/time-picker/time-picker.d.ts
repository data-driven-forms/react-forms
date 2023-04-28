import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

import { TimePickerDateProps } from "../time-picker-date";
import { TimePickerStringProps } from "../time-picker-string";

interface InternalTimePickerProps extends AnyObject{
    useStringFormat?: boolean;
}

export type TimePickerProps = InternalTimePickerProps & TimePickerDateProps & TimePickerStringProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
