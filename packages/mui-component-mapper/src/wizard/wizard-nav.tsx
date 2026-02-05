import React from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';

import { Stepper, Step, StepLabel } from '@mui/material';
import type { StepperProps, StepProps, StepLabelProps } from '@mui/material';

const PREFIX = 'WizardNav';

const classes = {
  stepper: `${PREFIX}-stepper`,
};

const StyledStepper = styled(Stepper)(() => ({
  [`&.${classes.stepper}`]: {
    width: '100%',
  },
}));

interface StepInfo {
  title?: string;
  label?: string;
  StepLabelProps?: StepLabelProps;
  StepProps?: StepProps;
}

interface WizardNavProps {
  StepperProps?: StepperProps;
  stepsInfo: StepInfo[];
  activeStepIndex: number;
}

const WizardNav: React.FC<WizardNavProps> = ({ StepperProps = {}, stepsInfo, activeStepIndex }) => (
  <StyledStepper {...StepperProps} className={clsx(classes.stepper, StepperProps.className)} activeStep={activeStepIndex}>
    {stepsInfo.map(({ title, label, StepLabelProps = {}, StepProps = {} }, idx) => (
      <Step {...StepProps} key={idx}>
        <StepLabel {...StepLabelProps}>{title || label}</StepLabel>
      </Step>
    ))}
  </StyledStepper>
);

export default WizardNav;
