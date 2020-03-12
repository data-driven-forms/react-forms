import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import selectNext from '@data-driven-forms/common/src/wizard/select-next';

const SimpleNext = ({ nextStep, valid, handleNext, submit, nextLabel, getState }) => (
  <Button variant="primary" type="button" isDisabled={!valid} onClick={() => (valid ? handleNext(selectNext(nextStep, getState)) : submit())}>
    {nextLabel}
  </Button>
);

SimpleNext.propTypes = {
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  getState: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]).isRequired
};

const SubmitButton = ({ handleSubmit, submitLabel }) => (
  <Button type="button" variant="primary" onClick={handleSubmit}>
    {submitLabel}
  </Button>
);

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.node.isRequired
};

const NextButton = ({ nextStep, handleSubmit, submitLabel, ...rest }) =>
  nextStep ? <SimpleNext nextStep={nextStep} {...rest} /> : <SubmitButton handleSubmit={handleSubmit} submitLabel={submitLabel} />;

NextButton.propTypes = {
  nextStep: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired
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
        ConditionalNext={SimpleNext}
        SubmitButton={SubmitButton}
        SimpleNext={SimpleNext}
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
      <React.Fragment>
        <NextButton {...formOptions} handleNext={handleNext} nextStep={nextStep} nextLabel={next} submitLabel={submit} />
        <Button type="button" variant="secondary" isDisabled={disableBack} onClick={handlePrev}>
          {back}
        </Button>
        <Button type="button" variant="link" onClick={formOptions.onCancel}>
          {cancel}
        </Button>
      </React.Fragment>
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
    submit: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired
  }).isRequired,
  buttonsClassName: PropTypes.string,
  buttons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  formOptions: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  })
};

export default WizardStepButtons;
