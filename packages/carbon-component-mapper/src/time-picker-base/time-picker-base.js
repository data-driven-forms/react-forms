import React from 'react';

import { TimePicker as CarbonTimePicker, TimePickerSelect, SelectItem } from '@carbon/react';

import HelperTextBlock from '../helper-text-block/helper-text-block';

const TimePickerBase = ({
  WrapperProps,
  input,
  enhnancedOnBlur,
  enhancedOnChange,
  finalValue,
  invalid,
  twelveHoursFormat,
  timezones,
  helperText,
  warnText,
  selectFormat,
  selectTimezone,
  format,
  timezone,
  ...rest
}) => (
  <div {...WrapperProps}>
    <CarbonTimePicker
      {...input}
      {...(enhnancedOnBlur && { onBlur: enhnancedOnBlur })}
      {...(enhancedOnChange && { onChange: (e) => enhancedOnChange(e.target.value) })}
      onBlur={enhnancedOnBlur}
      value={finalValue}
      key={input.name}
      id={input.name}
      invalid={Boolean(invalid)}
      invalidText={invalid || ''}
      {...rest}
    >
      {twelveHoursFormat && (
        <TimePickerSelect
          defaultValue={format}
          labelText="Period"
          id={`${rest.id || input.name}-12h`}
          onChange={({ target: { value } }) => selectFormat(value)}
        >
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
      )}
      {timezones && (
        <TimePickerSelect
          defaultValue={timezone}
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

export default TimePickerBase;
