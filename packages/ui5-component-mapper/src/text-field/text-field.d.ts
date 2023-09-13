import { FormGroupProps } from '../form-group';
import { UseFieldApiComponentConfig } from '@data-driven-forms/react-form-renderer';

interface InternalTextFieldProps extends React.HTMLProps<HTMLInputElement> {
    isReadOnly?: boolean;
    isDisabled?: boolean;
}

export type TextFieldProps = InternalTextFieldProps & FormGroupProps & UseFieldApiComponentConfig;

declare const TextField: React.ComponentType<TextFieldProps>;

export default TextField;
