import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { DatePicker as CarbonDatePicker, DatePickerInput } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';
import HelperTextBlock from '../common/helper-text-block';

const DatePicker = (props) => {
  const { input, datePickerType, meta, DatePickerProps, validateOnMount, helperText, WrapperProps, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && meta.error;

  return (
    <div {...WrapperProps}>
      <CarbonDatePicker {...input} datePickerType={datePickerType} {...DatePickerProps}>
        <DatePickerInput id={input.name} invalid={Boolean(invalid)} invalidText={invalid ? invalid : ''} {...rest} />
      </CarbonDatePicker>
      <HelperTextBlock helperText={!invalid && helperText} />
    </div>
  );
};

DatePicker.propTypes = {
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  datePickerType: PropTypes.string,
  DatePickerProps: PropTypes.object,
  WrapperProps: PropTypes.object
};

DatePicker.defaultProps = {
  datePickerType: 'single'
};

export default DatePicker;
