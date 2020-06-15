import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TextInputProps } from "@patternfly/react-core";
import FormGroupProps from "./form-group";

export type DatePickerProps = TextInputProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DatePicker: React.ComponentType<DatePickerProps>;

export default DatePicker;
