import React from 'react';
import PropTypes from 'prop-types';

import { CheckIcon } from '@patternfly/react-icons';

const Option = ({ item, isActive, isSelected, ...props }) => (
  <li>
    <button
      {...props}
      disabled={item.isDisabled || item.disabled}
      type="button"
      className={`pf-c-select__menu-item${isSelected ? ' pf-m-selected' : ''}${isActive ? ' pf-m-focus' : ''}${
        item.isDisabled || item.disabled ? ' pf-m-disabled' : ''
      }`}
    >
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
    label: PropTypes.node,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool
  }).isRequired,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Option;
