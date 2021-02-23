import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core';
import selectNext from '@data-driven-forms/common/src/wizard/select-next';
import { FormSpy } from '@data-driven-forms/react-form-renderer';

const NextButton = ({ nextStep, valid, handleNext, nextLabel, getState, handleSubmit, submitLabel }) => (
  <Button
    variant="primary"
    type="button"
    isDisabled={!valid || getState().validating}
    onClick={() => (nextStep ? handleNext(selectNext(nextStep, getState)) : handleSubmit())}
  >
    {nextStep ? nextLabel : submitLabel}
  </Button>
);

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.node.isRequired,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.node.isRequired,
  getState: PropTypes.func.isRequired
};

const WizardStepButtons = ({
  buttons: Buttons,
  disableBack,
  handlePrev,
  nextStep,
  handleNext,
  buttonsClassName,
  buttonLabels: { cancel, submit, back, next },
  formOptions
}) => (
  <footer className={`pf-c-wizard__footer ${buttonsClassName ? buttonsClassName : ''}`}>
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
            <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} nextLabel={next} submitLabel={submit} />
            <Button type="button" variant="secondary" isDisabled={disableBack} onClick={handlePrev}>
              {back}
            </Button>
            <div className="pf-c-wizard__footer-cancel">
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
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      when: PropTypes.string.isRequired,
      stepMapper: PropTypes.object.isRequired
    }),
    PropTypes.func
  ]),
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node.isRequired,
    cancel: PropTypes.node.isRequired,
    back: PropTypes.node.isRequired,
    next: PropTypes.node.isRequired
  }).isRequired,
  buttonsClassName: PropTypes.string,
  buttons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  })
};

export default WizardStepButtons;
