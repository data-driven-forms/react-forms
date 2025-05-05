import React, { useState, useEffect, useRef } from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import prepareProps from '../prepare-props';
import TimePickerBase from '../time-picker-base';

const TimePickerDate = (props) => {
  const { input, meta, twelveHoursFormat, timezones, validateOnMount, helperText, WrapperProps, defaultTimezone, ...rest } = useFieldApi(
    prepareProps(props)
  );

  const [timezone, selectTimezone] = useState(defaultTimezone || timezones ? timezones[0]?.value : '');
  const [format, selectFormat] = useState(() => (input.value?.getHours?.() >= 12 ? 'PM' : 'AM'));
  const isMounted = useRef(false);

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  let finalValue = input.value;
  if (input.value instanceof Date) {
    let [hours = '00', minutes = '00'] = input.value
      .toLocaleTimeString('en-us', {
        hour12: !!twelveHoursFormat,
        timeZone: timezones?.find(({ value }) => value === timezone)?.showAs,
      })
      .split(':');

    finalValue = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }

  const enhnancedOnBlur = () => {
    let [hours = '00', minutes = '00'] = finalValue?.split(':') || [];

    if (!hours || isNaN(hours)) {
      hours = '00';
    }

    if (!minutes || isNaN(minutes)) {
      minutes = '00';
    }

    if (twelveHoursFormat) {
      hours = hours % 12;
      if (format === 'PM') {
        hours = hours + 12;
      }
    } else {
      hours = hours % 24;
    }

    minutes = minutes % 60;
    const enhancedValue = new Date(`Jan 1 2000 ${hours}:${minutes}:00 ${timezone}`);

    input.onChange(enhancedValue);
    input.onBlur();
  };

  useEffect(() => {
    if (isMounted.current === true) {
      enhnancedOnBlur();
    } else {
      isMounted.current = true;
    }
  }, [timezone, format]);

  return (
    <TimePickerBase
      WrapperProps={WrapperProps}
      input={input}
      enhnancedOnBlur={enhnancedOnBlur}
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

export default TimePickerDate;
