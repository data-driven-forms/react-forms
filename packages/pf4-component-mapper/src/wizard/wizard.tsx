import React, { useReducer, useEffect, useContext, ReactNode, useMemo } from 'react';
import { Field, FormSpy, WizardContext } from '@data-driven-forms/react-form-renderer';
import Wizard from '@data-driven-forms/common/wizard/wizard';

import { WizardNav, WizardHeader, WizardProps } from '@patternfly/react-core';
import { Modal as PF4Modal } from '@patternfly/react-core/deprecated';

import WizardStep from './wizard-components/wizard-step';
import './wizard-components/wizard-styles.css';

import WizardNavigation from './wizard-components/wizard-nav';
import reducer from './wizard-components/reducer';
import WizardToggle from './wizard-components/wizard-toggle';
import { isPFNavSchema } from '../types';

interface ModalProps {
  children: ReactNode;
  container?: HTMLDivElement;
  inModal?: boolean;
  [key: string]: any;
}

const Modal: React.FC<ModalProps> = ({ children, container, inModal, ...rest }) =>
  inModal ? (
    <PF4Modal variant="large" isOpen showClose={false} hasNoBodyWrapper appendTo={container} {...rest}>
      {children}
    </PF4Modal>
  ) : (
    children
  );

interface WizardInternalProps {
  inModal?: boolean;
  title?: string;
  description?: string;
  buttonLabels?: any;
  buttonsClassName?: string;
  showTitles?: boolean;
  container?: HTMLDivElement;
  hideClose?: boolean;
  titleId?: string;
  descriptionId?: string;
  closeButtonAriaLabel?: string;
  hasNoBodyPadding?: boolean;
  navAriaLabel?: string;
  StepTemplate?: React.ComponentType<any>;
  className?: string;
  conditionalSubmitFlag?: any;
  ModalProps?: any;
  [key: string]: any;
}

const WizardInternal: React.FC<WizardInternalProps> = ({
  inModal,
  title,
  description,
  buttonLabels,
  buttonsClassName,
  showTitles,
  container,
  hideClose,
  titleId,
  descriptionId,
  closeButtonAriaLabel,
  hasNoBodyPadding,
  navAriaLabel,
  StepTemplate,
  className,
  conditionalSubmitFlag,
  ModalProps = {},
  ...rest
}) => {
  const {
    crossroads,
    formOptions,
    currentStep,
    handlePrev,
    onKeyDown,
    jumpToStep,
    setPrevSteps,
    handleNext,
    navSchema,
    activeStepIndex,
    maxStepIndex,
    isDynamic,
  } = useContext(WizardContext);
  const [state, dispatch] = useReducer(reducer, { loading: true, container, openNav: false });

  useEffect(() => {
    if (inModal) {
      dispatch({ type: 'setContainer' });
    } else {
      dispatch({ type: 'finishLoading' });
    }
  }, [inModal]);

  useEffect(() => {
    if (ModalProps.appendTo) {
      // override with default append to
      dispatch({ type: 'finishLoading' });
    } else if (state.container) {
      document.body.appendChild(state.container);
      dispatch({ type: 'finishLoading' });
    }

    return () => {
      if (inModal && state.container) {
        document.body.removeChild(state.container);
      }
    };
  }, [state.container, inModal]);

  const isValidNavSchema = useMemo(() => isPFNavSchema(navSchema), [navSchema]);

  if (!isValidNavSchema) {
    throw new Error(
      'Invalid navigation schema provided to PF Wizard. Please ensure navSchema is an array of objects with name, index, and title properties.'
    );
  }

  if (state.loading) {
    return null;
  }

  const isProgressAfterSubmissionStep = currentStep?.isProgressAfterSubmissionStep;

  return (
    <Modal
      inModal={inModal}
      container={state.container}
      aria-labelledby={rest.name}
      {...ModalProps}
      className={inModal ? `pf-v6-c-form${ModalProps.className || ''}` : ModalProps.className}
    >
      <div
        tabIndex={inModal ? 0 : undefined}
        className={`pf-v6-c-wizard ${inModal ? '' : 'no-shadow'} ddorg__pf4-component-mapper__wizard ${className ? className : ''}`}
        role="dialog"
        aria-modal={inModal ? 'true' : undefined}
        onKeyDown={(e: React.KeyboardEvent) => {
          onKeyDown(e);
          if (e.key === 'Escape' && inModal) {
            formOptions.onCancel(formOptions.getState().values);
          }
        }}
        {...rest}
      >
        {title && (
          <WizardHeader
            title={title}
            description={description}
            onClose={formOptions.onCancel}
            isCloseHidden={hideClose}
            titleId={titleId}
            descriptionId={descriptionId}
            closeButtonAriaLabel={closeButtonAriaLabel}
          />
        )}
        {isProgressAfterSubmissionStep ? (
          currentStep?.fields.map((item: any) => formOptions.renderForm([item]))
        ) : (
          <>
            <WizardToggle
              activeStepIndex={activeStepIndex}
              currentStep={currentStep}
              // we have a typeguard for navSchema above, typecast to any is safe
              navSchema={navSchema as any}
              isOpen={state.openNav}
              dispatch={dispatch}
            />
            <div className="pf-v6-c-wizard__outer-wrap">
              <div className="pf-v6-c-wizard__inner-wrap">
                <WizardNav aria-label={navAriaLabel} isExpanded={state.openNav}>
                  <FormSpy subscription={{ values: true, valid: true, validating: true }}>
                    {({ values, valid, validating }) => (
                      <WizardNavigation
                        // we have a typeguard for navSchema above, typecast to any is safe
                        navSchema={navSchema as any}
                        activeStepIndex={activeStepIndex}
                        valid={valid}
                        maxStepIndex={maxStepIndex}
                        jumpToStep={(...args: any[]) => {
                          state.openNav && dispatch({ type: 'closeNav' });
                          return jumpToStep(...args);
                        }}
                        crossroads={crossroads}
                        isDynamic={isDynamic}
                        values={values}
                        setPrevSteps={setPrevSteps}
                        validating={validating}
                      />
                    )}
                  </FormSpy>
                </WizardNav>
                <WizardStep
                  conditionalSubmitFlag={conditionalSubmitFlag}
                  buttonLabels={buttonLabels}
                  buttonsClassName={buttonsClassName}
                  showTitles={showTitles}
                  hasNoBodyPadding={hasNoBodyPadding}
                  StepTemplate={StepTemplate}
                  {...currentStep}
                  formOptions={formOptions}
                  handleNext={(nextStep: any) => handleNext(nextStep)}
                  handlePrev={handlePrev}
                  disableBack={activeStepIndex === 0}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const defaultLabels = {
  submit: 'Submit',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
};

interface WizardFunctionProps extends WizardProps {
  buttonLabels?: any;
  fields: Field[];
  [key: string]: any;
}

const WizardFunction: React.FC<WizardFunctionProps> = ({ buttonLabels = {}, ...props }) => (
  <Wizard Wizard={WizardInternal} {...props} buttonLabels={{ ...defaultLabels, ...buttonLabels }} />
);

export default WizardFunction;
