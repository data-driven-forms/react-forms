import React, { useReducer, useEffect } from 'react';
import { useFormApi, WizardContext } from '@data-driven-forms/react-form-renderer';

import get from 'lodash/get';
import set from 'lodash/set';
import flattenDeep from 'lodash/flattenDeep';
import handleEnter from './enter-handler';
import reducer, { DYNAMIC_WIZARD_TYPES, findCurrentStep } from './reducer';
import selectNext from './select-next';
import { CONDITIONAL_SUBMIT_FLAG } from './consts';

const Wizard = ({ fields, isDynamic, crossroads, Wizard, component, initialState, conditionalSubmitFlag = CONDITIONAL_SUBMIT_FLAG, ...props }) => {
  const formOptions = useFormApi();

  const [state, dispatch] = useReducer(reducer, {
    activeStep: fields[0].name,
    prevSteps: [],
    activeStepIndex: 0,
    maxStepIndex: 0,
    ...initialState,
    isDynamic: isDynamic || fields.some(({ nextStep }) => DYNAMIC_WIZARD_TYPES.includes(typeof nextStep)),
    loading: true,
  });

  useEffect(() => {
    dispatch({ type: 'finishLoading', payload: { formOptions, fields } });
  }, [fields]);

  if (state.loading) {
    return null;
  }

  const prepareValues = (values, visitedSteps, getRegisteredFields) => {
    // Add the final step fields to history
    const finalRegisteredFieldsHistory = {
      ...state.registeredFieldsHistory,
      [state.activeStep]: getRegisteredFields(),
    };

    const finalObject = {};

    // Find only visited fields
    flattenDeep(
      Object.values([...visitedSteps, state.activeStep].reduce((obj, key) => ({ ...obj, [key]: finalRegisteredFieldsHistory[key] }), {}))
    ).forEach((key) => set(finalObject, key, get(values, key)));

    return finalObject;
  };

  const onCancel = () => formOptions.onCancel(state);

  const handleSubmit = () =>
    formOptions.onSubmit(
      prepareValues(formOptions.getState().values, [...state.prevSteps, state.activeStep], formOptions.getRegisteredFields),
      formOptions,
      state
    );

  const jumpToStep = (index, valid) => dispatch({ type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } });

  const handlePrev = () => jumpToStep(state.activeStepIndex - 1);

  const handleNext = (nextStep) => dispatch({ type: 'handleNext', payload: { nextStep, formOptions, fields } });

  const setPrevSteps = () => dispatch({ type: 'setPrevSteps', payload: { formOptions, fields } });

  const findCurrentStepWrapped = (step) => findCurrentStep(step, fields);

  const onKeyDown = (e) => handleEnter(e, formOptions, state.activeStep, findCurrentStepWrapped, handleNext, handleSubmit);

  return (
    <WizardContext.Provider
      value={{
        handleNext,
        onKeyDown,
        setPrevSteps,
        currentStep: findCurrentStep(state.activeStep, fields),
        jumpToStep,
        handlePrev,
        formOptions: {
          ...formOptions,
          onCancel,
          handleSubmit,
        },
        navSchema: state.navSchema,
        activeStepIndex: state.activeStepIndex,
        maxStepIndex: state.maxStepIndex,
        isDynamic: state.isDynamic,
        crossroads,
        prevSteps: state.prevSteps,
        selectNext,
      }}
    >
      <Wizard conditionalSubmitFlag={conditionalSubmitFlag} {...props} />
    </WizardContext.Provider>
  );
};

export default Wizard;
