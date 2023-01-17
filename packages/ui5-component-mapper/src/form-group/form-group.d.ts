import { UseFieldApiComponentConfig } from '@data-driven-forms/react-form-renderer';

export interface FormGroupInternalProps { }

export type FormGroupProps = FormGroupInternalProps & UseFieldApiComponentConfig;

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
