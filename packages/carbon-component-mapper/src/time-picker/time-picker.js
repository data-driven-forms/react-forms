import React from 'react';

import TimePickerString from '../time-picker-string/time-picker-string';
import TimePickerDate from '../time-picker-date';

const TimePicker = ({ useStringFormat, ...props }) => (useStringFormat ? <TimePickerString {...props} /> : <TimePickerDate {...props} />);

export default TimePicker;
