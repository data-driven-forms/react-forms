import { DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { GridProps } from "@mui/material";
type InternalDatePickerProps<TDate extends Date> = MuiDatePickerProps<TDate> & {
  FormFieldGridProps: GridProps;
}

export type DatePickerProps<TDate extends Date> = InternalDatePickerProps<TDate> & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps<any>>;

export default DatePicker;
