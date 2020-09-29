import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

export interface FormGroupInternalProps {
    isReadOnly?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    label?: ReactNode;
    labelText?: ReactNode;
    description?: ReactNode;
    validateOnMount?: boolean;
    WrapperProps?: React.HTMLProps<HTMLDivElement>;
}

export type FormGroupProps = FormGroupInternalProps & UseFieldApiComponentConfig;

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
