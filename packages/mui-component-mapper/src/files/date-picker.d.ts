import { DatePickerProps as MuiDatePickerProps } from "material-ui-pickers/DatePicker";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { GridProps } from "@material-ui/core";
import { MuiPickersUtilsProviderProps } from "material-ui-pickers/MuiPickersUtilsProvider";

interface InternalDatePickerProps extends MuiDatePickerProps {
  FormFieldGridProps: GridProps;
  MuiPickersUtilsProviderProps: MuiPickersUtilsProviderProps;
  DatePickerProps: MuiDatePickerProps;
}

export type DatePickerProps = InternalDatePickerProps & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
