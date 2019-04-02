import React, { Fragment } from 'react';
import {
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';
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
      <TextContent>
        <Text component={ TextVariants.h5 } >{ title }</Text>
        <Text component={ TextVariants.p } >{ description }</Text>
      </TextContent>
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
