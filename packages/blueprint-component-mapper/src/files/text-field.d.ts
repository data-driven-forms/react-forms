import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { IInputGroupProps } from "@blueprintjs/core";

interface InternalTextFieldProps extends IInputGroupProps {}

export type TextFieldProps = InternalTextFieldProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
