import { components } from '../../constants';

export const componentMap = {
  DialogFieldTextBox: components.TEXT_FIELD,
  DialogFieldRadioButton: components.RADIO,
  DialogFieldCheckBox: components.CHECKBOX,
  DialogFieldTextAreaBox: components.TEXTAREA_FIELD,
  DialogFieldDropDownList: components.SELECT_COMPONENT,
  DialogFieldDateControl: components.DATE_PICKER,
  DialogFieldDateTimeControl: components.TIME_PICKER,
  DialogFieldTagControl: components.TAG_CONTROL,
};

// for true values
export const neededAttributes = [
  'name',
  'label',
  [ 'label', 'title' ],
  [ 'data_type', 'dataType' ],
  [ 'required', 'isRequired' ],
  [ 'read_only', 'isReadOnly' ],
  [ 'description', 'helperText' ],
];

// for false values
export const neededFalseAttributes = [
  [ 'visible', 'isVisible' ],
];
