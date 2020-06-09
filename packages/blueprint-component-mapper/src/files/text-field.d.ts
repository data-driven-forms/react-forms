import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { IInputGroupProps } from "@blueprintjs/core";

export interface TextFieldProps extends IInputGroupProps {}

declare const TextField: React.ComponentType<TextFieldProps & FormGroupProps & UseFieldApiComponentConfig>;

export default TextField;
