import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Wizard from '@data-driven-forms/common/src/wizard/wizard';
import WizardNav from './wizard/wizard-nav';
import WizardStepButtons from './wizard/step-buttons';

const useStyles = makeStyles(() => ({
  wizardBody: {
    padding: 24,
    margin: 0
  }
}));

const WizardInternal = ({
  currentStep,
  formOptions,
  activeStepIndex,
  prevSteps,
  handleNext,
  handlePrev,
  buttonLabels,
  stepsInfo,
  ButtonContainerProps,
  StepperProps,
  WizardBodyProps,
  WizardProps
}) => {
  const classes = useStyles();

  const buttonLabelsFinal = {
    next: 'Continue',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    ...buttonLabels
  };

  return (
    <Grid container spacing={3} {...WizardProps}>
      {stepsInfo && <WizardNav StepperProps={StepperProps} stepsInfo={stepsInfo} activeStepIndex={activeStepIndex} />}
      <Grid container spacing={2} {...WizardBodyProps} className={clsx(classes.wizardBody, WizardBodyProps.className)}>
        {currentStep.fields.map((item) => formOptions.renderForm([item], formOptions))}
        <WizardStepButtons
          {...currentStep}
          formOptions={formOptions}
          buttonLabels={buttonLabelsFinal}
          handleNext={handleNext}
          handlePrev={handlePrev}
          disableBack={prevSteps.length === 0}
          ButtonContainerProps={ButtonContainerProps}
        />
      </Grid>
    </Grid>
  );
};

WizardInternal.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  currentStep: PropTypes.object,
  handlePrev: PropTypes.func,
  onKeyDown: PropTypes.func,
  jumpToStep: PropTypes.func,
  setPrevSteps: PropTypes.func,
  handleNext: PropTypes.func,
  navSchema: PropTypes.array,
  activeStepIndex: PropTypes.number,
  maxStepIndex: PropTypes.number,
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func,
    renderForm: PropTypes.func
  }),
  prevSteps: PropTypes.array,
  buttonLabels: PropTypes.object,
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      label: PropTypes.node,
      key: PropTypes.string,
      LabelProps: PropTypes.object,
      StepProps: PropTypes.object
    })
  ),
  ButtonContainerProps: PropTypes.object,
  StepperProps: PropTypes.object,
  WizardBodyProps: PropTypes.object,
  WizardProps: PropTypes.object
};

WizardInternal.defaultProps = {
  WizardBodyProps: {}
};

const MuiWizard = (props) => <Wizard Wizard={WizardInternal} {...props} />;

export default MuiWizard;
