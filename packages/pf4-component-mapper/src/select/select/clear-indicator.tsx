import React from 'react';
import { TimesCircleIcon } from '@patternfly/react-icons';
import './clear-indicator.css';

interface ClearIndicatorProps {
  clearSelection: () => void;
}

const ClearIndicator: React.FC<ClearIndicatorProps> = ({ clearSelection }) => (
  <button
    onClick={(event) => {
      clearSelection();
      event.stopPropagation();
    }}
    className="pf-v6-c-button pf-v6-c-menu-toggle-clear pf-v6-u-p-0"
    type="button"
    aria-label="Clear all"
  >
    <TimesCircleIcon />
  </button>
);

export default ClearIndicator;
