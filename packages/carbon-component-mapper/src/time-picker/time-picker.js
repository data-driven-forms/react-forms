import React from 'react';
import PropTypes from 'prop-types';

import TimePickerString from '../time-picker-string/time-picker-string';
import TimePickerDate from '../time-picker-date';

const TimePicker = ({ useStringFormat, ...props }) => (useStringFormat ? <TimePickerString {...props} /> : <TimePickerDate {...props} />);

TimePicker.propTypes = {
  useStringFormat: PropTypes.bool,
};

export default TimePicker;
