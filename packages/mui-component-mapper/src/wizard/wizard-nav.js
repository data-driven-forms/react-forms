import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Stepper, Step, StepLabel } from '@mui/material';

const PREFIX = 'WizardNav';

const classes = {
  stepper: `${PREFIX}-stepper`,
};

const StyledStepper = styled(Stepper)(() => ({
  [`&.${classes.stepper}`]: {
    width: '100%',
  },
}));

const WizardNav = ({ StepperProps, stepsInfo, activeStepIndex }) => (
  <StyledStepper {...StepperProps} className={clsx(classes.stepper, StepperProps.className)} activeStep={activeStepIndex}>
    {stepsInfo.map(({ title, label, StepLabelProps, StepProps }, idx) => (
      <Step {...StepProps} key={idx}>
        <StepLabel {...StepLabelProps}>{title || label}</StepLabel>
      </Step>
    ))}
  </StyledStepper>
);

WizardNav.propTypes = {
  StepperProps: PropTypes.object,
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

WizardNav.defaultProps = {
  StepperProps: {},
};

export default WizardNav;
