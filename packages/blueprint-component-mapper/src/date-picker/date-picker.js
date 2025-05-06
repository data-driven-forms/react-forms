import React from 'react';

import { Popover, Button } from '@blueprintjs/core';
import { DatePicker as BDatePicker } from '@blueprintjs/datetime';

import FormGroupWrapper from '../form-group/form-group';
import propsCatcher from '../props-catcher/props-catcher';

const DatePicker = ({
  input,
  disabled,
  placeholder = 'Select date...',
  valueRenderer = (value) => value.toString(),
  PopoverProps,
  ButtonProps,
  ...props
}) => (
  <Popover disabled={disabled} {...PopoverProps}>
    <Button text={input.value ? valueRenderer(input.value) : placeholder} disabled={disabled} {...ButtonProps} />
    <BDatePicker id={input.name} {...propsCatcher(props)} {...input} value={input.value || null} />
  </Popover>
);

const WrapperDatePicker = (props) => <FormGroupWrapper {...props} Component={DatePicker} />;

export default WrapperDatePicker;
