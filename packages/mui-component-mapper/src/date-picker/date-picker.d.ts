import { DatePickerProps as MuiDatePickerProps } from "@mui/lab/DatePicker";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { GridProps } from "@mui/material";
interface InternalDatePickerProps extends MuiDatePickerProps {
  FormFieldGridProps: GridProps;
  DatePickerProps: MuiDatePickerProps;
}

export type DatePickerProps = InternalDatePickerProps & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
