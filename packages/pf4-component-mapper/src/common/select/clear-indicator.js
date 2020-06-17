import React from 'react';
import PropTypes from 'prop-types';

import { TimesCircleIcon } from '@patternfly/react-icons';
import './clear-indicator.scss';

const ClearIndicator = ({ clearSelection }) => (
  <span
    onClick={(event) => {
      clearSelection();
      event.stopPropagation();
    }}
    className="ddorg__pf4-component-mapper__select-clear-indicator pf-u-pr-md pf-u-pl-md"
  >
    <TimesCircleIcon />
  </span>
);

ClearIndicator.propTypes = {
  clearSelection: PropTypes.func.isRequired
};

export default ClearIndicator;
