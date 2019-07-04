import React from 'react';
import Tabs from './tabs';
import SubForm from './sub-form';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import {
  TextField,
  TextAreaField,
  CheckboxField,
  RadioField,
  SelectField,
  DatePickerField,
  TimePickerField,
  SwitchField,
} from './form-fields';
import Wizard from './wizard/wizard';
import { Select } from './select/select';

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA_FIELD]: TextAreaField,
  [componentTypes.SELECT_COMPONENT]: SelectField,
  [componentTypes.CHECKBOX]: CheckboxField,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: RadioField,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePickerField,
  [componentTypes.TIME_PICKER]: TimePickerField,
  [componentTypes.TAG_CONTROL]: props => <div>Unsupported tag control</div>,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.SWITCH]: SwitchField,
};

export default mapper;

export const components = {
  TextField,
  TextAreaField,
  CheckboxField,
  RadioField,
  SelectField,
  DatePickerField,
  TimePickerField,
  SwitchField,
};

export const rawComponents = {
  Select,
};
