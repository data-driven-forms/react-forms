export type ComponentType = 'text-field'|'field-array'|'checkbox'|'sub-form'|'radio'|'tabs'|'tab-item'|'date-picker'|'time-picker'|'wizard'|'switch'|'textarea'|'select'|'plain-text'|'button'|'input-addon-group'|'input-addon-button-group'|'dual-list-select'|'slider';

interface IcomponentTypes {
  TEXT_FIELD: 'text-field';
  FIELD_ARRAY: 'field-array';
  CHECKBOX: 'checkbox';
  SUB_FORM: 'sub-form';
  RADIO: 'radio';
  TABS: 'tabs';
  TAB_ITEM: 'tab-item';
  DATE_PICKER: 'date-picker';
  TIME_PICKER: 'time-picker';
  WIZARD: 'wizard';
  SWITCH: 'switch';
  TEXTAREA: 'textarea';
  SELECT: 'select';
  PLAIN_TEXT: 'plain-text';
  BUTTON: 'button';
  INPUT_ADDON_GROUP: 'input-addon-group';
  INPUT_ADDON_BUTTON_GROUP: 'input-addon-button-group';
  DUAL_LIST_SELECT: 'dual-list-select';
  SLIDER: 'slider';
}

declare const componentTypes: IcomponentTypes;

export default componentTypes;
