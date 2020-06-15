import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { InputProps } from "semantic-ui-react";

interface InternalTextFieldProps extends InputProps {
  placeholder?: string;
}

export type TextFieldProps = InternalTextFieldProps & CommonFieldProps & UseFieldApiComponentConfig;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
