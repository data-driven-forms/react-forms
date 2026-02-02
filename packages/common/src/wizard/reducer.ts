import get from 'lodash/get';
import { AnyObject, Field } from '@data-driven-forms/react-form-renderer';
import { NextStep } from './select-next';

export const DYNAMIC_WIZARD_TYPES = ['function', 'object'];

interface SubstepOf {
  name?: string;
  title?: string;
}

export interface WizardField {
  fields?: Field[];
  name: string;
  title?: string;
  substepOf?: string | SubstepOf;
  nextStep?: NextStep;
  disableForwardJumping?: boolean;
  isProgressAfterSubmissionStep?: boolean;
}

export interface NavSchema {
  name: string;
  title?: string;
  substepOf?: string;
  substepOfTitle?: string;
  index: number;
  primary: boolean;
  isProgressAfterSubmissionStep?: boolean;
}

export interface FormOptions {
  getState: () => AnyObject & { values: AnyObject };
  getRegisteredFields: () => AnyObject;
}

export interface WizardState {
  loading?: boolean;
  activeStep: string;
  activeStepIndex: number;
  maxStepIndex: number;
  prevSteps: string[];
  registeredFieldsHistory?: Record<string, AnyObject>;
  navSchema?: NavSchema[];
  isDynamic?: boolean;
}

type WizardAction =
  | {
      type: 'finishLoading';
      payload: {
        fields: WizardField[];
        formOptions: FormOptions;
      };
    }
  | {
      type: 'handleNext';
      payload: {
        nextStep: string;
        formOptions: FormOptions;
        fields: WizardField[];
      };
    }
  | {
      type: 'setPrevSteps';
      payload: {
        fields: WizardField[];
        formOptions: FormOptions;
      };
    }
  | {
      type: 'jumpToStep';
      payload: {
        index: number;
        valid: boolean;
        fields: WizardField[];
        crossroads: string[];
        formOptions: FormOptions;
      };
    };

const createSchema = ({ formOptions, fields }: { formOptions: FormOptions; fields: WizardField[] }): NavSchema[] => {
  const { values } = formOptions.getState();
  let schema: NavSchema[] = [];
  let field: WizardField | undefined = fields[0]; // find first wizard step
  let index = -1;

  while (field) {
    index += 1;
    const substepOf = typeof field.substepOf === 'object' ? field.substepOf.name : field.substepOf;
    const substepOfTitle =
      (field.substepOf === schema[schema.length - 1]?.substepOf && schema[schema.length - 1]?.substepOfTitle) ||
      (typeof field.substepOf === 'object' ? field.substepOf.title : field.substepOf);

    const navSchemaItem: NavSchema = {
      name: field.name,
      title: field.title,
      substepOf,
      substepOfTitle,
      index,
      primary: !schema[schema.length - 1] || !field.substepOf || field.substepOf !== schema[schema.length - 1].substepOf,
    };

    if (field.isProgressAfterSubmissionStep !== undefined) {
      navSchemaItem.isProgressAfterSubmissionStep = field.isProgressAfterSubmissionStep;
    }

    schema = [...schema, navSchemaItem];

    let nextStep: string | undefined = typeof field.nextStep === 'string' ? field.nextStep : undefined;

    if (typeof field.nextStep === 'object' && field.nextStep && 'stepMapper' in field.nextStep) {
      nextStep = field.nextStep.stepMapper[get(values, field.nextStep.when)];
    }

    if (typeof field.nextStep === 'function') {
      const result: string | Promise<string> = field.nextStep({ values });
      nextStep = typeof result === 'string' ? result : undefined;
    }

    if (nextStep) {
      field = fields.find(({ name }: WizardField) => name === nextStep);
    } else {
      field = undefined;
    }
  }

  return schema;
};

const handleNext = (state: WizardState, nextStep: string, formOptions: FormOptions, fields: WizardField[]): WizardState => {
  const newActiveIndex = state.activeStepIndex + 1;
  const shouldInsertStepIntoHistory = state.prevSteps.includes(state.activeStep);

  return {
    ...state,
    registeredFieldsHistory: { ...state.registeredFieldsHistory, [state.activeStep]: formOptions.getRegisteredFields() },
    activeStep: nextStep,
    prevSteps: shouldInsertStepIntoHistory ? state.prevSteps : [...state.prevSteps, state.activeStep],
    activeStepIndex: newActiveIndex,
    maxStepIndex: newActiveIndex > state.maxStepIndex ? newActiveIndex : state.maxStepIndex,
    navSchema: state.isDynamic
      ? createSchema({
          fields,
          formOptions,
        })
      : state.navSchema,
  };
};

export const findCurrentStep = (activeStep: string, fields: WizardField[]): WizardField | undefined =>
  fields.find(({ name }) => name === activeStep);

const jumpToStep = (
  state: WizardState,
  index: number,
  valid: boolean,
  fields: WizardField[],
  crossroads: string[],
  formOptions: FormOptions
): WizardState => {
  if (index === state.activeStepIndex) {
    return state;
  }

  const clickOnPreviousStep = state.prevSteps[index];

  if (!clickOnPreviousStep) {
    return state;
  }

  if (clickOnPreviousStep) {
    let originalActiveStep;

    const includeActiveStep = state.prevSteps.includes(state.activeStep);
    originalActiveStep = state.activeStep;

    const newState = {
      ...state,
      activeStep: state.prevSteps[index],
      prevSteps: includeActiveStep ? state.prevSteps : [...state.prevSteps, state.activeStep],
      activeStepIndex: index,
    };

    const INDEXING_BY_ZERO = 1;

    const currentStep = findCurrentStep(newState.prevSteps[index], fields);

    if (!currentStep) {
      return state;
    }

    const currentStepHasStepMapper = DYNAMIC_WIZARD_TYPES.includes(typeof currentStep.nextStep);

    const hardcodedCrossroads = crossroads;
    const dynamicStepShouldDisableNav = newState.isDynamic && currentStepHasStepMapper;

    const invalidStepShouldDisableNav = valid === false;

    let updatedState = {
      ...newState,
    };

    if (dynamicStepShouldDisableNav && !hardcodedCrossroads) {
      updatedState = {
        ...updatedState,
        navSchema: createSchema({
          formOptions,
          fields,
        }),
        prevSteps: newState.prevSteps.slice(0, index),
        maxStepIndex: index,
      };
    } else if (currentStep.disableForwardJumping) {
      updatedState = {
        ...updatedState,
        prevSteps: newState.prevSteps.slice(0, index),
        maxStepIndex: index,
      };
    } else if (invalidStepShouldDisableNav) {
      const indexOfCurrentStep = newState.prevSteps.indexOf(originalActiveStep);

      updatedState = {
        ...updatedState,
        prevSteps: newState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO),
        maxStepIndex: newState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO).length - INDEXING_BY_ZERO,
      };
    }

    return updatedState;
  }

  return state;
};

const reducer = (state: WizardState, action: WizardAction): WizardState => {
  switch (action.type) {
    case 'finishLoading':
      return {
        ...state,
        loading: false,
        navSchema: createSchema({
          fields: action.payload.fields,
          formOptions: action.payload.formOptions,
        }),
      };
    case 'handleNext':
      return handleNext(state, action.payload.nextStep, action.payload.formOptions, action.payload.fields);
    case 'setPrevSteps':
      return {
        ...state,
        prevSteps: state.prevSteps.slice(0, state.activeStepIndex),
        maxStepIndex: state.activeStepIndex,
        navSchema: createSchema({
          fields: action.payload.fields,
          formOptions: action.payload.formOptions,
        }),
      };
    case 'jumpToStep':
      return jumpToStep(state, action.payload.index, action.payload.valid, action.payload.fields, action.payload.crossroads, action.payload.formOptions);
    default:
      return state;
  }
};

export default reducer;
