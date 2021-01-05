import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, DatePicker as MUIDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../common/helpers';
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
    DatePickerProps
  } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid {...FormFieldGridProps}>
      <MuiPickersUtilsProvider locale={locale} utils={MomentUtils} {...MuiPickersUtilsProviderProps}>
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
      </MuiPickersUtilsProvider>
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
  DatePickerProps: PropTypes.object
};

DatePicker.defaultProps = {
  FormFieldGridProps: {},
  MuiPickersUtilsProviderProps: {},
  DatePickerProps: {}
};

export default DatePicker;
