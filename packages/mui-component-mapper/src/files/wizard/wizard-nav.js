import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  stepper: {
    width: '100%'
  }
}));

const WizardNav = ({ StepperProps, stepsInfo, activeStepIndex }) => {
  const classes = useStyles();

  return (
    <Stepper {...StepperProps} className={clsx(classes.stepper, StepperProps.className)} activeStep={activeStepIndex}>
      {stepsInfo.map(({ title, label, StepLabelProps, StepProps }, idx) => (
        <Step {...StepProps} key={idx}>
          <StepLabel {...StepLabelProps}>{title || label}</StepLabel>
        </Step>
      ))}
    </Stepper>
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
