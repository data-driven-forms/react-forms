import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';
import { Wizard as PfWizard } from 'patternfly-react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const WizardStep = ({ fields, ...rest }) => {
  const formOptions = useFormApi();

  return (
    <Fragment>
      <PfWizard.Body>
        <PfWizard.Row>
          <PfWizard.Main>
            <div className="form-horizontal">{fields.map((item) => formOptions.renderForm([item], formOptions))}</div>
          </PfWizard.Main>
        </PfWizard.Row>
      </PfWizard.Body>
      <WizardStepButtons formOptions={formOptions} {...rest} />
    </Fragment>
  );
};

WizardStep.propTypes = {
  fields: PropTypes.array
};

WizardStep.defaultProps = {
  fields: []
};

export default WizardStep;
