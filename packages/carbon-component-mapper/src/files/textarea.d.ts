import { FormGroupProps } from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";

import { TextAreaProps } from 'carbon-components-react';

interface InternalTextareaProps extends TextAreaProps {
}

export type TextareaProps = InternalTextareaProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
