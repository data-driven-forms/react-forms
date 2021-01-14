import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";

import { DatePickerProps as CarbonDatePickerProps, DatePickerInputProps } from 'carbon-components-react';

interface InternalDatePickerProps extends DatePickerInputProps {
  datePickerType?: string;
  DatePickerProps?: CarbonDatePickerProps;
}

export type DatePickerProps = InternalDatePickerProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
