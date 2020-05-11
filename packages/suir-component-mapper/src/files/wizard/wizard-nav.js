import React from 'react';
import PropTypes from 'prop-types';

const WizardNav = ({ StepperProps, stepsInfo, activeStepIndex }) => {
  return (
    <div {...StepperProps}>
      {stepsInfo.map(({ title, label, StepLabelProps, StepProps }, idx) => (
        <div {...StepProps} key={idx}>
          <span {...StepLabelProps}>{title || label}</span>
        </div>
      ))}
    </div>
  );
};

WizardNav.propTypes = {
  StepperProps: PropTypes.object,
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      label: PropTypes.node,
      StepLabelProps: PropTypes.object,
      StepProps: PropTypes.object
    })
  ),
  activeStepIndex: PropTypes.number
};

WizardNav.defaultProps = {
  StepperProps: {}
};

export default WizardNav;
