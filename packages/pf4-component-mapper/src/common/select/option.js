import React from 'react';
import PropTypes from 'prop-types';

import { CheckIcon } from '@patternfly/react-icons';

const Option = ({ item, isActive, isSelected, ...props }) => (
  <li>
    <button {...props} className={`pf-c-select__menu-item${isSelected ? ' pf-m-selected' : ''}${isActive ? ' pf-m-focus' : ''}`}>
      {item.label}
      {isSelected && (
        <span className="pf-c-select__menu-item-icon">
          <CheckIcon />
        </span>
      )}
    </button>
  </li>
);

Option.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.node
  }).isRequired,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool
};

export default Option;
