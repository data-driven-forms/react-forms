import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';

import './wizard-step.scss';

const WizardStep = ({ fields, formOptions, ...rest }) => (
  <Fragment>
    <div className="ddorg__ant-component-mapper_wizard-step">{fields.map((item) => formOptions.renderForm([item], formOptions))}</div>
    <WizardStepButtons formOptions={formOptions} {...rest} />
  </Fragment>
);

WizardStep.propTypes = {
  fields: PropTypes.array,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired
  }).isRequired
};

WizardStep.defaultProps = {
  fields: []
};

export default WizardStep;
