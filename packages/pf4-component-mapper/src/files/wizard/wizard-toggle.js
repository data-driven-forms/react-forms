import React from 'react';
import PropTypes from 'prop-types';
import { AngleRightIcon, CaretDownIcon } from '@patternfly/react-icons';

const WizardToggle = ({ activeStepIndex, activeStepName, activeStepSubName, isOpen, dispatch }) => (
  <button
    onClick={() => dispatch({ type: isOpen ? 'closeNav' : 'openNav' })}
    className={`pf-c-wizard__toggle ${isOpen ? 'pf-m-expanded' : ''}`}
    aria-label="Wizard Toggle"
    aria-expanded={isOpen}
    type="button"
  >
    <ol className="pf-c-wizard__toggle-list">
      <li className="pf-c-wizard__toggle-list-item">
        <span className="pf-c-wizard__toggle-num">{activeStepIndex}</span> {activeStepName}
        {activeStepSubName && <AngleRightIcon className="pf-c-wizard__toggle-separator" aria-hidden="true" />}
      </li>
      {activeStepSubName && <li className="pf-c-wizard__toggle-list-item">{activeStepSubName}</li>}
    </ol>
    <span className="pf-c-wizard__toggle-icon">
      <CaretDownIcon aria-hidden="true" />
    </span>
  </button>
);

WizardToggle.propTypes = {
  activeStepIndex: PropTypes.number,
  activeStepName: PropTypes.node,
  activeStepSubName: PropTypes.node,
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func
};

export default WizardToggle;
