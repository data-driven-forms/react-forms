import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TimePicker as CarbonTimePicker, TimePickerSelect, SelectItem } from 'carbon-components-react';

import prepareProps from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const TimePicker = (props) => {
  const { input, meta, twelveHoursFormat, timezones, validateOnMount, helperText, WrapperProps, ...rest } = useFieldApi(prepareProps(props));

  const [timezone, selectTimezone] = useState(timezones ? timezones[0]?.value : '');
  const [format, selectFormat] = useState('AM');
  const isMounted = useRef(false);

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  let finalValue = input.value;
  if (input.value instanceof Date) {
    let [hours = '00', minutes = '00'] = input.value
      .toLocaleTimeString('en-us', {
        hour12: !!twelveHoursFormat,
        timeZone: timezones?.find(({ value }) => value === timezone)?.showAs
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

    minutes = minutes % 59;
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
    <div {...WrapperProps}>
      <CarbonTimePicker
        {...input}
        value={finalValue}
        onBlur={enhnancedOnBlur}
        key={input.name}
        id={input.name}
        invalid={Boolean(invalid)}
        invalidText={invalid || ''}
        {...rest}
      >
        {twelveHoursFormat && (
          <TimePickerSelect labelText="Period" id={`${rest.id || input.name}-12h`} onChange={({ target: { value } }) => selectFormat(value)}>
            <SelectItem value="AM" text="AM" />
            <SelectItem value="PM" text="PM" />
          </TimePickerSelect>
        )}
        {timezones && (
          <TimePickerSelect
            labelText="Timezone"
            id={`${rest.id || input.name}-timezones`}
            onChange={({ target: { value } }) => selectTimezone(value)}
          >
            {timezones.map(({ showAs, ...tz }) => (
              <SelectItem key={tz.value} text={tz.label} {...tz} />
            ))}
          </TimePickerSelect>
        )}
      </CarbonTimePicker>
      <HelperTextBlock helperText={!invalid && helperText} warnText={warnText} />
    </div>
  );
};

TimePicker.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node,
  twelveHoursFormat: PropTypes.bool,
  timezones: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      showAs: PropTypes.string.isRequired
    })
  ),
  WrapperProps: PropTypes.object
};

export default TimePicker;
