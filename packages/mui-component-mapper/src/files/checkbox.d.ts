import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer';
import { CheckboxProps as MuiCheckboxProps, GridProps, FormControlProps, FormGroupProps, FormControlLabelProps, FormLabelProps, FormHelperTextProps } from '@material-ui/core';

export interface CheckboxProps extends MuiCheckboxProps {
  FormFieldGridProps?: GridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps: FormControlLabelProps;
  CheckboxProps: MuiCheckboxProps;
  FormLabelProps: FormLabelProps;
  FormHelperTextProps: FormHelperTextProps;
}

declare const Checkbox: React.ComponentType<CheckboxProps & UseFieldApiConfig>;

export default Checkbox;
