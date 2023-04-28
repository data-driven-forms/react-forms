import get from 'lodash/get';

const selectNext = (nextStep, getState) => {
  if (typeof nextStep === 'string') {
    return nextStep;
  }

  if (typeof nextStep === 'function') {
    return nextStep({ values: getState().values });
  }

  const selectedValue = get(getState().values, nextStep.when);

  return nextStep.stepMapper[selectedValue];
};

export default selectNext;
