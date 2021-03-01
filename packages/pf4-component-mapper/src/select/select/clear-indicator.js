import React from 'react';
import PropTypes from 'prop-types';

import { TimesCircleIcon } from '@patternfly/react-icons';
import './clear-indicator.css';

const ClearIndicator = ({ clearSelection }) => (
  <button
    onClick={(event) => {
      clearSelection();
      event.stopPropagation();
    }}
    className="pf-c-button pf-m-plain pf-c-select__toggle-clear pf-u-p-0"
    type="button"
    aria-label="Clear all"
  >
    <TimesCircleIcon />
  </button>
);

ClearIndicator.propTypes = {
  clearSelection: PropTypes.func.isRequired
};

export default ClearIndicator;
