import React, { cloneElement, useReducer, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useFormApi, FormSpy } from '@data-driven-forms/react-form-renderer';

import { WizardHeader } from '@patternfly/react-core/dist/js/components/Wizard/WizardHeader';
import { WizardNav } from '@patternfly/react-core/dist/js/components/Wizard/WizardNav';
import { Backdrop } from '@patternfly/react-core/dist/js/components/Backdrop/Backdrop';
import { Bullseye } from '@patternfly/react-core/dist/js/layouts/Bullseye/index';

import WizardStep from './wizard/wizard-step';
import './wizard/wizard-styles.scss';
import get from 'lodash/get';
import set from 'lodash/set';
import flattenDeep from 'lodash/flattenDeep';
import handleEnter from '@data-driven-forms/common/src/wizard/enter-handler';
import WizardNavigation from './wizard/wizard-nav';
import reducer, { DYNAMIC_WIZARD_TYPES, findCurrentStep } from './wizard/reducer';

const Modal = ({ children, container, inModal }) =>
  inModal
    ? createPortal(
        <Backdrop>
          <Bullseye>{children}</Bullseye>
        </Backdrop>,
        container
      )
    : children;

const Wizard = ({
  fields,
  isDynamic,
  inModal,
  crossroads,
  predictSteps,
  title,
  description,
  buttonLabels,
  buttonsClassName,
  setFullWidth,
  setFullHeight,
  isCompactNav,
  showTitles
}) => {
  const formOptions = useFormApi();

  const [state, dispatch] = useReducer(reducer, {
    activeStep: fields[0].name,
    prevSteps: [],
    activeStepIndex: 0,
    maxStepIndex: 0,
    isDynamic: isDynamic || fields.some(({ nextStep }) => DYNAMIC_WIZARD_TYPES.includes(typeof nextStep)),
    loading: true
  });

  useEffect(() => {
    if (inModal) {
      dispatch({ type: 'setContainer' });
    } else {
      dispatch({ type: 'finishLoading', payload: { formOptions, fields, predictSteps } });
    }
  }, [inModal, formOptions, fields, predictSteps]);

  useEffect(() => {
    if (state.container) {
      document.body.appendChild(state.container);
      dispatch({ type: 'finishLoading', payload: { formOptions, fields, predictSteps } });
    }

    return () => {
      if (inModal && state.container) {
        document.body.removeChild(state.container);
      }
    };
  }, [state.container, formOptions, fields, predictSteps, inModal]);

  if (state.loading) {
    return null;
  }

  const prepareValues = (values, visitedSteps, getRegisteredFields) => {
    // Add the final step fields to history
    const finalRegisteredFieldsHistory = {
      ...state.registeredFieldsHistory,
      [state.activeStep]: getRegisteredFields()
    };

    const finalObject = {};

    // Find only visited fields
    flattenDeep(
      Object.values([...visitedSteps, state.activeStep].reduce((obj, key) => ({ ...obj, [key]: finalRegisteredFieldsHistory[key] }), {}))
    ).forEach((key) => set(finalObject, key, get(values, key)));

    return finalObject;
  };

  const handleSubmit = () =>
    formOptions.onSubmit(
      prepareValues(formOptions.getState().values, [...state.prevSteps, state.activeStep], formOptions.getRegisteredFields),
      formOptions
    );

  const currentStep = (
    <WizardStep
      {...findCurrentStep(state.activeStep, fields)}
      formOptions={{
        ...formOptions,
        handleSubmit
      }}
      buttonLabels={buttonLabels}
      buttonsClassName={buttonsClassName}
      showTitles={showTitles}
    />
  );

  const jumpToStep = (index, valid) => dispatch({ type: 'jumpToStep', payload: { index, valid, fields, predictSteps, crossroads, formOptions } });

  const handlePrev = () => jumpToStep(state.activeStepIndex - 1);

  const handleNext = (nextStep) => dispatch({ type: 'handleNext', payload: { nextStep, formOptions, fields, predictSteps } });

  const setPrevSteps = () => dispatch({ type: 'setPrevSteps', payload: { formOptions, fields, predictSteps } });

  const findCurrentStepWrapped = (step) => findCurrentStep(step, fields);

  return (
    <Modal inModal={inModal} container={state.container}>
      <div
        className={`pf-c-wizard ${inModal ? '' : 'no-shadow'} ${isCompactNav ? 'pf-m-compact-nav' : ''} ${setFullWidth ? 'pf-m-full-width' : ''} ${
          setFullHeight ? 'pf-m-full-height' : ''
        }`}
        role="dialog"
        aria-modal={inModal ? 'true' : undefined}
        onKeyDown={(e) => handleEnter(e, formOptions, state.activeStep, findCurrentStepWrapped, handleNext, handleSubmit)}
      >
        {title && <WizardHeader title={title} description={description} onClose={() => formOptions.onCancel(formOptions.getState().values)} />}
        <div className="pf-c-wizard__outer-wrap">
          <WizardNav>
            <FormSpy>
              {({ values }) => (
                <WizardNavigation
                  navSchema={state.navSchema}
                  activeStepIndex={state.activeStepIndex}
                  formOptions={formOptions}
                  maxStepIndex={state.maxStepIndex}
                  jumpToStep={jumpToStep}
                  crossroads={crossroads}
                  isDynamic={state.isDynamic}
                  values={values}
                  setPrevSteps={setPrevSteps}
                />
              )}
            </FormSpy>
          </WizardNav>
          {cloneElement(currentStep, {
            handleNext: (nextStep) => handleNext(nextStep),
            handlePrev,
            disableBack: state.activeStepIndex === 0
          })}
        </div>
      </div>
    </Modal>
  );
};

Wizard.propTypes = {
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
  predictSteps: PropTypes.bool,
  crossroads: PropTypes.arrayOf(PropTypes.string)
};

const defaultLabels = {
  submit: 'Submit',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next'
};

const WizardFunction = ({ buttonLabels, ...props }) => <Wizard {...props} buttonLabels={{ ...defaultLabels, ...buttonLabels }} />;

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
