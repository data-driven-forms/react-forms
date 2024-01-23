import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FormSpy from '@data-driven-forms/react-form-renderer/form-spy';
import WizardStepButtons from './step-buttons';

import './wizard-step.css';

const WizardStep = ({ fields = [], formOptions, WizardStepProps, ...rest }) => (
  <Fragment>
    <div className="ddorg__ant-component-mapper_wizard-step" {...WizardStepProps}>
      {fields.map((item) => formOptions.renderForm([item], formOptions))}
    </div>
    <FormSpy>{() => <WizardStepButtons formOptions={formOptions} {...rest} />}</FormSpy>
  </Fragment>
);

WizardStep.propTypes = {
  fields: PropTypes.array,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
  WizardStepProps: PropTypes.object,
};

export default WizardStep;
