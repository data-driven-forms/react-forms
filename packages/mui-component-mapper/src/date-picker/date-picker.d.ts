import { DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { GridProps } from "@mui/material";
type InternalDatePickerProps<TInputDate, TDate> = MuiDatePickerProps<TInputDate, TDate> & {
  FormFieldGridProps: GridProps;
}

export type DatePickerProps<TInputDate, TDate> = InternalDatePickerProps<TInputDate, TDate> & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps<any, any>>;

export default DatePicker;
