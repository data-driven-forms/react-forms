import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

interface InternalDatePickerProps extends AnyObject, React.HTMLProps<HTMLInputElement> {
  datePickerType?: string;
  DatePickerProps?: AnyObject;
}

export type DatePickerProps = InternalDatePickerProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
