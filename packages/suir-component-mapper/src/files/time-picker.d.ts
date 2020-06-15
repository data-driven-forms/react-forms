import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { CommonFieldProps } from "./common-field-props";

interface InternalDatePickerProps {}

export type DatePickerProps = InternalDatePickerProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
