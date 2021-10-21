import React from 'react';
import PropTypes from 'prop-types';

import { TimePicker as CarbonTimePicker, TimePickerSelect, SelectItem } from 'carbon-components-react';

import HelperTextBlock from '../helper-text-block/helper-text-block';

const TimePickerBase = ({
  WrapperProps,
  input,
  initialLoad,
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
  ...rest
}) => {
  let defaultFormat;
  if (initialLoad === false) {
    if (input.value) {
      const date = new Date(input.value);
      if (date.getHours() >= 12) {
        defaultFormat = 'PM';
      }
    }
  }

  return (
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
        {twelveHoursFormat && defaultFormat === 'PM' && (
          <TimePickerSelect
            labelText="Period"
            defaultValue={'PM'}
            id={`${rest.id || input.name}-12h`}
            onChange={({ target: { value } }) => selectFormat(value)}
          >
            <SelectItem value="AM" text="AM" />
            <SelectItem value="PM" text="PM" />
          </TimePickerSelect>
        )}
        {twelveHoursFormat && defaultFormat === undefined && (
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

TimePickerBase.propTypes = {
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  initialLoad: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node,
  twelveHoursFormat: PropTypes.bool,
  timezones: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      showAs: PropTypes.string,
    })
  ),
  WrapperProps: PropTypes.object,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.date]),
  }).isRequired,
  enhnancedOnBlur: PropTypes.func,
  enhancedOnChange: PropTypes.func,
  finalValue: PropTypes.any,
  invalid: PropTypes.node,
  helperText: PropTypes.node,
  warnText: PropTypes.node,
  selectFormat: PropTypes.func.isRequired,
  selectTimezone: PropTypes.func.isRequired,
};

export default TimePickerBase;
