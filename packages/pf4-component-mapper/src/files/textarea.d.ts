import FormGroupProps from "./form-group";
import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { TextAreaProps as PfTextAreaProps } from '@patternfly/react-core';

export interface TextareaProps extends PfTextAreaProps {}

declare const Textarea: React.ComponentType<TextareaProps & FormGroupProps & UseFieldApiComponentConfig>;

export default Textarea;
