import { FormGroupProps } from '../form-group';
import { UseFieldApiComponentConfig } from '@data-driven-forms/react-form-renderer';

interface InternalTimePickerProps extends React.HTMLProps<HTMLInputElement> {
    isReadOnly?: boolean;
    isDisabled?: boolean;
}

export type TimePickerProps = InternalTimePickerProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
