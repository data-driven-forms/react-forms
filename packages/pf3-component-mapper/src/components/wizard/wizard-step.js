import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';
import { Wizard as PfWizard } from 'patternfly-react';

const WizardStep = ({
  fields,
  formOptions,
  ...rest
}) => {
  return (
    <Fragment>
      <PfWizard.Body>
        <PfWizard.Row>
          <PfWizard.Main>
            <div className='form-horizontal'>
              { fields.map(item => formOptions.renderForm([ item ], formOptions)) }
            </div>
          </PfWizard.Main>
        </PfWizard.Row>
      </PfWizard.Body>
      <WizardStepButtons
        formOptions={ formOptions }
        { ...rest }
      />
    </Fragment>
  );
};

WizardStep.propTypes = {
  fields: PropTypes.array,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func,
  }),
};

WizardStep.defaultProps = {
  formOptions: undefined,
  fields: [],
};

export default WizardStep;
