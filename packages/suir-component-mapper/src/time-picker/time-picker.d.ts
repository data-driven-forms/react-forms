import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { CommonFieldProps } from "../common/common-field-props";

interface InternalTimePickerProps {}

export type TimePickerProps = InternalTimePickerProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
