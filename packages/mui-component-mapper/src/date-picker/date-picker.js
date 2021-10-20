import React from 'react';
import PropTypes from 'prop-types';

import MUIDatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';
import { meta, input } from '@data-driven-forms/common/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const DatePicker = (props) => {
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
    FormFieldGridProps,
    MuiPickersUtilsProviderProps,
    DatePickerProps,
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <LocalizationProvider locale={locale} adapter={AdapterDateFns} {...MuiPickersUtilsProviderProps}>
        <MUIDatePicker
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
          {...DatePickerProps}
        />
      </LocalizationProvider>
    </FormFieldGrid>
  );
};

DatePicker.propTypes = {
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
  DatePickerProps: PropTypes.object,
};

DatePicker.defaultProps = {
  FormFieldGridProps: {},
  MuiPickersUtilsProviderProps: {},
  DatePickerProps: {},
};

export default DatePicker;
