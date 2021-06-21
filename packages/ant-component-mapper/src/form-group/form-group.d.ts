import { UseFieldApiComponentConfig } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

import { FormItemProps } from 'antd/es/form/FormItem';

export interface CommonProps {
    isReadOnly?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    label?: ReactNode;
    helperText?: ReactNode;
    description?: ReactNode;
    validateOnMount?: boolean;
    FormItemProps?: FormItemProps;
    placeholder?: ReactNode;
}

export type FormGroupProps = CommonProps & UseFieldApiComponentConfig;

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
