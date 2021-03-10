import { AnyObject } from '@data-driven-forms/react-form-renderer';
import {
  GridProps,
  FormControlLabelProps as MUIFormControlLabelProps,
  FormControlProps as MUIFormControlProps,
  FormGroupProps as MUIFormGroupProps,
  CheckboxProps as MUICheckboxProps,
  FormLabelProps as MUIFormLabelProps,
  FormHelperTextProps as MUIFormHelperTextProps
} from '@material-ui/core';

interface InternalCheckboxProps extends AnyObject {
  FormFieldGridProps: GridProps,
  FormControlProps: MUIFormControlProps,
  FormGroupProps: MUIFormGroupProps,
  FormControlLabelProps: MUIFormControlLabelProps,
  CheckboxProps: MUICheckboxProps,
  FormLabelProps: MUIFormLabelProps,
  FormHelperTextProps: MUIFormHelperTextProps
}

export type MultipleChoiceListProps = InternalCheckboxProps

declare const MultipleChoiceList: React.ComponentType<MultipleChoiceListProps>;

export default MultipleChoiceList;
