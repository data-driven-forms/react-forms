import React from 'react';
import PropTypes from 'prop-types';
import MUITimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import { meta, input } from '@data-driven-forms/common/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

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
    locale = 'en',
    MuiPickersUtilsProviderProps,
    FormFieldGridProps,
    ...rest
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <LocalizationProvider locale={locale} adapter={AdapterDateFns} {...MuiPickersUtilsProviderProps}>
        <MUITimePicker
          fullWidth
          margin="normal"
          label={label}
          helperText={invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description}
          disabled={isDisabled || isReadOnly}
          placeholder={placeholder}
          required={isRequired}
          error={!!invalid}
          readOnly={isReadOnly}
          {...input}
          value={input.value || null}
          {...rest}
        />
      </LocalizationProvider>
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
  locale: PropTypes.string,
  description: PropTypes.node,
  FormFieldGridProps: PropTypes.object,
  MuiPickersUtilsProviderProps: PropTypes.object,
};

TimePicker.defaultProps = {
  FormFieldGridProps: {},
  MuiPickersUtilsProviderProps: {},
};

export default TimePicker;
