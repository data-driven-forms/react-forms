import React, { useReducer, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormSpy, WizardContext } from '@data-driven-forms/react-form-renderer';
import Wizard from '@data-driven-forms/common/wizard/wizard';

import { WizardNav, WizardHeader, Modal as PF4Modal } from '@patternfly/react-core';

import WizardStep from './wizard-components/wizard-step';
import './wizard-components/wizard-styles.css';

import WizardNavigation from './wizard-components/wizard-nav';
import reducer from './wizard-components/reducer';
import WizardToggle from './wizard-components/wizard-toggle';

const Modal = ({ children, container, inModal, ...rest }) =>
  inModal ? (
    <PF4Modal variant="large" isOpen showClose={false} hasNoBodyWrapper appendTo={container} {...rest}>
      {children}
    </PF4Modal>
  ) : (
    children
  );

Modal.propTypes = {
  children: PropTypes.node,
  container: PropTypes.instanceOf(Element),
  inModal: PropTypes.bool,
};

const WizardInternal = ({
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

  if (state.loading) {
    return null;
  }

  return (
    <Modal inModal={inModal} container={state.container} aria-labelledby={rest.name} {...ModalProps}>
      <div
        tabIndex={inModal ? 0 : null}
        className={`pf-v5-c-wizard ${inModal ? '' : 'no-shadow'} ddorg__pf4-component-mapper__wizard ${className ? className : ''}`}
        role="dialog"
        aria-modal={inModal ? 'true' : undefined}
        onKeyDown={(e) => {
          onKeyDown(e);
          if (e.key === 'Escape' && inModal) {
            formOptions.onCancel();
          }
        }}
        {...rest}
      >
        {title && (
          <WizardHeader
            title={title}
            description={description}
            onClose={formOptions.onCancel}
            hideClose={hideClose}
            titleId={titleId}
            descriptionId={descriptionId}
            closeButtonAriaLabel={closeButtonAriaLabel}
          />
        )}
        <WizardToggle activeStepIndex={activeStepIndex} currentStep={currentStep} navSchema={navSchema} isOpen={state.openNav} dispatch={dispatch} />
        <div className="pf-v5-c-wizard__outer-wrap">
          <div className="pf-v5-c-wizard__inner-wrap">
            <WizardNav aria-label={navAriaLabel} isOpen={state.openNav}>
              <FormSpy subscription={{ values: true, valid: true, validating: true }}>
                {({ values, valid, validating }) => (
                  <WizardNavigation
                    navSchema={navSchema}
                    activeStepIndex={activeStepIndex}
                    valid={valid}
                    maxStepIndex={maxStepIndex}
                    jumpToStep={(...args) => {
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
              handleNext={(nextStep) => handleNext(nextStep)}
              handlePrev={handlePrev}
              disableBack={activeStepIndex === 0}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

WizardInternal.propTypes = {
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node.isRequired,
    cancel: PropTypes.node.isRequired,
    back: PropTypes.node.isRequired,
    next: PropTypes.node.isRequired,
  }).isRequired,
  buttonsClassName: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.any,
  inModal: PropTypes.bool,
  showTitles: PropTypes.bool,
  hideClose: PropTypes.bool,
  titleId: PropTypes.string,
  descriptionId: PropTypes.string,
  closeButtonAriaLabel: PropTypes.string,
  hasNoBodyPadding: PropTypes.bool,
  navAriaLabel: PropTypes.string,
  container: PropTypes.instanceOf(Element),
  StepTemplate: PropTypes.elementType,
  className: PropTypes.string,
  conditionalSubmitFlag: PropTypes.string,
  ModalProps: PropTypes.object,
};

const defaultLabels = {
  submit: 'Submit',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
};

const WizardFunction = ({ buttonLabels, ...props }) => (
  <Wizard Wizard={WizardInternal} {...props} buttonLabels={{ ...defaultLabels, ...buttonLabels }} />
);

WizardFunction.propTypes = {
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node,
    cancel: PropTypes.node,
    back: PropTypes.node,
  }),
};

WizardFunction.defaultProps = {
  buttonLabels: {},
};

export default WizardFunction;
