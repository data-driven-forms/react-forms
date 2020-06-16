import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Button } from '@blueprintjs/core';
import { DatePicker as BDatePicker } from '@blueprintjs/datetime';

import FormGroupWrapper from './form-group';
import propsCatcher from '../common/props-catcher';

const DatePicker = ({ input, disabled, placeholder, valueRenderer, PopoverProps, ButtonProps, ...props }) => (
  <Popover disabled={disabled} {...PopoverProps}>
    <Button text={input.value ? valueRenderer(input.value) : placeholder} disabled={disabled} {...ButtonProps} />
    <BDatePicker id={input.name} {...propsCatcher(props)} {...input} value={input.value || null} />
  </Popover>
);

DatePicker.defaultProps = {
  placeholder: 'Select date...',
  valueRenderer: (value) => value.toString()
};

DatePicker.propTypes = {
  input: PropTypes.object,
  disabled: PropTypes.bool,
  placeholder: PropTypes.node,
  valueRenderer: PropTypes.func,
  PopoverProps: PropTypes.object,
  ButtonProps: PropTypes.object
};

const WrapperDatePicker = (props) => <FormGroupWrapper {...props} Component={DatePicker} />;

export default WrapperDatePicker;
