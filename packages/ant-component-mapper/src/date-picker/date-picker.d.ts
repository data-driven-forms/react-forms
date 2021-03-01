import { FormGroupProps } from "../form-group";

import { DatePickerProps as AntDatePickerProps } from 'antd/es/date-picker/index';

export type DatePickerProps = AntDatePickerProps & FormGroupProps;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
