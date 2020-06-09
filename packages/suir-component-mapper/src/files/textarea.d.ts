import { CommonFieldProps } from "./common-field-props";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { FormTextAreaProps } from "semantic-ui-react";

export interface TextareaProps extends FormTextAreaProps {}

declare const Textarea: React.ComponentType<TextareaProps & CommonFieldProps & UseFieldApiComponentConfig>;

export default Textarea;
