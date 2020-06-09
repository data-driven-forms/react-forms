import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { CommonFieldProps } from "./common-field-props";

export interface DatePickerProps {}

declare const DatePicker: React.ComponentType<DatePickerProps & CommonFieldProps & UseFieldApiComponentConfig>;

export default DatePicker;
