import React, { Fragment } from 'react';
import { WizardBody } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';

const WizardStep = ({
  title,
  description,
  fields,
  formOptions,
  ...rest
}) => {
  return (
    <Fragment>
      <WizardBody hasBodyPadding={ true }>
        <div className="pf-c-form">
          { fields.map(item => formOptions.renderForm([ item ], formOptions)) }
        </div>
      </WizardBody>
      <WizardStepButtons
        formOptions={ formOptions }
        { ...rest }
      />
    </Fragment>
  );
};

WizardStep.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
};

export default WizardStep;
