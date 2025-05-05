import React from 'react';

import { RadioGroup } from '@blueprintjs/core';

import FormGroupWrapper from '../form-group/form-group';
import propsCatcher from '../props-catcher/props-catcher';

const Radio = ({ input, label, isRequired, providerRequired, ...props }) => (
  <RadioGroup
    id={input.name}
    label={label}
    {...(isRequired && {
      label: (
        <span>
          {label} {providerRequired}
        </span>
      ),
    })}
    {...propsCatcher(props)}
    {...input}
    selectedValue={input.value}
  />
);

const WrapperRadio = (props) => <FormGroupWrapper {...props} hideLabel Component={Radio} component="not-radio" />;

export default WrapperRadio;
