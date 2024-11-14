import React from 'react';
import PropTypes from 'prop-types';

import { CheckIcon } from '@patternfly/react-icons';

const Option = ({ item, isActive, isSelected, ...props }) => (
  <li className={`pf-v6-c-menu__list-item${item.isDisabled || item.disabled ? ' pf-m-disabled' : ''}`}>
    <button
      {...props}
      disabled={item.isDisabled || item.disabled}
      type="button"
      className={`pf-v6-c-menu__item${isSelected ? ' pf-m-selected' : ''}${isActive ? ' pf-m-focus' : ''}`}
    >
      <span className="pf-v6-c-menu__item-main">
        {item.label}
        {isSelected && (
          <span className="pf-v6-c-menu__item-icon">
            <CheckIcon />
          </span>
        )}
        {item.description && <div className="pf-v6-c-menu__item-text">{item.description}</div>}
      </span>
    </button>
  </li>
);

Option.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.node,
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    description: PropTypes.node,
  }).isRequired,
  isActive: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Option;
