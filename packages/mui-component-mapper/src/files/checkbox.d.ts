import { UseFieldApiComponentConfig } from '@data-driven-forms/react-form-renderer';
import { CheckboxProps as MuiCheckboxProps, GridProps, FormControlProps, FormGroupProps, FormControlLabelProps, FormLabelProps, FormHelperTextProps } from '@material-ui/core';

interface InternalCheckboxProps extends MuiCheckboxProps {
  FormFieldGridProps?: GridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps: FormControlLabelProps;
  CheckboxProps: MuiCheckboxProps;
  FormLabelProps: FormLabelProps;
  FormHelperTextProps: FormHelperTextProps;
}

export type CheckboxProps = InternalCheckboxProps & UseFieldApiComponentConfig;

declare const Checkbox: React.ComponentType<CheckboxProps>;

export default Checkbox;
