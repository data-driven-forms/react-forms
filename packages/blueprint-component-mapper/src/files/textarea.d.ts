import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ITextAreaProps } from "@blueprintjs/core";

interface InternalTextareaProps extends ITextAreaProps {}

export type TextareaProps = InternalTextareaProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
