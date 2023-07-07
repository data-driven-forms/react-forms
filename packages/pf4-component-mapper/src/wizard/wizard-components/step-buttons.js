import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import selectNext from '@data-driven-forms/common/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';

const NextButton = ({ nextStep, valid, handleNext, nextLabel, getState, handleSubmit, submitLabel, conditionalSubmitFlag }) => {
  const nextResult = nextStep ? selectNext(nextStep, getState) : nextStep;
  const progressNext = nextResult !== conditionalSubmitFlag && nextStep;
  return (
    <Button
      variant="primary"
      type="button"
      isDisabled={!valid || getState().validating}
      onClick={() => (progressNext ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
    >
      {progressNext ? nextLabel : submitLabel}
    </Button>
  );
};

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.node.isRequired,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.node.isRequired,
  getState: PropTypes.func.isRequired,
  conditionalSubmitFlag: PropTypes.string,
};

const WizardStepButtons = ({
  buttons: Buttons,
  disableBack,
  handlePrev,
  nextStep,
  handleNext,
  buttonsClassName,
  buttonLabels: { cancel, submit, back, next },
  formOptions,
  conditionalSubmitFlag,
}) => (
  <footer className={`pf-v5-c-wizard__footer ${buttonsClassName ? buttonsClassName : ''}`}>
    {Buttons ? (
      <Buttons
        disableBack={disableBack}
        handlePrev={handlePrev}
        nextStep={nextStep}
        handleNext={handleNext}
        buttonsClassName={buttonsClassName}
        buttonLabels={{ cancel, submit, back, next }}
        renderNextButton={(args) => (
          <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} nextLabel={next} submitLabel={submit} {...args} />
        )}
        selectNext={selectNext}
      />
    ) : (
      <FormSpy>
        {() => (
          <React.Fragment>
            <NextButton
              {...formOptions}
              conditionalSubmitFlag={conditionalSubmitFlag}
              handleNext={handleNext}
              nextStep={nextStep}
              nextLabel={next}
              submitLabel={submit}
            />
            <Button type="button" variant="secondary" isDisabled={disableBack} onClick={handlePrev}>
              {back}
            </Button>
            <div className="pf-v5-c-wizard__footer-cancel">
              <Button type="button" variant="link" onClick={formOptions.onCancel}>
                {cancel}
              </Button>
            </div>
          </React.Fragment>
        )}
      </FormSpy>
    )}
  </footer>
);

WizardStepButtons.propTypes = {
  disableBack: PropTypes.bool,
  conditionalSubmitFlag: PropTypes.string,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
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
  buttonsClassName: PropTypes.string,
  buttons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }),
};

export default WizardStepButtons;
