import { FormGroupProps } from "../form-group";
import { InputProps } from "antd/lib/input";

export type TextFieldProps = InputProps & FormGroupProps;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
