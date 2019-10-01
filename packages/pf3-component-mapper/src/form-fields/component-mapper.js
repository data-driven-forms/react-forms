import React from 'react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import {
  TextField,
  TextareaField,
  SelectField,
  CheckboxGroup,
  Radio,
  SwitchField,
  DatePickerField,
  PlainTextField,
} from './form-fields';
import SubForm from './sub-form';
import Tabs from './tabs';
import Wizard from './wizzard/wizzard';
import Select from './select';

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA_FIELD]: TextareaField,
  [componentTypes.SELECT_COMPONENT]: SelectField,
  [componentTypes.CHECKBOX]: CheckboxGroup,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePickerField,
  [componentTypes.TIME_PICKER]: props => <div>time picker</div>,
  [componentTypes.TAG_CONTROL]: props => <div>tag control</div>,
  [componentTypes.SWITCH]: SwitchField,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.PLAIN_TEXT]: PlainTextField,
};

export default mapper;

export const components = {
  TextField,
  TextareaField,
  SelectField,
  CheckboxGroup,
  SubForm,
  Radio,
  Tabs,
  DatePickerField,
  SwitchField,
  Wizard,
  PlainTextField,
};

export const rawComponents = {
  Select,
};
