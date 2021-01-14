import React from 'react';
import PropTypes from 'prop-types';

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
      )
    })}
    {...input}
  />
);

Switch.propTypes = {
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  onText: PropTypes.node,
  offText: PropTypes.node,
  providerRequired: PropTypes.node
};

const WrapperSwitch = (props) => <FormGroupWrapper {...props} hideLabel type="checkbox" Component={Switch} />;

export default WrapperSwitch;
