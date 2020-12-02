import { FormGroupProps } from "../form-group";

import { TimePickerProps as AntTimePickerProps } from 'antd/es/time-picker/index';

export type TimePickerProps = AntTimePickerProps & FormGroupProps;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
