import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';

const WizardStep = ({ fields, formOptions, ...rest }) => (
  <Fragment>
    <div className="style">{fields.map((item) => formOptions.renderForm([item], formOptions))}</div>
    {/* maybe this button could be in a sperate footer such that the position remains constant  */}
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
