import React from 'react';
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

export default WizardNav;
