import { FormGroupProps } from '../form-group';
import { UseFieldApiComponentConfig } from '@data-driven-forms/react-form-renderer';

interface InternalTextareaProps extends React.HTMLProps<HTMLInputElement> {
    isReadOnly?: boolean;
    isDisabled?: boolean;
}

export type TextareaProps = InternalTextareaProps & FormGroupProps & UseFieldApiComponentConfig;

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
