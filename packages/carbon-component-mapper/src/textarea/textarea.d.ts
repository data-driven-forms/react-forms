import { FormGroupProps } from "../form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";

import { TextAreaProps } from '@carbon/react';

export type TextareaProps = TextAreaProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
