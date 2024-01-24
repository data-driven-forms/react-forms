import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { WizardContext } from '@data-driven-forms/react-form-renderer';

import { Grid } from '@mui/material';

import Wizard from '@data-driven-forms/common/wizard';
import WizardNav from './wizard-nav';
import WizardStepButtons from './step-buttons';

const PREFIX = 'MuiWizard';

const classes = {
  wizardBody: `${PREFIX}-wizardBody`,
};

const StyledWizard = styled(Grid)(() => ({
  [`& .${classes.wizardBody}`]: {
    padding: 24,
    margin: 0,
  },
}));

const WizardInternal = ({
  buttonLabels,
  stepsInfo,
  ButtonContainerProps,
  StepperProps,
  WizardBodyProps = {},
  WizardProps,
  conditionalSubmitFlag,
}) => {
  const { formOptions, currentStep, handlePrev, onKeyDown, handleNext, activeStepIndex, prevSteps } = useContext(WizardContext);

  const buttonLabelsFinal = {
    next: 'Continue',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    ...buttonLabels,
  };

  return (
    <StyledWizard container {...WizardProps} onKeyDown={onKeyDown}>
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
          conditionalSubmitFlag={conditionalSubmitFlag}
          ButtonContainerProps={ButtonContainerProps}
        />
      </Grid>
    </StyledWizard>
  );
};

WizardInternal.propTypes = {
  buttonLabels: PropTypes.object,
  stepsInfo: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      label: PropTypes.node,
      StepLabelProps: PropTypes.object,
      StepProps: PropTypes.object,
    })
  ),
  ButtonContainerProps: PropTypes.object,
  StepperProps: PropTypes.object,
  WizardBodyProps: PropTypes.object,
  WizardProps: PropTypes.object,
  conditionalSubmitFlag: PropTypes.string.isRequired,
};

const MuiWizard = (props) => <Wizard Wizard={WizardInternal} {...props} />;

export default MuiWizard;
