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

const DYNAMIC_WIZARD_TYPES = ['function', 'object'];

const Modal = ({ children, container, inModal }) =>
  inModal
    ? createPortal(
      <Backdrop>
        <Bullseye>{children}</Bullseye>
      </Backdrop>,
      container
    )
    : children;

const reducer = (state, payload) => ({ ...state, ...payload });

const createSchema = ({ currentIndex, isDynamic, formOptions, predictSteps, fields }) => {
  const { values } = formOptions.getState();
  let schema = [];
  let field = fields.find(({ stepKey }) => stepKey === 1 || stepKey === '1'); // find first wizard step
  let index = -1;

  while (field) {
    index += 1;
    schema = [
      ...schema,
      {
        title: field.title,
        substepOf: field.substepOf,
        index,
        primary: !schema[schema.length - 1] || !field.substepOf || field.substepOf !== schema[schema.length - 1].substepOf
      }
    ];

    if (isDynamic && !predictSteps && currentIndex === index) {
      break;
    }

    let nextStep = field.nextStep;

    if (typeof field.nextStep === 'object') {
      nextStep = nextStep.stepMapper[get(values, nextStep.when)];
    }

    if (typeof field.nextStep === 'function') {
      nextStep = field.nextStep({ values });
    }

    if (nextStep) {
      field = fields.find(({ stepKey }) => stepKey === nextStep);
    } else {
      field = undefined;
    }
  }

  return schema;
};

const Wizard = ({
  fields,
  isDynamic,
  inModal,
  crossroads,
  predictSteps,
  title,
  description,
  FieldProvider,
  buttonLabels,
  buttonsClassName,
  setFullWidth,
  setFullHeight,
  isCompactNav,
  showTitles,
  FormSpyProvider
}) => {
  const formOptions = useFormApi();

  const [state, setState] = useReducer(reducer, {
    activeStep: fields[0].stepKey,
    prevSteps: [],
    activeStepIndex: 0,
    maxStepIndex: 0,
    isDynamic: isDynamic || fields.some(({ nextStep }) => DYNAMIC_WIZARD_TYPES.includes(typeof nextStep)),
    loading: true
  });

  const createSchemaInner = ({ currentIndex }) =>
    createSchema({
      currentIndex,
      isDynamic: state.isDynamic,
      formOptions,
      predictSteps,
      fields
    });

  useEffect(() => {
    if (inModal) {
      setState({ container: document.createElement('div') });
    } else {
      setState({
        loading: false,
        navSchema: createSchemaInner({ currentIndex: 0 })
      });
    }

    return () => {
      if (inModal && state.container) {
        document.body.removeChild(state.container);
      }
    };
  }, []);

  useEffect(() => {
    if (state.container) {
      document.body.appendChild(state.container);
      setState({
        loading: false,
        navSchema: createSchemaInner({ currentIndex: 0 })
      });
    }
  }, [state.container]);

  if (state.loading) {
    return null;
  }

  const handleNext = (nextStep, getRegisteredFields) => {
    const newActiveIndex = state.activeStepIndex + 1;
    const shouldInsertStepIntoHistory = state.prevSteps.includes(state.activeStep);

    setState({
      registeredFieldsHistory: { ...state.registeredFieldsHistory, [state.activeStep]: getRegisteredFields() },
      activeStep: nextStep,
      prevSteps: shouldInsertStepIntoHistory ? state.prevSteps : [...state.prevSteps, state.activeStep],
      activeStepIndex: newActiveIndex,
      maxStepIndex: newActiveIndex > state.maxStepIndex ? newActiveIndex : state.maxStepIndex,
      navSchema: state.isDynamic ? createSchemaInner({ currentIndex: newActiveIndex }) : state.navSchema
    });
  };

  const handleSubmit = (values, visitedSteps, getRegisteredFields) => {
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

  const findCurrentStep = (activeStep) => fields.find(({ stepKey }) => stepKey === activeStep);

  const jumpToStep = (index, valid) => {
    const clickOnPreviousStep = state.prevSteps[index];

    if (clickOnPreviousStep) {
      let originalActiveStep;

      const includeActiveStep = state.prevSteps.includes(state.activeStep);
      originalActiveStep = state.activeStep;

      let newState = {
        ...state,
        activeStep: state.prevSteps[index],
        prevSteps: includeActiveStep ? state.prevSteps : [...state.prevSteps, state.activeStep],
        activeStepIndex: index
      };

      const INDEXING_BY_ZERO = 1;

      const currentStep = findCurrentStep(newState.prevSteps[index]);
      const currentStepHasStepMapper = DYNAMIC_WIZARD_TYPES.includes(typeof currentStep.nextStep);

      const hardcodedCrossroads = crossroads;
      const dynamicStepShouldDisableNav = newState.isDynamic && (currentStepHasStepMapper || !predictSteps);

      const invalidStepShouldDisableNav = valid === false;

      if (dynamicStepShouldDisableNav && !hardcodedCrossroads) {
        newState = {
          ...newState,
          navSchema: predictSteps ? createSchemaInner({ currentIndex: index }) : newState.navSchema.slice(0, index + INDEXING_BY_ZERO),
          prevSteps: newState.prevSteps.slice(0, index),
          maxStepIndex: index
        };
      } else if (currentStep.disableForwardJumping) {
        newState = {
          ...newState,
          prevSteps: newState.prevSteps.slice(0, index),
          maxStepIndex: index
        };
      } else if (invalidStepShouldDisableNav) {
        const indexOfCurrentStep = newState.prevSteps.indexOf(originalActiveStep);

        newState = {
          ...newState,
          prevSteps: newState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO),
          maxStepIndex: newState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO).length - INDEXING_BY_ZERO
        };
      }

      setState(newState);
    }
  };

  const handlePrev = () => jumpToStep(state.activeStepIndex - 1);

  const setPrevSteps = () =>
    setState({
      navSchema: createSchemaInner({ currentIndex: state.activeStepIndex }),
      prevSteps: state.prevSteps.slice(0, state.activeStepIndex),
      maxStepIndex: state.activeStepIndex
    });

  const handleSubmitFinal = () =>
    formOptions.onSubmit(
      handleSubmit(formOptions.getState().values, [...state.prevSteps, state.activeStep], formOptions.getRegisteredFields),
      formOptions
    );

  const currentStep = (
    <WizardStep
      {...findCurrentStep(state.activeStep)}
      formOptions={{
        ...formOptions,
        handleSubmit: handleSubmitFinal
      }}
      buttonLabels={buttonLabels}
      FieldProvider={FieldProvider}
      buttonsClassName={buttonsClassName}
      showTitles={showTitles}
    />
  );

  return (
    <Modal inModal={inModal} container={state.container}>
      <div
        className={`pf-c-wizard ${inModal ? '' : 'no-shadow'} ${isCompactNav ? 'pf-m-compact-nav' : ''} ${setFullWidth ? 'pf-m-full-width' : ''} ${
          setFullHeight ? 'pf-m-full-height' : ''
        }`}
        role="dialog"
        aria-modal={inModal ? 'true' : undefined}
        onKeyDown={(e) => handleEnter(e, formOptions, state.activeStep, findCurrentStep, handleNext, handleSubmitFinal)}
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
                  isDynamic={isDynamic}
                  values={values}
                  setPrevSteps={setPrevSteps}
                />
              )}
            </FormSpy>
          </WizardNav>
          {cloneElement(currentStep, {
            handleNext: (nextStep) => handleNext(nextStep, formOptions.getRegisteredFields),
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
  FieldProvider: PropTypes.PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  FormSpyProvider: PropTypes.PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      stepKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
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
