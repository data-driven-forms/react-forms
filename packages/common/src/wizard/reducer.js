import get from 'lodash/get';

export const DYNAMIC_WIZARD_TYPES = ['function', 'object'];

const createSchema = ({ formOptions, fields }) => {
  const { values } = formOptions.getState();
  let schema = [];
  let field = fields[0]; // find first wizard step
  let index = -1;

  while (field) {
    index += 1;
    schema = [
      ...schema,
      {
        name: field.name,
        title: field.title,
        substepOf: field.substepOf?.name || field.substepOf,
        substepOfTitle:
          (field.substepOf === schema[schema.length - 1]?.substepOf && schema[schema.length - 1]?.substepOfTitle) ||
          field.substepOf?.title ||
          field.substepOf,
        index,
        primary: !schema[schema.length - 1] || !field.substepOf || field.substepOf !== schema[schema.length - 1].substepOf
      }
    ];

    let nextStep = field.nextStep;

    if (typeof field.nextStep === 'object') {
      nextStep = nextStep.stepMapper[get(values, nextStep.when)];
    }

    if (typeof field.nextStep === 'function') {
      nextStep = field.nextStep({ values });
    }

    if (nextStep) {
      field = fields.find(({ name }) => name === nextStep);
    } else {
      field = undefined;
    }
  }

  return schema;
};

const handleNext = (state, nextStep, formOptions, fields) => {
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
          formOptions
        })
      : state.navSchema
  };
};

export const findCurrentStep = (activeStep, fields) => fields.find(({ name }) => name === activeStep);

const jumpToStep = (state, index, valid, fields, crossroads, formOptions) => {
  if (index === state.activeStepIndex) {
    return state;
  }

  const clickOnPreviousStep = state.prevSteps[index];

  if (clickOnPreviousStep) {
    let originalActiveStep;

    const includeActiveStep = state.prevSteps.includes(state.activeStep, fields);
    originalActiveStep = state.activeStep;

    const newState = {
      ...state,
      activeStep: state.prevSteps[index],
      prevSteps: includeActiveStep ? state.prevSteps : [...state.prevSteps, state.activeStep],
      activeStepIndex: index
    };

    const INDEXING_BY_ZERO = 1;

    const currentStep = findCurrentStep(newState.prevSteps[index], fields);

    const currentStepHasStepMapper = DYNAMIC_WIZARD_TYPES.includes(typeof currentStep.nextStep);

    const hardcodedCrossroads = crossroads;
    const dynamicStepShouldDisableNav = newState.isDynamic && currentStepHasStepMapper;

    const invalidStepShouldDisableNav = valid === false;

    let updatedState = {
      ...newState
    };

    if (dynamicStepShouldDisableNav && !hardcodedCrossroads) {
      updatedState = {
        ...updatedState,
        navSchema: createSchema({
          formOptions,
          fields
        }),
        prevSteps: newState.prevSteps.slice(0, index),
        maxStepIndex: index
      };
    } else if (currentStep.disableForwardJumping) {
      updatedState = {
        ...updatedState,
        prevSteps: newState.prevSteps.slice(0, index),
        maxStepIndex: index
      };
    } else if (invalidStepShouldDisableNav) {
      const indexOfCurrentStep = newState.prevSteps.indexOf(originalActiveStep);

      updatedState = {
        ...updatedState,
        prevSteps: newState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO),
        maxStepIndex: newState.prevSteps.slice(0, indexOfCurrentStep + INDEXING_BY_ZERO).length - INDEXING_BY_ZERO
      };
    }

    return updatedState;
  }
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'finishLoading':
      return {
        ...state,
        loading: false,
        navSchema: createSchema({
          fields: payload.fields,
          formOptions: payload.formOptions
        })
      };
    case 'handleNext':
      return handleNext(state, payload.nextStep, payload.formOptions, payload.fields);
    case 'setPrevSteps':
      return {
        ...state,
        prevSteps: state.prevSteps.slice(0, state.activeStepIndex),
        maxStepIndex: state.activeStepIndex,
        navSchema: createSchema({
          fields: payload.fields,
          formOptions: payload.formOptions
        })
      };
    case 'jumpToStep':
      return jumpToStep(state, payload.index, payload.valid, payload.fields, payload.crossroads, payload.formOptions);
    default:
      return state;
  }
};

export default reducer;
