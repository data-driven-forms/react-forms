import componentTypes from '../components/component-types';

const fieldComponents = [
  componentTypes.TEXT_FIELD,
  componentTypes.TEXTAREA_FIELD,
  componentTypes.FIELD_ARRAY,
  componentTypes.SELECT_COMPONENT,
  componentTypes.CHECKBOX,
  componentTypes.RADIO,
  componentTypes.DATE_PICKER,
  componentTypes.TIME_PICKER,
];

export const shouldWrapInField = componentType => fieldComponents.includes(componentType);
