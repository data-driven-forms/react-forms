import React from 'react';

import { Switch as BSwitch } from '@blueprintjs/core';

import FormGroupWrapper from '../form-group/form-group';
import propsCatcher from '../props-catcher/props-catcher';

const Switch = ({ input, isRequired, label, onText, offText, providerRequired, ...props }) => (
  <BSwitch
    label={(input.checked ? onText : offText) || label}
    {...propsCatcher(props)}
    {...(isRequired && {
      label: (
        <span>
          {label} {providerRequired}
        </span>
      ),
    })}
    {...input}
  />
);


const WrapperSwitch = (props) => <FormGroupWrapper {...props} hideLabel type="checkbox" Component={Switch} />;

export default WrapperSwitch;
