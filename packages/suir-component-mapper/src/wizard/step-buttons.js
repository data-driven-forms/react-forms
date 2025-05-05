import React from 'react';
import { createUseStyles } from 'react-jss';

import selectNext from '@data-driven-forms/common/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import { Button } from 'semantic-ui-react';

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const NextButton = ({ nextStep, valid, handleNext, nextLabel, getState, handleSubmit, submitLabel, conditionalSubmitFlag }) => {
  const nextResult = nextStep ? selectNext(nextStep, getState) : nextStep;
  const progressNext = nextResult !== conditionalSubmitFlag && nextStep;
  return (
    <Button
      icon={progressNext ? 'right arrow' : undefined}
      color="blue"
      labelPosition={progressNext ? 'right' : undefined}
      content={progressNext ? nextLabel : submitLabel}
      disabled={!valid || getState().validating || getState().submitting}
      onClick={() => (progressNext ? handleNext(nextResult) : handleSubmit())}
      type="button"
    />
  );
};

const WizardStepButtons = ({ conditionalSubmitFlag, buttons: Buttons, ...props }) => {
  const classes = useStyles();
  if (Buttons) {
    return <Buttons {...props} />;
  }

  const {
    disableBack,
    handlePrev,
    nextStep,
    handleNext,
    buttonLabels: { cancel, submit, back, next },
    formOptions,
  } = props;

  return (
    <FormSpy subscription={{ values: true, valid: true, validating: true, submitting: true }}>
      {() => (
        <div className={classes.root}>
          <Button type="button" onClick={formOptions.onCancel}>
            {cancel}
          </Button>
          <div>
            <Button icon="left arrow" labelPosition="left" content={back} type="button" disabled={disableBack} onClick={handlePrev} />
            <NextButton
              {...formOptions}
              conditionalSubmitFlag={conditionalSubmitFlag}
              handleNext={handleNext}
              nextStep={nextStep}
              nextLabel={next}
              submitLabel={submit}
            />
          </div>
        </div>
      )}
    </FormSpy>
  );
};

export default WizardStepButtons;
