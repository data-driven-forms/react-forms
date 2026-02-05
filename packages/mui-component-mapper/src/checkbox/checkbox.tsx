import React from 'react';
import { Checkbox as MUICheckbox, FormControl, FormControlLabel, FormHelperText, FormGroup, FormLabel } from '@mui/material';
import type {
  CheckboxProps as MUICheckboxProps,
  FormControlProps,
  FormControlLabelProps,
  FormHelperTextProps,
  FormGroupProps,
  FormLabelProps,
} from '@mui/material';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import type { BaseFieldProps } from '@data-driven-forms/react-form-renderer';
import type { SelectOption, OptionValue } from '@data-driven-forms/common';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import type { ExtendedFieldMeta } from '../validation-error/validation-error';
import MultipleChoiceList from '../multiple-choice-list/multiple-choice-list';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';

export interface SingleCheckboxProps extends BaseFieldProps {
  FormFieldGridProps?: FormFieldGridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  CheckboxProps?: MUICheckboxProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  inputProps?: Record<string, any>;
  [key: string]: any;
}

export interface CheckboxProps<T = OptionValue> extends BaseFieldProps {
  options?: SelectOption<T>[];
  FormFieldGridProps?: FormFieldGridProps;
  FormControlProps?: FormControlProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  CheckboxProps?: MUICheckboxProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  inputProps?: Record<string, any>;
  [key: string]: any;
}

export const SingleCheckbox: React.FC<SingleCheckboxProps> = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    FormFieldGridProps = {},
    FormControlProps = {},
    FormGroupProps = {},
    FormControlLabelProps = {},
    CheckboxProps = {},
    FormLabelProps = {},
    FormHelperTextProps = {},
    inputProps,
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox',
  });
  const invalid = validationError(meta as ExtendedFieldMeta, validateOnMount);
  const text = invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description;

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <FormControl required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormGroup {...FormGroupProps}>
          <FormControlLabel
            {...FormControlLabelProps}
            control={
              <MUICheckbox
                {...input}
                {...CheckboxProps}
                disabled={isDisabled || isReadOnly}
                value={input.name}
                inputProps={{
                  readOnly: isReadOnly,
                  ...inputProps,
                }}
                {...rest}
              />
            }
            disabled={isDisabled || isReadOnly}
            label={<FormLabel {...FormLabelProps}>{label}</FormLabel>}
          />
          {text && <FormHelperText {...FormHelperTextProps}>{text}</FormHelperText>}
        </FormGroup>
      </FormControl>
    </FormFieldGrid>
  );
};

function Checkbox<T = OptionValue>({ options, ...props }: CheckboxProps<T>) {
  return options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />;
}

export default Checkbox;
