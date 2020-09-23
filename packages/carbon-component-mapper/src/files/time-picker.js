import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { TimePicker as CarbonTimePicker, TimePickerSelect, SelectItem } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';

const TimePicker = (props) => {
  const { input, meta, twelveHoursFormat, timezones, validateOnMount, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && meta.error;

  return (
    <CarbonTimePicker {...input} key={input.name} id={input.name} invalid={Boolean(invalid)} invalidText={invalid || ''} {...rest}>
      {twelveHoursFormat && (
        <TimePickerSelect id={`${rest.id || input.name}-12h`}>
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
      )}
      {timezones && (
        <TimePickerSelect id={`${rest.id || input.name}-timezones`}>
          {timezones.map((tz) => (
            <SelectItem key={tz.value} text={tz.label} {...tz} />
          ))}
        </TimePickerSelect>
      )}
    </CarbonTimePicker>
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
      value: PropTypes.string,
      label: PropTypes.node
    })
  )
};

export default TimePicker;
