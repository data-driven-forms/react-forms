import React from 'react';
import selectNext from '@data-driven-forms/common/wizard/select-next';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Button, Intent } from '@blueprintjs/core';

const NextButton = ({ nextStep, handleNext, buttonLabels, getState, handleSubmit, isDisabled, conditionalSubmitFlag, ...props }) => {
  const nextResult = nextStep ? selectNext(nextStep, getState) : nextStep;
  const progressNext = nextResult !== conditionalSubmitFlag && nextStep;
  return (
    <Button
      disabled={isDisabled}
      onClick={() => (progressNext ? handleNext(nextResult) : handleSubmit())}
      rightIcon={progressNext ? 'arrow-right' : 'arrow-up'}
      intent={Intent.SUCCESS}
      {...props}
    >
      {progressNext ? buttonLabels.next : buttonLabels.submit}
    </Button>
  );
};

const useStyles = createUseStyles({
  buttonGroup: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'space-between',

    '& button:not(:first-child)': {
      marginLeft: 8,
    },
  },
});

const StepButtons = ({
  handleNext,
  currentStep,
  formOptions,
  activeStepIndex,
  buttonLabels,
  handlePrev,
  isNextDisabled,
  ButtonToolbarProps,
  DirectionButtonProps,
  CancelButtonProps,
  BackButtonProps,
  NextButtonProps,
  SubmitButtonProps,
  conditionalSubmitFlag,
}) => {
  const { buttonGroup } = useStyles();

  return (
    <div {...ButtonToolbarProps} className={clsx(buttonGroup, ButtonToolbarProps && ButtonToolbarProps.className)}>
      <Button onClick={formOptions.onCancel} minimal {...CancelButtonProps}>
        {buttonLabels.cancel}
      </Button>
      <div {...DirectionButtonProps}>
        <Button onClick={handlePrev} disabled={activeStepIndex === 0} {...BackButtonProps}>
          {buttonLabels.back}
        </Button>
        <NextButton
          getState={formOptions.getState}
          nextStep={currentStep.nextStep}
          buttonLabels={buttonLabels}
          handleNext={handleNext}
          isDisabled={!formOptions.valid || isNextDisabled}
          handleSubmit={formOptions.handleSubmit}
          conditionalSubmitFlag={conditionalSubmitFlag}
          {...(currentStep.nextStep ? NextButtonProps : SubmitButtonProps)}
        />
      </div>
    </div>
  );
};

export default StepButtons;
