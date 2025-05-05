import React, { Fragment } from 'react';
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

export default WizardStep;
