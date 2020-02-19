import React, { Fragment } from 'react';
import { WizardBody } from '@patternfly/react-core/dist/js/components/Wizard/WizardBody';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';

export const RenderTitle = ({ title, customTitle }) => customTitle ? customTitle : <Title headingLevel="h1" size="xl">{ title }</Title>;

RenderTitle.propTypes = {
  title: PropTypes.node,
  customTitle: PropTypes.node,
};

const WizardStep = ({
  title,
  description,
  fields,
  formOptions,
  showTitles,
  showTitle,
  customTitle,
  ...rest
}) => {
  return (
    <Fragment>
      <WizardBody hasBodyPadding={ true }>
        <div className="pf-c-form">
          { ((showTitles && showTitle !== false) || showTitle) && <RenderTitle title={ title } customTitle={ customTitle } /> }
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
  title: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
  showTitles: PropTypes.bool,
  showTitle: PropTypes.bool,
  customTitle: PropTypes.node,
};

export default WizardStep;
