import React, { Fragment, useEffect, useRef, ReactNode } from 'react';
import { Title, WizardBody } from '@patternfly/react-core';
import WizardStepButtons from './step-buttons';

interface RenderTitleProps {
  title: string;
  customTitle?: ReactNode;
}

export const RenderTitle: React.FC<RenderTitleProps> = ({ title, customTitle }) =>
  customTitle ? (
    customTitle
  ) : (
    <Title headingLevel="h1" size="xl">
      {title}
    </Title>
  );

interface DefaultStepTemplateProps {
  formFields: ReactNode[];
  formRef: React.RefObject<HTMLDivElement>;
  title: string;
  customTitle?: ReactNode;
  showTitle?: boolean;
  showTitles?: boolean;
  [key: string]: any;
}

const DefaultStepTemplate: React.FC<DefaultStepTemplateProps> = ({ formFields, formRef, title, customTitle, showTitle, showTitles }) => (
  <div ref={formRef} className="pf-c-form">
    {((showTitles && showTitle !== false) || showTitle) && <RenderTitle title={title} customTitle={customTitle} />}
    {formFields}
  </div>
);

interface WizardStepProps {
  name: string;
  title?: string;
  description?: string;
  fields?: any[];
  formOptions: any;
  showTitles?: boolean;
  showTitle?: boolean;
  customTitle?: ReactNode;
  hasNoBodyPadding?: boolean;
  StepTemplate?: React.ComponentType<any>;
  [key: string]: any;
}

const WizardStep: React.FC<WizardStepProps> = ({
  name,
  title,
  description,
  fields = [],
  formOptions,
  showTitles,
  showTitle,
  customTitle,
  hasNoBodyPadding,
  StepTemplate = DefaultStepTemplate,
  ...rest
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // HACK: I can not pass ref to WizardBody because it is not
    // wrapped by forwardRef. However, the step body (the one that overflows)
    // is the grand parent of the form element.
    const stepBody = formRef.current && (formRef.current.parentNode?.parentNode as HTMLElement);
    stepBody && stepBody.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [name]);

  return (
    <Fragment>
      <WizardBody hasNoPadding={hasNoBodyPadding}>
        <StepTemplate
          formFields={fields.map((item) => formOptions.renderForm([item]))}
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
