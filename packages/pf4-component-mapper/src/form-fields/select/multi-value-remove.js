import React from 'react';
import { components } from 'react-select';
import { TimesCircleIcon } from '@patternfly/react-icons';

const MultiValueRemove = props => (
  <components.MultiValueRemove { ...props }>
    <TimesCircleIcon />
  </components.MultiValueRemove>
);

export default MultiValueRemove;
