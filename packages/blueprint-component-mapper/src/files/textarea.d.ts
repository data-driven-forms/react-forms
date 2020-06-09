import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ITextAreaProps } from "@blueprintjs/core";

export interface TextareaProps extends ITextAreaProps {}

declare const Textarea: React.ComponentType<TextareaProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Textarea;
