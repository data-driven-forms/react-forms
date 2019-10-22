import { components } from '../constants';

const fieldComponents = [
  components.TEXT_FIELD,
  components.TEXTAREA_FIELD,
  components.FIELD_ARRAY,
  components.SELECT_COMPONENT,
  components.CHECKBOX,
  components.RADIO,
  components.DATE_PICKER,
  components.TIME_PICKER,
];

export const shouldWrapInField = componentType => fieldComponents.includes(componentType);

export const composeValidators = (validators = []) => (value, allValues) =>
  validators.reduce(
    (error, validator) => error
      || (typeof validator === 'function'
        ? validator(value, allValues)
        : undefined),
    undefined,
  );
