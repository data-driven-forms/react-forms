import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import selectNext from '@data-driven-forms/common/src/wizard/select-next';

const SimpleNext = ({
  nextStep,
  valid,
  handleNext,
  submit,
  nextLabel,
  getState,
}) =>  (
  <Button
    variant="primary"
    type="button"
    isDisabled={ !valid || getState().validating }
    onClick={ () => valid ? handleNext(selectNext(nextStep, getState)) : submit() }
  >
    { nextLabel }
  </Button>
);

SimpleNext.propTypes = {
  next: PropTypes.string,
  valid: PropTypes.bool,
  validating: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  getState: PropTypes.func.isRequired,
  nextStep: PropTypes.oneOfType([ PropTypes.string, PropTypes.object, PropTypes.func ]).isRequired,
};

const SubmitButton = ({ handleSubmit, submitLabel }) => <Button type="button" variant="primary" onClick={ handleSubmit }>{ submitLabel }</Button>;

const renderNextButton = ({ nextStep, handleSubmit, submitLabel, ...rest }) =>
  nextStep
    ? <SimpleNext nextStep={ nextStep } { ...rest } />
    : <SubmitButton handleSubmit={ handleSubmit } submitLabel={ submitLabel } />;

const WizardStepButtons = ({
  buttons: Buttons,
  formOptions,
  disableBack,
  handlePrev,
  nextStep,
  FieldProvider,
  handleNext,
  buttonsClassName,
  buttonLabels: {
    cancel,
    submit,
    back,
    next,
  }}) =>
  <footer className={ `pf-c-wizard__footer ${buttonsClassName ? buttonsClassName : ''}` }>
    { Buttons ? <Buttons
      ConditionalNext={ SimpleNext }
      SubmitButton={ SubmitButton }
      SimpleNext={ SimpleNext }
      formOptions={ formOptions }
      disableBack={ disableBack }
      handlePrev={ handlePrev }
      nextStep={ nextStep }
      FieldProvider={ FieldProvider }
      handleNext={ handleNext }
      buttonsClassName={ buttonsClassName }
      buttonLabels={{ cancel, submit, back, next }}
      renderNextButton={ args => renderNextButton({
        ...formOptions,
        handleNext,
        nextStep,
        nextLabel: next,
        submitLabel: submit,
        ...args,
      }) }
      selectNext={ selectNext }
    />
      : <React.Fragment>
        { renderNextButton({
          ...formOptions,
          handleNext,
          nextStep,
          nextLabel: next,
          submitLabel: submit,
        }) }
        <Button type="button" variant="secondary" isDisabled={ disableBack } onClick={ handlePrev }>{ back }</Button>
        <Button type="button" variant="link" onClick={ () => formOptions.onCancel(formOptions.getState().values) }>{ cancel }</Button>
      </React.Fragment> }
  </footer>;

WizardStepButtons.propTypes = {
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
  disableBack: PropTypes.bool,
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
  FieldProvider: PropTypes.func,
  buttonLabels: PropTypes.shape({
    submit: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
  }).isRequired,
  buttonsClassName: PropTypes.string,
  buttons: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
};

export default WizardStepButtons;
