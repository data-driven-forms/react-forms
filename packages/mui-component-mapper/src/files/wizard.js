import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import WizardStep from './wizard/wizard-step';
import { Grid, Typography } from '@material-ui/core';
import Wizard, { wizardProps } from '@data-driven-forms/common/src/wizard/wizard';

const WizardInternal = ({ title, description, currentStep, formOptions, prevSteps, handleNext, handlePrev, buttonLabels }) => {
  const buttonLabelsFinal = {
    next: 'Continue',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    ...buttonLabels
  };

  const step = <WizardStep {...currentStep} formOptions={formOptions} buttonLabels={buttonLabelsFinal} />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography component="h3">{title}</Typography>
        <Typography paragraph>{description}</Typography>
        <Typography component="h5">{`Step ${prevSteps.length + 1}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        {cloneElement(step, {
          handleNext,
          handlePrev,
          disableBack: prevSteps.length === 0
        })}
      </Grid>
    </Grid>
  );
};

WizardInternal.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  ...wizardProps
};

const MuiWizard = (props) => <Wizard Wizard={WizardInternal} {...props} />;

export default MuiWizard;
