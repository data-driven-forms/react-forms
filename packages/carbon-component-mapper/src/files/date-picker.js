import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { DatePicker as CarbonDatePicker, DatePickerInput } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';

const DatePicker = (props) => {
  const { input, datePickerType, meta, DatePickerProps, validateOnMount, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && meta.error;

  return (
    <CarbonDatePicker {...input} datePickerType={datePickerType} {...DatePickerProps}>
      <DatePickerInput id={input.name} invalid={Boolean(invalid)} invalidText={invalid ? invalid : ''} {...rest} />
    </CarbonDatePicker>
  );
};

DatePicker.propTypes = {
  isDisabled: PropTypes.bool,
  datePickerType: PropTypes.string,
  DatePickerProps: PropTypes.object
};

DatePicker.defaultProps = {
  datePickerType: 'single'
};

export default DatePicker;
