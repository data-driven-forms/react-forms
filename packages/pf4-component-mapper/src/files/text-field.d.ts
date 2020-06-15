import FormGroupProps from "./form-group"
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer"
import { TextInputProps } from "@patternfly/react-core";

interface InternalTextFieldProps extends TextInputProps {}

export type TextFieldProps = InternalTextFieldProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
