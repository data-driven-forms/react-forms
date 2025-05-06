import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { DatePicker as CarbonDatePicker, DatePickerInput } from 'carbon-components-react';

import prepareProps from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const DatePicker = (props) => {
  const {
    input,
    datePickerType = 'single',
    meta,
    DatePickerProps,
    validateOnMount,
    helperText,
    WrapperProps,
    ...rest
  } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  return (
    <div {...WrapperProps}>
      <CarbonDatePicker {...input} datePickerType={datePickerType} {...DatePickerProps}>
        <DatePickerInput id={input.name} invalid={Boolean(invalid)} invalidText={invalid ? invalid : ''} {...rest} />
      </CarbonDatePicker>
      <HelperTextBlock helperText={!invalid && helperText} warnText={warnText} />
    </div>
  );
};

export default DatePicker;
