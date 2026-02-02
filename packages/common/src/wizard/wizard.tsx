import React, { useReducer, useEffect } from 'react';
import { useFormApi, WizardContext, AnyObject, Field } from '@data-driven-forms/react-form-renderer';

import get from 'lodash/get';
import set from 'lodash/set';
import flattenDeep from 'lodash/flattenDeep';
import handleEnter from './enter-handler';
import reducer, { DYNAMIC_WIZARD_TYPES, findCurrentStep, WizardState } from './reducer';
import selectNext from './select-next';
import { CONDITIONAL_SUBMIT_FLAG } from './consts';

export interface WizardProps extends AnyObject {
  fields: Field[];
  isDynamic?: boolean;
  crossroads?: string[];
  Wizard?: React.ComponentType<any>;
  component?: any;
  initialState?: Partial<WizardState>;
  conditionalSubmitFlag?: string;
}

const WizardComponent: React.FC<WizardProps> = ({
  fields,
  isDynamic,
  crossroads,
  Wizard: WizardRenderer,
  component,
  initialState,
  conditionalSubmitFlag = CONDITIONAL_SUBMIT_FLAG,
  ...props
}) => {
  const formOptions = useFormApi();

  const [state, dispatch] = useReducer(reducer, {
    activeStep: fields[0]?.name || '',
    prevSteps: [],
    activeStepIndex: 0,
    maxStepIndex: 0,
    ...initialState,
    isDynamic: isDynamic || fields.some(({ nextStep }) => DYNAMIC_WIZARD_TYPES.includes(typeof nextStep)),
    loading: true,
  });

  useEffect(() => {
    dispatch({ type: 'finishLoading', payload: { formOptions, fields } });
  }, [fields]); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.loading) {
    return null;
  }

  const prepareValues = (values: AnyObject, visitedSteps: string[], getRegisteredFields: () => string[]): AnyObject => {
    // Add the final step fields to history
    const finalRegisteredFieldsHistory = {
      ...state.registeredFieldsHistory,
      [state.activeStep]: getRegisteredFields(),
    };

    const finalObject: AnyObject = {};

    // Find only visited fields
    flattenDeep(
      Object.values([...visitedSteps, state.activeStep].reduce((obj: AnyObject, key: string) => ({ ...obj, [key]: finalRegisteredFieldsHistory[key] }), {}))
    ).forEach((key: string) => set(finalObject, key, get(values, key)));

    return finalObject;
  };

  const onCancel = () => formOptions.onCancel?.(state);

  const handleSubmit = (): Promise<Record<string, any>> => {
    const result = formOptions.onSubmit?.(
      prepareValues(formOptions.getState().values, [...state.prevSteps, state.activeStep], formOptions.getRegisteredFields),
      formOptions,
      state
    );
    // Ensure we always return a Promise of an object
    if (result === undefined || result === null) {
      return Promise.resolve({});
    }
    // Check if result is a Promise
    if (typeof result === 'object' && result && 'then' in result) {
      return (result as Promise<any>).then((res: any) => res || {});
    }
    // Handle non-promise results - cast to any first to avoid TypeScript error
    const safeResult = result as any;
    return Promise.resolve(typeof safeResult === 'object' && safeResult ? safeResult : {});
  };

  const jumpToStep = (index: number, valid?: boolean) =>
    dispatch({ type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } });

  const handlePrev = () => jumpToStep(state.activeStepIndex - 1);

  const handleNext = (nextStep: string) => dispatch({ type: 'handleNext', payload: { nextStep, formOptions, fields } });

  const setPrevSteps = () => dispatch({ type: 'setPrevSteps', payload: { formOptions, fields } });

  const findCurrentStepWrapped = (step: string) => findCurrentStep(step, fields);

  const onKeyDown = (e: KeyboardEvent) => handleEnter(e, formOptions, state.activeStep, findCurrentStepWrapped, handleNext, handleSubmit);

  if (!WizardRenderer) {
    return null;
  }

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
        crossroads: crossroads,
        prevSteps: state.prevSteps,
        selectNext,
      }}
    >
      <WizardRenderer conditionalSubmitFlag={conditionalSubmitFlag} {...props} />
    </WizardContext.Provider>
  );
};

export const wizardProps: AnyObject = {};
export default WizardComponent;
