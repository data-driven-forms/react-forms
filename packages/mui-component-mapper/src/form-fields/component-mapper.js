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
  TimePickerField,
  PlainTextField,
} from './form-fields';
import SubForm from './sub-form';
import Tabs from './tabs';

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA_FIELD]: TextareaField,
  [componentTypes.SELECT_COMPONENT]: SelectField,
  [componentTypes.CHECKBOX]: CheckboxGroup,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePickerField,
  [componentTypes.TIME_PICKER]: TimePickerField,
  [componentTypes.SWITCH]: SwitchField,
  [componentTypes.PLAIN_TEXT]: PlainTextField,
};

export default mapper;
