import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TextInputProps } from "@patternfly/react-core";
import FormGroupProps from "./form-group";

declare const DatePicker: React.ComponentType<TextInputProps & FormGroupProps & UseFieldApiComponentConfig>;

export default DatePicker;
