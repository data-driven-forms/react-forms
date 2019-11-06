import React from 'react';
import { components } from 'react-select';

import TimesCircleIcon from '../../icons/times-circle-icon';

const MultiValueRemove = props => (
  <components.MultiValueRemove { ...props }>
    <TimesCircleIcon />
  </components.MultiValueRemove>
);

export default MultiValueRemove;
