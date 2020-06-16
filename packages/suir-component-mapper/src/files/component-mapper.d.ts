import { ComponentTypes } from '@data-driven-forms/react-form-renderer';

interface Components  {
  TextField: React.ComponentType;
  Textarea: React.ComponentType;
  Select: React.ComponentType;
  Checkbox: React.ComponentType;
  Radio: React.ComponentType;
  Switch: React.ComponentType;
  DatePicker: React.ComponentType;
  TimePicker: React.ComponentType;
  PlainText: React.ComponentType;
  SubForm: React.ComponentType;
  Wizard: React.ComponentType;
  DualListSelect: React.ComponentType;
  Slider: React.ComponentType;
}

interface componentMapper  {
  [ComponentTypes.TEXT_FIELD]: React.ComponentType;
  [ComponentTypes.TEXTAREA]: React.ComponentType;
  [ComponentTypes.SELECT]: React.ComponentType;
  [ComponentTypes.CHECKBOX]: React.ComponentType;
  [ComponentTypes.SUB_FORM]: React.ComponentType;
  [ComponentTypes.RADIO]: React.ComponentType;
  [ComponentTypes.TABS]: React.ComponentType;
  [ComponentTypes.DATE_PICKER]: React.ComponentType;
  [ComponentTypes.TIME_PICKER]: React.ComponentType;
  [ComponentTypes.SWITCH]: React.ComponentType;
  [ComponentTypes.PLAIN_TEXT]: React.ComponentType;
  [ComponentTypes.WIZARD]: React.ComponentType;
  [ComponentTypes.FIELD_ARRAY]: React.ComponentType;
  [ComponentTypes.DUAL_LIST_SELECT]: React.ComponentType;
  [ComponentTypes.SLIDER]: React.ComponentType;
}

interface RawComponents {
  RawSelect: React.ComponentType;
}

export const rawComponents: RawComponents;

declare const componentMapper: componentMapper;

export const components: Components;

export default componentMapper;
