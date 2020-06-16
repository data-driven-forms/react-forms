import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ITimePickerProps } from "@blueprintjs/datetime";

interface InternalTimePickerProps extends ITimePickerProps {}

export type TimePickerProps = InternalTimePickerProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
