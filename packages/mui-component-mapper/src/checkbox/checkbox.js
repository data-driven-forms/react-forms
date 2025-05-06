import React from 'react';
import { Checkbox as MUICheckbox, FormControl, FormControlLabel, FormHelperText, FormGroup, FormLabel } from '@mui/material';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import MultipleChoiceList from '../multiple-choice-list/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

export const SingleCheckbox = (props) => {
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
  const invalid = validationError(meta, validateOnMount);
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

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

export default Checkbox;
