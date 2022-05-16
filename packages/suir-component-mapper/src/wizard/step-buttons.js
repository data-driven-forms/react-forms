import React from 'react';
import PropTypes from 'prop-types';
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

const NextButton = ({ nextStep, handleNext, nextLabel, getState, handleSubmit, submitLabel, conditionalSubmitFlag }) => {
  const nextResult = nextStep ? selectNext(nextStep, getState) : nextStep;
  const progressNext = nextResult !== conditionalSubmitFlag && nextStep;
  const { valid } = getState();
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

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.node.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.node.isRequired,
  getState: PropTypes.func.isRequired,
  conditionalSubmitFlag: PropTypes.string.isRequired,
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
    <FormSpy>
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

WizardStepButtons.propTypes = {
  disableBack: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  conditionalSubmitFlag: PropTypes.string.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired,
    }),
    PropTypes.func,
  ]),
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node.isRequired,
    cancel: PropTypes.node.isRequired,
    back: PropTypes.node.isRequired,
    next: PropTypes.node.isRequired,
  }).isRequired,
  buttons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }),
};

export default WizardStepButtons;
