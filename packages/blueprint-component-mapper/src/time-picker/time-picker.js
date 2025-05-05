import React from 'react';

import { TimePicker as BTimePicker } from '@blueprintjs/datetime';

import FormGroupWrapper from '../form-group/form-group';
import propsCatcher from '../props-catcher/props-catcher';

const TimePicker = ({ input, ...props }) => <BTimePicker id={input.name} {...propsCatcher(props)} {...input} value={input.value || null} />;

const WrapperTimePicker = (props) => <FormGroupWrapper {...props} Component={TimePicker} />;

export default WrapperTimePicker;
