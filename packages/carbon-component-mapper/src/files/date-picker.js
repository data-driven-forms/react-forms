import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { DatePicker as CarbonDatePicker, DatePickerInput } from 'carbon-components-react';

import IsOptional from '../common/is-optional';
import WithDescription from '../common/with-description';

const DatePicker = (props) => {
  const {
    input,
    isDisabled,
    isReadOnly,
    datePickerType,
    isRequired,
    description,
    meta,
    labelText,
    optionalText,
    label,
    DatePickerProps,
    ...rest
  } = useFieldApi(props);

  const modifiedLabel = description ? <WithDescription description={description} labelText={labelText || label} /> : labelText || label;

  const finalLabel = isRequired ? modifiedLabel : <IsOptional labelText={modifiedLabel} optionalText={optionalText} />;

  const invalid = meta.touched && meta.error;

  return (
    <CarbonDatePicker {...input} datePickerType={datePickerType} {...DatePickerProps}>
      <DatePickerInput disabled={isDisabled} labelText={finalLabel} invalid={Boolean(invalid)} invalidText={invalid} autocomplete={false} {...rest} />
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
