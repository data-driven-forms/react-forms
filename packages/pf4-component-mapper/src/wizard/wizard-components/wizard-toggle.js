import React from 'react';
import PropTypes from 'prop-types';
import { AngleRightIcon, CaretDownIcon } from '@patternfly/react-icons';

const WizardToggle = ({ activeStepIndex, currentStep, navSchema, isOpen, dispatch }) => {
  const substepTitle = navSchema.find((step) => step.name === currentStep.name)?.substepOfTitle;
  const substepName = navSchema.find((step) => step.name === currentStep.name)?.substepOf;

  const index = substepName ? navSchema.find((step) => step.substepOf === substepName)?.index : activeStepIndex;

  const activeStepName = substepTitle || currentStep.title;
  const activeStepSubName = substepTitle ? currentStep.title : undefined;

  return (
    <button
      onClick={() => dispatch({ type: isOpen ? 'closeNav' : 'openNav' })}
      className={`pf-v5-c-wizard__toggle ${isOpen ? 'pf-m-expanded' : ''}`}
      aria-label="Wizard Toggle"
      aria-expanded={isOpen}
      type="button"
    >
      <ol className="pf-v5-c-wizard__toggle-list">
        <li className="pf-v5-c-wizard__toggle-list-item">
          <span className="pf-v5-c-wizard__toggle-num">{index + 1}</span> {activeStepName}
          {activeStepSubName && <AngleRightIcon className="pf-v5-c-wizard__toggle-separator" aria-hidden="true" />}
        </li>
        {activeStepSubName && <li className="pf-v5-c-wizard__toggle-list-item">{activeStepSubName}</li>}
      </ol>
      <span className="pf-v5-c-wizard__toggle-icon">
        <CaretDownIcon aria-hidden="true" />
      </span>
    </button>
  );
};

WizardToggle.propTypes = {
  activeStepIndex: PropTypes.number,
  currentStep: PropTypes.object,
  navSchema: PropTypes.array,
  isOpen: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default WizardToggle;
