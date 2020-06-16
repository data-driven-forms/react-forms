import React, { Fragment, useEffect, useRef } from 'react';
import { Title, WizardBody } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import WizardStepButtons from './step-buttons';

export const RenderTitle = ({ title, customTitle }) =>
  customTitle ? (
    customTitle
  ) : (
    <Title headingLevel="h1" size="xl">
      {title}
    </Title>
  );

RenderTitle.propTypes = {
  title: PropTypes.node,
  customTitle: PropTypes.node
};

const WizardStep = ({ name, title, description, fields, formOptions, showTitles, showTitle, customTitle, hasNoBodyPadding, ...rest }) => {
  const formRef = useRef();

  useEffect(() => {
    // HACK: I can not pass ref to WizardBody because it is not
    // wrapped by forwardRef. However, the step body (the one that overflows)
    // is the grand parent of the form element.
    const stepBody = formRef.current && formRef.current.parentNode.parentNode;
    stepBody.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [name]);

  return (
    <Fragment>
      <WizardBody hasNoBodyPadding={hasNoBodyPadding}>
        <div ref={formRef} className="pf-c-form">
          {((showTitles && showTitle !== false) || showTitle) && <RenderTitle title={title} customTitle={customTitle} />}
          {fields.map((item) => formOptions.renderForm([item], formOptions))}
        </div>
      </WizardBody>
      <WizardStepButtons formOptions={formOptions} {...rest} />
    </Fragment>
  );
};

WizardStep.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired
  }).isRequired,
  showTitles: PropTypes.bool,
  showTitle: PropTypes.bool,
  customTitle: PropTypes.node,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasNoBodyPadding: PropTypes.bool
};

export default WizardStep;
