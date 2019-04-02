import { components } from '../constants';

const fieldComponents = [
  components.TEXT_FIELD,
  components.TEXTAREA_FIELD,
  components.FIELD_ARRAY,
  components.SELECT_COMPONENT,
  components.FIXED_LIST,
  components.CHECKBOX,
  components.RADIO,
  components.DATE_PICKER,
  components.TIME_PICKER,
  components.TAG_CONTROL,
];

export const shouldWrapInField = componentType => fieldComponents.includes(componentType);

export const composeValidators = (validators = []) => value =>
  validators.reduce(
    (error, validator) => error
      || (typeof validator === 'function'
        ? validator(value)
        : undefined),
    undefined,
  );
