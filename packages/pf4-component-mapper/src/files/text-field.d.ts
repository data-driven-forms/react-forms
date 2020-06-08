import FormGroupProps from "./form-group"
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer"
import { TextInputProps } from "@patternfly/react-core";

export interface TextFieldProps extends TextInputProps {}

declare const TextField: React.ComponentType<TextFieldProps & FormGroupProps & UseFieldApiComponentConfig>;

export default TextField;
