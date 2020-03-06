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
  PlainTextField,
} from './form-fields';
import Wizard from './wizard/wizard';
import { Select } from './select/select';
import FieldArray from './fieldArray/index';
import DualListSelect from './dual-list-select';

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
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.SWITCH]: SwitchField,
  [componentTypes.PLAIN_TEXT]: PlainTextField,
  [componentTypes.FIELD_ARRAY]: FieldArray,
  'dual-list-select': DualListSelect,
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
  PlainTextField,
  DualListSelect,
};

export const rawComponents = {
  Select,
};
