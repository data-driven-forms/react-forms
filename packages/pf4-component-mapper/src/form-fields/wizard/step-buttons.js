import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarItem, Button } from '@patternfly/react-core';

const SimpleNext = ({
  next,
  valid,
  handleNext,
  submit,
}) => (
  <Button
    variant="primary"
    type="button"
    onClick={ () => valid ? handleNext(next) : submit() }
  >
    Continue
  </Button>
);

SimpleNext.propTypes = {
  next: PropTypes.string,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

const ConditionalNext = ({
  nextStep,
  FieldProvider,
  ...rest
}) => (
  <FieldProvider
    name={ nextStep.when }
    subscription={{ value: true }}
  >
    { ({ input: { value }}) => <SimpleNext next={ nextStep.stepMapper[value] } { ...rest } /> }
  </FieldProvider>
);

ConditionalNext.propTypes = {
  nextStep: PropTypes.shape({
    when: PropTypes.string.isRequired,
    stepMapper: PropTypes.object.isRequired,
  }).isRequired,
  FieldProvider: PropTypes.func.isRequired,
};

const submitButton = handleSubmit => <Button type="button" variant="primary" onClick={ handleSubmit }>Submit</Button>;

const renderNextButton = ({ nextStep, handleSubmit, ...rest }) =>
  !nextStep
    ? submitButton(handleSubmit)
    : typeof nextStep === 'object'
      ? <ConditionalNext nextStep={ nextStep } { ...rest }/>
      : <SimpleNext next={ nextStep } { ...rest } />;

const WizardStepButtons = ({ formOptions, disableBack, handlePrev, nextStep, FieldProvider, handleNext }) => (
  <Toolbar className="wizard-button-toolbar">
    <ToolbarGroup>
      { formOptions.onCancel && (
        <ToolbarItem>
          <Button type="button" variant="secondary" onClick={ formOptions.onCancel }>Cancel</Button>
        </ToolbarItem>
      ) }
      <ToolbarItem>
        <Button type="button" variant="secondary" isDisabled={ disableBack } onClick={ handlePrev }>Back</Button>
      </ToolbarItem>
      <ToolbarItem>
        { renderNextButton({
          ...formOptions,
          handleNext,
          nextStep,
          FieldProvider,
        }) }
      </ToolbarItem>
    </ToolbarGroup>
  </Toolbar>
);

WizardStepButtons.propTypes = {
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
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
  ]),
  FieldProvider: PropTypes.func.isRequired,
};

export default WizardStepButtons;
