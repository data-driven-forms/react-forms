import React, { cloneElement, useReducer, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FormSpy } from '@data-driven-forms/react-form-renderer';
import Wizard from '@data-driven-forms/common/src/wizard/wizard';

import { Bullseye, Backdrop, WizardNav, WizardHeader } from '@patternfly/react-core';

import WizardStep from './wizard/wizard-step';
import './wizard/wizard-styles.scss';

import WizardNavigation from './wizard/wizard-nav';
import reducer from './wizard/reducer';

const Modal = ({ children, container, inModal }) =>
  inModal
    ? createPortal(
        <Backdrop>
          <Bullseye>{children}</Bullseye>
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
  setFullWidth,
  setFullHeight,
  isCompactNav,
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
  isDynamic
}) => {
  const [state, dispatch] = useReducer(reducer, { loading: true });

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

  const step = (
    <WizardStep {...currentStep} formOptions={formOptions} buttonLabels={buttonLabels} buttonsClassName={buttonsClassName} showTitles={showTitles} />
  );

  return (
    <Modal inModal={inModal} container={state.container}>
      <div
        className={`pf-c-wizard ${inModal ? '' : 'no-shadow'} ${isCompactNav ? 'pf-m-compact-nav' : ''} ${setFullWidth ? 'pf-m-full-width' : ''} ${
          setFullHeight ? 'pf-m-full-height' : ''
        }`}
        role="dialog"
        aria-modal={inModal ? 'true' : undefined}
        onKeyDown={onKeyDown}
      >
        {title && <WizardHeader title={title} description={description} onClose={formOptions.onCancel} />}
        <div className="pf-c-wizard__outer-wrap">
          <WizardNav>
            <FormSpy>
              {({ values }) => (
                <WizardNavigation
                  navSchema={navSchema}
                  activeStepIndex={activeStepIndex}
                  formOptions={formOptions}
                  maxStepIndex={maxStepIndex}
                  jumpToStep={jumpToStep}
                  crossroads={crossroads}
                  isDynamic={isDynamic}
                  values={values}
                  setPrevSteps={setPrevSteps}
                />
              )}
            </FormSpy>
          </WizardNav>
          {cloneElement(step, {
            handleNext: (nextStep) => handleNext(nextStep),
            handlePrev,
            disableBack: activeStepIndex === 0
          })}
        </div>
      </div>
    </Modal>
  );
};

WizardInternal.propTypes = {
  buttonLabels: PropTypes.shape({
    submit: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired
  }).isRequired,
  buttonsClassName: PropTypes.string,
  title: PropTypes.any,
  description: PropTypes.any,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  isCompactNav: PropTypes.bool,
  inModal: PropTypes.bool,
  setFullWidth: PropTypes.bool,
  setFullHeight: PropTypes.bool,
  isDynamic: PropTypes.bool,
  showTitles: PropTypes.bool,
  crossroads: PropTypes.arrayOf(PropTypes.string),
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func
  }),
  currentStep: PropTypes.object,
  handlePrev: PropTypes.func,
  onKeyDown: PropTypes.func,
  jumpToStep: PropTypes.func,
  setPrevSteps: PropTypes.func,
  handleNext: PropTypes.func,
  navSchema: PropTypes.array,
  activeStepIndex: PropTypes.number,
  maxStepIndex: PropTypes.number
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
    submit: PropTypes.string,
    cancel: PropTypes.string,
    back: PropTypes.string
  })
};

WizardFunction.defaultProps = {
  buttonLabels: {}
};

export default WizardFunction;
