import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { InputProps } from "semantic-ui-react";

export interface TextFieldProps extends InputProps {
  placeholder?: string;
}

declare const TextField: React.ComponentType<TextFieldProps & CommonFieldProps & UseFieldApiComponentConfig>;

export default TextField;
