import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ITimePickerProps } from "@blueprintjs/datetime";

export interface TimePickerProps extends ITimePickerProps {}

declare const TimePicker: React.ComponentType<TimePickerProps & FormGroupProps & UseFieldApiComponentConfig>;

export default TimePicker;
