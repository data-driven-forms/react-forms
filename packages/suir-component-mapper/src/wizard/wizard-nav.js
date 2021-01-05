import React from 'react';
import PropTypes from 'prop-types';
import { Step, StepGroup, StepContent, StepTitle, StepDescription, Icon } from 'semantic-ui-react';

const WizardNav = ({ stepsInfo, activeStepIndex }) => {
  return (
    <StepGroup>
      {stepsInfo.map(({ title, description, icon }, idx) => (
        <Step key={idx} active={activeStepIndex === idx}>
          {icon && <Icon name={icon} />}
          <StepContent>
            <StepTitle>{title}</StepTitle>
            {description && <StepDescription>{description}</StepDescription>}
          </StepContent>
        </Step>
      ))}
    </StepGroup>
  );
};

WizardNav.propTypes = {
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

export default WizardNav;
