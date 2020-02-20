import React from 'react';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, TimePicker as MUITimePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';

const TimePicker = ({ input, isReadOnly, isDisabled, placeholder, isRequired, label, helperText, validateOnMount, meta, locale = 'en' }) => (
  <FormFieldGrid>
    <MuiPickersUtilsProvider locale={locale} utils={MomentUtils}>
      <MUITimePicker
        fullWidth
        margin="normal"
        label={label}
        helperText={helperText}
        disabled={isDisabled || isReadOnly}
        placeholder={placeholder}
        required={isRequired}
        error={!!validationError(meta, validateOnMount)}
        readOnly={isReadOnly}
        {...input}
        value={input.value || null}
      />
    </MuiPickersUtilsProvider>
  </FormFieldGrid>
);

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
  locale: PropTypes.string
};

export default TimePicker;
