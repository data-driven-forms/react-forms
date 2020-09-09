import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";

interface InternalTextareaProps extends AnyObject, React.HTMLProps<HTMLInputElement> {
}

export type TextareaProps = InternalTextareaProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
