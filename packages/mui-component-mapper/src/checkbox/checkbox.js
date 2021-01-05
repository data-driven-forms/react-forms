import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as MUICheckbox, FormControl, FormControlLabel, FormHelperText, FormGroup, FormLabel } from '@material-ui/core';
import { meta, input } from '@data-driven-forms/common/prop-types-templates';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../common/helpers';
import MultipleChoiceList from '../multiple-chioce-list/multiple-choice-list';
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
    FormFieldGridProps,
    FormControlProps,
    FormGroupProps,
    FormControlLabelProps,
    CheckboxProps,
    FormLabelProps,
    FormHelperTextProps,
    inputProps,
    ...rest
  } = useFieldApi({
    ...props,
    type: 'checkbox'
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
                  ...inputProps
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

SingleCheckbox.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  description: PropTypes.node,
  validateOnMount: PropTypes.bool,
  FormFieldGridProps: PropTypes.object,
  FormControlProps: PropTypes.object,
  FormGroupProps: PropTypes.object,
  FormControlLabelProps: PropTypes.object,
  CheckboxProps: PropTypes.object,
  FormLabelProps: PropTypes.object,
  FormHelperTextProps: PropTypes.object
};

SingleCheckbox.defaultProps = {
  FormFieldGridProps: {},
  FormControlProps: {},
  FormGroupProps: {},
  FormControlLabelProps: {},
  CheckboxProps: {},
  FormLabelProps: {},
  FormHelperTextProps: {}
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.array
};

export default Checkbox;
