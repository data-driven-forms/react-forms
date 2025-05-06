import React, { Fragment, useEffect, useRef } from 'react';
import { Title, WizardBody } from '@patternfly/react-core';
import WizardStepButtons from './step-buttons';

export const RenderTitle = ({ title, customTitle }) =>
  customTitle ? (
    customTitle
  ) : (
    <Title headingLevel="h1" size="xl">
      {title}
    </Title>
  );

const DefaultStepTemplate = ({ formFields, formRef, title, customTitle, showTitle, showTitles }) => (
  <div ref={formRef} className="pf-c-form">
    {((showTitles && showTitle !== false) || showTitle) && <RenderTitle title={title} customTitle={customTitle} />}
    {formFields}
  </div>
);

const WizardStep = ({
  name,
  title,
  description,
  fields,
  formOptions,
  showTitles,
  showTitle,
  customTitle,
  hasNoBodyPadding,
  StepTemplate = DefaultStepTemplate,
  ...rest
}) => {
  const formRef = useRef();

  useEffect(() => {
    // HACK: I can not pass ref to WizardBody because it is not
    // wrapped by forwardRef. However, the step body (the one that overflows)
    // is the grand parent of the form element.
    const stepBody = formRef.current && formRef.current.parentNode.parentNode;
    stepBody && stepBody.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [name]);

  return (
    <Fragment>
      <WizardBody hasNoPadding={hasNoBodyPadding}>
        <StepTemplate
          formFields={fields.map((item) => formOptions.renderForm([item], formOptions))}
          name={name}
          title={title}
          description={description}
          formOptions={formOptions}
          showTitles={showTitles}
          showTitle={showTitle}
          customTitle={customTitle}
          hasNoBodyPadding={hasNoBodyPadding}
          formRef={formRef}
          fields={fields}
          {...rest}
        />
      </WizardBody>
      <WizardStepButtons formOptions={formOptions} {...rest} />
    </Fragment>
  );
};

export default WizardStep;
