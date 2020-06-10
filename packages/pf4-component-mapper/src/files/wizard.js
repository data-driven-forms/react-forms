import React, { useReducer, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import Wizard, { wizardProps } from '@data-driven-forms/common/src/wizard/wizard';

import { Bullseye, Backdrop, WizardNav, WizardHeader } from '@patternfly/react-core';

import WizardStep from './wizard/wizard-step';
import './wizard/wizard-styles.scss';

import WizardNavigation from './wizard/wizard-nav';
import reducer from './wizard/reducer';

const Modal = ({ children, container, inModal }) =>
  inModal
    ? createPortal(
        <Backdrop>
          <Bullseye>
            <div className="pf-c-modal-box pf-m-lg">{children}</div>
          </Bullseye>
        </Backdrop>,
        container
      )
    : children;

const WizardInternal = ({
  inModal,
  crossroads,
  title,
  description,
  buttonLabels,
  buttonsClassName,
  showTitles,
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
  container,
  hideClose,
  titleId,
  descriptionId,
  closeButtonAriaLabel,
  hasNoBodyPadding,
  prevSteps,
  navAriaLabel,
  ...rest
}) => {
  const [state, dispatch] = useReducer(reducer, { loading: true, container });

  useEffect(() => {
    if (inModal) {
      dispatch({ type: 'setContainer' });
    } else {
      dispatch({ type: 'finishLoading' });
    }
  }, [inModal]);

  useEffect(() => {
    if (state.container) {
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
    <Modal inModal={inModal} container={state.container}>
      <div
        className={`pf-c-wizard ${inModal ? '' : 'no-shadow'}`}
        role="dialog"
        aria-modal={inModal ? 'true' : undefined}
        onKeyDown={onKeyDown}
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
        <div className="pf-c-wizard__outer-wrap">
          <div className="pf-c-wizard__inner-wrap">
            <WizardNav aria-label={navAriaLabel}>
              <FormSpy subscription={{ values: true, valid: true, validating: true }}>
                {({ values, valid, validating }) => (
                  <WizardNavigation
                    navSchema={navSchema}
                    activeStepIndex={activeStepIndex}
                    valid={valid}
                    maxStepIndex={maxStepIndex}
                    jumpToStep={jumpToStep}
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
              {...currentStep}
              formOptions={formOptions}
              buttonLabels={buttonLabels}
              buttonsClassName={buttonsClassName}
              showTitles={showTitles}
              handleNext={(nextStep) => handleNext(nextStep)}
              handlePrev={handlePrev}
              disableBack={activeStepIndex === 0}
              hasNoBodyPadding={hasNoBodyPadding}
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
    next: PropTypes.node.isRequired
  }).isRequired,
  buttonsClassName: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.any,
  isCompactNav: PropTypes.bool,
  inModal: PropTypes.bool,
  setFullWidth: PropTypes.bool,
  setFullHeight: PropTypes.bool,
  isDynamic: PropTypes.bool,
  showTitles: PropTypes.bool,
  crossroads: PropTypes.arrayOf(PropTypes.string),
  hideClose: PropTypes.bool,
  titleId: PropTypes.string,
  descriptionId: PropTypes.string,
  closeButtonAriaLabel: PropTypes.string,
  hasNoBodyPadding: PropTypes.bool,
  navAriaLabel: PropTypes.string,
  ...wizardProps
};

const defaultLabels = {
  submit: 'Submit',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next'
};

const WizardFunction = ({ buttonLabels, ...props }) => (
  <Wizard Wizard={WizardInternal} {...props} buttonLabels={{ ...defaultLabels, ...buttonLabels }} />
);

WizardFunction.propTypes = {
  buttonLabels: PropTypes.shape({
    submit: PropTypes.node,
    cancel: PropTypes.node,
    back: PropTypes.node
  })
};

WizardFunction.defaultProps = {
  buttonLabels: {}
};

export default WizardFunction;
