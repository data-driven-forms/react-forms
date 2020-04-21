import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import get from 'lodash/get';
import set from 'lodash/set';
import flattenDeep from 'lodash/flattenDeep';
import handleEnter from './enter-handler';
import reducer, { DYNAMIC_WIZARD_TYPES, findCurrentStep } from './reducer';

const Wizard = ({ fields, isDynamic, crossroads, Wizard, component, ...props }) => {
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
    dispatch({ type: 'finishLoading', payload: { formOptions, fields } });
  }, [fields]);

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

  const jumpToStep = (index, valid) => dispatch({ type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } });

  const handlePrev = () => jumpToStep(state.activeStepIndex - 1);

  const handleNext = (nextStep) => dispatch({ type: 'handleNext', payload: { nextStep, formOptions, fields } });

  const setPrevSteps = () => dispatch({ type: 'setPrevSteps', payload: { formOptions, fields } });

  const findCurrentStepWrapped = (step) => findCurrentStep(step, fields);

  const onKeyDown = (e) => handleEnter(e, formOptions, state.activeStep, findCurrentStepWrapped, handleNext, handleSubmit);

  return (
    <Wizard
      {...props}
      handleNext={handleNext}
      onKeyDown={onKeyDown}
      setPrevSteps={setPrevSteps}
      currentStep={findCurrentStep(state.activeStep, fields)}
      jumpToStep={jumpToStep}
      handlePrev={handlePrev}
      formOptions={{
        ...formOptions,
        handleSubmit
      }}
      navSchema={state.navSchema}
      activeStepIndex={state.activeStepIndex}
      maxStepIndex={state.maxStepIndex}
      isDynamic={state.isDynamic}
      crossroads={crossroads}
      prevSteps={state.prevSteps}
    />
  );
};

Wizard.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  isDynamic: PropTypes.bool,
  crossroads: PropTypes.arrayOf(PropTypes.string),
  Wizard: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.any
};

export default Wizard;

export const wizardProps = {
  currentStep: PropTypes.object,
  handlePrev: PropTypes.func,
  onKeyDown: PropTypes.func,
  jumpToStep: PropTypes.func,
  setPrevSteps: PropTypes.func,
  handleNext: PropTypes.func,
  navSchema: PropTypes.array,
  activeStepIndex: PropTypes.number,
  maxStepIndex: PropTypes.number,
  formOptions: PropTypes.shape({
    onCancel: PropTypes.func
  }),
  prevSteps: PropTypes.array
};
