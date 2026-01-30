const componentTypes = {
  TEXT_FIELD: 'text-field',
  FIELD_ARRAY: 'field-array',
  CHECKBOX: 'checkbox',
  SUB_FORM: 'sub-form',
  RADIO: 'radio',
  TABS: 'tabs',
  TAB_ITEM: 'tab-item',
  DATE_PICKER: 'date-picker',
  TIME_PICKER: 'time-picker',
  WIZARD: 'wizard',
  SWITCH: 'switch',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  PLAIN_TEXT: 'plain-text',
  BUTTON: 'button',
  INPUT_ADDON_GROUP: 'input-addon-group',
  INPUT_ADDON_BUTTON_GROUP: 'input-addon-button-group',
  DUAL_LIST_SELECT: 'dual-list-select',
  SLIDER: 'slider',
} as const;

export type ComponentType = (typeof componentTypes)[keyof typeof componentTypes];

export default componentTypes;
