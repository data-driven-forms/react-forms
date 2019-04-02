import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import { Icon, Wizard } from 'patternfly-react';

const SimpleNext = ({
  next,
  valid,
  handleNext,
  submit,
  buttonLabels,
}) => (
  <Button
    bsStyle="primary"
    type="button"
    onClick={ () => valid ? handleNext(next) : submit() }
  >
    { buttonLabels.next }<Icon type="fa" name="angle-right" />
  </Button>
);

SimpleNext.propTypes = {
  next: PropTypes.string,
  valid: PropTypes.bool,
  handleNext: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  buttonLabels: PropTypes.object.isRequired,
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

const submitButton = (handleSubmit, submitText) => <Button type="button" bsStyle="primary" onClick={ handleSubmit }>
  { submitText }
</Button>;

const renderNextButton = ({ nextStep, handleSubmit, buttonLabels, ...rest }) =>
  !nextStep
    ? submitButton(handleSubmit, buttonLabels.submit)
    : typeof nextStep === 'object'
      ? <ConditionalNext nextStep={ nextStep } buttonLabels={ buttonLabels } { ...rest }/>
      : <SimpleNext next={ nextStep } buttonLabels={ buttonLabels } { ...rest } />;

const WizardStepButtons = ({ formOptions, disableBack, handlePrev, nextStep, FieldProvider, handleNext, buttonLabels }) => (
  <Wizard.Footer>
    { formOptions.onCancel && (
      <Button
        style={{ marginRight: 20 }}
        type="button" variant="contained"
        color="secondary" onClick={ formOptions.onCancel }>
        { buttonLabels.cancel }
      </Button>
    ) }

    <Button
      type="button"
      variant="contained"
      disabled={ disableBack }
      onClick={ handlePrev }>
      <Icon type="fa" name="angle-left" />{ buttonLabels.back }
    </Button>
    { renderNextButton({
      ...formOptions,
      handleNext,
      nextStep,
      FieldProvider,
      buttonLabels,
    }) }
  </Wizard.Footer>
);

WizardStepButtons.propTypes = {
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func,
    handleSubmit: PropTypes.func,
  }),
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
  buttonLabels: PropTypes.object.isRequired,
};

WizardStepButtons.defaultProps = {
  formOptions: undefined,
};

export default WizardStepButtons;
