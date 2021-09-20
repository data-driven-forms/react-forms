import React from 'react';
import PropTypes from 'prop-types';
import { Step, Icon } from 'semantic-ui-react';

const WizardNav = ({ stepsInfo, activeStepIndex }) => {
  return (
    <Step.Group>
      {stepsInfo.map(({ title, description, icon }, idx) => (
        <Step key={idx} active={activeStepIndex === idx}>
          {icon && <Icon name={icon} />}
          <Step.Content>
            <Step.Title>{title}</Step.Title>
            {description && <Step.Description>{description}</Step.Description>}
          </Step.Content>
        </Step>
      ))}
    </Step.Group>
  );
};

WizardNav.propTypes = {
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      label: PropTypes.node,
      StepLabelProps: PropTypes.object,
      StepProps: PropTypes.object,
    })
  ),
  activeStepIndex: PropTypes.number,
};

export default WizardNav;
