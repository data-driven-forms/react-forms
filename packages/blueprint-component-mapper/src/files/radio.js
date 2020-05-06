import React from 'react';
import PropTypes from 'prop-types';

import { RadioGroup } from '@blueprintjs/core';

import FormGroupWrapper from './form-group';
import propsCatcher from '../common/props-catcher';

const Radio = ({ input, label, isRequired, providerRequired, ...props }) => (
  <RadioGroup
    id={input.name}
    label={label}
    {...(isRequired && {
      label: (
        <span>
          {label} {providerRequired}
        </span>
      )
    })}
    {...propsCatcher(props)}
    {...input}
    selectedValue={input.value}
  />
);

Radio.propTypes = {
  input: PropTypes.object,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  providerRequired: PropTypes.node
};

const WrapperRadio = (props) => (
  <FormGroupWrapper
    {...props}
    options={props.options.map((option) => ({ ...option, value: String(option.value) }))}
    hideLabel
    Component={Radio}
    component="not-radio"
  />
);

WrapperRadio.propTypes = {
  options: PropTypes.array
};

export default WrapperRadio;
