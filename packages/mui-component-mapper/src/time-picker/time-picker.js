import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker as MUITimePicker } from '@mui/lab';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import { meta, input } from '@data-driven-forms/common/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { TextField } from '@mui/material';

const TimePicker = (props) => {
  const {
    input,
    isReadOnly,
    isDisabled,
    placeholder,
    isRequired,
    label,
    helperText,
    description,
    validateOnMount,
    meta,
    MuiPickersUtilsProviderProps,
    FormFieldGridProps,
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <MUITimePicker
        renderInput={(props) => (
          <TextField
            {...props}
            fullWidth
            margin="normal"
            label={label}
            helperText={invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description}
            placeholder={placeholder}
            required={isRequired}
            error={!!invalid}
          />
        )}
        readOnly={isReadOnly}
        disabled={isDisabled || isReadOnly}
        {...input}
        value={input.value || null}
        {...rest}
      />
    </FormFieldGrid>
  );
};

TimePicker.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  description: PropTypes.node,
  FormFieldGridProps: PropTypes.object,
};

TimePicker.defaultProps = {
  FormFieldGridProps: {},
};

export default TimePicker;
