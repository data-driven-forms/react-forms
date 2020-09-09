import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

interface InternalTextFieldProps extends AnyObject, React.HTMLProps<HTMLInputElement> {
}

export type TextFieldProps = InternalTextFieldProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
