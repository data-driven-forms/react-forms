import { FormGroupProps } from '../form-group';
import { UseFieldApiComponentConfig } from '@data-driven-forms/react-form-renderer';

interface InternalDatePickerProps extends React.HTMLProps<HTMLInputElement> {
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export type DatePickerProps = InternalDatePickerProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
