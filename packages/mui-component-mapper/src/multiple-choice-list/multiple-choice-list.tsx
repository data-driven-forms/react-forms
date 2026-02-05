import React, { createContext, useContext } from 'react';
import { Grid, Checkbox, FormControlLabel, FormLabel, FormGroup, FormControl, FormHelperText } from '@mui/material';
import type {
  GridProps,
  CheckboxProps as MUICheckboxProps,
  FormControlLabelProps,
  FormLabelProps,
  FormGroupProps,
  FormControlProps,
  FormHelperTextProps,
} from '@mui/material';

import { MultipleChoiceList as MultipleChoiceListCommon } from '@data-driven-forms/common';
import type { MultipleChoiceListProps, MultipleChoiceWrapperProps, MultipleChoiceCheckboxProps } from '@data-driven-forms/common';
import type { OptionValue } from '@data-driven-forms/common';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';

interface CheckboxContextValue {
  FormControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  CheckboxProps?: MUICheckboxProps;
  FormFieldGridProps?: GridProps;
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
  FormGroupProps?: FormGroupProps;
  FormHelperTextProps?: FormHelperTextProps;
  props: Record<string, any>;
}

const CheckboxContext = createContext<CheckboxContextValue>({
  props: {},
});

interface FinalCheckboxProps<T extends OptionValue = OptionValue> extends MultipleChoiceCheckboxProps<T> {
  isDisabled?: boolean;
}

const FinalCheckbox = <T extends OptionValue = OptionValue>({ label, isDisabled: _isDisabled, checked, onChange, value }: FinalCheckboxProps<T>) => {
  const {
    FormControlLabelProps,
    CheckboxProps,
    props: { isDisabled },
  } = useContext(CheckboxContext);

  return (
    <FormControlLabel
      {...FormControlLabelProps}
      control={<Checkbox checked={checked} onChange={() => onChange && onChange(value)} disabled={isDisabled} {...CheckboxProps} />}
      label={label}
    />
  );
};

interface WrapperProps extends MultipleChoiceWrapperProps {
  meta: ExtendedFieldMeta;
  validateOnMount?: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ label, isRequired, children, meta, validateOnMount, helperText, description }) => {
  const invalid = validationError(meta, validateOnMount);
  const { FormFieldGridProps, FormControlProps, FormLabelProps, FormGroupProps, FormHelperTextProps } = useContext(CheckboxContext);

  return (
    <Grid container item xs={12} {...FormFieldGridProps}>
      <FormControl required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormLabel {...FormLabelProps}>{label}</FormLabel>
        <FormGroup {...FormGroupProps}>{children}</FormGroup>
        {(invalid || helperText || description) && <FormHelperText {...FormHelperTextProps}>{invalid || helperText || description}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export interface MUIMultipleChoiceListProps<T extends OptionValue = OptionValue> extends Omit<MultipleChoiceListProps<T>, 'Wrapper' | 'Checkbox'> {
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
  FormGroupProps?: FormGroupProps;
  FormHelperTextProps?: FormHelperTextProps;
  FormFieldGridProps?: GridProps;
  FormControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
  CheckboxProps?: MUICheckboxProps;
}

const MultipleChoiceList = <T extends OptionValue = OptionValue>({
  FormControlProps = {},
  FormLabelProps = {},
  FormGroupProps = {},
  FormHelperTextProps = {},
  FormFieldGridProps = {},
  FormControlLabelProps = {},
  CheckboxProps = {},
  name,
  options,
  ...props
}: MUIMultipleChoiceListProps<T>) => (
  <CheckboxContext.Provider
    value={{
      FormControlProps,
      FormLabelProps,
      FormGroupProps,
      FormHelperTextProps,
      FormFieldGridProps,
      FormControlLabelProps,
      CheckboxProps,
      props,
    }}
  >
    <MultipleChoiceListCommon<T> name={name} options={options} {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />
  </CheckboxContext.Provider>
);

export default MultipleChoiceList;
