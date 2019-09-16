import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';
import Typography from '@material-ui/core/Typography';

const WizardStep = ({
  title,
  description,
  fields,
  formOptions,
  ...rest
}) => {
  return (
    <Fragment>
      <Typography component="h5" >{ title }</Typography>
      <Typography paragraph >{ description }</Typography>
      { fields.map(item => formOptions.renderForm([ item ], formOptions)) }
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
