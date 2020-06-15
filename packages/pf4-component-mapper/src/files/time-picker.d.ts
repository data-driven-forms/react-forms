import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TextInputProps } from "@patternfly/react-core";
import FormGroupProps from "./form-group";

export type TimePickerProps = TextInputProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TimePicker: React.ComponentType<TimePickerProps>;

export default TimePicker;
