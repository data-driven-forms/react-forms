import React, { useState, useEffect, useRef } from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import prepareProps from '../prepare-props';
import TimePickerBase from '../time-picker-base';

const TimePickerString = (props) => {
  const { input, meta, twelveHoursFormat, timezones, validateOnMount, helperText, WrapperProps, useStringFormat, ...rest } = useFieldApi(
    prepareProps(props)
  );

  const [timezone, selectTimezone] = useState(() => (timezones ? input.value.match(/ \w+$/)?.[0].trim() || timezones[0]?.value : ''));
  const [format, selectFormat] = useState(() => input.value.match(/ \w+ /)?.[0].trim() || 'AM');
  const isMounted = useRef(false);

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  const finalValue = input.value.replace(/ .*/, '');
  const enhancedOnChange = (value) =>
    input.onChange(`${value} ${twelveHoursFormat ? format : ''} ${timezones ? timezone : ''}`.replace(/ {2}/, ' ').trim());

  useEffect(() => {
    if (isMounted.current === true) {
      enhancedOnChange(finalValue);
    } else {
      isMounted.current = true;
    }
  }, [timezone, format]);

  return (
    <TimePickerBase
      WrapperProps={WrapperProps}
      input={input}
      enhancedOnChange={enhancedOnChange}
      finalValue={finalValue}
      invalid={invalid}
      twelveHoursFormat={twelveHoursFormat}
      timezones={timezones}
      helperText={helperText}
      warnText={warnText}
      selectFormat={selectFormat}
      selectTimezone={selectTimezone}
      format={format}
      timezone={timezone}
      {...rest}
    />
  );
};

export default TimePickerString;
